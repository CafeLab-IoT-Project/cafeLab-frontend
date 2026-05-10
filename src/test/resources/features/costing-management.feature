# US13 - Gestión de Costos de Producción
Característica: Gestión de costos de producción
  Como usuario responsable de costos
  Quiero seleccionar un lote y registrar costos directos e indirectos
  Para calcular métricas de producción por kilogramo

  Escenario: Selección de un lote para calcular costos
    Dado que existen lotes disponibles para costeo
    Cuando el usuario selecciona un lote en el flujo de costos
    Entonces el sistema conserva el lote seleccionado
    Y habilita el registro de costos asociados

  Escenario: Validación de campos numéricos en costos directos e indirectos
    Dado que el usuario se encuentra registrando costos de producción
    Cuando ingresa valores numéricos inválidos en los formularios de costos
    Entonces el sistema marca los campos con error
    Y evita continuar con el cálculo

  Escenario: Visualización de métricas calculadas del costo de producción
    Dado que el usuario completó un costeo con datos válidos
    Cuando el sistema procesa la información del lote y los costos
    Entonces se muestran el costo por kilogramo, el margen potencial y el precio sugerido
    Y las métricas se presentan con los valores calculados correspondientes
