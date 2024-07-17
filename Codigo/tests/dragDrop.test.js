const { dropHandler, deleteHandler, removeHorarioDropListener, dropManager } = require('../js/dragDrop.js');

describe('Drag and Drop Functionality', () => {
    let trash, horarios, cursosContainer, selected;

    beforeEach(() => {
        document.body.innerHTML = `
        <div class="container">
            <div class="cursosSection ocultarPDF">
                <div class="tituloDia">INFO CURSO</div>
                <div id="cursosContainer"></div>
                <div id="trash">ARRASTRA AQUÍ PARA ELIMINAR HORARIO</div>
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
        `;

        trash = document.getElementById("trash");
        horarios = document.querySelectorAll('.dia');
        cursosContainer = document.getElementById('cursosContainer');
        selected = null;

        // Agregar un curso de ejemplo al cursosContainer
        const curso = document.createElement('div');
        curso.className = 'curso';
        curso.innerHTML = `
            <p>NRC: 100</p>
            <p>Materia: Programación Web</p>
            <p>Horas semanales: 6</p>
            <p>Docente: Aquiles Paredes</p>
        `;
        cursosContainer.appendChild(curso);

        global.createHorario = jest.fn((origen, destino, curso) => {
            const newCurso = document.createElement('div');
            newCurso.textContent = 'NRC: 100';
            destino.appendChild(newCurso);
        });
        global.updateHorarios = jest.fn();
        global.deleteHorario = jest.fn((horario, curso) => {
            horario.removeChild(curso);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('dropHandler', () => {
        test('debería mover un curso a un horario vacío', () => {
            selected = cursosContainer.firstChild;
            const horario = document.getElementById('LUNES');
            const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

            dropHandler.call(horario, event);

            expect(createHorario).toHaveBeenCalledWith(cursosContainer, horario, selected);
            expect(horario.textContent).toBe('NRC: 100');
        });

        test('debería intercambiar cursos entre horarios', () => {
            const horarioLunes = document.getElementById('LUNES');
            const horarioMartes = document.getElementById('MARTES');
            createHorario(null, horarioLunes, cursosContainer.firstChild);
            const cursoB = document.createElement('div');
            cursoB.textContent = 'NRC: 101';
            horarioMartes.appendChild(cursoB);

            selected = horarioLunes.firstChild;
            const event = { preventDefault: jest.fn(), stopPropagation: jest.fn() };

            dropHandler.call(horarioMartes, event);

            expect(updateHorarios).toHaveBeenCalledWith(horarioLunes, horarioMartes, horarioLunes.firstChild, cursoB);
        });
    });

    describe('deleteHandler', () => {
        test('debería eliminar un curso de un horario', () => {
            const horario = document.getElementById('LUNES');
            createHorario(null, horario, cursosContainer.firstChild);
            selected = horario.firstChild;

            const event = { preventDefault: jest.fn() };

            deleteHandler(event);

            expect(deleteHorario).toHaveBeenCalledWith(horario, selected);
            expect(horario.childElementCount).toBe(0);
            expect(cursosContainer.childElementCount).toBe(1);
        });
    });

    describe('dropManager', () => {
        test('debería configurar event listeners para el curso', () => {
            const curso = cursosContainer.firstChild;
            const addEventListenerSpy = jest.spyOn(curso, 'addEventListener');

            dropManager(curso);

            expect(curso.getAttribute('draggable')).toBe('true');
            expect(addEventListenerSpy).toHaveBeenCalledWith('dragstart', expect.any(Function));
        });

        test('debería configurar event listeners para horarios y trash al iniciar el arrastre', () => {
            const curso = cursosContainer.firstChild;
            dropManager(curso);

            const dragStartEvent = new DragEvent('dragstart', {
                bubbles: true,
                cancelable: true,
                dataTransfer: new DataTransfer()
            });
            curso.dispatchEvent(dragStartEvent);

            horarios.forEach(horario => {
                expect(horario.ondragover).toBeDefined();
                expect(horario.ondrop).toBeDefined();
            });

            expect(trash.ondragover).toBeDefined();
            expect(trash.ondrop).toBeDefined();
        });
    });

    describe('removeHorarioDropListener', () => {
        test('debería remover el event listener de drop del elemento trash', () => {
            const removeEventListenerSpy = jest.spyOn(trash, 'removeEventListener');
            trash.addEventListener('drop', deleteHandler);
            
            removeHorarioDropListener();
            
            expect(removeEventListenerSpy).toHaveBeenCalledWith('drop', deleteHandler);
            
            removeEventListenerSpy.mockRestore();
        });
    });
});