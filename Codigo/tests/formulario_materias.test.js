const { validarCod_materia, validarNombre, validarHoras_semana } = require('../js/formulario_materias');

describe('Validaciones de formulario_materias', () => {
    let cod_materia_input, nombre_input, horas_semana_input;

    beforeEach(() => {
        cod_materia_input = document.getElementById('cod_materia');
        nombre_input = document.getElementById('nombre_materia');
        horas_semana_input = document.getElementById('horas_semana');

        [cod_materia_input, nombre_input, horas_semana_input].forEach(input => {
            input.value = '';
            input.classList.remove('is-invalid', 'is-valid');
            input.nextElementSibling.innerHTML = '';
        });
    });

    describe('validarCod_materia', () => {
        test('debería validar códigos correctos', () => {
            const codigosValidos = ['A123', 'B001', 'Z999'];
            codigosValidos.forEach(cod => {
                cod_materia_input.value = cod;
                expect(validarCod_materia()).toBe(true);
                expect(cod_materia_input.classList.contains('is-valid')).toBe(true);
                expect(cod_materia_input.classList.contains('is-invalid')).toBe(false);
                expect(cod_materia_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar códigos inválidos', () => {
            const codigosInvalidos = ['123A*', 'AB12_', '1234/', '+ABCD'];
            codigosInvalidos.forEach(cod => {
                cod_materia_input.value = cod;
                expect(validarCod_materia()).toBe(false);
                expect(cod_materia_input.classList.contains('is-invalid')).toBe(true);
                expect(cod_materia_input.classList.contains('is-valid')).toBe(false);
                expect(cod_materia_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un código válido.');
            });
        });
    });

    describe('validarNombre', () => {
        test('debería validar nombres correctos', () => {
            const nombresValidos = ['Matematicas', 'Lenguaje', 'Historia'];
            nombresValidos.forEach(nom => {
                nombre_input.value = nom;
                expect(validarNombre()).toBe(true);
                expect(nombre_input.classList.contains('is-valid')).toBe(true);
                expect(nombre_input.classList.contains('is-invalid')).toBe(false);
                expect(nombre_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar nombres inválidos', () => {
            const nombresInvalidos = ['Matemáticas1', 'Lenguaje2', 'Historia3', '1234', 'Matemáticas!', ''];
            nombresInvalidos.forEach(nom => {
                nombre_input.value = nom;
                expect(validarNombre()).toBe(false);
                expect(nombre_input.classList.contains('is-invalid')).toBe(true);
                expect(nombre_input.classList.contains('is-valid')).toBe(false);
                expect(nombre_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un nombre válido (solo letras).');
            });
        });
    });

    describe('validarHoras_semana', () => {
        test('debería validar horas correctas', () => {
            const horasValidas = ['1', '10', '5'];
            horasValidas.forEach(horas => {
                horas_semana_input.value = horas;
                expect(validarHoras_semana()).toBe(true);
                expect(horas_semana_input.classList.contains('is-valid')).toBe(true);
                expect(horas_semana_input.classList.contains('is-invalid')).toBe(false);
                expect(horas_semana_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar horas inválidas', () => {
            const horasInvalidas = ['0', '11', 'abc', '-5', '1.5', '', '100'];
            horasInvalidas.forEach(horas => {
                horas_semana_input.value = horas;
                expect(validarHoras_semana()).toBe(false);
                expect(horas_semana_input.classList.contains('is-invalid')).toBe(true);
                expect(horas_semana_input.classList.contains('is-valid')).toBe(false);
                expect(horas_semana_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un número válido (entre 1 y 10).');
            });
        });
    });
});