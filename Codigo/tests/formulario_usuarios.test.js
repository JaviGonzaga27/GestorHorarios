const { validarID_usuario, validarNombre, validarApellido, validarUsuario, validarClave } = require('../js/formulario_usuarios.js');

describe('Validaciones de formulario_usuarios', () => {
    let id_usuario_input, nombre_input, apellido_input, usuario_input, clave_input;

    beforeEach(() => {
        id_usuario_input = document.getElementById('cod_usuario');
        nombre_input = document.getElementById('nombre');
        apellido_input = document.getElementById('apellido');
        usuario_input = document.getElementById('usuario');
        clave_input = document.getElementById('clave');

        [id_usuario_input, nombre_input, apellido_input, usuario_input, clave_input].forEach(input => {
            input.value = '';
            input.classList.remove('is-invalid', 'is-valid');
            input.nextElementSibling.innerHTML = '';
        });
    });

    describe('ValidarID_usuario', () => {
        test('debería validar ID de usuario correcto', () => {
            const idsValidos = ['L12345678', 'L00000058', 'L00001523'];
            idsValidos.forEach(id => {
                id_usuario_input.value = id;
                expect(validarID_usuario()).toBe(true);
                expect(id_usuario_input.classList.contains('is-valid')).toBe(true);
                expect(id_usuario_input.classList.contains('is-invalid')).toBe(false);
                expect(id_usuario_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar ID de usuario incorrecto', () => {
            const idsInvalidos = ['12345678', 'L000000', 'L0000000', 'L000000000', 'L0000000a', 'L0000000!', 'L0000000?', 'L0000000.', 'L0000000,', 'L0000000;', 'L0000000:', 'L0000000+', 'L0000000=', 'L0000000*', 'L0000000&', 'L0000000%', 'L0000000$', 'L0000000#', 'L0000000@', ''];
            idsInvalidos.forEach(id => {
                id_usuario_input.value = id;
                expect(validarID_usuario()).toBe(false);
                expect(id_usuario_input.classList.contains('is-invalid')).toBe(true);
                expect(id_usuario_input.classList.contains('is-valid')).toBe(false);
                expect(id_usuario_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un ID válido con formato L00000000.');
            });
        });
    });

    describe('ValidarNombre', () => {
        test('debería validar nombre correcto', () => {
            const nombresValidos = ['Juan', 'Pedro', 'María'];
            nombresValidos.forEach(nombre => {
                nombre_input.value = nombre;
                expect(validarNombre()).toBe(true);
                expect(nombre_input.classList.contains('is-valid')).toBe(true);
                expect(nombre_input.classList.contains('is-invalid')).toBe(false);
                expect(nombre_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar nombre incorrecto', () => {
            const nombresInvalidos = ['Juan1', 'Pedro2', 'María3', 'Juan@', 'Pedro#', 'María$', 'Juan%', 'Pedro&', 'María*', 'Juan(', 'Pedro)', 'María=', 'Juan+', 'Pedro;', 'María:', 'Juan.', 'Pedro,', 'María?', 'Juan!', 'Pedro-', 'María_', ''];
            nombresInvalidos.forEach(nombre => {
                nombre_input.value = nombre;
                expect(validarNombre()).toBe(false);
                expect(nombre_input.classList.contains('is-invalid')).toBe(true);
                expect(nombre_input.classList.contains('is-valid')).toBe(false);
                expect(nombre_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un nombre válido (solo letras).');
            });
        });
    });

    describe('ValidarApellido', () => {
        test('debería validar apellido correcto', () => {
            const apellidosValidos = ['Pérez', 'Gómez', 'López'];
            apellidosValidos.forEach(apellido => {
                apellido_input.value = apellido;
                expect(validarApellido()).toBe(true);
                expect(apellido_input.classList.contains('is-valid')).toBe(true);
                expect(apellido_input.classList.contains('is-invalid')).toBe(false);
                expect(apellido_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar apellido incorrecto', () => {
            const apellidosInvalidos = ['Pérez1', 'Gómez2', 'López3', 'Pérez@', 'Gómez#', 'López$', 'Pérez%', 'Gómez&', 'López*', 'Pérez(', 'Gómez)', 'López=', 'Pérez+', 'Gómez;', 'López:', 'Pérez.', 'Gómez,', 'López?', 'Pérez!', 'Gómez-', 'López_', ''];
            apellidosInvalidos.forEach(apellido => {
                apellido_input.value = apellido;
                expect(validarApellido()).toBe(false);
                expect(apellido_input.classList.contains('is-invalid')).toBe(true);
                expect(apellido_input.classList.contains('is-valid')).toBe(false);
                expect(apellido_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un apellido válido (solo letras).');
            });
        });
    });

    describe('ValidarUsuario', () => {
        test('debería validar usuario correcto', () => {
            const usuariosValidos = ['juan123', 'pedro456', 'maria789'];
            usuariosValidos.forEach(usuario => {
                usuario_input.value = usuario;
                expect(validarUsuario()).toBe(true);
                expect(usuario_input.classList.contains('is-valid')).toBe(true);
                expect(usuario_input.classList.contains('is-invalid')).toBe(false);
                expect(usuario_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar usuario incorrecto', () => {
            const usuariosInvalidos = ['ju', 'pe', 'm89.', 'j3@', 'p6#', 'mar'];
            usuariosInvalidos.forEach(usuario => {
                usuario_input.value = usuario;
                expect(validarUsuario()).toBe(false);
                expect(usuario_input.classList.contains('is-invalid')).toBe(true);
                expect(usuario_input.classList.contains('is-valid')).toBe(false);
                expect(usuario_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un usuario válido (mínimo 4 caracteres).');
            });
        });
    });

    describe('ValidarClave', () => {
        test('debería validar clave correcta', () => {
            const clavesValidas = ['Clave123', 'Password456', 'contRaseña789'];
            clavesValidas.forEach(clave => {
                clave_input.value = clave;
                expect(validarClave()).toBe(true);
                expect(clave_input.classList.contains('is-valid')).toBe(true);
                expect(clave_input.classList.contains('is-invalid')).toBe(false);
                expect(clave_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar contraseña sin número', () => {
            clave.value = 'AbcdEfgh';
            expect(validarClave()).toBe(false);
            expect(clave.classList.contains('is-invalid')).toBe(true);
            expect(clave.nextElementSibling.innerHTML).toContain('La contraseña debe contener al menos un número.');
        });
    
        test('debería rechazar contraseña sin mayúscula', () => {
            clave.value = 'abcd1234';
            expect(validarClave()).toBe(false);
            expect(clave.classList.contains('is-invalid')).toBe(true);
            expect(clave.nextElementSibling.innerHTML).toContain('Debe contener al menos una letra mayúscula.');
        });
    
        test('debería rechazar contraseña sin minúscula', () => {
            clave.value = 'ABCD1234';
            expect(validarClave()).toBe(false);
            expect(clave.classList.contains('is-invalid')).toBe(true);
            expect(clave.nextElementSibling.innerHTML).toContain('Debe contener al menos una letra minúscula.');
        });
    
        test('debería rechazar contraseña corta', () => {
            clave.value = 'Ab1';
            expect(validarClave()).toBe(false);
            expect(clave.classList.contains('is-invalid')).toBe(true);
            expect(clave.nextElementSibling.innerHTML).toContain('Debe contener al menos 8 caracteres.');
        });
    
        test('debería aceptar contraseña válida', () => {
            clave.value = 'AbcdEfg1';
            expect(validarClave()).toBe(true);
            expect(clave.classList.contains('is-valid')).toBe(true);
            expect(clave.classList.contains('is-invalid')).toBe(false);
            expect(clave.nextElementSibling.innerHTML).toBe('');
        });
    
        test('debería mostrar múltiples errores', () => {
            clave.value = 'abc';
            expect(validarClave()).toBe(false);
            expect(clave.classList.contains('is-invalid')).toBe(true);
            expect(clave.nextElementSibling.innerHTML).toContain('La contraseña debe contener al menos un número.');
            expect(clave.nextElementSibling.innerHTML).toContain('Debe contener al menos una letra mayúscula.');
            expect(clave.nextElementSibling.innerHTML).toContain('Debe contener al menos 8 caracteres.');
        });
    });
});
