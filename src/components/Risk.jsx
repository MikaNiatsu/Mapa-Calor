import { useState } from 'react';

const riesgos = [
  { id: 1, nombre: "Incompatibilidad con el sistema SIIGO", descripcion: "El nuevo software podría tener problemas de integración con el sistema contable SIIGO existente, causando errores en la transferencia de datos financieros y retrasos en la implementación.", impacto: 5, probabilidad: 3 },
  { id: 2, nombre: "Resistencia al cambio por parte del personal", descripcion: "Los empleados podrían mostrar resistencia a adoptar el nuevo sistema, lo que resultaría en una baja adopción y eficiencia reducida en las operaciones post-implementación.", impacto: 4, probabilidad: 4 },
  { id: 3, nombre: "Retrasos en el desarrollo de módulos críticos", descripcion: "El desarrollo de módulos clave como el de Planificación y Control de Producción podría retrasarse, impactando el cronograma general y la capacidad de cumplir con el objetivo de aumentar la eficiencia en la planificación de la producción en un 25%.", impacto: 5, probabilidad: 3 },
  { id: 4, nombre: "Sobrecarga de trabajo en el equipo de desarrollo", descripcion: "La complejidad y el alcance del proyecto podrían sobrecargar al equipo de desarrollo, llevando a una disminución en la calidad del código y posibles burnouts del personal.", impacto: 4, probabilidad: 4 },
  { id: 5, nombre: "Fallas en la migración de datos", descripcion: "Podrían surgir problemas durante la migración de datos desde los sistemas antiguos, resultando en pérdida de información crítica o corrupción de datos en el nuevo sistema.", impacto: 5, probabilidad: 3 },
  { id: 6, nombre: "Cambios no anticipados en los requerimientos", descripcion: "Provispol S.A. podría solicitar cambios significativos en los requerimientos durante el desarrollo, lo que afectaría el alcance, el cronograma y el presupuesto del proyecto.", impacto: 4, probabilidad: 4 },
  { id: 7, nombre: "Problemas de rendimiento del sistema", descripcion: "El software integrado podría enfrentar problemas de rendimiento al manejar grandes volúmenes de datos, lo que impactaría negativamente la eficiencia operativa y la satisfacción del usuario.", impacto: 4, probabilidad: 3 },
  { id: 8, nombre: "Brechas de seguridad en el nuevo sistema", descripcion: "Podrían identificarse vulnerabilidades de seguridad en el nuevo software, exponiendo datos sensibles de Provispol S.A. y requiriendo parches de emergencia.", impacto: 5, probabilidad: 2 },
  { id: 9, nombre: "Subestimación de la complejidad de integración", descripcion: "La integración entre los diferentes módulos podría resultar más compleja de lo previsto, llevando a retrasos y sobrecostos en el desarrollo.", impacto: 4, probabilidad: 4 },
  { id: 10, nombre: "Falta de disponibilidad de stakeholders clave", descripcion: "Los stakeholders clave de Provispol S.A. podrían no estar disponibles para tomar decisiones críticas o proporcionar feedback oportuno, retrasando el progreso del proyecto.", impacto: 4, probabilidad: 3 },
  { id: 11, nombre: "Capacitación inadecuada de usuarios finales", descripcion: "Una capacitación insuficiente o inefectiva de los usuarios finales podría resultar en un uso subóptimo del nuevo sistema, impidiendo alcanzar los objetivos de mejora de eficiencia.", impacto: 4, probabilidad: 3 },
  { id: 12, nombre: "Conflictos entre departamentos sobre prioridades", descripcion: "Podrían surgir desacuerdos entre diferentes departamentos de Provispol S.A. sobre las prioridades de implementación de módulos, causando retrasos y potenciales cambios en el alcance.", impacto: 3, probabilidad: 3 },
  { id: 13, nombre: "Problemas de compatibilidad con hardware existente", descripcion: "El nuevo software podría no ser totalmente compatible con el hardware existente en Provispol S.A., requiriendo actualizaciones de equipos no previstas y aumentando los costos.", impacto: 4, probabilidad: 2 },
  { id: 14, nombre: "Cambios regulatorios en la industria del plástico", descripcion: "Nuevas regulaciones en la industria del plástico podrían entrar en vigor durante el desarrollo del proyecto, requiriendo ajustes significativos en los módulos de gestión de calidad y producción.", impacto: 4, probabilidad: 2 },
  { id: 15, nombre: "Pérdida de personal clave del proyecto", descripcion: "Miembros clave del equipo del proyecto podrían dejar la empresa durante la implementación, llevándose conocimiento crítico y afectando la capacidad de completar el proyecto según lo planeado.", impacto: 5, probabilidad: 2 }
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
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect width="1200" height="600" fill="url(#bgGradient)" rx="15" ry="15"/>
        
        <text x="500" y="50" fontFamily="Trebuchet MS" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#333">Mapa de Calor de Riesgos</text>
        
        <text x="460" y="560" fontFamily="Trebuchet MS" fontSize="18" textAnchor="middle" fontWeight="bold" fill="#666">Impacto</text>
        <text x="50" y="280" fontFamily="Trebuchet MS" fontSize="18" textAnchor="middle" fontWeight="bold" transform="rotate(-90 50 300)" fill="#666">Probabilidad</text>
        
        {['Insignificante', 'Menor', 'Crítica', 'Mayor', 'Catastrófico'].map((label, index) => (
          <text key={label} x={220 + index * 120} y="520" fontFamily="Trebuchet MS" fontSize="14" fontStyle="italic" textAnchor="middle" fill="#666">{label}</text>
        ))}
        
        {['Improbable', 'Posible', 'Ocasional', 'Moderado', 'Constante'].map((label, index) => (
          <text key={label} x="140" y={460 - index * 80} fontFamily="Trebuchet MS" fontSize="14" fontStyle="italic" textAnchor="end" fill="#666">{label}</text>
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
                    stroke="black"
                    strokeWidth="1"
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
            <text x="500" y="250" fontFamily="Trebuchet MS" fontSize="18" fontWeight="bold" textAnchor="middle" fill="#333">{selectedRisk.nombre}</text>
            <text x="500" y="280" fontFamily="Trebuchet MS" fontSize="16" textAnchor="middle" fill="#666">ID: {selectedRisk.id}</text>
            <foreignObject x="280" y="300" width="440" height="150">
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