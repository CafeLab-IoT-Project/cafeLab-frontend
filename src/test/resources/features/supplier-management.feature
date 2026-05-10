# US01 - Registro de Proveedores
# TS01 - API Proveedores
Característica: Gestión de proveedores
  Como responsable de abastecimiento
  Quiero registrar y consultar proveedores
  Para mantener actualizado el origen de compra del café verde

  Escenario: Registro exitoso de un proveedor
    Dado que el usuario abre el formulario de proveedores
    Cuando completa los datos obligatorios del proveedor con un correo válido
    Y confirma el registro
    Entonces el sistema guarda el proveedor
    Y lo muestra en la lista de proveedores

  Escenario: Validación de correo inválido en el registro de proveedor
    Dado que el usuario abre el formulario de proveedores
    Cuando ingresa un correo electrónico con formato inválido
    Y confirma el registro
    Entonces el sistema marca el formulario como inválido
    Y muestra una validación sobre el correo electrónico

  Escenario: Visualización de proveedores registrados
    Dado que existen proveedores previamente registrados
    Cuando el usuario accede a la vista de proveedores
    Entonces el sistema muestra la lista de proveedores disponibles
    Y cada proveedor presenta su información principal
