contenedor = document.getElementById("contenedor");
boton = document.getElementById("boton");
derecha = document.getElementById("derecha");
tetris = document.getElementById("tetris");
reiniciar = document.getElementById("reiniciar");
pausar = document.getElementById("pause");

pause = false;
var intervalId;

keyleft = true;
keyright = true;
aptoMover = false;
empezarNueva = true;

numRotado = 0;

//Oculta el boton de pausa
pausar.style.visibility = "hidden";

//Crea la tabla
tabla = document.createElement("table");

//Mediante el bucle crea 10 filas
for (var i = 0; i < 21; i++) {
  fila = document.createElement("tr");
  //Mediante este bulce crea 10 columnas dentro de las filas
  for (var j = 0; j < 14; j++) {
    columna = document.createElement("td");
    fila.appendChild(columna);
  }
  tabla.appendChild(fila);
  contenedor.appendChild(tabla);
}

//Funcion pone la primera figura cuando se pulsa el boton de empezar
function empieza() {
  clearInterval(intervalId);
  //Generar un numero aletorio para que cada pieza tenga un color diferente

  numeroAleatorio = Math.floor(Math.random() * (6 - 1)) + 1;

  switch (numeroAleatorio) {
    case 1:
      color = "blue";
      break;
    case 2:
      color = "green";
      break;
    case 3:
      color = "yellow";
      break;
    case 4:
      color = "red";
      break;
    case 5:
      color = "purple";
      break;
  }

  pausar.style.visibility = "visible";

  numRotado = 0;

  aptoMover = true;

  //Declarar las variables para que no de errores con los if

  color1 = "rgb(0, 0, 0)";
  color2 = "rgb(0, 0, 0)";
  color3 = "rgb(0, 0, 0)";
  color4 = "rgb(0, 0, 0)";
  color5 = "";
  color6 = "";
  color7 = "";
  color8 = "";
  estilo1 = "";
  estilo2 = "";
  estilo3 = "";
  estilo4 = "";
  estilo5 = "";
  estilo6 = "";
  estilo7 = "";
  estilo8 = "";

  //Al principio siempre visible los botones
  derecha.style.visibility = "visible";
  //rotar.style.visibility = "visible";
  izquierda.style.visibility = "visible";
  pausar.style.visibility = "visible";

  //Al principio simepre se puede mover
  keyleft = true;
  keyright = true;

  //Posiciones inicales de las columnas
  columna1 = 0;
  columna2 = 1;
  columna3 = 1;
  columna4 = 1;

  //Posiciones iniciales de las filas

  fila1 = 5;
  fila2 = 5;
  fila3 = 6;
  fila4 = 7;

  tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
  tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
  tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
  tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

  //Este if tiene las mismas condiciones que el if del metodo bajar y si en esta caso cuando se le da a empezar aparece la ficha arriba sin dejar movernos es porque se ha acabado

  if (columna4 < 20) {
    //Para cada uno ya que no me deja poner mas de una celda en los estilos
    estilo1 = window.getComputedStyle(tabla.rows[columna1 + 2].cells[fila1]);
    color1 = estilo1.backgroundColor;

    estilo2 = window.getComputedStyle(tabla.rows[columna2 + 1].cells[fila2]);
    color2 = estilo2.backgroundColor;

    estilo3 = window.getComputedStyle(tabla.rows[columna3 + 1].cells[fila3]);
    color3 = estilo3.backgroundColor;

    estilo4 = window.getComputedStyle(tabla.rows[columna4 + 1].cells[fila4]);
    color4 = estilo4.backgroundColor;
  }

  if (fila4 < 13) {
    //No me deje mover a la derecha
    estilo5 = window.getComputedStyle(tabla.rows[columna1].cells[fila1 + 1]);
    color5 = estilo5.backgroundColor;

    estilo6 = window.getComputedStyle(tabla.rows[columna4].cells[fila4 + 1]);
    color6 = estilo6.backgroundColor;
  }
  //No me deje mover a la izquierda
  if (fila1 > 0) {
    estilo7 = window.getComputedStyle(tabla.rows[columna1].cells[fila1 - 1]);
    color7 = estilo7.backgroundColor;

    estilo8 = window.getComputedStyle(tabla.rows[columna2].cells[fila2 - 1]);
    color8 = estilo8.backgroundColor;
  }
  console.log(color1);
  if (
    columna4 == 20 ||
    color1 != "rgba(0, 0, 0, 0)" ||
    color2 != "rgba(0, 0, 0, 0)" ||
    color3 != "rgba(0, 0, 0, 0)" ||
    color4 != "rgba(0, 0, 0, 0)"
  ) {
    tetris.innerHTML = "Juego finalizado";
    derecha.style.visibility = "hidden";
    //rotar.style.visibility = "hidden";
    izquierda.style.visibility = "hidden";
    aptoMover = false;
    pausar.style.visibility = "hidden";

    //Desactiva las fechas de teclado
    keyleft = false;
    keyright = false;

    reiniciar.innerHTML = "Jugar de nuevo";
    // Si el que esta a la derecha es azul que no te deje mover a la derecha
  } else if (color5 != "rgba(0, 0, 0, 0)" || color6 != "rgba(0, 0, 0, 0)") {
    derecha.style.visibility = "hidden";
    keyright = false;
  } else if (color7 != "rgba(0, 0, 0, 0)" || color8 != "rgba(0, 0, 0, 0)") {
    izquierda.style.visibility = "hidden";
    keyleft = false;
  }
}

