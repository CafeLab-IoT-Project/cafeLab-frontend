# US10 - Control de Inventario Integrado
Característica: Control de inventario integrado
  Como usuario responsable del inventario
  Quiero consultar movimientos y registrar consumos
  Para mantener actualizado el stock de café

  Escenario: Visualización de consumos registrados
    Dado que existen registros de consumo en el inventario
    Cuando el usuario accede a la vista de inventario
    Entonces el sistema muestra la tabla de consumos o entradas registradas
    Y cada fila presenta la información principal del movimiento

  Escenario: Registro exitoso de un consumo válido
    Dado que el usuario abre el diálogo de registro de consumo
    Cuando selecciona un lote y registra una cantidad usada válida
    Y confirma el registro
    Entonces el sistema acepta el consumo
    Y actualiza la información del inventario

  Escenario: Validación de cantidad usada inválida
    Dado que el usuario abre el diálogo de registro de consumo
    Cuando ingresa una cantidad usada menor o igual a cero
    Y confirma el registro
    Entonces el sistema marca la cantidad como inválida
    Y no permite registrar el consumo
