{
  "categorias": [
    { "id": "fiscal", "nombre": "Servicios Fiscales", "icono": "fiscal" },
    { "id": "contable", "nombre": "Servicios Contables", "icono": "contable" },
    { "id": "facturacion", "nombre": "Facturación y CFDI", "icono": "facturacion" },
    { "id": "organizacion", "nombre": "Organización Financiera", "icono": "organizacion" },
    { "id": "dashboards", "nombre": "Dashboards y Análisis", "icono": "dashboards" },
    { "id": "automatizacion", "nombre": "Automatización Administrativa", "icono": "automatizacion" },
    { "id": "asesorias", "nombre": "Asesorías Especializadas", "icono": "asesorias" }
  ],

  "beneficioExclusivo": {
    "id": "portal-clientes",
    "nombre": "Portal de Clientes IM",
    "etiqueta": "Incluido para todos los clientes IM",
    "descripcion": "Todo cliente de IM Servicios Contables recibe acceso gratuito a su propio portal digital: un espacio permanente para consultar su información contable y fiscal sin depender de pedirla por correo o WhatsApp.",
    "beneficios": [
      { "titulo": "Acceso a documentos", "detalle": "Tus declaraciones, CFDI y estados financieros, disponibles cuando los necesites." },
      { "titulo": "Descarga de declaraciones", "detalle": "Descarga acuses y comprobantes de pago sin esperar a que alguien te los reenvíe." },
      { "titulo": "Estados financieros", "detalle": "Consulta el histórico de tu balanza y resultados directamente en el portal." },
      { "titulo": "Comunicación con el despacho", "detalle": "Un canal directo con tu equipo contable, sin depender de un solo correo." },
      { "titulo": "Información disponible en cualquier momento", "detalle": "Tu información fiscal no vive solo en la bandeja de entrada de una persona." },
      { "titulo": "Acceso seguro", "detalle": "Cada cliente ve únicamente su propia información, protegida con acceso individual." }
    ],
    "nota": "Este es un beneficio del servicio, no un servicio adicional que se contrata por separado."
  },

  "servicios": [
    {
      "id": "IM-001",
      "nombre": "Declaración Mensual",
      "categoria": "fiscal",
      "descripcionCorta": "Cálculo y presentación puntual de tus obligaciones fiscales cada mes.",
      "problema": "Cada mes aparece la misma incertidumbre: ¿ya se presentó a tiempo?, ¿cuánto hay que pagar? Calcular ISR e IVA sin apoyo especializado suele significar horas revisando CFDI y el riesgo constante de un recargo por un error o una fecha vencida.",
      "descripcionCompleta": "Calculamos, revisamos y presentamos ante el SAT tus declaraciones mensuales de ISR e IVA, evitando recargos, multas y requerimientos por presentación extemporánea.",
      "queIncluye": [
        "Revisión de CFDI emitidos y recibidos del periodo",
        "Cálculo de ISR e IVA a cargo o a favor",
        "Presentación de la declaración ante el SAT",
        "Acuse y comprobante de pago disponibles en tu Portal de Clientes"
      ],
      "beneficios": [
        "Cero recargos por presentación fuera de tiempo",
        "Certeza de cuánto vas a pagar antes de la fecha límite",
        "Un solo punto de contacto para resolver dudas del mes"
      ],
      "comoTrabajamos": [
        "Recibimos tus CFDI y movimientos del mes",
        "Calculamos impuestos y te confirmamos el monto a pagar",
        "Presentamos la declaración ante el SAT",
        "Subimos el acuse y el resumen del mes a tu portal"
      ],
      "resultadoEsperado": "Terminas cada mes con tu obligación cumplida, un comprobante en mano y sin sorpresas fiscales.",
      "faq": [
        { "pregunta": "¿Qué pasa si no tuve movimientos en el mes?", "respuesta": "Aun en ceros la declaración debe presentarse; nosotros la generamos y presentamos igual." },
        { "pregunta": "¿Puedo cambiar de contador a mitad de año?", "respuesta": "Sí, revisamos tu historial fiscal reciente antes de tomar el mes en curso." }
      ],
      "clienteIdeal": "Personas físicas con actividad empresarial y empresas que ya facturan de forma regular.",
      "icono": "fiscal",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-002",
      "nombre": "Declaración Anual",
      "categoria": "fiscal",
      "descripcionCorta": "Cierre fiscal del ejercicio con estrategia de deducciones y saldo a favor.",
      "problema": "Llega el cierre de año y muchos contribuyentes descubren, ya tarde, que dejaron deducciones sin aprovechar o que su información del ejercicio no cuadra. El resultado: pagan de más o entran en riesgo de una observación del SAT.",
      "descripcionCompleta": "Preparamos tu declaración anual identificando deducciones autorizadas, verificando el correcto acumulado del ejercicio y gestionando la solicitud de saldo a favor cuando aplique.",
      "queIncluye": [
        "Revisión completa de ingresos y deducciones del ejercicio",
        "Identificación de deducciones personales no aprovechadas",
        "Cálculo y presentación de la declaración anual",
        "Seguimiento del trámite de devolución cuando hay saldo a favor"
      ],
      "beneficios": [
        "Cierre del año con certeza, no con dudas de último momento",
        "Aprovechamiento real de deducciones a las que tienes derecho",
        "Acompañamiento hasta que el saldo a favor llega a tu cuenta"
      ],
      "comoTrabajamos": [
        "Reunimos ingresos, deducciones y retenciones del ejercicio",
        "Calculamos el resultado y te mostramos el detalle antes de presentar",
        "Presentamos la declaración anual ante el SAT",
        "Damos seguimiento a la devolución si corresponde"
      ],
      "resultadoEsperado": "Cierras el ejercicio fiscal sabiendo exactamente qué pagaste, qué recuperaste y por qué.",
      "faq": [
        { "pregunta": "¿Qué deducciones personales puedo incluir?", "respuesta": "Depende de tu régimen; las revisamos contigo antes de presentar para no dejar ninguna fuera." },
        { "pregunta": "¿Cuánto tarda el SAT en devolver el saldo a favor?", "respuesta": "Varía por caso; damos seguimiento activo al trámite hasta su resolución." }
      ],
      "clienteIdeal": "Personas físicas y morales que buscan cerrar el año con certeza y sin contingencias.",
      "icono": "fiscal",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-003",
      "nombre": "Régimen RESICO",
      "categoria": "fiscal",
      "descripcionCorta": "Migración y administración fiscal bajo el Régimen Simplificado de Confianza.",
      "problema": "Muchos contribuyentes escuchan que RESICO 'paga menos impuestos' y migran sin analizar si realmente les conviene, o se quedan en su régimen anterior pagando de más por falta de información.",
      "descripcionCompleta": "Evaluamos si RESICO es tu mejor opción fiscal, gestionamos la migración ante el SAT y administramos tus obligaciones recurrentes bajo este régimen.",
      "queIncluye": [
        "Análisis de conveniencia fiscal antes de migrar",
        "Trámite de alta o cambio de régimen ante el SAT",
        "Administración mensual de obligaciones bajo RESICO",
        "Revisión de límites de ingreso para permanecer en el régimen"
      ],
      "beneficios": [
        "Decisión basada en números, no en suposiciones",
        "Migración sin errores que generen contingencias",
        "Alguien vigilando que sigas calificando para el régimen"
      ],
      "comoTrabajamos": [
        "Revisamos tus ingresos y actividad actual",
        "Te mostramos el comparativo entre tu régimen actual y RESICO",
        "Si conviene, tramitamos el cambio ante el SAT",
        "Administramos tus obligaciones mensuales bajo el nuevo régimen"
      ],
      "resultadoEsperado": "Sabes con certeza si RESICO te conviene y, si migras, operas en él sin errores.",
      "faq": [
        { "pregunta": "¿Todos pueden tributar en RESICO?", "respuesta": "No; existen límites de ingreso anual y ciertas actividades excluidas. Lo validamos antes de recomendar la migración." },
        { "pregunta": "¿Qué pasa si supero el límite de ingresos durante el año?", "respuesta": "Damos seguimiento mensual precisamente para anticipar ese escenario y actuar a tiempo." }
      ],
      "clienteIdeal": "Personas físicas con ingresos anuales dentro de los límites permitidos por RESICO.",
      "icono": "fiscal",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-004",
      "nombre": "Contabilidad General",
      "categoria": "contable",
      "descripcionCorta": "Registro contable completo de tu operación bajo normas vigentes.",
      "problema": "Sin un registro contable formal, un negocio no sabe realmente si está ganando o perdiendo hasta que es demasiado tarde, y queda expuesto ante cualquier revisión sin respaldo documental.",
      "descripcionCompleta": "Llevamos el registro contable de tu negocio conforme a las Normas de Información Financiera, generando pólizas, balanza de comprobación y estados financieros mensuales.",
      "queIncluye": [
        "Registro de pólizas contables del periodo",
        "Balanza de comprobación mensual",
        "Estados financieros (balance general y resultados)",
        "Respaldo documental ordenado para cualquier revisión"
      ],
      "beneficios": [
        "Información financiera confiable para decidir, no solo para declarar",
        "Respaldo sólido ante cualquier auditoría o revisión",
        "Tranquilidad de operar con contabilidad formal todo el año"
      ],
      "comoTrabajamos": [
        "Recopilamos los movimientos y documentos del periodo",
        "Registramos las pólizas contables correspondientes",
        "Generamos balanza y estados financieros del mes",
        "Te entregamos el reporte y resolvemos tus dudas"
      ],
      "resultadoEsperado": "Cuentas con estados financieros confiables cada mes, listos para decidir o para mostrar a un tercero.",
      "faq": [
        { "pregunta": "¿Necesito tener un sistema contable propio?", "respuesta": "No; nosotros llevamos el registro con nuestras propias herramientas y te compartimos los reportes." },
        { "pregunta": "¿Puedo pedir mis estados financieros de meses anteriores?", "respuesta": "Sí, quedan disponibles en tu Portal de Clientes en todo momento." }
      ],
      "clienteIdeal": "Empresas y negocios que requieren contabilidad formal y ordenada todo el año.",
      "icono": "contable",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-005",
      "nombre": "Nómina y Prestaciones",
      "categoria": "contable",
      "descripcionCorta": "Cálculo de nómina, IMSS y prestaciones conforme a la ley.",
      "problema": "Calcular nómina a mano expone a errores en percepciones, deducciones o cuotas IMSS, lo que se traduce en empleados inconformes o en contingencias laborales y fiscales para el negocio.",
      "descripcionCompleta": "Calculamos tu nómina quincenal o mensual, generamos los CFDI de nómina correspondientes y mantenemos actualizadas las cuotas obrero-patronales ante el IMSS.",
      "queIncluye": [
        "Cálculo de percepciones y deducciones por periodo",
        "Timbrado de recibos de nómina (CFDI de nómina)",
        "Cálculo y control de cuotas IMSS e INFONAVIT",
        "Reporte de incidencias (faltas, incapacidades, vacaciones)"
      ],
      "beneficios": [
        "Nómina calculada correctamente, sin errores que generen reclamos",
        "Cumplimiento constante ante IMSS e INFONAVIT",
        "Menos tiempo administrativo dedicado a cada quincena"
      ],
      "comoTrabajamos": [
        "Recibimos las incidencias del periodo (faltas, altas, bajas)",
        "Calculamos percepciones, deducciones y cuotas correspondientes",
        "Timbramos los recibos de nómina",
        "Te entregamos el reporte de nómina y de cuotas del periodo"
      ],
      "resultadoEsperado": "Tu equipo recibe su pago y su recibo a tiempo, y tú evitas contingencias con IMSS e INFONAVIT.",
      "faq": [
        { "pregunta": "¿Manejan nómina quincenal y mensual?", "respuesta": "Sí, adaptamos la periodicidad a como opera tu negocio." },
        { "pregunta": "¿Qué pasa si doy de alta a un empleado a mitad de mes?", "respuesta": "Ajustamos el cálculo proporcional y realizamos el movimiento correspondiente ante el IMSS." }
      ],
      "clienteIdeal": "Negocios con uno o más empleados en nómina formal.",
      "icono": "contable",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-006",
      "nombre": "Conciliación Bancaria",
      "categoria": "contable",
      "descripcionCorta": "Cruce mensual entre tus registros contables y tus estados de cuenta.",
      "problema": "Cuando la contabilidad y el banco no coinciden, cualquier decisión financiera se toma sobre información dudosa, y detectar el origen de la diferencia después de varios meses es mucho más difícil.",
      "descripcionCompleta": "Conciliamos tus cuentas bancarias contra tu contabilidad para detectar diferencias, movimientos no registrados y mantener tu información financiera confiable.",
      "queIncluye": [
        "Cruce de movimientos bancarios contra registros contables",
        "Identificación de diferencias y movimientos pendientes de registrar",
        "Reporte mensual de conciliación por cuenta",
        "Alerta temprana ante movimientos no reconocidos"
      ],
      "beneficios": [
        "Confianza en que tus números realmente reflejan tu banco",
        "Detección temprana de errores, duplicados u omisiones",
        "Información lista para auditoría en cualquier momento"
      ],
      "comoTrabajamos": [
        "Recibimos tus estados de cuenta bancarios del periodo",
        "Cruzamos cada movimiento contra el registro contable",
        "Documentamos las diferencias encontradas",
        "Entregamos el reporte de conciliación del mes"
      ],
      "resultadoEsperado": "Tu contabilidad y tu banco cuadran cada mes, sin diferencias sin explicar.",
      "faq": [
        { "pregunta": "¿Cuántas cuentas bancarias pueden conciliar?", "respuesta": "Las que tenga tu negocio; el servicio se ajusta al número de cuentas activas." },
        { "pregunta": "¿Qué pasa si encuentran una diferencia?", "respuesta": "Te la reportamos de inmediato con el detalle del movimiento para que se resuelva a tiempo." }
      ],
      "clienteIdeal": "Negocios con movimiento bancario frecuente y múltiples cuentas.",
      "icono": "contable",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-019",
      "nombre": "Administración de Facturación SAT",
      "categoria": "facturacion",
      "descripcionCorta": "Delega por completo la emisión, corrección y control de tu facturación.",
      "problema": "Facturar no es solo emitir un CFDI: es corregir errores con notas de crédito, cancelar cuando algo cambia, generar complementos de pago a tiempo y mantener todo ordenado. Hecho a mano y sin método, consume horas cada semana y multiplica el riesgo de un CFDI mal emitido.",
      "descripcionCompleta": "IM administra por completo tu facturación electrónica: emitimos, corregimos, cancelamos y organizamos tus CFDI, para que dejes de invertir tiempo operativo en algo que puedes delegar por completo.",
      "queIncluye": [
        "Emisión de facturas (CFDI) por cada venta o servicio",
        "Cancelaciones cuando un comprobante lo requiera",
        "Notas de crédito por devoluciones, descuentos o bonificaciones",
        "Complementos de pago para operaciones a crédito o en parcialidades",
        "Revisión de CFDI recibidos antes de que se acumulen en tu contabilidad",
        "Control documental y organización de toda tu facturación por periodo"
      ],
      "beneficios": [
        "Dejas de perder horas a la semana facturando manualmente",
        "Menos errores de facturación que después se traducen en problemas fiscales",
        "Un solo equipo administrando emisión, corrección y control documental",
        "Apoyo administrativo constante, no solo al cierre de mes"
      ],
      "comoTrabajamos": [
        "Definimos contigo el flujo de facturación de tu negocio",
        "Emitimos y corregimos tus CFDI conforme se generan las operaciones",
        "Revisamos y organizamos los comprobantes recibidos",
        "Te entregamos el control documental del periodo en tu Portal de Clientes"
      ],
      "resultadoEsperado": "Tu facturación queda completamente delegada: emitida, corregida y organizada, sin que tengas que operarla tú mismo.",
      "faq": [
        { "pregunta": "¿Puedo seguir facturando yo mismo en casos puntuales?", "respuesta": "Sí, el servicio se adapta: puede ser administración total o solo apoyo en los procesos que más tiempo te quitan." },
        { "pregunta": "¿Qué pasa si un cliente pide una cancelación fuera de plazo?", "respuesta": "Evaluamos las opciones disponibles ante el SAT según el caso y te explicamos las implicaciones antes de proceder." }
      ],
      "clienteIdeal": "Negocios con volumen constante de facturación que hoy pierden horas administrativas emitiendo, corrigiendo y organizando CFDI manualmente.",
      "icono": "facturacion",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-007",
      "nombre": "Organización de Documentos Fiscales",
      "categoria": "organizacion",
      "descripcionCorta": "Orden y respaldo digital de tus CFDI y comprobantes.",
      "problema": "Cuando la facturación vive dispersa entre correos, carpetas y el propio portal del SAT, encontrar un comprobante específico durante una revisión se convierte en una carrera contra el tiempo.",
      "descripcionCompleta": "Estructuramos un archivo digital ordenado de tus facturas emitidas y recibidas, listo para auditorías, declaraciones o revisiones del SAT.",
      "queIncluye": [
        "Recopilación y organización de CFDI emitidos y recibidos",
        "Estructura de carpetas por periodo y tipo de comprobante",
        "Respaldo digital permanente de tu facturación",
        "Acceso ordenado desde tu Portal de Clientes"
      ],
      "beneficios": [
        "Cualquier comprobante se encuentra en segundos, no en horas",
        "Respaldo permanente que no depende de una sola computadora",
        "Menos estrés ante cualquier requerimiento del SAT"
      ],
      "comoTrabajamos": [
        "Reunimos tu facturación dispersa de periodos anteriores",
        "Clasificamos y ordenamos por periodo y tipo de comprobante",
        "Creamos el respaldo digital permanente",
        "Dejamos todo accesible y organizado en tu portal"
      ],
      "resultadoEsperado": "Tu historial de facturación queda ordenado, respaldado y accesible cuando lo necesites.",
      "faq": [
        { "pregunta": "¿Pueden organizar facturación de años anteriores?", "respuesta": "Sí, partimos de tu historial disponible y lo integramos al archivo ordenado." },
        { "pregunta": "¿Dónde queda el respaldo?", "respuesta": "En tu Portal de Clientes, con acceso seguro solo para ti." }
      ],
      "clienteIdeal": "Negocios con volumen alto de facturación y documentación dispersa.",
      "icono": "organizacion",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-008",
      "nombre": "Estructura de Gastos",
      "categoria": "organizacion",
      "descripcionCorta": "Clasificación clara de gastos personales y del negocio.",
      "problema": "Cuando los gastos personales y del negocio se mezclan en las mismas cuentas, es imposible saber qué tan rentable es realmente el negocio ni preparar una declaración limpia.",
      "descripcionCompleta": "Diseñamos una estructura de categorías de gasto adaptada a tu operación, separando lo personal de lo empresarial y facilitando el control financiero mensual.",
      "queIncluye": [
        "Diagnóstico de gastos actuales del negocio",
        "Diseño de categorías de gasto adaptadas a tu operación",
        "Separación clara entre gasto personal y empresarial",
        "Reporte mensual de gasto por categoría"
      ],
      "beneficios": [
        "Claridad real sobre en qué se va el dinero del negocio",
        "Declaraciones más limpias, sin mezclar gasto personal",
        "Base ordenada para tomar decisiones de ahorro o inversión"
      ],
      "comoTrabajamos": [
        "Revisamos tus gastos actuales y su origen",
        "Diseñamos las categorías adaptadas a tu tipo de negocio",
        "Implementamos la clasificación mes a mes",
        "Te entregamos el reporte de gasto por categoría"
      ],
      "resultadoEsperado": "Sabes exactamente en qué se gasta el dinero del negocio, separado con claridad de tus finanzas personales.",
      "faq": [
        { "pregunta": "¿Esto sustituye llevar mi contabilidad?", "respuesta": "No, es un complemento que ordena y clasifica el gasto dentro de tu contabilidad existente." },
        { "pregunta": "¿Puedo ajustar las categorías después?", "respuesta": "Sí, la estructura se revisa y ajusta conforme cambia tu operación." }
      ],
      "clienteIdeal": "Emprendedores que están formalizando el orden financiero de su negocio.",
      "icono": "organizacion",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-009",
      "nombre": "Presupuesto Anual",
      "categoria": "organizacion",
      "descripcionCorta": "Plan financiero anual con metas de ingreso y gasto.",
      "problema": "Sin un presupuesto, cada mes se decide sobre la marcha y las metas de crecimiento se vuelven intenciones sin números que las respalden.",
      "descripcionCompleta": "Construimos junto contigo un presupuesto anual realista, con metas mensuales de ingresos, gastos fijos, variables y margen esperado.",
      "queIncluye": [
        "Análisis de ingresos y gastos históricos del negocio",
        "Definición de metas mensuales de ingreso y gasto",
        "Proyección de margen y flujo de efectivo esperado",
        "Revisión trimestral de avance contra el presupuesto"
      ],
      "beneficios": [
        "Metas financieras concretas, no solo buenas intenciones",
        "Visibilidad anticipada de meses fuertes y meses ajustados",
        "Base sólida para decidir inversiones con anticipación"
      ],
      "comoTrabajamos": [
        "Analizamos tu historial de ingresos y gastos",
        "Definimos contigo las metas del siguiente año",
        "Construimos el presupuesto mes a mes",
        "Damos seguimiento trimestral al avance real"
      ],
      "resultadoEsperado": "Empiezas el año con un plan financiero claro y con puntos de revisión definidos para ajustarlo si hace falta.",
      "faq": [
        { "pregunta": "¿Qué pasa si mi negocio es estacional?", "respuesta": "El presupuesto se construye considerando esos ciclos, no como un promedio parejo por mes." },
        { "pregunta": "¿Se puede ajustar a mitad de año?", "respuesta": "Sí, las revisiones trimestrales existen justamente para eso." }
      ],
      "clienteIdeal": "Negocios en crecimiento que buscan planear su año con anticipación.",
      "icono": "organizacion",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-010",
      "nombre": "Dashboard Financiero Mensual",
      "categoria": "dashboards",
      "descripcionCorta": "Panel visual con la salud financiera de tu negocio cada mes.",
      "problema": "Los estados financieros tradicionales son correctos, pero difíciles de leer rápido. Muchos dueños de negocio terminan decidiendo por intuición porque no tienen tiempo de interpretar un balance completo cada mes.",
      "descripcionCompleta": "Convertimos tu información contable en un panel visual claro: ingresos, gastos, margen, impuestos y flujo de efectivo, actualizado mes a mes.",
      "queIncluye": [
        "Panel visual de ingresos, gastos y margen del mes",
        "Vista de impuestos causados y flujo de efectivo",
        "Comparativo contra el mes y el año anterior",
        "Actualización mensual dentro de tu Portal de Clientes"
      ],
      "beneficios": [
        "Entiendes tu situación financiera en minutos, no en horas",
        "Decisiones basadas en datos actualizados, no en percepción",
        "Un mismo panel para revisar cada mes sin reconstruirlo"
      ],
      "comoTrabajamos": [
        "Tomamos tu información contable ya procesada",
        "Construimos el panel visual con tus indicadores clave",
        "Actualizamos el dashboard cada mes",
        "Revisamos contigo los puntos que requieren atención"
      ],
      "resultadoEsperado": "Cada mes abres un panel claro y sabes, de un vistazo, cómo está la salud financiera de tu negocio.",
      "faq": [
        { "pregunta": "¿Necesito instalar algún software?", "respuesta": "No, el panel se consulta directamente desde tu Portal de Clientes." },
        { "pregunta": "¿Puedo pedir que agreguen un indicador específico?", "respuesta": "Sí, el panel se adapta a los indicadores que más te importen." }
      ],
      "clienteIdeal": "Dueños de negocio que quieren decidir con datos, no solo con intuición.",
      "icono": "dashboards",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-011",
      "nombre": "Análisis de Rentabilidad",
      "categoria": "dashboards",
      "descripcionCorta": "Identificación de qué productos, servicios o líneas generan más margen.",
      "problema": "Muchos negocios con varias líneas de producto o servicio no saben cuál realmente les deja utilidad y cuál solo ocupa tiempo y recursos sin retorno.",
      "descripcionCompleta": "Analizamos tu información financiera para identificar qué líneas de negocio son más rentables y cuáles están consumiendo recursos sin generar retorno.",
      "queIncluye": [
        "Análisis de ingresos y costos por línea de negocio",
        "Identificación de las líneas más y menos rentables",
        "Detección de gastos que no generan retorno",
        "Recomendaciones concretas basadas en los resultados"
      ],
      "beneficios": [
        "Sabes con datos, no con impresiones, qué línea sostiene al negocio",
        "Identificas gastos que puedes reducir sin afectar tu operación",
        "Argumentos claros para decidir dónde invertir más"
      ],
      "comoTrabajamos": [
        "Recopilamos ingresos y costos por línea de negocio",
        "Analizamos el margen real de cada una",
        "Identificamos oportunidades de mejora o recorte",
        "Te entregamos el reporte con recomendaciones"
      ],
      "resultadoEsperado": "Tienes claridad de qué línea de tu negocio genera más valor y en cuál conviene ajustar el enfoque.",
      "faq": [
        { "pregunta": "¿Necesito tener contabilidad separada por línea?", "respuesta": "No es indispensable; partimos de tu información actual y la segmentamos para el análisis." },
        { "pregunta": "¿Cada cuánto se puede repetir este análisis?", "respuesta": "Recomendamos revisarlo al menos una vez al año, o cuando lances una línea nueva." }
      ],
      "clienteIdeal": "Negocios con más de una línea de producto o servicio.",
      "icono": "dashboards",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-012",
      "nombre": "Indicadores Clave (KPI)",
      "categoria": "dashboards",
      "descripcionCorta": "Definición y seguimiento de los indicadores que realmente importan.",
      "problema": "Muchos negocios miden todo o no miden nada: llenan reportes con datos que no llevan a ninguna decisión, o simplemente no dan seguimiento a ningún número de forma constante.",
      "descripcionCompleta": "Definimos junto contigo los indicadores financieros clave de tu negocio y los damos seguimiento mensual dentro de un panel simple de entender.",
      "queIncluye": [
        "Definición conjunta de los KPI relevantes para tu negocio",
        "Panel de seguimiento mensual por indicador",
        "Comparación contra la meta definida para cada uno",
        "Alertas cuando un indicador se desvía de forma importante"
      ],
      "beneficios": [
        "Mides lo que realmente importa para tu negocio, no todo lo que se puede medir",
        "Seguimiento constante en vez de revisiones aisladas",
        "Detección oportuna cuando algo se desvía de la meta"
      ],
      "comoTrabajamos": [
        "Definimos contigo los indicadores clave de tu negocio",
        "Establecemos la meta esperada para cada uno",
        "Damos seguimiento mensual dentro del panel",
        "Te avisamos cuando un indicador se desvía de la meta"
      ],
      "resultadoEsperado": "Cuentas con un puñado de indicadores claros que realmente te dicen cómo va tu negocio mes a mes.",
      "faq": [
        { "pregunta": "¿Cuántos indicadores recomiendan medir?", "respuesta": "Normalmente entre 4 y 6; suficientes para tener control sin generar ruido." },
        { "pregunta": "¿Se pueden cambiar los indicadores más adelante?", "respuesta": "Sí, se revisan conforme cambian las prioridades del negocio." }
      ],
      "clienteIdeal": "Negocios que buscan medir su desempeño de forma profesional.",
      "icono": "dashboards",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-013",
      "nombre": "Automatización de Facturación",
      "categoria": "automatizacion",
      "descripcionCorta": "Generación y timbrado automático de tus CFDI recurrentes.",
      "problema": "Facturar manualmente a los mismos clientes cada mes es trabajo repetitivo que consume tiempo del equipo y abre la puerta a errores evitables.",
      "descripcionCompleta": "Configuramos la emisión automática de facturas recurrentes y su timbrado ante el SAT, reduciendo tiempo administrativo y errores manuales.",
      "queIncluye": [
        "Configuración de facturación recurrente por cliente",
        "Timbrado automático ante el SAT",
        "Envío automático del CFDI al cliente correspondiente",
        "Reporte de facturación recurrente emitida"
      ],
      "beneficios": [
        "Horas administrativas liberadas cada mes",
        "Menor margen de error en la emisión recurrente",
        "Facturación puntual sin depender de que alguien la genere a mano"
      ],
      "comoTrabajamos": [
        "Identificamos tu facturación recurrente actual",
        "Configuramos las reglas de emisión automática",
        "Probamos el flujo antes de activarlo por completo",
        "Damos seguimiento a la emisión mensual automatizada"
      ],
      "resultadoEsperado": "Tu facturación recurrente se emite sola, puntual y sin intervención manual cada mes.",
      "faq": [
        { "pregunta": "¿Aplica solo para clientes con montos fijos?", "respuesta": "Funciona mejor con facturación recurrente y montos definidos; casos variables se revisan por separado." },
        { "pregunta": "¿Cuándo estará disponible este servicio?", "respuesta": "Está en preparación; puedes dejar tu contacto para que te avisemos en cuanto esté disponible." }
      ],
      "clienteIdeal": "Negocios con facturación recurrente a los mismos clientes.",
      "icono": "automatizacion",
      "disponible": false,
      "accionPrincipal": { "texto": "Notificarme al lanzar", "tipo": "detalle" },
      "accionesSecundarias": []
    },
    {
      "id": "IM-014",
      "nombre": "Recordatorios Fiscales Automáticos",
      "categoria": "automatizacion",
      "descripcionCorta": "Alertas antes de cada fecha límite de declaración o pago.",
      "problema": "Entre declaraciones mensuales, anuales, pagos provisionales y obligaciones patronales, es fácil perder de vista una fecha límite, sobre todo cuando el negocio tiene varias obligaciones al mismo tiempo.",
      "descripcionCompleta": "Implementamos un sistema de recordatorios que te avisa con anticipación sobre fechas límite de declaraciones, pagos provisionales y obligaciones patronales.",
      "queIncluye": [
        "Calendario fiscal personalizado según tu régimen",
        "Recordatorios anticipados antes de cada fecha límite",
        "Alertas para pagos provisionales y obligaciones patronales",
        "Aviso especial en cierres de mes y de ejercicio"
      ],
      "beneficios": [
        "Cero declaraciones olvidadas por falta de aviso",
        "Tiempo suficiente para reunir información antes de cada fecha",
        "Tranquilidad frente a un calendario fiscal que ya no llevas tú solo"
      ],
      "comoTrabajamos": [
        "Mapeamos todas tus obligaciones fiscales vigentes",
        "Construimos tu calendario fiscal personalizado",
        "Configuramos los recordatorios anticipados",
        "Ajustamos el calendario si cambian tus obligaciones"
      ],
      "resultadoEsperado": "Ninguna fecha límite te vuelve a tomar por sorpresa.",
      "faq": [
        { "pregunta": "¿Los recordatorios llegan aunque no sea su cliente de contabilidad?", "respuesta": "Este servicio está pensado para complementar la administración fiscal que ya llevamos contigo." },
        { "pregunta": "¿Cuándo estará disponible?", "respuesta": "Está en preparación; puedes dejar tu contacto para que te avisemos en cuanto esté disponible." }
      ],
      "clienteIdeal": "Negocios que manejan múltiples obligaciones fiscales al mes.",
      "icono": "automatizacion",
      "disponible": false,
      "accionPrincipal": { "texto": "Notificarme al lanzar", "tipo": "detalle" },
      "accionesSecundarias": []
    },
    {
      "id": "IM-015",
      "nombre": "Flujo de Aprobaciones Administrativas",
      "categoria": "automatizacion",
      "descripcionCorta": "Procesos internos de gasto y aprobación digitalizados.",
      "problema": "Cuando la aprobación de un gasto depende de correos sueltos o mensajes de WhatsApp, se pierde la trazabilidad y nadie puede reconstruir después quién autorizó qué y por qué.",
      "descripcionCompleta": "Diseñamos flujos digitales para la solicitud, revisión y aprobación de gastos internos, reduciendo el uso de papel y correos dispersos.",
      "queIncluye": [
        "Diseño del flujo de solicitud y aprobación de gasto",
        "Definición de responsables por tipo o monto de gasto",
        "Historial digital de cada solicitud y su resolución",
        "Reporte periódico de gasto aprobado por área"
      ],
      "beneficios": [
        "Trazabilidad completa de cada solicitud de gasto",
        "Menos fricción entre las áreas que solicitan y las que aprueban",
        "Historial ordenado disponible ante cualquier revisión interna"
      ],
      "comoTrabajamos": [
        "Mapeamos cómo se aprueban los gastos hoy en tu negocio",
        "Diseñamos el flujo digital de solicitud y aprobación",
        "Implementamos el proceso con los responsables definidos",
        "Damos seguimiento y ajustamos el flujo según el uso real"
      ],
      "resultadoEsperado": "Cada gasto interno queda solicitado, aprobado y documentado sin depender de mensajes sueltos.",
      "faq": [
        { "pregunta": "¿Funciona para empresas con varias sucursales?", "respuesta": "Sí, el flujo se adapta a distintos responsables por área o sucursal." },
        { "pregunta": "¿Cuándo estará disponible?", "respuesta": "Está en preparación; puedes dejar tu contacto para que te avisemos en cuanto esté disponible." }
      ],
      "clienteIdeal": "Empresas con varias personas autorizando gastos.",
      "icono": "automatizacion",
      "disponible": false,
      "accionPrincipal": { "texto": "Notificarme al lanzar", "tipo": "detalle" },
      "accionesSecundarias": []
    },
    {
      "id": "IM-016",
      "nombre": "Asesoría Fiscal para Nuevos Negocios",
      "categoria": "asesorias",
      "descripcionCorta": "Acompañamiento desde la constitución hasta la primera declaración.",
      "problema": "Empezar un negocio o actividad profesional sin guía fiscal desde el día uno suele terminar en un régimen mal elegido, un alta incorrecta ante el SAT o errores que se arrastran durante años.",
      "descripcionCompleta": "Guiamos a nuevos negocios en la elección de régimen fiscal, alta ante el SAT, y primeras obligaciones, evitando errores comunes desde el inicio.",
      "queIncluye": [
        "Análisis de actividad para elegir el régimen fiscal adecuado",
        "Alta ante el SAT y trámites iniciales",
        "Explicación clara de tus primeras obligaciones fiscales",
        "Acompañamiento en la primera declaración"
      ],
      "beneficios": [
        "Arrancas con el régimen correcto desde el primer día",
        "Evitas errores de alta que después son costosos de corregir",
        "Claridad total sobre qué obligaciones tienes y cuándo"
      ],
      "comoTrabajamos": [
        "Platicamos sobre tu actividad y forma de operar",
        "Te recomendamos el régimen fiscal más adecuado",
        "Realizamos el alta ante el SAT",
        "Te acompañamos en tu primera declaración"
      ],
      "resultadoEsperado": "Inicias tu actividad con la base fiscal correcta y sin errores que arrastrar después.",
      "faq": [
        { "pregunta": "¿Puedo empezar aunque ya tenga actividad sin regularizar?", "respuesta": "Sí, revisamos tu situación actual y armamos un plan para regularizarte." },
        { "pregunta": "¿Qué tan rápido puedo darme de alta?", "respuesta": "El trámite ante el SAT suele resolverse en pocos días una vez definido el régimen." }
      ],
      "clienteIdeal": "Personas que están iniciando un negocio o actividad profesional.",
      "icono": "asesorias",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-017",
      "nombre": "Asesoría en Estructura Corporativa",
      "categoria": "asesorias",
      "descripcionCorta": "Definición de la estructura societaria y fiscal más adecuada.",
      "problema": "Conforme un negocio crece, la estructura con la que empezó puede dejar de ser eficiente o segura, exponiéndolo a riesgos fiscales o societarios que antes no existían.",
      "descripcionCompleta": "Analizamos tu operación para recomendar la estructura societaria y fiscal más eficiente, considerando riesgo, carga fiscal y proyección de crecimiento.",
      "queIncluye": [
        "Diagnóstico de la estructura societaria y fiscal actual",
        "Análisis de riesgos y carga fiscal presentes",
        "Recomendación de estructura considerando el crecimiento esperado",
        "Acompañamiento en la implementación de los cambios"
      ],
      "beneficios": [
        "Estructura alineada al tamaño real y proyección del negocio",
        "Reducción de riesgos fiscales y societarios innecesarios",
        "Visión de mediano plazo, no solo del ejercicio en curso"
      ],
      "comoTrabajamos": [
        "Revisamos tu estructura societaria y fiscal actual",
        "Analizamos riesgos y oportunidades de mejora",
        "Te presentamos la recomendación con su justificación",
        "Acompañamos la implementación si decides avanzar"
      ],
      "resultadoEsperado": "Cuentas con una estructura pensada para el negocio que tienes hoy y el que proyectas a mediano plazo.",
      "faq": [
        { "pregunta": "¿Aplica solo para empresas grandes?", "respuesta": "No, también es útil para negocios en crecimiento que están por tomar decisiones importantes de estructura." },
        { "pregunta": "¿Incluyen la parte legal de constitución?", "respuesta": "Coordinamos con el asesor legal correspondiente; nuestro enfoque es el análisis fiscal y financiero de la estructura." }
      ],
      "clienteIdeal": "Empresas en expansión o con más de una unidad de negocio.",
      "icono": "asesorias",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    },
    {
      "id": "IM-018",
      "nombre": "Segunda Opinión Contable",
      "categoria": "asesorias",
      "descripcionCorta": "Revisión independiente de tu contabilidad actual.",
      "problema": "Muchos negocios confían en su contador actual sin una forma objetiva de saber si su contabilidad tiene riesgos ocultos, oportunidades de ahorro sin aprovechar o simplemente errores que nadie ha detectado.",
      "descripcionCompleta": "Revisamos la contabilidad llevada por tu contador o despacho actual para identificar riesgos, oportunidades de ahorro fiscal e inconsistencias no detectadas.",
      "queIncluye": [
        "Revisión independiente de tu contabilidad actual",
        "Identificación de riesgos fiscales no detectados antes",
        "Detección de oportunidades de ahorro no aprovechadas",
        "Reporte con hallazgos y recomendaciones concretas"
      ],
      "beneficios": [
        "Una mirada objetiva, sin compromisos previos con tu operación",
        "Identificación de riesgos antes de que se conviertan en un problema",
        "Recomendaciones claras y accionables, no solo observaciones"
      ],
      "comoTrabajamos": [
        "Revisamos la documentación e información contable disponible",
        "Analizamos riesgos, inconsistencias y oportunidades",
        "Documentamos los hallazgos encontrados",
        "Te presentamos el reporte con recomendaciones concretas"
      ],
      "resultadoEsperado": "Obtienes una validación objetiva de tu situación contable actual, con hallazgos claros y accionables.",
      "faq": [
        { "pregunta": "¿Esto significa que tengo que cambiar de contador?", "respuesta": "No necesariamente; muchos clientes solo buscan validar su situación actual con una segunda opinión." },
        { "pregunta": "¿Qué información necesitan para hacer la revisión?", "respuesta": "Depende del alcance; te compartimos una lista puntual una vez que definamos qué se va a revisar." }
      ],
      "clienteIdeal": "Negocios que ya tienen contador pero buscan validar su situación actual.",
      "icono": "asesorias",
      "disponible": true,
      "accionPrincipal": { "texto": "Solicitar información", "tipo": "detalle" },
      "accionesSecundarias": [
        { "texto": "Agregar al cotizador", "tipo": "cotizador" },
        { "texto": "Contactar por WhatsApp", "tipo": "whatsapp" }
      ]
    }
  ]
}