// Desplaza la figura a la derecha
function dere() {
  //Si me muevo una a la derecha me voy a poder mover una a la izquierda
  izquierda.style.visibility = "visible";
  keyleft = true;
  color1 = "rgba(0, 0, 0, 0)";
  color2 = "rgba(0, 0, 0, 0)";
  color3 = "rgba(0, 0, 0, 0)";
  color4 = "rgba(0, 0, 0, 0)";
  estilo1 = "";
  estilo2 = "";
  estilo3 = "";
  estilo4 = "";

  switch (numRotado) {
    case 0:
      if (fila4 < 13) {
        fila1 = fila1 + 1;
        fila2 = fila2 + 1;
        fila3 = fila3 + 1;
        fila4 = fila4 + 1;

        tabla.rows[columna1].cells[fila1 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna2].cells[fila2 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna3].cells[fila3 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna4].cells[fila4 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";

        tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
        tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
        tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
        tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 + 1]
        );
        color3 = estilo3.backgroundColor;

        estilo4 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 + 1]
        );
        color4 = estilo4.backgroundColor;

        if (color3 != "rgba(0, 0, 0, 0)" || color4 != "rgba(0, 0, 0, 0)") {
          derecha.style.visibility = "hidden";
          keyright = false;
        }
      }
      break;
    case 1:
      if (fila2 < 13) {
        fila1 = fila1 + 1;
        fila2 = fila2 + 1;
        fila3 = fila3 + 1;
        fila4 = fila4 + 1;

        tabla.rows[columna1].cells[fila1 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna2].cells[fila2 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna3].cells[fila3 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna4].cells[fila4 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";

        tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
        tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
        tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
        tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila2 + 1]
        );
        color3 = estilo3.backgroundColor;

        estilo4 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 + 1]
        );
        color4 = estilo4.backgroundColor;

        if (color3 != "rgba(0, 0, 0, 0)" || color4 != "rgba(0, 0, 0, 0)") {
          derecha.style.visibility = "hidden";
          keyright = false;
        }
      }
      break;
    case 2:
      if (fila2 < 13) {
        fila1 = fila1 + 1;
        fila2 = fila2 + 1;
        fila3 = fila3 + 1;
        fila4 = fila4 + 1;

        tabla.rows[columna1].cells[fila1 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna2].cells[fila2 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna3].cells[fila3 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna4].cells[fila4 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";

        tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
        tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
        tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
        tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna2].cells[fila2 + 1]
        );
        color3 = estilo3.backgroundColor;

        estilo4 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 + 1]
        );
        color4 = estilo4.backgroundColor;

        if (color3 != "rgba(0, 0, 0, 0)" || color4 != "rgba(0, 0, 0, 0)") {
          derecha.style.visibility = "hidden";
          keyright = false;
        }
      }
      break;
    case 3:
      if (fila2 < 13) {
        fila1 = fila1 + 1;
        fila2 = fila2 + 1;
        fila3 = fila3 + 1;
        fila4 = fila4 + 1;

        tabla.rows[columna1].cells[fila1 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna2].cells[fila2 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna3].cells[fila3 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna4].cells[fila4 - 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";

        tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
        tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
        tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
        tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna2].cells[fila2 + 1]
        );
        color3 = estilo3.backgroundColor;

        estilo4 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 + 1]
        );
        color4 = estilo4.backgroundColor;

        estilo1 = window.getComputedStyle(
          tabla.rows[columna3].cells[fila3 + 1]
        );
        color1 = estilo1.backgroundColor;

        if (
          color3 != "rgba(0, 0, 0, 0)" ||
          color4 != "rgba(0, 0, 0, 0)" ||
          color1 != "rgba(0, 0, 0, 0)"
        ) {
          derecha.style.visibility = "hidden";
          keyright = false;
        }
      }
      break;
  }
}

