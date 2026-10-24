import { Language } from './profile';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  achievements: string[];
  tools: string[];
}

// Positions as written in the CV. beacon.ts groups them by employer through `itemIds`.
export const experienceItems: Record<Language, ExperienceItem[]> = {
  es: [
    {
      id: 'exp-validador',
      role: 'Validador',
      company: 'Overshark Perú S.A.C.',
      period: 'Set. 2026 – Actualidad',
      summary: 'Conciliación bancaria diaria contra el ERP y validación de comprobantes de pago e incidencias por fraude.',
      achievements: ['Reduje en 25% el tiempo de validación.', 'Eliminé las pérdidas por cupones falsos.'],
      tools: ['ERP', 'Conciliación bancaria', 'Comprobantes de pago', 'Control antifraude'],
    },
    {
      id: 'exp-analista',
      role: 'Analista de datos',
      company: 'Overshark Perú S.A.C.',
      period: 'Abr. 2026 – Ago. 2026',
      summary: 'Limpieza y análisis de datos con SQL y Excel avanzado.',
      achievements: [
        'Tableros en Power BI para monitorear KPIs.',
        'Automaticé reportes semanales y reduje en 30% su tiempo de entrega.',
      ],
      tools: ['SQL', 'Excel avanzado', 'Power BI', 'Automatización de reportes'],
    },
    {
      id: 'exp-soporte',
      role: 'Soporte operativo',
      company: 'Livex – Overshark',
      period: 'Ago. 2025 – Ene. 2026',
      summary: 'Recepción, control y despacho de pedidos prioritarios a Lima y provincias, y coordinación de rutas.',
      achievements: ['Mejoré en 15% los tiempos de respuesta y coordinación de envíos.'],
      tools: ['Logística', 'Despacho de pedidos', 'Coordinación de rutas'],
    },
    {
      id: 'exp-zazu',
      role: 'Asistente de operaciones y envíos',
      company: 'Zazu Express',
      period: 'Jun. 2025 – Ago. 2025',
      summary:
        'Actualización de ventas y publicaciones en plataformas digitales y seguimiento logístico de envíos locales.',
      achievements: ['Logré un 98% de efectividad en las entregas diarias.'],
      tools: ['Plataformas digitales', 'Seguimiento logístico', 'Envíos locales'],
    },
    {
      id: 'exp-ic-logistica',
      role: 'Operario de almacén y despacho',
      company: 'I.C. Logística S.A.C.',
      period: 'Abr. 2025 – Ago. 2025',
      summary: 'Recepción, clasificación, picking y control de inventario bajo normas de seguridad.',
      achievements: ['Cumplí al 100% los tiempos de entrega programados.'],
      tools: ['Picking', 'Control de inventario', 'Normas de seguridad'],
    },
  ],
  en: [
    {
      id: 'exp-validador',
      role: 'Validator',
      company: 'Overshark Perú S.A.C.',
      period: 'Sep 2026 – Present',
      summary: 'Daily bank reconciliation against the ERP and validation of payment receipts and fraud incidents.',
      achievements: ['Reduced validation time by 25%.', 'Eliminated losses from fake coupons.'],
      tools: ['ERP', 'Bank reconciliation', 'Payment receipts', 'Fraud control'],
    },
    {
      id: 'exp-analista',
      role: 'Data Analyst',
      company: 'Overshark Perú S.A.C.',
      period: 'Apr 2026 – Aug 2026',
      summary: 'Data cleaning and analysis with SQL and advanced Excel.',
      achievements: [
        'Power BI dashboards to monitor KPIs.',
        'Automated weekly reports and cut their delivery time by 30%.',
      ],
      tools: ['SQL', 'Advanced Excel', 'Power BI', 'Report automation'],
    },
    {
      id: 'exp-soporte',
      role: 'Operations Support',
      company: 'Livex – Overshark',
      period: 'Aug 2025 – Jan 2026',
      summary: 'Receiving, control and dispatch of priority orders to Lima and the provinces, plus route coordination.',
      achievements: ['Improved response times and shipment coordination by 15%.'],
      tools: ['Logistics', 'Order dispatch', 'Route coordination'],
    },
    {
      id: 'exp-zazu',
      role: 'Operations & Shipping Assistant',
      company: 'Zazu Express',
      period: 'Jun 2025 – Aug 2025',
      summary: 'Updating sales and listings on digital platforms and tracking local shipments.',
      achievements: ['Reached 98% effectiveness in daily deliveries.'],
      tools: ['Digital platforms', 'Logistics tracking', 'Local shipments'],
    },
    {
      id: 'exp-ic-logistica',
      role: 'Warehouse & Dispatch Operator',
      company: 'I.C. Logística S.A.C.',
      period: 'Apr 2025 – Aug 2025',
      summary: 'Receiving, sorting, picking and inventory control under safety standards.',
      achievements: ['Met 100% of scheduled delivery times.'],
      tools: ['Picking', 'Inventory control', 'Safety standards'],
    },
  ],
};
