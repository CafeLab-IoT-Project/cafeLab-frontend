# US17 - Registro y Autenticacion
Característica: Registro y autenticación de usuarios
  Como usuario de CafeLab
  Quiero registrarme e iniciar sesión
  Para acceder a las funcionalidades según mi rol

  Escenario: Registro exitoso de un nuevo usuario
    Dado que un visitante se encuentra en el formulario de registro
    Cuando completa los campos obligatorios con datos válidos
    Y confirma el envío del formulario
    Entonces el sistema registra la cuenta correctamente
    Y muestra una confirmación de registro exitoso

  Escenario: Inicio de sesión exitoso con credenciales válidas
    Dado que un usuario registrado se encuentra en el formulario de inicio de sesión
    Cuando ingresa un correo electrónico válido y una contraseña válida
    Y confirma el envío del formulario
    Entonces el sistema autentica al usuario
    Y lo redirige a la pantalla principal

  Escenario: Intento fallido de inicio de sesión con credenciales inválidas
    Dado que un usuario se encuentra en el formulario de inicio de sesión
    Cuando ingresa un correo electrónico o una contraseña incorrectos
    Y confirma el envío del formulario
    Entonces el sistema rechaza la autenticación
    Y muestra un mensaje de error al usuario
