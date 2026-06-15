# US20 - Visualizacion de condiciones del almacen en tiempo real
Caracteristica: Monitoreo en tiempo real de lotes
  Como usuario de CafeLab
  Quiero visualizar temperatura y humedad actuales de mis lotes
  Para tomar decisiones oportunas sobre la conservacion del cafe verde

  Escenario: Visualizacion de lotes monitoreados en el dashboard
    Dado que existen lotes con lecturas de telemetria disponibles
    Cuando el usuario accede a la vista de monitoreo de lotes
    Entonces el sistema muestra tarjetas con temperatura, humedad y estado ambiental
    Y cada tarjeta presenta el nombre del lote y su tipo de cafe

  Escenario: Filtrado de lotes por busqueda
    Dado que el usuario se encuentra en la vista de monitoreo de lotes
    Cuando ingresa un termino de busqueda relacionado con el nombre del lote
    Entonces el sistema muestra unicamente los lotes que coinciden con la busqueda
