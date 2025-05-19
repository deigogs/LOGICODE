const preguntas = [ 
    {
      imagen: "EJD1.png",
      pregunta: "¿Cuál es la salida del siguiente código?",
      opciones: [
        "a) Correcto",
        "b) Incorrecto",
        "c) Error de compilación"
      ],
      respuesta: "a) Correcto"
    },
    {
      imagen: "EJD2.png",
      pregunta: "¿Qué valor tendrá resultado?",
      opciones: [
        "b) 16",
        "c) 15",
        "d) 20"
      ],
      respuesta: "c) 15"
    },
    {
        imagen: "EJD3.PNG",
      pregunta: "¿Cuál es el resultado de la siguiente operación lógica?",
      opciones: [
        "a) true",
        "b) false",
        "c) Error"
      ],
      respuesta: "a) true"
    },
    {
        imagen: "EJD4.PNG",
      pregunta: "¿Qué imprimirá este código?",
      opciones: [
        "a) 01234",
        "b) 012",
        "c) 123"
      ],
      respuesta: "b) 012"
    },
    {
        imagen: "EJD5.PNG",
      pregunta: "¿Qué imprime este fragmento?",
      opciones: [
        "a) 123",
        "b) 012",
        "c) 134"
      ],
      respuesta: "a) 123"
    },
    {
        imagen: "EJD6.PNG",
      pregunta: "¿Cuál es el resultado final de total?",
      opciones: [
        "a) 9",
        "b) 10",
        "d) 12"
      ],
      respuesta: "a) 9"
    },
    {
      imagen: "EJD7.PNG",
      pregunta: "¿Qué muestra este código?",
      opciones: [
        "a) 1248",
        "b) 1234",
        "d) 248"
      ],
      respuesta: "a) 1248"
    },
    {
        imagen: "EJD8.PNG",
      pregunta: "¿Cuál es el resultado del siguiente fragmento?",
      opciones: [
        "a) Verdadero",
        "b) Falso",
        "c) Error"
      ],
      respuesta: "b) Falso"
    },
    {
      imagen: "EJD9.PNG",
      pregunta: "¿Qué imprime el siguiente código?",
      opciones: [
        "a) Par",
        "c) Ninguno",
        "d) 5"
      ],
      respuesta: "c) Ninguno"
    },
    {
        imagen: "EJD10.PNG",
      pregunta: "¿Cuál es la salida de este código?",
      opciones: [
        "a) Imprime un triángulo rectángulo invertido",
        "b) Imprime una línea de asteriscos",
        "c) Error de sintaxis"
      ],
      respuesta: "a) Imprime un triángulo rectángulo invertido"
    }
];

let progreso = 0;
let ultimaCasilla = null;
const totalPreguntas = 10;
let respuestasCorrectas = 0;

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
    { numero: 10, col: 6, row: 1 }
  ];

  const cont = document.getElementById("devin");
  cont.innerHTML = "";

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

  // Mostrar imagen arriba de la pregunta
  const imgCont = document.getElementById("imagen-pregunta");
  if (p.imagen) {
    imgCont.innerHTML = `<img src="${p.imagen}" alt="Imagen pregunta ${i + 1}" width="100%">`;
  } else {
    imgCont.innerHTML = "";
  }

  // Mostrar texto de la pregunta y código si lo hay
  let preguntaTexto = p.pregunta;
  if (p.codigo) {
    preguntaTexto += `\n\n${p.codigo}`;
  }
  document.getElementById("pregunta-text").textContent = preguntaTexto;

  // Mostrar opciones
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
    respuestasCorrectas++;
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

document.addEventListener("DOMContentLoaded", function () {
  crearCasillas();
});
