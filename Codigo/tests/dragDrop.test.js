const { dropHandler, deleteHandler, dropManager } = require('../js/dragDrop.js');

// Configuración inicial
beforeEach(() => {
    // Simular el DOM
    document.body.innerHTML = `
        <section class="pt-5">
            <form class="formularios" action="">
                <label class="frmlbl" for="periodo">Periodo</label>
                <label class="frmlbl" for="aula">Aula</label>
                <label class="frmlbl" for="cursos">Curso</label>
                <select class="selector" name="periodo" id="periodo"></select>
                <select class="selector" name="aula" id="aula"></select>
                <select class="selector" name="cursos" id="cursos"></select>
            </form>
            <div class="container-fluid" id="container"></div>
            <div class="cursosSection">
                <div class="tituloDia">INFO CURSO</div>
                <div id="cursosContainer"></div>
                <div id="trash">ELIMINAR CURSO</div>
            </div>
            <div class="horarioSection">
                <div class="tituloHora">HORAS</div>
                <div class="horasCont">
                    <div class="hora">7:00 - 9:00 h</div>
                    <div class="hora">9:00 - 11:00 h</div>
                    <div class="hora">11:00 - 13:00 h</div>
                    <div class="hora">13:30 - 15:30 h</div>
                    <div class="hora">15:30 - 17:30 h</div>
                    <div class="hora">17:30 - 19:30 h</div>
                    <div class="hora">19:30 - 21:30 h</div>
                </div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">LUNES</div>
                <div class="dia" id="LUNES"></div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">MARTES</div>
                <div class="dia" id="MARTES"></div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">MIERCOLES</div>
                <div class="dia" id="MIERCOLES"></div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">JUEVES</div>
                <div class="dia" id="JUEVES"></div>
            </div>
            <div class="diasSection">
                <div class="tituloDia">VIERNES</div>
                <div class="dia" id="VIERNES"></div>
            </div>
        </div>
    </section>
`;

    // Configuración global
    global.trash = document.getElementById('trash');
    global.horarios = document.querySelectorAll('.dia');
    global.selected = null;

    // Simulación de funciones globales
    global.createHorario = jest.fn();
    global.updateHorarios = jest.fn();
    global.deleteHorario = jest.fn();
});

describe('Drag and Drop Functionality', () => {
    beforeEach(() => {
        // Reiniciar el estado antes de cada prueba
        jest.clearAllMocks();
        global.selected = null;
        document.getElementById('cursosContainer').innerHTML = '';
        document.querySelectorAll('.dia').forEach(dia => dia.innerHTML = '');
    });

    describe('dropHandler', () => {
        test('debería mover un curso a un horario vacío', () => {
            const curso = document.createElement('div');
            curso.className = 'curso';
            curso.textContent = 'Curso Test';
            document.getElementById('cursosContainer').appendChild(curso);
            global.selected = curso;

            const horario = document.getElementById('LUNES');
            const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

            dropHandler.call(horario, event);

            expect(createHorario).toHaveBeenCalledWith(expect.any(Element), horario, curso);
            expect(horario.contains(curso)).toBe(true);
        });

        test('debería intercambiar cursos entre horarios', () => {
            const cursoA = document.createElement('div');
            cursoA.className = 'curso';
            cursoA.textContent = 'Curso A';
            const horarioA = document.getElementById('LUNES');
            horarioA.appendChild(cursoA);

            const cursoB = document.createElement('div');
            cursoB.className = 'curso';
            cursoB.textContent = 'Curso B';
            const horarioB = document.getElementById('MARTES');
            horarioB.appendChild(cursoB);

            global.selected = cursoA;

            const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

            dropHandler.call(horarioB, event);

            expect(updateHorarios).toHaveBeenCalledWith(horarioA, horarioB, cursoA, cursoB);
        });
    });

    describe('deleteHandler', () => {
        test('debería eliminar un curso de un horario', () => {
            const curso = document.createElement('div');
            curso.className = 'curso';
            const horario = document.getElementById('LUNES');
            horario.appendChild(curso);
            global.selected = curso;

            const event = { preventDefault: jest.fn() };

            deleteHandler(event);

            expect(deleteHorario).toHaveBeenCalledWith(horario, curso);
            expect(horario.contains(curso)).toBe(false);
        });

        test('no debería eliminar un curso del contenedor de cursos', () => {
            const curso = document.createElement('div');
            curso.className = 'curso';
            document.getElementById('cursosContainer').appendChild(curso);
            global.selected = curso;

            const event = { preventDefault: jest.fn() };

            deleteHandler(event);

            expect(deleteHorario).not.toHaveBeenCalled();
            expect(document.getElementById('cursosContainer').contains(curso)).toBe(true);
        });
    });

    describe('dropManager', () => {
        test('debería añadir event listeners al curso', () => {
            const curso = document.createElement('div');
            curso.className = 'curso';

            const addEventListenerSpy = jest.spyOn(curso, 'addEventListener');

            dropManager(curso);

            expect(curso.getAttribute('draggable')).toBe('true');
            expect(addEventListenerSpy).toHaveBeenCalledWith('dragstart', expect.any(Function));
        });

        test('debería configurar event listeners para horarios y trash al iniciar el arrastre', () => {
            const curso = document.createElement('div');
            curso.className = 'curso';

            dropManager(curso);

            const dragStartEvent = new Event('dragstart');
            curso.dispatchEvent(dragStartEvent);

            horarios.forEach(horario => {
                expect(horario.listeners('dragover')).toBeDefined();
                expect(horario.listeners('drop')).toBeDefined();
            });

            expect(trash.listeners('dragover')).toBeDefined();
            expect(trash.listeners('drop')).toBeDefined();
        });
    });

    describe('removeHorarioDropListener', () => {
        test('debería remover el event listener de drop de los horarios', () => {
            const horario = document.getElementById('LUNES');
            const removeEventListenerSpy = jest.spyOn(horario, 'removeEventListener');

            removeHorarioDropListener();

            expect(removeEventListenerSpy).toHaveBeenCalledWith('drop', dropHandler);
        });
    });
});