// Desaplaza da figura a la izquierda

function izqui() {
  //Si me muevo una a la izquierda me voy a poder mover una a la derecha
  derecha.style.visibility = "visible";
  keyright = true;
  switch (numRotado) {
    case 0:
      if (fila1 > 0) {
        fila1 = fila1 - 1;
        fila2 = fila2 - 1;
        fila3 = fila3 - 1;
        fila4 = fila4 - 1;

        tabla.rows[columna1].cells[fila1 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna2].cells[fila2 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna3].cells[fila3 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna4].cells[fila4 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";

        tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
        tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
        tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
        tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

        estilo1 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 - 1]
        );
        color1 = estilo1.backgroundColor;

        estilo2 = window.getComputedStyle(
          tabla.rows[columna2].cells[fila2 - 1]
        );
        color2 = estilo2.backgroundColor;

        if (color1 != "rgba(0, 0, 0, 0)" || color2 != "rgba(0, 0, 0, 0)") {
          izquierda.style.visibility = "hidden";
          //Desactiva las fechas de teclado
          keyleft = false;
        }
      }
      break;
    case 1:
      if (fila1 > 0) {
        fila1 = fila1 - 1;
        fila2 = fila2 - 1;
        fila3 = fila3 - 1;
        fila4 = fila4 - 1;

        tabla.rows[columna1].cells[fila1 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna2].cells[fila2 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna3].cells[fila3 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna4].cells[fila4 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";

        tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
        tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
        tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
        tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

        estilo1 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 - 1]
        );
        color1 = estilo1.backgroundColor;

        estilo2 = window.getComputedStyle(
          tabla.rows[columna3].cells[fila3 - 1]
        );
        color2 = estilo2.backgroundColor;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 - 1]
        );
        color3 = estilo3.backgroundColor;

        if (
          color1 != "rgba(0, 0, 0, 0)" ||
          color2 != "rgba(0, 0, 0, 0)" ||
          color3 != "rgba(0, 0, 0, 0)"
        ) {
          izquierda.style.visibility = "hidden";
          //Desactiva las fechas de teclado
          keyleft = false;
        }
      }
      break;

    case 2:
      if (fila1 > 0) {
        fila1 = fila1 - 1;
        fila2 = fila2 - 1;
        fila3 = fila3 - 1;
        fila4 = fila4 - 1;

        tabla.rows[columna1].cells[fila1 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna2].cells[fila2 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna3].cells[fila3 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna4].cells[fila4 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";

        tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
        tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
        tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
        tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

        estilo1 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 - 1]
        );
        color1 = estilo1.backgroundColor;

        estilo2 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 - 1]
        );
        color2 = estilo2.backgroundColor;

        if (color1 != "rgba(0, 0, 0, 0)" || color2 != "rgba(0, 0, 0, 0)") {
          izquierda.style.visibility = "hidden";
          //Desactiva las fechas de teclado
          keyleft = false;
        }
      }
      break;
    case 3:
      if (fila1 > 0) {
        fila1 = fila1 - 1;
        fila2 = fila2 - 1;
        fila3 = fila3 - 1;
        fila4 = fila4 - 1;

        tabla.rows[columna1].cells[fila1 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna2].cells[fila2 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna3].cells[fila3 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";
        tabla.rows[columna4].cells[fila4 + 1].style.backgroundColor =
          "rgba(0, 0, 0, 0)";

        tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
        tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
        tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
        tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

        estilo1 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 - 1]
        );
        color1 = estilo1.backgroundColor;

        estilo2 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 - 1]
        );
        color2 = estilo2.backgroundColor;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna3].cells[fila3 - 1]
        );
        color3 = estilo3.backgroundColor;

        if (
          color1 != "rgba(0, 0, 0, 0)" ||
          color2 != "rgba(0, 0, 0, 0)" ||
          color3 != "rgba(0, 0, 0, 0)"
        ) {
          izquierda.style.visibility = "hidden";
          //Desactiva las fechas de teclado
          keyleft = false;
        }
      }
      break;
  }
}
// Función para mover la figura hacia abajo
function aba() {
  color5 = "";
  color6 = "";

  color7 = "";
  color8 = "";

  if (columna4 < 20) {
    columna1 = columna1 + 1;
    columna2 = columna2 + 1;
    columna3 = columna3 + 1;
    columna4 = columna4 + 1;

    tabla.rows[columna1 - 1].cells[fila1].style.backgroundColor =
      "rgba(0, 0, 0, 0)";
    tabla.rows[columna2 - 1].cells[fila2].style.backgroundColor =
      "rgba(0, 0, 0, 0)";
    tabla.rows[columna3 - 1].cells[fila3].style.backgroundColor =
      "rgba(0, 0, 0, 0)";
    tabla.rows[columna4 - 1].cells[fila4].style.backgroundColor =
      "rgba(0, 0, 0, 0)";

    tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
    tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
    tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
    tabla.rows[columna4].cells[fila4].style.backgroundColor = color;
    if (numRotado == 0) {
      if (columna4 < 20) {
        //Para cada uno ya que no me deja poner mas de una celda en los estilos
        estilo1 = window.getComputedStyle(
          tabla.rows[columna1 + 2].cells[fila1]
        );
        color1 = estilo1.backgroundColor;

        estilo2 = window.getComputedStyle(
          tabla.rows[columna2 + 1].cells[fila2]
        );
        color2 = estilo2.backgroundColor;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna3 + 1].cells[fila3]
        );
        color3 = estilo3.backgroundColor;

        estilo4 = window.getComputedStyle(
          tabla.rows[columna4 + 1].cells[fila4]
        );
        color4 = estilo4.backgroundColor;
      }

      if (fila4 < 13) {
        //No me deje mover a la derecha
        estilo5 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 + 1]
        );
        color5 = estilo5.backgroundColor;

        estilo6 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 + 1]
        );
        color6 = estilo6.backgroundColor;
      }
      //No me deje mover a la izquierda
      if (fila1 > 0) {
        estilo7 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 - 1]
        );
        color7 = estilo7.backgroundColor;

        estilo8 = window.getComputedStyle(
          tabla.rows[columna2].cells[fila2 - 1]
        );
        color8 = estilo8.backgroundColor;
      }

      if (
        columna4 == 20 ||
        color1 != "rgba(0, 0, 0, 0)" ||
        color2 != "rgba(0, 0, 0, 0)" ||
        color3 != "rgba(0, 0, 0, 0)" ||
        color4 != "rgba(0, 0, 0, 0)"
      ) {
        derecha.style.visibility = "hidden";
        izquierda.style.visibility = "hidden";
        aptoMover = false;

        //Desactiva las fechas de teclado
        keyleft = false;
        keyright = false;

        //Cada vez que la pieza toca con otra por abajo saca otra pieza nueva
        empieza();

        // Si el que esta a la derecha es azul que no te deje mover a la derecha
      } else if (color5 != "rgba(0, 0, 0, 0)" || color6 != "rgba(0, 0, 0, 0)") {
        derecha.style.visibility = "hidden";
        keyright = false;
      } else if (color7 != "rgba(0, 0, 0, 0)" || color8 != "rgba(0, 0, 0, 0)") {
        izquierda.style.visibility = "hidden";
        keyleft = false;
      }

      ///////////////////////////////////////////////////////////////////////////////////////////////
      ////////  NO DEJE MOVER CON LA POSICION ROTADO 1 ///////////////////////////////
    } else if (numRotado == 1) {
      if (columna4 < 20) {
        //Para cada uno ya que no me deja poner mas de una celda en los estilos
        estilo1 = window.getComputedStyle(
          tabla.rows[columna1 + 2].cells[fila1]
        );
        color1 = estilo1.backgroundColor;

        estilo2 = window.getComputedStyle(
          tabla.rows[columna2 + 1].cells[fila2]
        );
        color2 = estilo2.backgroundColor;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna3 + 1].cells[fila3]
        );
        color3 = estilo3.backgroundColor;

        estilo4 = window.getComputedStyle(
          tabla.rows[columna4 + 1].cells[fila4]
        );
        color4 = estilo4.backgroundColor;
      }

      if (fila2 < 13) {
        //No me deje mover a la derecha
        estilo5 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila2 + 1]
        );
        color5 = estilo5.backgroundColor;

        estilo6 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 + 1]
        );
        color6 = estilo6.backgroundColor;
      }
      //No me deje mover a la izquierda
      if (fila1 > 0) {
        estilo7 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 - 1]
        );
        color7 = estilo7.backgroundColor;

        estilo8 = window.getComputedStyle(
          tabla.rows[columna3].cells[fila3 - 1]
        );
        color8 = estilo8.backgroundColor;

        estilo9 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 - 1]
        );
        color9 = estilo9.backgroundColor;
      }

      if (
        columna4 == 20 ||
        color4 != "rgba(0, 0, 0, 0)" ||
        color2 != "rgba(0, 0, 0, 0)"
      ) {
        derecha.style.visibility = "hidden";
        //rotar.style.visibility = "hidden";
        izquierda.style.visibility = "hidden";
        aptoMover = false;

        //Desactiva las fechas de teclado
        keyleft = false;
        keyright = false;
        //Cada vez que la pieza toca con otra por abajo saca otra pieza nueva
        empieza();

        // Si el que esta a la derecha es azul que no te deje mover a la derecha
      } else if (color5 != "rgba(0, 0, 0, 0)" || color6 != "rgba(0, 0, 0, 0)") {
        derecha.style.visibility = "hidden";
        keyright = false;
      } else if (
        color7 != "rgba(0, 0, 0, 0)" ||
        color8 != "rgba(0, 0, 0, 0)" ||
        color9 != "rgba(0, 0, 0, 0)"
      ) {
        izquierda.style.visibility = "hidden";
        keyleft = false;
      }
      /////////////////////////////////////////////////////////////
      ////////////////// PARA LA POSICIÓN ROTADA 2 ////////////////
    } else if (numRotado == 2) {
      if (columna4 < 20) {
        //Para cada uno ya que no me deja poner mas de una celda en los estilos
        estilo1 = window.getComputedStyle(
          tabla.rows[columna1 + 1].cells[fila1]
        );
        color1 = estilo1.backgroundColor;

        estilo2 = window.getComputedStyle(
          tabla.rows[columna2 + 1].cells[fila2]
        );
        color2 = estilo2.backgroundColor;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna3 + 1].cells[fila3]
        );
        color3 = estilo3.backgroundColor;

        estilo4 = window.getComputedStyle(
          tabla.rows[columna4 + 1].cells[fila4]
        );
        color4 = estilo4.backgroundColor;
      }

      if (fila2 < 13) {
        //No me deje mover a la derecha
        estilo5 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 + 1]
        );
        color5 = estilo5.backgroundColor;

        estilo6 = window.getComputedStyle(
          tabla.rows[columna2].cells[fila2 + 1]
        );
        color6 = estilo6.backgroundColor;
      }
      //No me deje mover a la izquierda
      if (fila1 > 0) {
        estilo7 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 - 1]
        );
        color7 = estilo7.backgroundColor;

        estilo8 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 - 1]
        );
        color8 = estilo8.backgroundColor;
      }

      if (
        columna4 == 20 ||
        color4 != "rgba(0, 0, 0, 0)" ||
        color1 != "rgba(0, 0, 0, 0)" ||
        color3 != "rgba(0, 0, 0, 0)"
      ) {
        derecha.style.visibility = "hidden";
        izquierda.style.visibility = "hidden";
        aptoMover = false;

        //Desactiva las fechas de teclado
        keyleft = false;
        keyright = false;
        //Cada vez que la pieza toca con otra por abajo saca otra pieza nueva
        empieza();

        // Si el que esta a la derecha es azul que no te deje mover a la derecha
      } else if (color5 != "rgba(0, 0, 0, 0)" || color6 != "rgba(0, 0, 0, 0)") {
        derecha.style.visibility = "hidden";
        keyright = false;
      } else if (color7 != "rgba(0, 0, 0, 0)" || color8 != "rgba(0, 0, 0, 0)") {
        izquierda.style.visibility = "hidden";
        keyleft = false;
      }
      ///////////////////////////////////////////////////////////////////////////
      //////////////////////// PARA LA POSICICIÓN ROTADO 3 //////////////////////
    } else if (numRotado == 3) {
      if (columna4 < 20) {
        //Para cada uno ya que no me deja poner mas de una celda en los estilos
        estilo1 = window.getComputedStyle(
          tabla.rows[columna4 + 1].cells[fila4]
        );
        color1 = estilo1.backgroundColor;

        estilo9 = window.getComputedStyle(
          tabla.rows[columna1 + 1].cells[fila1]
        );
        color9 = estilo9.backgroundColor;
      }

      if (fila2 < 13) {
        //No me deje mover a la derecha
        estilo5 = window.getComputedStyle(
          tabla.rows[columna2].cells[fila2 + 1]
        );
        color5 = estilo5.backgroundColor;

        estilo6 = window.getComputedStyle(
          tabla.rows[columna3].cells[fila3 + 1]
        );
        color6 = estilo6.backgroundColor;

        estilo2 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 + 1]
        );
        color2 = estilo2.backgroundColor;
      }
      //No me deje mover a la izquierda
      if (fila1 > 0) {
        estilo7 = window.getComputedStyle(
          tabla.rows[columna1].cells[fila1 - 1]
        );
        color7 = estilo7.backgroundColor;

        estilo8 = window.getComputedStyle(
          tabla.rows[columna3].cells[fila3 - 1]
        );
        color8 = estilo8.backgroundColor;

        estilo3 = window.getComputedStyle(
          tabla.rows[columna4].cells[fila4 - 1]
        );
        color3 = estilo3.backgroundColor;
      }

      if (
        columna4 == 20 ||
        color1 != "rgba(0, 0, 0, 0)" ||
        color9 != "rgba(0, 0, 0, 0)"
      ) {
        derecha.style.visibility = "hidden";
        //rotar.style.visibility = "hidden";
        izquierda.style.visibility = "hidden";
        aptoMover = false;

        //Desactiva las fechas de teclado
        keyleft = false;
        keyright = false;
        //Cada vez que la pieza toca con otra por abajo saca otra pieza nueva
        empieza();

        // Si el que esta a la derecha es azul que no te deje mover a la derecha
      } else if (
        color5 != "rgba(0, 0, 0, 0)" ||
        color6 != "rgba(0, 0, 0, 0)" ||
        color2 != "rgba(0, 0, 0, 0)"
      ) {
        derecha.style.visibility = "hidden";
        keyright = false;
      } else if (
        color7 != "rgba(0, 0, 0, 0)" ||
        color8 != "rgba(0, 0, 0, 0)" ||
        color3 != "rgba(0, 0, 0, 0)"
      ) {
        izquierda.style.visibility = "hidden";
        keyleft = false;
      }
    }
  }
}

