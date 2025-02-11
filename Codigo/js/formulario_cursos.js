var formulario = document.getElementById('agregar_curso');

var nrc_input = document.getElementById('nrc');

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Siempre prevenir el envío por defecto

    if (validarNRC()) {
        formulario.submit(); // Enviar el formulario si todo es válido
    } else {
        formulario.classList.add('was-validated');
    }
});

function validarNRC() {
    var nrc = nrc_input.value;
    var regexNRC = /^\d{1,7}$/; // De 1 a 5 dígitos

    if (!regexNRC.test(nrc)) {
        nrc_input.nextElementSibling.innerHTML = 'Por favor, ingresa un NRC válido (entre 1 y 7 dígitos).';
        nrc_input.classList.add('is-invalid');
        nrc_input.classList.remove('is-valid');
        return false;
    } else {
        nrc_input.nextElementSibling.innerHTML = '';
        nrc_input.classList.remove('is-invalid');
        nrc_input.classList.add('is-valid');
        return true;
    }
}

nrc_input.addEventListener('input', validarNRC);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validarNRC
    };
}