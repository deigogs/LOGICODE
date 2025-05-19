const preguntas = [
  {
    imagen: "img/algoritmo.png",
    pregunta: "¿Qué es un algoritmo?",
    opciones: ["Una variable", "Un tipo de dato", "Una secuencia ordenada de pasos para resolver un problema"],
    respuesta: "Una secuencia ordenada de pasos para resolver un problema"
  },
  {
    imagen: "img/suma.png",
    pregunta: "¿Cuál es el valor de x = 5 + 3?",
    opciones: ["5", "3", "8"],
    respuesta: "8"
  },
  {
    imagen: "img/simbolo.png",
    pregunta: "¿Qué símbolo se usa para terminar una instrucción en C++?",
    opciones: [".", ";", ":"],
    respuesta: ";"
  },
  {
    imagen: "img/if.png",
    pregunta: "¿Qué significa una instrucción if?",
    opciones: ["Repetir siempre", "Comparar valores", "Ejecutar un bloque si se cumple una condición"],
    respuesta: "Ejecutar un bloque si se cumple una condición"
  },
  {
    imagen: "img/cout.png",
    pregunta: "¿Qué imprime: cout << “2 + 2”;?",
    opciones: ["4", "2 + 2", "Error"],
    respuesta: "2 + 2"
  },
  {
    imagen: "img/string.png",
    pregunta: "¿Qué tipo de dato almacena texto?",
    opciones: ["int", "string", "bool"],
    respuesta: "string"
  },
  {
    imagen: "img/html.png",
    pregunta: "¿Cuál de estos NO es un lenguaje de programación?",
    opciones: ["HTML", "Java", "Python"],
    respuesta: "HTML"
  },
  {
    imagen: "img/while.png",
    pregunta: "¿Qué hace un bucle while?",
    opciones: ["Ejecuta si es verdadero", "Solo una vez", "Detiene el programa"],
    respuesta: "Ejecuta si es verdadero"
  },
  {
    imagen: "img/igual.png",
    pregunta: "¿Diferencia entre = y ==?",
    opciones: ["No hay diferencia", "= es comparación, == es asignación", "= es asignación, == es comparación"],
    respuesta: "= es asignación, == es comparación"
  },
  {
    imagen: "img/mayor.png",
    pregunta: "Si x = 4 e y = 2, ¿qué devuelve x > y?",
    opciones: ["false", "true", "2"],
    respuesta: "true"
  }
];

let progreso = 0;
let ultimaCasilla = null;

const totalPreguntas = 10; // Número total de preguntas
let respuestasCorrectas = 0; // Respuestas correctas


function crearCasillas() {
  const posiciones = [
    { numero: 1, col: 1, row: 1 },
    { numero: 2, col: 1, row: 2 },
    { numero: 3, col: 1, row: 3 },
    { numero: 4, col: 2, row: 3 },
    { numero: 5, col: 3, row: 3 },
    { numero: 6, col: 3, row: 2 },
    { numero: 7, col: 3, row: 1 },
    { numero: 8, col: 4, row: 1 },
    { numero: 9, col: 5, row: 1 },
    { numero: 10, col: 6, row: 1 },
  ];

  const cont = document.getElementById("devin");
  cont.innerHTML = ""; // Limpiar las casillas previas

  posiciones.forEach((pos, i) => {
    const cas = document.createElement("div");
    cas.classList.add("casilla");
    cas.textContent = pos.numero;
    cas.dataset.index = i;
    cas.style.gridColumn = pos.col;
    cas.style.gridRow = pos.row;
    cas.style.pointerEvents = i === 0 ? "auto" : "none";
    cas.addEventListener("click", () => mostrarPregunta(i, cas));
    cont.appendChild(cas);
  });
}

function mostrarPregunta(i, casilla) {
  ultimaCasilla = casilla;
  const p = preguntas[i];

  // Comentar la parte de la imagen por ahora
  // const imgCont = document.getElementById("imagen-pregunta");
  // imgCont.innerHTML = `<img src="${p.imagen}" alt="Imagen pregunta ${i+1}" width="100%">`;

  document.getElementById("pregunta-text").textContent = p.pregunta;

  const opcCont = document.getElementById("opciones-container");
  opcCont.innerHTML = "";
  document.getElementById("mensaje-respuesta").textContent = "";

  p.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.addEventListener("click", () => verificarRespuesta(op, p.respuesta));
    opcCont.appendChild(btn);
  });

  document.getElementById("btn-continuar").classList.add("hidden");
}


function verificarRespuesta(seleccion, correcta) {
  const msg = document.getElementById("mensaje-respuesta");
  const btnCont = document.getElementById("btn-continuar");

  if (seleccion === correcta) {
    msg.textContent = "¡Correcto!";
    msg.style.color = "lightgreen";
    ultimaCasilla.classList.add("correcta");
    respuestasCorrectas++; // Aumentar el contador de respuestas correctas
    btnCont.classList.remove("hidden");
  } else {
    msg.textContent = "Incorrecto. Intenta de nuevo.";
    msg.style.color = "red";
  }
}

document.getElementById("btn-continuar").addEventListener("click", () => {
  progreso++;
  if (progreso < preguntas.length) {
    const siguiente = document.querySelector(`.casilla[data-index="${progreso}"]`);
    if (siguiente) {
      siguiente.style.pointerEvents = "auto";
      mostrarPregunta(progreso, siguiente);
    }
  } else {
    document.getElementById("pregunta-text").textContent = "¡Has terminado!";
    document.getElementById("imagen-pregunta").innerHTML = "";
    document.getElementById("opciones-container").innerHTML = "";
  }
  document.getElementById("btn-continuar").classList.add("hidden");
});

document.getElementById("btn-siguiente").addEventListener("click", function () {
  const mensajeAviso = document.getElementById("mensaje-aviso");

  // Verificar si todas las respuestas han sido correctas
  if (respuestasCorrectas === totalPreguntas) {
    window.location.href = "medium.html"; // Avanzar al siguiente nivel
  } else {
    mensajeAviso.textContent = "Debes completar todas las preguntas correctamente para avanzar al siguiente nivel.";
    mensajeAviso.style.display = "block";

    setTimeout(() => {
      mensajeAviso.style.display = "none";
    }, 3000);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  crearCasillas(); // Crear las casillas al cargar la página
});