// Función para rotar la figura

function rota() {
  switch (numRotado) {
    case 0:
      columna1 = columna1;
      columna2 = columna2 - 1;
      columna3 = columna3;
      columna4 = columna4 + 1;

      fila1 = fila1;
      fila2 = fila2 + 1;
      fila3 = fila3 - 1;
      fila4 = fila4 - 2;

      tabla.rows[columna2 + 1].cells[fila2].style.backgroundColor =
        "rgba(0, 0, 0, 0)";
      tabla.rows[columna2 + 1].cells[fila2 + 1].style.backgroundColor =
        "rgba(0, 0, 0, 0)";

      tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
      tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
      tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
      tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

      numRotado++;

      break;
    case 1:
      columna1 = columna1; //0
      columna2 = columna2; //0
      columna3 = columna3 - 1; //0
      columna4 = columna4 - 1; //1

      fila1 = fila1; //0
      fila2 = fila2 + 1; //1
      fila3 = fila3 + 1; //2
      fila4 = fila4 + 2; //2

      tabla.rows[columna3 + 1].cells[fila1].style.backgroundColor =
        "rgba(0, 0, 0, 0)";
      tabla.rows[columna3 + 2].cells[fila1].style.backgroundColor =
        "rgba(0, 0, 0, 0)";

      tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
      tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
      tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
      tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

      numRotado++;
      break;

    case 2:
      columna1 = columna1; //0
      columna2 = columna2; //0
      columna3 = columna3 + 1; //2
      columna4 = columna4 + 1; //1

      fila1 = fila1; //0
      fila2 = fila2 - 1; //1
      fila3 = fila3; //1
      fila4 = fila4 - 1; //1

      tabla.rows[columna1].cells[fila1 + 2].style.backgroundColor =
        "rgba(0, 0, 0, 0)";
      tabla.rows[columna1 + 1].cells[fila3 + 1].style.backgroundColor =
        "rgba(0, 0, 0, 0)";
      tabla.rows[columna1].cells[fila2].style.backgroundColor =
        "rgba(0, 0, 0, 0)";

      tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
      tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
      tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
      tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

      numRotado++;

      break;

    case 3:
      columna1 = columna1; //0
      columna2 = columna2 + 1; //1
      columna3 = columna3; //1
      columna4 = columna4 - 1; //1

      fila1 = fila1; //0
      fila2 = fila2 - 1; //0
      fila3 = fila3; //1
      fila4 = fila4 + 1; //2

      tabla.rows[columna1].cells[fila1 + 1].style.backgroundColor =
        "rgba(0, 0, 0, 0)";
      tabla.rows[columna2 + 1].cells[fila3].style.backgroundColor =
        "rgba(0, 0, 0, 0)";

      tabla.rows[columna1].cells[fila1].style.backgroundColor = color;
      tabla.rows[columna2].cells[fila2].style.backgroundColor = color;
      tabla.rows[columna3].cells[fila3].style.backgroundColor = color;
      tabla.rows[columna4].cells[fila4].style.backgroundColor = color;

      numRotado = 0;

      break;
  }
}

