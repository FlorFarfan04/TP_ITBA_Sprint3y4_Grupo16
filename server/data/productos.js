const productos = [
 {
    id: 1,
    destacado: true,
    nombre: "Aparador Uspallata",
    imagen: "img/aparadorUspallata.png",
    medidas: "180 x 45 x 75 cm",
    materiales: "Nogal macizo FSC®, herrajes de latón",
    acabado: "Aceite natural ecológico",
    descripcion: "Capacidad: 6 compartimentos interiores.",
    info: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
    precio: "$270.000"
  },
  {
    id: 2,
    destacado: true,
    nombre: "Biblioteca Recoleta",
    imagen: "img/bibliotecaRecoleta.png",
    medidas: "100 x 35 x 200 cm",
    materiales: "Estructura de acero, estantes de roble",
    acabado: "Laca mate ecológica",
    descripcion: "Modulares: 5 estantes ajustables.",
    info: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
    precio: "$353.000"
  },
  {
    id: 3,
    nombre: "Butaca Mendoza",
    imagen: "img/butacaMendoza.png",
    medidas: "80 x 75 x 85 cm",
    materiales: "Guatambú macizo, tela bouclé",
    acabado: "Cera vegetal, tapizado premium",
    descripcion: "Tapizado repelente al agua y manchas, con relleno de espuma de alta densidad.",
    info: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
    precio: "$234.000"
  },
  {
    id: 4,
    nombre: "Sillón Copacabana",
    imagen: "img/sillonCopacabana.png",
    medidas: "90 x 85 x 95 cm",
    materiales: "Cuero curtido vegetal, acero pintado",
    acabado: "Cuero anilina premium",
    descripcion: "Rotación 360° silenciosa y suave.",
    info: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
    precio: "$320.000"
  },
  {
    id: 5,
    destacado: true,
    nombre: "Mesa de Centro Araucaria",
    imagen: "img/mesaCentroAraucaria.png",
    medidas: "90 x 90 x 45 cm",
    materiales: "Sobre de mármol Patagonia, patas de nogal",
    acabado: "Mármol pulido, aceite natural en madera",
    descripcion: "Carga máxima: 25 kg distribuidos.",
    info: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar  contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
    precio: "$272.000"
  },
  {
    id: 6,
    nombre: "Mesa de Noche Aconcagua",
    imagen: "img/mesaNocheAconcagua.png",
    medidas: "45 x 35 x 60 cm",
    materiales: "Roble macizo FSC®, herrajes soft-close",
    acabado: "Barniz mate de poliuretano",
    descripcion: "Almacenamiento: 1 cajón con cierre suave y repisa inferior.",
    info: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
    precio: "$244.000"
  },
  {
    id: 7,
    nombre: "Sofá Patagonia",
    imagen: "img/sofaPatagonia.png",
    medidas: "220 x 90 x 80 cm",
    materiales: "Madera de eucalipto certificada FSC®, tapizado en lino orgánico",
    acabado: " ",
    descripcion: "Relleno: Espuma HR + plumón recilado.",
    info: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
    precio: "$272.000"
  },
  {
    id: 8,
    nombre: "Mesa Comedor Pampa",
    imagen: "img/mesaComedorPampa.png",
    medidas: "160-240 x 90 x 75 cm",
    materiales: "Roble macizo FSC®, mecanismo alemán",
    acabado: "Aceite-cera natural",
    descripcion: "Capacidad: 6-10 comensales, extensión sistema mariposa central.",
    info: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares,  extendiéndose de 6 a 10 comensales.",
    precio: "$218.000"
  },
  {
    id: 9,
    destacado: true,
    nombre: "Sillas Córdoba",
    imagen: "img/sillasCordoba.png",
    medidas: "45 x 52 x 80 cm",
    materiales: "Contrachapado nogal, tubo de acero",
    acabado: "Laca mate, pintura epoxi",
    descripcion: "Apilables: hasta 6 sillas.",
    info: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el  so diario, perfectas para comedores contemporáneos.",
    precio: "$410.000"
  },
  {
    id: 10,
    nombre: "Escritorio Costa",
    imagen: "img/escritorioCosta.png",
    medidas: "120 x 60 x 75 cm",
    materiales: "Bambú laminado, herrajes ocultos",
    acabado: "Laca mate resistente",
    descripcion: "Almacenamiento: 1 cajón con organizador.",
    info: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
    precio: "$390.000"
  },
  {
    id: 11,
    nombre: "Silla de Trabajo Belgrano",
    imagen: "img/sillaTrabajoBelgrano.png",
    medidas: "60 x 60 x 90-100 cm",
    materiales: "Malla técnica, tejido reciclado",
    acabado: "Base cromada, tapizado premium",
    descripcion: "Regulación: altura + inclinación respaldo.",
    info: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para  oficinas en casa y espacios de coworking.",
    precio: "$290.000"
  },
];

export default productos;