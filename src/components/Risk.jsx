import { useState } from 'react';

const riesgos = [
  { id: 1, nombre: "Resistencia al cambio", descripcion: "Los empleados pueden mostrarse reacios a adoptar nuevas tecnologías y procesos.", impacto: 2, probabilidad: 3 },
  { id: 2, nombre: "Problemas de integración", descripcion: "El software puede enfrentar problemas para integrarse con sistemas ya presentes en la empresa.", impacto: 3, probabilidad: 3 },
  { id: 3, nombre: "Retrasos en implementación", descripcion: "La complejidad del desarrollo del software podría causar retrasos.", impacto: 2, probabilidad: 2 },
  { id: 4, nombre: "Sobrecostos", descripcion: "Cambios no planificados en los requisitos podrían aumentar los costos.", impacto: 4, probabilidad: 4 },
  { id: 5, nombre: "Calidad de datos", descripcion: "Los datos migrados al nuevo sistema pueden no ser de la calidad esperada.", impacto: 3, probabilidad: 2 },
  { id: 6, nombre: "Rendimiento del software", descripcion: "El sistema podría no manejar eficientemente el procesamiento de grandes volúmenes de datos.", impacto: 2, probabilidad: 1 },
  { id: 7, nombre: "Seguridad de datos", descripcion: "Riesgo de brechas de seguridad que podrían comprometer la integridad y confidencialidad de la información.", impacto: 4, probabilidad: 3 },
  { id: 8, nombre: "Conflictos en equipo", descripcion: "Falta de coordinación y conflictos entre miembros del equipo podrían afectar el progreso.", impacto: 1, probabilidad: 1 },
  { id: 9, nombre: "Complejidad subestimada", descripcion: "El proyecto podría ser más complejo de lo previsto, resultando en retrasos y sobrecostos.", impacto: 3, probabilidad: 2 },
  { id: 10, nombre: "Problemas con proveedores", descripcion: "Dependencia de proveedores podría generar riesgos si no cumplen con los acuerdos.", impacto: 2, probabilidad: 2 },
  { id: 11, nombre: "Peores consecuencias", descripcion: "Los riesgos pueden afectar la productividad de la organización.", impacto: 4, probabilidad: 4 }
];

