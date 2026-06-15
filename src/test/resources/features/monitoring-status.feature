# US24 - Indicador de estado ambiental por lote
# US25 - Activacion automatica del deshumidificador
Caracteristica: Estado ambiental y actuadores simulados
  Como usuario de CafeLab
  Quiero identificar el estado ambiental de cada lote
  Para reconocer cuando se requiere activar mecanismos de regulacion

  Escenario: Indicador de estado optimo
    Dado que la ultima lectura del lote se encuentra dentro de los umbrales configurados
    Cuando el sistema evalua el estado ambiental
    Entonces el lote se representa con estado optimo

  Escenario: Indicador de estado critico con actuador de humedad
    Dado que la humedad del lote se encuentra fuera del rango configurado
    Cuando el sistema evalua el estado ambiental
    Entonces el lote se representa con estado critico
    Y se muestra el mensaje de activacion del actuador de humedad
