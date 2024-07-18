const { validarTipo_perfil, validarPrivilegios } = require('../js/formulario_perfiles.js');

describe('Validaciones de formulario_perfiles', () => {
    let tipo_perfil_input, privilegios_input;

    beforeEach(() => {
        tipo_perfil_input = document.getElementById('tipo_perfil');
        privilegios_input = document.getElementById('privilegios');

        [tipo_perfil_input, privilegios_input].forEach(input => {
            input.value = '';
            input.classList.remove('is-invalid', 'is-valid');
            input.nextElementSibling.innerHTML = '';
        });
    });

    describe('validarTipo_perfil', () => {
        test('debería validar tipos de perfil correctos', () => {
            const tiposValidos = ['Administrador', 'Profesor', 'Estudiante'];
            tiposValidos.forEach(tipo => {
                tipo_perfil_input.value = tipo;
                expect(validarTipo_perfil()).toBe(true);
                expect(tipo_perfil_input.classList.contains('is-valid')).toBe(true);
                expect(tipo_perfil_input.classList.contains('is-invalid')).toBe(false);
                expect(tipo_perfil_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar tipos de perfil inválidos', () => {
            const tiposInvalidos = ['Administrador!', 'Profesor?', 'Estudiante.', 'Administrador,', 'Profesor;', 'Estudiante:', 'Administrador+', 'Profesor=', 'Estudiante*', 'Administrador&', 'Profesor%', 'Estudiante$', 'Administrador#', 'Profesor@', 'Estudiante!', 'Administrador?', 'Profesor.', 'Estudiante,', 'Administrador;', 'Profesor:', 'Estudiante+', 'Administrador=', 'Profesor*', 'Estudiante&', 'Administrador%', 'Profesor$', 'Estudiante#'];
            tiposInvalidos.forEach(tipo => {
                tipo_perfil_input.value = tipo;
                expect(validarTipo_perfil()).toBe(false);
                expect(tipo_perfil_input.classList.contains('is-invalid')).toBe(true);
                expect(tipo_perfil_input.classList.contains('is-valid')).toBe(false);
                expect(tipo_perfil_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un tipo de perfil válido (solo letras).');
            });
        });
    });

    describe('validarPrivilegios', () => {
        test('debería validar privilegios correctos', () => {
            const privilegiosValidos = ['Crear', 'Leer', 'Actualizar', 'Eliminar'];
            privilegiosValidos.forEach(priv => {
                privilegios_input.value = priv;
                expect(validarPrivilegios()).toBe(true);
                expect(privilegios_input.classList.contains('is-valid')).toBe(true);
                expect(privilegios_input.classList.contains('is-invalid')).toBe(false);
                expect(privilegios_input.nextElementSibling.innerHTML).toBe('');
            });
        });
    
        test('debería rechazar privilegios inválidos', () => {
            const privilegiosInvalidos = ['Crear!', 'Leer?', 'Actualizar.', 'Eliminar,', 'Crear;', 'Leer:', 'Actualizar+', 'Eliminar=', 'Crear*', 'Leer&', 'Actualizar%', 'Eliminar$', 'Crear#', 'Leer@', 'Actualizar!', 'Eliminar?', 'Crear.', 'Leer,', 'Actualizar;', 'Eliminar:', 'Crear+', 'Leer=', 'Actualizar*', 'Eliminar&', 'Crear%', 'Leer$', 'Actualizar#', 'Eliminar@', ''];
            privilegiosInvalidos.forEach(priv => {
                privilegios_input.value = priv;
                expect(validarPrivilegios()).toBe(false);
                expect(privilegios_input.classList.contains('is-invalid')).toBe(true);
                expect(privilegios_input.classList.contains('is-valid')).toBe(false);
                expect(privilegios_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un privilegio valido');
            });
        });
    });
});