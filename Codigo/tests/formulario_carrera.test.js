const { validarNombreCarrera } = require('../js/formulario_carrera.js');

describe('Validaciones de formulario_carrera', () => {
    let nombre_carrera_input;

    beforeEach(() => {
        nombre_carrera_input = document.getElementById('nombre_carrera');
        
        nombre_carrera_input.value = '';
        nombre_carrera_input.classList.remove('is-invalid', 'is-valid');
        nombre_carrera_input.nextElementSibling.innerHTML = '';
    });

    describe('validarNombreCarrera', () => {
        test('debería validar nombres correctos', () => {
            const nombresValidos = ['Ingeniería en Sistemas', 'Licenciatura en Matemáticas', 'Ingeniería en Electrónica'];
            nombresValidos.forEach(nombre => {
                nombre_carrera_input.value = nombre;
                expect(validarNombreCarrera()).toBe(true);
                expect(nombre_carrera_input.classList.contains('is-valid')).toBe(true);
                expect(nombre_carrera_input.classList.contains('is-invalid')).toBe(false);
                expect(nombre_carrera_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar nombres inválidos', () => {
            const nombresInvalidos = ['Ingeniería en Sistemas 123', 'Licenciatura en Matemáticas 123', 'Ingeniería en Electrónica 123', 'Ingeniería en Sistemas!', 'Licenciatura en Matemáticas!', 'Ingeniería en Electrónica!', 'Ingeniería en Sistemas.', 'Licenciatura en Matemáticas.', 'Ingeniería en Electrónica.', '123', 'Ingeniería en Sistemas 123', 'Licenciatura en Matemáticas 123', 'Ingeniería en Electrónica 123', 'Ingeniería en Sistemas!', 'Licenciatura en Matemáticas!', 'Ingeniería en Electrónica!', 'Ingeniería en Sistemas.', 'Licenciatura en Matemáticas.', 'Ingeniería en Electrónica.'];
            nombresInvalidos.forEach(nombre => {
                nombre_carrera_input.value = nombre;
                expect(validarNombreCarrera()).toBe(false);
                expect(nombre_carrera_input.classList.contains('is-invalid')).toBe(true);
                expect(nombre_carrera_input.classList.contains('is-valid')).toBe(false);
                expect(nombre_carrera_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un nombre válido (solo letras).');
            });
        });
    });
});