const RiskHeatmap = () => {
  const [selectedRisk, setSelectedRisk] = useState(null);

  const handleRiskClick = (risk) => {
    setSelectedRisk(risk);
  };

  const closeModal = () => {
    setSelectedRisk(null);
  };

  const getColor = (impacto, probabilidad) => {
    const colorMatrix = [
      ['#ffa500', '#ffa500', '#ffa500', '#ff0000', '#ff0000'],
      ['#90EE90', '#ffe65d', '#ffa500', '#ff0000', '#ff0000'],
      ['#90EE90', '#ffe65d', '#ffe65d', '#ffa500', '#ff0000'],
      ['#90EE90', '#90EE90', '#ffe65d', '#ffe65d', '#ffa500'],
      ['#e5f8e5', '#90EE90', '#90EE90', '#ffe65d', '#ffa500']
    ];
    return colorMatrix[5 - probabilidad][impacto - 1];
  };

  const getCellRisks = (impacto, probabilidad) => {
    return riesgos.filter(r => r.impacto === impacto && r.probabilidad === probabilidad);
  };

  const renderRiskItems = (cellRisks, x, y) => {
    const itemSize = 30;
    const itemsPerRow = 3;
    const padding = 5;

    return cellRisks.map((risk, index) => {
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;
      const itemX = x + col * (itemSize + padding) + padding;
      const itemY = y + row * (itemSize + padding) + padding;

      return (
        <g key={risk.id} onClick={() => handleRiskClick(risk)} style={{ cursor: 'pointer' }}>
          <circle 
            cx={itemX + itemSize / 2} 
            cy={itemY + itemSize / 2} 
            r={itemSize / 2} 
            fill="white" 
            stroke="#333" 
            strokeWidth="2"
          />
          <text 
            x={itemX + itemSize / 2} 
            y={itemY + itemSize / 2 + 5} 
            fontFamily="Arial" 
            fontSize="12" 
            textAnchor="middle" 
            fill="#333" 
          >
            {risk.id}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <svg className="w-full h-full max-w-4xl" viewBox="0 0 1000 600">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e7e9" />
            <stop offset="100%" stopColor="#e3eeff" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#bgGradient)" rx="15" ry="15"/>
        
        <text x="500" y="50" fontFamily="Trebuchet MS" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#333">Mapa de Calor de Riesgos</text>
        
        <text x="550" y="560" fontFamily="Trebuchet MS" fontSize="18" textAnchor="middle" fill="#666">Impacto</text>
        <text x="50" y="300" fontFamily="Trebuchet MS" fontSize="18" textAnchor="middle" transform="rotate(-90 50 300)" fill="#666">Probabilidad</text>
        
        {['Insignificante', 'Menor', 'Crítica', 'Mayor', 'Catastrófico'].map((label, index) => (
          <text key={label} x={220 + index * 120} y="520" fontFamily="Trebuchet MS" fontSize="14" textAnchor="middle" fill="#666">{label}</text>
        ))}
        
        {['Improbable', 'Posible', 'Ocasional', 'Moderado', 'Constante'].map((label, index) => (
          <text key={label} x="140" y={460 - index * 80} fontFamily="Trebuchet MS" fontSize="14" textAnchor="end" fill="#666">{label}</text>
        ))}
        
        <g opacity="0.9">
          {[5, 4, 3, 2, 1].map((probabilidad, rowIndex) => 
            [1, 2, 3, 4, 5].map((impacto, colIndex) => {
              const cellRisks = getCellRisks(impacto, probabilidad);
              const x = 160 + colIndex * 120;
              const y = 100 + rowIndex * 80;
              return (
                <g key={`${impacto}-${probabilidad}`}>
                  <rect 
                    x={x}
                    y={y}
                    width="120" 
                    height="80" 
                    fill={getColor(impacto, probabilidad)}
                    rx="10" 
                    ry="10"
                  />
                  {renderRiskItems(cellRisks, x, y)}
                </g>
              );
            })
          )}
        </g>
        
        <g transform="translate(800, 250)">
          {['Catastrófico', 'Mayor', 'Crítica', 'Menor', 'Insignificante'].map((label, index) => (
            <g key={label} transform={`translate(0, ${index * 30})`}>
              <rect width="20" height="20" fill={['#ff0000', '#ffa500', '#ffe65d', '#90EE90', '#e5f8e5'][index]} rx="5" ry="5"/>
              <text x="30" y="15" fontFamily="Trebuchet MS" fontSize="14" fill="#666">{label}</text>
            </g>
          ))}
        </g>

        {selectedRisk && (
          <g>
            <rect x="250" y="150" width="500" height="300" fill="#fff" rx="20" ry="20" opacity="0.95"/>
            <text x="500" y="190" fontFamily="Trebuchet MS" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#333">{selectedRisk.nombre}</text>
            <text x="500" y="230" fontFamily="Trebuchet MS" fontSize="16" textAnchor="middle" fill="#666">ID: {selectedRisk.id}</text>
            <foreignObject x="280" y="250" width="440" height="150">
              <p xmlns="http://www.w3.org/1999/xhtml" style={{fontFamily: 'Trebuchet MS', fontSize: '14px', color: '#444', textAlign: 'center'}}>
                {selectedRisk.descripcion}
              </p>
            </foreignObject>
            <circle cx="720" cy="170" r="15" fill="#f0f0f0" onClick={closeModal} style={{ cursor: 'pointer' }}/>
            <text x="720" y="175" fontFamily="Trebuchet MS" fontSize="20" textAnchor="middle" fill="#666" onClick={closeModal} style={{ cursor: 'pointer' }}>×</text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default RiskHeatmap;