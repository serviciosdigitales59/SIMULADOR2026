var pregunta = 1;
var bandera = "A";
var ultima = 0;
var respuesta = "";
var buena = 0;
var mala = 0;
var lectura = 0;
let malucas = [];
let miCheckbox;

/* =========================================
   NUEVO: ACTUALIZAR CONTADOR Y PROGRESO
========================================= */
function actualizarContadorPregunta(actual, total) {
    if (total <= 0) total = 1;
    if (actual < 1) actual = 1;
    if (actual > total) actual = total;

    const contador = document.getElementById("contadorPreguntas");
    const porcentaje = document.getElementById("porcentajePreguntas");
    const barra = document.getElementById("barraPreguntas");

    const progreso = Math.round((actual / total) * 100);

    if (contador) contador.textContent = actual + " / " + total;
    if (porcentaje) porcentaje.textContent = progreso + "%";
    if (barra) barra.style.width = progreso + "%";
}

/* =========================================
   CONTAR LÍNEAS / CALCULAR TOTAL PREGUNTAS
========================================= */
function contarLineas() {
    var textarea = document.getElementById('txtArea');
    var contenido = textarea.value;

    // Dividir el contenido del textarea en líneas
    var lineas = contenido.split('\n');

    // Eliminar líneas vacías del conteo
    var lineasNoVacias = lineas.filter(function(linea) {
        return linea.trim() !== '';
    });

    // Cada pregunta ocupa 10 líneas
    ultima = Math.floor(lineasNoVacias.length / 10);

    alert('El tema tiene ' + ultima + ' Preguntas.');

    console.log("Total preguntas:", ultima);

    // NUEVO: actualizar contador visual
    actualizarContadorPregunta(pregunta, ultima);
}

/* =========================================
   SIGUIENTE PREGUNTA
========================================= */
function siguiente() {
    pregunta = pregunta + 1;

    if (pregunta > ultima) {
        pregunta = ultima; // evita que se pase
        alert('Terminó el tema de estudio');
    } else {
        copiarLinea();
        bandera = "A";
        detenerlectura();
    }

    // NUEVO: actualizar contador
    actualizarContadorPregunta(pregunta, ultima);
}

/* =========================================
   PREGUNTA ANTERIOR
========================================= */
function atras() {
    if (pregunta == 1) {
        alert('Llegó al Inicio');
    } else {
        pregunta = pregunta - 1;
        copiarLinea();
        bandera = "A";
        detenerlectura();
    }

    // NUEVO: actualizar contador
    actualizarContadorPregunta(pregunta, ultima);
}

/* =========================================
   COPIAR PREGUNTA Y ALTERNATIVAS
========================================= */
function copiarLinea() {
    var textarea = document.getElementById('txtArea');
    var lineaDeseada = pregunta * 10;
    var contenido = textarea.value;

    // Dividir el contenido del textarea en líneas
    var lineas = contenido.split('\n');

    // Obtener líneas de la pregunta actual
    var linea1 = lineas[lineaDeseada - 10] || "";
    var linea2 = lineas[lineaDeseada - 9] || "";
    var linea3 = lineas[lineaDeseada - 8] || "";
    var linea4 = lineas[lineaDeseada - 7] || "";
    var linea5 = lineas[lineaDeseada - 6] || "";
    var linea6 = lineas[lineaDeseada - 5] || "";
    var linea7 = lineas[lineaDeseada - 4] || "";

    // Mostrar contenido
    document.getElementById('parra1').textContent = "Pregunta (" + pregunta + "): " + linea1;
    document.getElementById('parra2').textContent = linea2;
    document.getElementById('parra3').textContent = linea3;
    document.getElementById('parra4').textContent = linea4;
    document.getElementById('parra5').textContent = linea5;
    document.getElementById('parra6').textContent = linea6;
    document.getElementById('parra7').textContent = linea7;

    // Detectar respuesta correcta
    if (linea2 == linea7) {
        respuesta = "A";
    } else if (linea3 == linea7) {
        respuesta = "B";
    } else if (linea4 == linea7) {
        respuesta = "C";
    } else if (linea5 == linea7) {
        respuesta = "D";
    } else if (linea6 == linea7) {
        respuesta = "E";
    } else {
        respuesta = "Error";
    }

    document.getElementById('respuesta').textContent = respuesta;

    // Limpiar radios
    var radios = document.getElementsByName('opcion');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    // Limpiar imágenes de respuesta
    document.getElementById('imagen1').src = "";
    document.getElementById('imagen2').src = "";
    document.getElementById('imagen3').src = "";
    document.getElementById('imagen4').src = "";
    document.getElementById('imagen5').src = "";

    // NUEVO: actualizar contador al copiar
    actualizarContadorPregunta(pregunta, ultima);
}

