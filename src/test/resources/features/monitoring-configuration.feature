# US23 - Configuracion de umbrales de monitoreo
Caracteristica: Configuracion de umbrales ambientales
  Como usuario de CafeLab
  Quiero configurar umbrales de temperatura y humedad por lote
  Para alinear el monitoreo con las condiciones recomendadas de almacenamiento

  Escenario: Guardado exitoso de una configuracion valida
    Dado que el usuario selecciona un lote con rangos de temperatura y humedad validos
    Cuando confirma el guardado de la configuracion
    Entonces el sistema persiste los umbrales mediante el servicio mockeado
    Y muestra un mensaje de exito al usuario

  Escenario: Validacion de rango de temperatura invalido
    Dado que el usuario ingresa una temperatura minima mayor que la maxima
    Cuando intenta guardar la configuracion
    Entonces el sistema muestra un mensaje de error de validacion
    Y no envia la solicitud de guardado al backend
