var formulario_carrera = document.getElementById('agregar_carrera');

//Declaracion de variables input
var nombre_carrera_input = document.getElementById('nombre_carrera');

formulario_carrera.addEventListener('submit', function(e) {
    e.preventDefault(); // Siempre prevenir el envío por defecto
    
    if(validarNombreCarrera()) {
        formulario_carrera.submit(); // Enviar el formulario si todo es válido
    } else {
        formulario_carrera.classList.add('was-validated');
    }
});

function validarNombreCarrera() {
    var nombre = nombre_carrera_input.value.trim();
    var regexNombreCarrera = /^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/;

    if (nombre.length === 0) {
        setInvalid('El nombre de la carrera no puede estar vacío.');
        return false;
    }

    if (!regexNombreCarrera.test(nombre)) {
        setInvalid('Por favor, ingresa un nombre válido (solo letras).');
        return false;
    }

    if (nombre.length < 2 || nombre.length > 100) {
        setInvalid('El nombre de la carrera debe tener entre 2 y 100 caracteres.');
        return false;
    }

    setValid();
    return true;

    function setInvalid(message) {
        nombre_carrera_input.nextElementSibling.innerHTML = message;
        nombre_carrera_input.classList.add('is-invalid');
        nombre_carrera_input.classList.remove('is-valid');
    }

    function setValid() {
        nombre_carrera_input.nextElementSibling.innerHTML = '';
        nombre_carrera_input.classList.remove('is-invalid');
        nombre_carrera_input.classList.add('is-valid');
    }
}

nombre_carrera_input.addEventListener('input', validarNombreCarrera);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validarNombreCarrera
    };
}