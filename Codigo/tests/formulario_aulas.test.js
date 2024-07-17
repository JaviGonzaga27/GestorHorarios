const { validarcod_aula, validarCapacidad, validarBloque } = require('../js/formulario_aulas.js');

describe('Validaciones de formulario', () => {
    let cod_aula_input, capacidad_input, bloque_input;

    beforeEach(() => {
        cod_aula_input = document.getElementById('cod_aula');
        capacidad_input = document.getElementById('capacidad');
        bloque_input = document.getElementById('bloque');

        [cod_aula_input, capacidad_input, bloque_input].forEach(input => {
            input.value = '';
            input.classList.remove('is-invalid', 'is-valid');
            input.nextElementSibling.innerHTML = '';
        });
    });

    describe('validarcod_aula', () => {
        test('debería validar códigos correctos', () => {
            const codigosValidos = ['A123', 'B001', 'Z999'];
            codigosValidos.forEach(cod => {
                cod_aula_input.value = cod;
                expect(validarcod_aula()).toBe(true);
                expect(cod_aula_input.classList.contains('is-valid')).toBe(true);
                expect(cod_aula_input.classList.contains('is-invalid')).toBe(false);
                expect(cod_aula_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar códigos inválidos', () => {
            const codigosInvalidos = ['123A', 'AB12', '1234', 'ABCD', 'A12', 'A1234'];
            codigosInvalidos.forEach(cod => {
                cod_aula_input.value = cod;
                expect(validarcod_aula()).toBe(false);
                expect(cod_aula_input.classList.contains('is-invalid')).toBe(true);
                expect(cod_aula_input.classList.contains('is-valid')).toBe(false);
                expect(cod_aula_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un ID válido con formato L000.');
            });
        });
    });

    describe('validarCapacidad', () => {
        test('debería validar capacidades correctas', () => {
            const capacidadesValidas = ['1', '10', '40'];
            capacidadesValidas.forEach(cap => {
                capacidad_input.value = cap;
                expect(validarCapacidad()).toBe(true);
                expect(capacidad_input.classList.contains('is-valid')).toBe(true);
                expect(capacidad_input.classList.contains('is-invalid')).toBe(false);
                expect(capacidad_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar capacidades inválidas', () => {
            const capacidadesInvalidas = ['0', '41', 'abc', '-5', '1.5', '', '100'];
            capacidadesInvalidas.forEach(cap => {
                capacidad_input.value = cap;
                expect(validarCapacidad()).toBe(false);
                expect(capacidad_input.classList.contains('is-invalid')).toBe(true);
                expect(capacidad_input.classList.contains('is-valid')).toBe(false);
                expect(capacidad_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa una capacidad válida (entre 1 y 40).');
            });
        });
    });

    describe('validarBloque', () => {
        test('debería validar bloques correctos', () => {
            const bloquesValidos = ['A', 'B', 'Z', 'a', 'z'];
            bloquesValidos.forEach(blo => {
                bloque_input.value = blo;
                expect(validarBloque()).toBe(true);
                expect(bloque_input.classList.contains('is-valid')).toBe(true);
                expect(bloque_input.classList.contains('is-invalid')).toBe(false);
                expect(bloque_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar bloques inválidos', () => {
            const bloquesInvalidos = ['1', 'AA', '123', '', ' ', '!'];
            bloquesInvalidos.forEach(blo => {
                bloque_input.value = blo;
                expect(validarBloque()).toBe(false);
                expect(bloque_input.classList.contains('is-invalid')).toBe(true);
                expect(bloque_input.classList.contains('is-valid')).toBe(false);
                expect(bloque_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un bloque válido (solo una letra).');
            });
        });
    });
});