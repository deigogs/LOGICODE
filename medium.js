const preguntas = [
    {
      imagen: "EJ1.png",
      pregunta: "¿Qué hace el siguiente código?",
      opciones: [
        "Imprime 'Positivo' si x es mayor que 0",
        "Imprime 'Positivo' si x es igual a 0",
        "No hace nada"
      ],
      respuesta: "Imprime 'Positivo' si x es mayor que 0"
    },
    {
      imagen: "EJ2.PNG",
      pregunta: "¿Cuál es la salida del siguiente código?",
      opciones: [
        "El valor final de x será 0",
        "El valor final de x será 5",
        "El valor final de x será 1"
      ],
      respuesta: "El valor final de x será 0"
    },
    {
      pregunta: "¿Para qué sirve el bucle for?",
      opciones: [
        "Para ejecutar un bloque de código una vez",
        "Para repetir un bloque de código un número específico de veces",
        "Para comparar dos valores"
      ],
      respuesta: "Para repetir un bloque de código un número específico de veces"
    },
    {
      
      pregunta: "¿Qué pasa si se omite una condición en if?",
      opciones: [
        "Se ejecuta siempre el bloque de código",
        "El bloque de código nunca se ejecuta",
        "El programa da un error de sintaxis"
      ],
      respuesta: "Se ejecuta siempre el bloque de código"
    },
    {
      
      pregunta: "¿Qué significa un “bucle infinito”?",
      opciones: [
        "Un bucle que nunca termina",
        "Un bucle que se ejecuta una sola vez",
        "Un bucle que depende de una condición externa"
      ],
      respuesta: "Un bucle que nunca termina"
    },
    {
      
      pregunta: "¿Qué operador se usa para negar una condición?",
      opciones: [
        "&&",
        "||",
        "!"
      ],
      respuesta: "!"
    },
    {
      imagen: "EJ7.PNG",
      pregunta: "Si x = 3 y y = 7, ¿qué imprime esto?",
      opciones: [
        "Correcto",
        "Nada",
        "Error"
      ],
      respuesta: "Correcto"
    },
    {
      imagen: "EJ8.PNG",
      pregunta: "¿Cuál es el valor final de x después de ejecutar el siguiente código?",
      opciones: [
        "x = 7",
        "x = 3",
        "x = 5"
      ],
      respuesta: "x = 7"
    },
    {
      imagen: "EJ9.PNG",
      pregunta: "¿Qué hace el siguiente código?",
      opciones: [
        "Imprime los números del 0 al 4",
        "Imprime los números del 1 al 5",
        "Imprime los números del 0 al 5"
      ],
      respuesta: "Imprime los números del 0 al 4"
    },
    {
      pregunta: "¿Qué estructura de control se utiliza para ejecutar un bloque de código mientras una condición sea verdadera?",
      opciones: [
        "if",
        "for",
        "while"
      ],
      respuesta: "while"
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
  
  document.getElementById("btn-siguiente").addEventListener("click", function () {
    const mensajeAviso = document.getElementById("mensaje-aviso");
  
    if (respuestasCorrectas === totalPreguntas) {
      window.location.href = "harder.html";
    } else {
      mensajeAviso.textContent = "Debes completar todas las preguntas correctamente para avanzar al siguiente nivel.";
      mensajeAviso.style.display = "block";
  
      setTimeout(() => {
        mensajeAviso.style.display = "none";
      }, 3000);
    }
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    crearCasillas();
  });
  
