const { validarDescripcion } = require('../js/formulario_novedades');

describe('Validaciones de formulario_novedades', () => {
    let descripcion_input;

    beforeEach(() => {
        descripcion_input = document.getElementById('descripcion');

        descripcion_input.value = '';
        descripcion_input.classList.remove('is-invalid', 'is-valid');
        descripcion_input.nextElementSibling.innerHTML = '';
    });

    describe('validarDescripcion', () => {
        test('debería validar descripciones correctas', () => {
            const descripcionesValidas = ['Novedad 1', 'Novedad 2', 'Novedad 3'];
            descripcionesValidas.forEach(desc => {
                descripcion_input.value = desc;
                expect(validarDescripcion()).toBe(true);
                expect(descripcion_input.classList.contains('is-valid')).toBe(true);
                expect(descripcion_input.classList.contains('is-invalid')).toBe(false);
                expect(descripcion_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar descripciones inválidas', () => {
            const descripcionesInvalidas = ['Novedad 4!', 'Novedad 5?', 'Novedad 6.', 'Novedad 7,', 'Novedad 8;', 'Novedad 9:', 'Novedad 10+', 'Novedad 11=', 'Novedad 12*', 'Novedad 13&', 'Novedad 14%', 'Novedad 15$', 'Novedad 16#', 'Novedad 17@', 'Novedad 18!', 'Novedad 19?', 'Novedad 20.', 'Novedad 21,', 'Novedad 22;', 'Novedad 23:', 'Novedad 24+', 'Novedad 25=', 'Novedad 26*', 'Novedad 27&', 'Novedad 28%', 'Novedad 29$', 'Novedad 30#'];
            descripcionesInvalidas.forEach(desc => {
                descripcion_input.value = desc;
                expect(validarDescripcion()).toBe(false);
                expect(descripcion_input.classList.contains('is-invalid')).toBe(true);
                expect(descripcion_input.classList.contains('is-valid')).toBe(false);
                expect(descripcion_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa una descripción válida (letras, números y espacios).');
            });
        });
    });
});