# US02 - Gestión de Lotes de Café Verde
# TS02 - API Lotes
Característica: Gestión de lotes de café verde
  Como responsable de inventario de café verde
  Quiero registrar y consultar lotes asociados a proveedores
  Para mantener trazabilidad del café disponible

  Escenario: Registro exitoso de un lote con proveedor asociado
    Dado que el usuario abre el formulario de registro de lotes
    Y existe un proveedor disponible para asociar
    Cuando completa los campos obligatorios del lote con datos válidos
    Y selecciona un proveedor
    Entonces el sistema guarda el lote correctamente
    Y lo muestra en la lista de lotes

  Escenario: Validación de proveedor obligatorio para registrar un lote
    Dado que el usuario abre el formulario de registro de lotes
    Cuando completa los datos del lote sin seleccionar proveedor
    Y confirma el registro
    Entonces el sistema marca el formulario como inválido
    Y bloquea la creación del lote

  Escenario: Visualización de lotes registrados
    Dado que existen lotes registrados en el sistema
    Cuando el usuario accede a la vista de lotes
    Entonces el sistema muestra la lista de lotes disponibles
    Y cada lote presenta sus datos principales
