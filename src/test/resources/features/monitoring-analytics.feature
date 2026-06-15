# US21 - Consulta de historial ambiental por lote
Caracteristica: Analiticas ambientales por lote
  Como usuario de CafeLab
  Quiero consultar el historial ambiental de un lote
  Para analizar la evolucion de temperatura y humedad en el tiempo

  Escenario: Visualizacion de promedios y tendencia historica
    Dado que el lote seleccionado tiene lecturas historicas registradas
    Cuando el usuario accede a la vista de analiticas de monitoreo
    Entonces el sistema muestra promedios de temperatura y humedad
    Y presenta una serie de puntos para la tendencia historica del lote
