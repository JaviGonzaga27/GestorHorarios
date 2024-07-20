const { validarNombrePeriodo, validarFechaInicio, validarFechaFin } = require('../js/formulario_periodos.js');

describe('Validaciones de formulario_periodos', () => {
    let nombre_periodo_input, fecha_inicio_input, fecha_fin_input;

    beforeEach(() => {
        nombre_periodo_input = document.getElementById('nombre_periodo');
        fecha_inicio_input = document.getElementById('fecha_inicio');
        fecha_fin_input = document.getElementById('fecha_fin');

        [nombre_periodo_input, fecha_inicio_input, fecha_fin_input].forEach(input => {
            input.value = '';
            input.classList.remove('is-invalid', 'is-valid');
            input.nextElementSibling.innerHTML = '';
        });
    });

    describe('validarNombrePeriodo', () => {
        test('debería validar nombres de periodo correctos', () => {
            const nombresValidos = ['Periodo 1', 'Periodo-2', 'Periodo 3'];
            nombresValidos.forEach(nombre => {
                nombre_periodo_input.value = nombre;
                expect(validarNombrePeriodo()).toBe(true);
                expect(nombre_periodo_input.classList.contains('is-valid')).toBe(true);
                expect(nombre_periodo_input.classList.contains('is-invalid')).toBe(false);
                expect(nombre_periodo_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar nombres de periodo inválidos', () => {
            const nombresInvalidos = [' ','Periodo 4!', 'Periodo 5?', 'Periodo 6.'];
            nombresInvalidos.forEach(nombre => {
                nombre_periodo_input.value = nombre;
                expect(validarNombrePeriodo()).toBe(false);
                expect(nombre_periodo_input.classList.contains('is-invalid')).toBe(true);
                expect(nombre_periodo_input.classList.contains('is-valid')).toBe(false);
                expect(nombre_periodo_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa un nombre válido (letras, números y guiones).');
            });
        });
    });

    describe('validarFechaInicio', () => {
        test('debería validar fechas de inicio correctas', () => {
            const fechasValidas = ['2021-01-01', '2021-02-01', '2021-03-01'];
            fechasValidas.forEach(fecha => {
                fecha_inicio_input.value = fecha;
                expect(validarFechaInicio()).toBe(true);
                expect(fecha_inicio_input.classList.contains('is-valid')).toBe(true);
                expect(fecha_inicio_input.classList.contains('is-invalid')).toBe(false);
                expect(fecha_inicio_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar fechas de inicio inválidas', () => {
            const fechasInvalidas = ['2021-01-32', '2021-02-30', '2021-03-32', '2021-04-31', '2021-05-32', '2021-06-31', '2021-07-32', '2021-08-32', '2021-09-31', '2021-10-32', '2021-11-31', '2021-12-32', '2021-13-01', '2021-14-01', '2021-15-01', '2021-16-01', '2021-17-01', '2021-18-01', '2021-19-01', '2021-20-01', '2021-21-01', '2021-22-01', '2021-23-01', '2021-24-01', '2021-25-01', '2021-26-01', '2021-27-01', '2021-28-01', '2021-29-01', '2021-30-01', '2021-31-01'];
            fechasInvalidas.forEach(fecha => {
                fecha_inicio_input.value = fecha;
                expect(validarFechaInicio()).toBe(false);
                expect(fecha_inicio_input.classList.contains('is-invalid')).toBe(true);
                expect(fecha_inicio_input.classList.contains('is-valid')).toBe(false);
                expect(fecha_inicio_input.nextElementSibling.innerHTML).toBe('Por favor, ingrese una fecha válida.');
            });
        });
    });

    describe('validarFechaFin', () => {
        test('debería validar fechas de fin correctas', () => {
            const fechasValidas = ['2021-01-01', '2021-02-01', '2021-03-01'];
            fechasValidas.forEach(fecha => {
                fecha_fin_input.value = fecha;
                expect(validarFechaFin()).toBe(true);
                expect(fecha_fin_input.classList.contains('is-valid')).toBe(true);
                expect(fecha_fin_input.classList.contains('is-invalid')).toBe(false);
                expect(fecha_fin_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar fechas de fin inválidas', () => {
            const fechasInvalidas = ['2021-01-32', '2021-02-29', '2021-03-32', '2021-04-31', '2021-05-32', '2021-06-31', '2021-07-32', '2021-08-32', '2021-09-31', '2021-10-32', '2021-11-31', '2021-12-32', '2021-13-01', '2021-14-01', '2021-15-01', '2021-16-01', '2021-17-01', '2021-18-01', '2021-19-01', '2021-20-01', '2021-21-01', '2021-22-01', '2021-23-01', '2021-24-01', '2021-25-01', '2021-26-01', '2021-27-01', '2021-28-01', '2021-29-01', '2021-30-01', '2021-31-01'];
            fechasInvalidas.forEach(fecha => {
                fecha_fin_input.value = fecha;
                expect(validarFechaFin()).toBe(false);
                expect(fecha_fin_input.classList.contains('is-invalid')).toBe(true);
                expect(fecha_fin_input.classList.contains('is-valid')).toBe(false);
                expect(fecha_fin_input.nextElementSibling.innerHTML).toBe('Por favor, ingrese una fecha válida');
            });
        });
    });

    describe('Validar rango de fecha', () => {
        test('debería validar cuando fecha_inicio es anterior a fecha_fin', () => {
            fecha_inicio_input.value = '2021-01-01';
            fecha_fin_input.value = '2021-01-31';
            
            expect(validarFechaInicio()).toBe(true);
            expect(validarFechaFin()).toBe(true);
        });

        test('debería rechazar cuando fecha_inicio es posterior a fecha_fin', () => {
            fecha_inicio_input.value = '2021-01-31';
            fecha_fin_input.value = '2021-01-01';
            
            expect(validarFechaInicio()).toBe(true);
            expect(validarFechaFin()).toBe(false);
        });
    });
});

