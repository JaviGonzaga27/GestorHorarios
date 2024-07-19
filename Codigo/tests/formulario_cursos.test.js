const { validarNRC } = require('../js/formulario_cursos');

describe('Validaciones de formulario_cursos', () => {
    let nrc_input;

    beforeEach(() => {
        nrc_input = document.getElementById('nrc');
        nrc_input.value = '';
        nrc_input.classList.remove('is-invalid', 'is-valid');
        nrc_input.nextElementSibling.innerHTML = '';
    });

    describe('validarNRC', () => {
        test('debería validar NRCs correctos', () => {
            const nrcsValidos = ['1234', '56789', '9999999'];
            nrcsValidos.forEach(nrc => {
                nrc_input.value = nrc;
                expect(validarNRC()).toBe(true);
                expect(nrc_input.classList.contains('is-valid')).toBe(true);
                expect(nrc_input.classList.contains('is-invalid')).toBe(false);
                expect(nrc_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar NRCs inválidos', () => {
            const nrcsInvalidos = ['12345+', '123456789', 'abc', '-5', '1.5', '', '10000000'];
            nrcsInvalidos.forEach(nrc => {
                nrc_input.value = nrc;
                expect(validarNRC()).toBe(false);
                expect(nrc_input.classList.contains('is-invalid')).toBe(true);
                expect(nrc_input.classList.contains('is-valid')).toBe(false);
                expect(nrc_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un NRC válido (entre 1 y 7 dígitos).');
            });
        });
    });
});