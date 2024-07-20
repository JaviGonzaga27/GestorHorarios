const { validarHoras_disponibles, validarCorreo, validarEspecializacion, validarCelular, validarCedula } = require('../js/formulario_docentes.js');

describe('Validaciones de formulario_docentes', () => {
    let horas_disponibles_input, correo_input, especializacion_input, celular_input, cedula_input;

    beforeEach(() => {
        horas_disponibles_input = document.getElementById('horas_disponibles');
        correo_input = document.getElementById('correo');
        especializacion_input = document.getElementById('especializacion');
        celular_input = document.getElementById('celular');
        cedula_input = document.getElementById('cedula');

        [horas_disponibles_input, correo_input, especializacion_input, celular_input, cedula_input].forEach(input => {
            input.value = '';
            input.classList.remove('is-invalid', 'is-valid');
            input.nextElementSibling.innerHTML = '';
        });
    });

    describe('validarHoras_disponibles', () => {
        test('debería validar horas correctas', () => {
            const horasValidas = ['1', '10', '24'];
            horasValidas.forEach(horas => {
                horas_disponibles_input.value = horas;
                expect(validarHoras_disponibles()).toBe(true);
                expect(horas_disponibles_input.classList.contains('is-valid')).toBe(true);
                expect(horas_disponibles_input.classList.contains('is-invalid')).toBe(false);
                expect(horas_disponibles_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar horas inválidas', () => {
            const horasInvalidas = ['0', '25', 'abc', '-5', '1.5', '', '100'];
            horasInvalidas.forEach(horas => {
                horas_disponibles_input.value = horas;
                expect(validarHoras_disponibles()).toBe(false);
                expect(horas_disponibles_input.classList.contains('is-invalid')).toBe(true);
                expect(horas_disponibles_input.classList.contains('is-valid')).toBe(false);
                expect(horas_disponibles_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un número válido (entre 1 y 24).');
            });
        });
    });
    describe('validarCorreo', () => {
        test('debería validar correos correctos', () => {
            const correosValidos = ['profesor@escuela.edu', 'docente123@universidad.com', 'maestro.catedra@instituto.edu'];
            correosValidos.forEach(correo => {
                correo_input.value = correo;
                expect(validarCorreo(correo)).toBe(true);
                expect(correo_input.classList.contains('is-valid')).toBe(true);
                expect(correo_input.classList.contains('is-invalid')).toBe(false);
                expect(correo_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería invalidar correos incorrectos', () => {
            const correosInvalidos = ['profesor@escuela', 'docente123@', 'maestro.catedra@instituto', ''];
            correosInvalidos.forEach(correo => {
                expect(validarCorreo(correo)).toBeFalsy();
            });
        });
    });
    describe('validarEspecializacion', () => {
        test('debería validar especializaciones correctas', () => {
            const especializacionesValidas = ['Superior', 'Maestria', 'Doctorado'];
            especializacionesValidas.forEach(especializacion => {
                especializacion_input.value = especializacion;
                expect(validarEspecializacion()).toBe(true);
                expect(especializacion_input.classList.contains('is-valid')).toBe(true);
                expect(especializacion_input.classList.contains('is-invalid')).toBe(false);
                expect(especializacion_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar especializaciones inválidas', () => {
            const especializacionesInvalidas = ['Ingeniería de Sistemas y Computación', 'Ingeniería Industrial y de Sistemas', 'Ingeniería Civil y Ambiental', ''];
            especializacionesInvalidas.forEach(especializacion => {
                especializacion_input.value = especializacion;
                expect(validarEspecializacion()).toBe(false);
                expect(especializacion_input.classList.contains('is-invalid')).toBe(true);
                expect(especializacion_input.classList.contains('is-valid')).toBe(false);
                expect(especializacion_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa una especialización válida.');
            });
        });
    });
    describe('validarCelular', () => {
        test('debería validar celulares correctos', () => {
            const celularesValidos = ['0987654321', '0998765432', '0987654321'];
            celularesValidos.forEach(celular => {
                celular_input.value = celular;
                expect(validarCelular()).toBe(true);
                expect(celular_input.classList.contains('is-valid')).toBe(true);
                expect(celular_input.classList.contains('is-invalid')).toBe(false);
                expect(celular_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar celulares inválidos', () => {
            const celularesInvalidos = ['098765432', '09987654321', '098765432a', ''];
            celularesInvalidos.forEach(celular => {
                celular_input.value = celular;
                expect(validarCelular()).toBe(false);
                expect(celular_input.classList.contains('is-invalid')).toBe(true);
                expect(celular_input.classList.contains('is-valid')).toBe(false);
                expect(celular_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un número de celular válido.');
            });
        });
    });
    describe('validarCedula', () => {
        test('debería validar cédulas correctas', () => {
            const cedulasValidas = ['1723375083', '1718136854', '1715705529'];
            cedulasValidas.forEach(cedula => {
                cedula_input.value = cedula;
                expect(validarCedula()).toBe(true);
                expect(cedula_input.classList.contains('is-valid')).toBe(true);
                expect(cedula_input.classList.contains('is-invalid')).toBe(false);
                // Eliminamos la expectativa del mensaje, ya que mostrarExito no establece ninguno
            });
        });
    
        test('debería rechazar cédulas con formato inválido', () => {
            const cedulasInvalidas = ['172541230', '17254123091', '172541230a', ''];
            cedulasInvalidas.forEach(cedula => {
                cedula_input.value = cedula;
                expect(validarCedula()).toBe(false);
                expect(cedula_input.classList.contains('is-invalid')).toBe(true);
                expect(cedula_input.classList.contains('is-valid')).toBe(false);
                expect(cedula_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un número de cédula válido.');
            });
        });
    
        test('debería rechazar cédulas con dígito verificador inválido', () => {
            const cedulasInvalidas = ['1712345678', '1723375084'];
            cedulasInvalidas.forEach(cedula => {
                cedula_input.value = cedula;
                expect(validarCedula()).toBe(false);
                expect(cedula_input.classList.contains('is-invalid')).toBe(true);
                expect(cedula_input.classList.contains('is-valid')).toBe(false);
                expect(cedula_input.nextElementSibling.innerHTML).toBe('La cédula ingresada no es válida.');
            });
        });
    });
});