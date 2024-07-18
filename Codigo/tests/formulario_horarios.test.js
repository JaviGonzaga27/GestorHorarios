const { validarHora_inicio, validarHora_fin } = require('../js/formulario_horarios.js');

describe('Validaciones de formulario_horarios', () => {
    let hora_inicio_input, hora_fin_input;

    beforeEach(() => {
        hora_inicio_input = document.getElementById('hora_inicio');
        hora_fin_input = document.getElementById('hora_fin');

        [hora_inicio_input, hora_fin_input].forEach(input => {
            input.value = '';
            input.classList.remove('is-invalid', 'is-valid');
            input.nextElementSibling.innerHTML = '';
        });
    });

    describe('validarHora_inicio', () => {
        test('debería validar horas correctas', () => {
            const horasValidas = ['00:00', '12:00', '23:59'];
            horasValidas.forEach(hora => {
                hora_inicio_input.value = hora;
                expect(validarHora_inicio()).toBe(true);
                expect(hora_inicio_input.classList.contains('is-valid')).toBe(true);
                expect(hora_inicio_input.classList.contains('is-invalid')).toBe(false);
                expect(hora_inicio_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar horas inválidas', () => {
            const horasInvalidas = ['24:00', '12:60', '12:0', '25:00'];
            horasInvalidas.forEach(hora => {
                hora_inicio_input.value = hora;
                expect(validarHora_inicio()).toBe(false);
                expect(hora_inicio_input.classList.contains('is-invalid')).toBe(true);
                expect(hora_inicio_input.classList.contains('is-valid')).toBe(false);
                expect(hora_inicio_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa una hora válida con formato HH:MM.');
            });
        });
    });

    describe('validarHora_fin', () => {
        test('debería validar horas correctas', () => {
            const horasValidas = ['00:00', '12:00', '23:59'];
            horasValidas.forEach(hora => {
                hora_fin_input.value = hora;
                expect(validarHora_fin()).toBe(true);
                expect(hora_fin_input.classList.contains('is-valid')).toBe(true);
                expect(hora_fin_input.classList.contains('is-invalid')).toBe(false);
                expect(hora_fin_input.nextElementSibling.innerHTML).toBe('');
            });
        });

        test('debería rechazar horas inválidas', () => {
            const horasInvalidas = ['24:00', '12:60', '12:0', '25:00'];
            horasInvalidas.forEach(hora => {
                hora_fin_input.value = hora;
                expect(validarHora_fin()).toBe(false);
                expect(hora_fin_input.classList.contains('is-invalid')).toBe(true);
                expect(hora_fin_input.classList.contains('is-valid')).toBe(false);
                expect(hora_fin_input.nextElementSibling.innerHTML).toBe('Por favor, ingresa una hora válida con formato HH:MM.');
            });
        });
    });

    describe('validación de rango de tiempo', () => {
        test('debería validar cuando hora_inicio es anterior a hora_fin', () => {
            hora_inicio_input.value = '08:00';
            hora_fin_input.value = '17:00';
            
            expect(validarHora_inicio()).toBe(true);
            expect(validarHora_fin()).toBe(true);
            
            expect(hora_inicio_input.classList.contains('is-valid')).toBe(true);
            expect(hora_fin_input.classList.contains('is-valid')).toBe(true);
        });

        test('debería rechazar cuando hora_inicio es posterior a hora_fin', () => {
            hora_inicio_input.value = '17:00';
            hora_fin_input.value = '08:00';
            
            expect(validarHora_inicio()).toBe(true);  // La hora de inicio en sí es válida
            expect(validarHora_fin()).toBe(false);  // Hora no valida
            
            expect(hora_inicio_input.classList.contains('is-valid')).toBe(true);
            expect(hora_fin_input.classList.contains('is-invalid')).toBe(true);
            expect(hora_fin_input.nextElementSibling.innerHTML).toBe('La hora de fin debe ser posterior a la hora de inicio.');
        });

        test('debería validar cuando hora_inicio es igual a hora_fin', () => {
            hora_inicio_input.value = '12:00';
            hora_fin_input.value = '12:00';
            
            expect(validarHora_inicio()).toBe(true);
            expect(validarHora_fin()).toBe(true); //false
            
            expect(hora_inicio_input.classList.contains('is-valid')).toBe(true);
            expect(hora_fin_input.classList.contains('is-valid')).toBe(true);
        });
    });
});