//Para manejarlo con las teclas, este metodo no da fallo aunque se siga pulsando al llegar a los limites de la pantalla ya que en cada metodo esta controlado con un if los limites de la pantalla.

//Mueve a la izquierda

document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowLeft" && columna4 < 20 && keyleft == true) {
    izqui();
  }
});

//Mueve a la derecha
document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowRight" && columna4 < 20 && keyright == true) {
    dere();
  }
});
//Rota

document.addEventListener("keydown", function (event) {
  if (
    event.key == "ArrowUp" &&
    columna4 < 20 &&
    keyleft == true &&
    keyright == true
  ) {
    rota();
  }
});

//Baja directamente
document.addEventListener("keydown", function (event) {
  if (event.key == " ") {
    // Iniciar el intervalo y almacenar su identificador
    intervalId = setInterval(function () {
      if (pause == false) {
        aba();
      }
    }, 8);
  }
});

//Controlar que se pulsa el boton de pause
pausar.addEventListener("click", function () {
  if (pause == false) {
    derecha.style.visibility = "hidden";
    izquierda.style.visibility = "hidden ";
    pause = true;
    keyleft = false;
    keyright = false;
  } else {
    derecha.style.visibility = "visible";
    izquierda.style.visibility = "visible";
    pause = false;
    keyleft = true;
    keyright = true;
  }
});

// Para manerjarlo con los botones

boton.addEventListener("click", function () {
  //Para saber la dificultad
  select = document.getElementById("select");
  indice = select.selectedIndex;
  opcion = select.options[indice];
  nivel = opcion.value;

  empieza();
  boton.style.visibility = "hidden";
  switch (nivel) {
    case "facil":
      setInterval(function () {
        if (aptoMover == true && pause == false) {
          aba();
        }
      }, 500);
      break;
    case "media":
      setInterval(function () {
        if (aptoMover == true && pause == false) {
          aba();
        }
      }, 275);
      break;
    case "dificil":
      setInterval(function () {
        if (aptoMover == true && pause == false) {
          aba();
        }
      }, 100);
      break;
    case "extrema":
      setInterval(function () {
        if (aptoMover == true && pause == false) {
          aba();
        }
      }, 75);
      break;
  }
});

derecha.addEventListener("click", dere);
izquierda.addEventListener("click", izqui);
reiniciar.addEventListener("click", function () {
  location.reload();
});