/* =========================================
   RESPONDER
========================================= */
var responder = function(opcion) {

    var imag1 = document.getElementById('imagen1');
    var imag2 = document.getElementById('imagen2');
    var imag3 = document.getElementById('imagen3');
    var imag4 = document.getElementById('imagen4');
    var imag5 = document.getElementById('imagen5');

    var seleccionado = document.querySelector('input[name=opcion]:checked');
    if (!seleccionado) return;

    var valor = seleccionado.value;

    switch (valor) {
        case "A":
            if (respuesta == "A") {
                imag1.src = 'img/buena.png';
                buenas();
            } else {
                imag1.src = 'img/mala.png';
                malas();
            }
            break;

        case "B":
            if (respuesta == "B") {
                imag2.src = 'img/buena.png';
                buenas();
            } else {
                imag2.src = 'img/mala.png';
                malas();
            }
            break;

        case "C":
            if (respuesta == "C") {
                imag3.src = 'img/buena.png';
                buenas();
            } else {
                imag3.src = 'img/mala.png';
                malas();
            }
            break;

        case "D":
            if (respuesta == "D") {
                imag4.src = 'img/buena.png';
                buenas();
            } else {
                imag4.src = 'img/mala.png';
                malas();
            }
            break;

        case "E":
            if (respuesta == "E") {
                imag5.src = 'img/buena.png';
                buenas();
            } else {
                imag5.src = 'img/mala.png';
                malas();
            }
            break;

        default:
            break;
    }
};

/* =========================================
   SUMAR BUENAS
========================================= */
var buenas = function() {
    if (bandera == "A") {
        buena = buena + 1;
        document.getElementById("verbuenas").innerHTML = "Buenas : " + buena;
        bandera = "B";
    }
};

/* =========================================
   SUMAR MALAS
========================================= */
var malas = function() {
    if (bandera == "A") {
        malucas[mala] = pregunta;
        mala = mala + 1;
        document.getElementById("vermalas").innerHTML = "Malas : " + mala;
        document.getElementById("malucas").innerHTML = malucas;
        bandera = "B";
    }
};

/* =========================================
   AVISO AL SALIR
========================================= */
window.onbeforeunload = function(e) {
    return '¿ Quieres salir?';
};

/* =========================================
   LECTURA DE PREGUNTA Y OPCIONES
========================================= */
function leerparrafos() {
    const etiquetas = [
        "",
        "Alternativa A",
        "Alternativa B",
        "Alternativa C",
        "Alternativa D",
        "Alternativa E"
    ];

    const parrafos = document.querySelectorAll("p");
    const frases = [];

    for (let i = 0; i < 6 && i < parrafos.length; i++) {
        const texto = parrafos[i].textContent.trim();
        if (texto) {
            frases.push(etiquetas[i]);
            frases.push(texto);
        }
    }

    if (frases.length === 0) {
        alert("No hay párrafos para leer.");
        return;
    }

    let idx = 0;

    function leerSiguiente() {
        if (idx >= frases.length) return;

        let utterance = new SpeechSynthesisUtterance(frases[idx]);
        utterance.lang = "es-ES";

        utterance.onend = function() {
            idx++;
            leerSiguiente();
        };

        speechSynthesis.speak(utterance);
    }

    // Cancelar si ya hay algo hablando
    speechSynthesis.cancel();
    leerSiguiente();
}

/* =========================================
   DETENER LECTURA
========================================= */
function detenerlectura() {
    speechSynthesis.cancel();
}

/* =========================================
   CHECKBOX MODO REPASO
========================================= */
function micheck(check) {
    const parrafo = document.getElementById("respuesta");

    if (check.checked) {
        alert("El checkbox está ACTIVADO - Está en modo repaso, se mostrarán las respuestas ✅");
        parrafo.hidden = false;
    } else {
        alert("El checkbox está DESACTIVADO - Está en modo examen ❌");
        parrafo.hidden = true;
    }
}
