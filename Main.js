contenedor = document.getElementById("contenedor");
boton = document.getElementById("boton");
derecha = document.getElementById("derecha");
abajo = document.getElementById("abajo");
rotar = document.getElementById("rotar");

numRotado = 0;

//Posiciones inicales de las columnas
columna1 = 0;
columna2 = 1;
columna3 = 1;
columna4 = 1;

//Posiciones iniciales de las filas

fila1 = 0;
fila2 = 0;
fila3 = 1;
fila4 = 2;

//Crea la tabla
tabla = document.createElement("table");

//Mediante el bucle crea 10 filas
for (var i = 0; i < 10; i++) {
  fila = document.createElement("tr");
  //Mediante este bulce crea 10 columnas dentro de las filas
  for (var j = 0; j < 10; j++) {
    columna = document.createElement("td");
    fila.appendChild(columna);
  }
  tabla.appendChild(fila);
  contenedor.appendChild(tabla);
}

//Funcion pone la primera figura cuando se pulsa el boton de empezar
function empieza() {
  derecha.style.visibility = "visible";
  abajo.style.visibility = "visible";
  rotar.style.visibility = "visible";
  izquierda.style.visibility = "visible";

  //Posiciones inicales de las columnas
  columna1 = 0;
  columna2 = 1;
  columna3 = 1;
  columna4 = 1;

  //Posiciones iniciales de las filas

  fila1 = 0;
  fila2 = 0;
  fila3 = 1;
  fila4 = 2;

  tabla.rows[columna1].cells[fila1].style.backgroundColor = "blue";
  tabla.rows[columna2].cells[fila2].style.backgroundColor = "blue";
  tabla.rows[columna3].cells[fila3].style.backgroundColor = "blue";
  tabla.rows[columna4].cells[fila4].style.backgroundColor = "blue";
}
// Desplaza la figura a la derecha
function dere() {
  if (fila4 < 9) {
    fila1 = fila1 + 1;
    fila2 = fila2 + 1;
    fila3 = fila3 + 1;
    fila4 = fila4 + 1;

    tabla.rows[columna1].cells[fila1 - 1].style.backgroundColor = "white";
    tabla.rows[columna2].cells[fila2 - 1].style.backgroundColor = "white";
    tabla.rows[columna3].cells[fila3 - 1].style.backgroundColor = "white";
    tabla.rows[columna4].cells[fila4 - 1].style.backgroundColor = "white";

    tabla.rows[columna1].cells[fila1].style.backgroundColor = "blue";
    tabla.rows[columna2].cells[fila2].style.backgroundColor = "blue";
    tabla.rows[columna3].cells[fila3].style.backgroundColor = "blue";
    tabla.rows[columna4].cells[fila4].style.backgroundColor = "blue";
  }
}

// Desaplaza da figura a la izquierda

function izqui() {
  if (fila1 > 0) {
    fila1 = fila1 - 1;
    fila2 = fila2 - 1;
    fila3 = fila3 - 1;
    fila4 = fila4 - 1;

    tabla.rows[columna1].cells[fila1 + 1].style.backgroundColor = "white";
    tabla.rows[columna2].cells[fila2 + 1].style.backgroundColor = "white";
    tabla.rows[columna3].cells[fila3 + 1].style.backgroundColor = "white";
    tabla.rows[columna4].cells[fila4 + 1].style.backgroundColor = "white";

    tabla.rows[columna1].cells[fila1].style.backgroundColor = "blue";
    tabla.rows[columna2].cells[fila2].style.backgroundColor = "blue";
    tabla.rows[columna3].cells[fila3].style.backgroundColor = "blue";
    tabla.rows[columna4].cells[fila4].style.backgroundColor = "blue";
  }
}
// Función para mover la figura hacia abajo
function aba() {
  if (columna4 < 9) {
    columna1 = columna1 + 1;
    columna2 = columna2 + 1;
    columna3 = columna3 + 1;
    columna4 = columna4 + 1;

    tabla.rows[columna1 - 1].cells[fila1].style.backgroundColor = "white";
    tabla.rows[columna2 - 1].cells[fila2].style.backgroundColor = "white";
    tabla.rows[columna3 - 1].cells[fila3].style.backgroundColor = "white";
    tabla.rows[columna4 - 1].cells[fila4].style.backgroundColor = "white";

    tabla.rows[columna1].cells[fila1].style.backgroundColor = "blue";
    tabla.rows[columna2].cells[fila2].style.backgroundColor = "blue";
    tabla.rows[columna3].cells[fila3].style.backgroundColor = "blue";
    tabla.rows[columna4].cells[fila4].style.backgroundColor = "blue";

    if (columna4 < 9) {
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

    console.log(color3);

    if (
      columna4 == 9 ||
      color1 === "rgb(0, 0, 255)" ||
      color2 === "rgb(0, 0, 255)" ||
      color3 === "rgb(0, 0, 255)" ||
      color4 === "rgb(0, 0, 255)"
    ) {
      derecha.style.visibility = "hidden";
      abajo.style.visibility = "hidden";
      rotar.style.visibility = "hidden";
      izquierda.style.visibility = "hidden";
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

      tabla.rows[columna2 + 1].cells[fila2].style.backgroundColor = "white";
      tabla.rows[columna2 + 1].cells[fila2 + 1].style.backgroundColor = "white";

      tabla.rows[columna1].cells[fila1].style.backgroundColor = "blue";
      tabla.rows[columna2].cells[fila2].style.backgroundColor = "blue";
      tabla.rows[columna3].cells[fila3].style.backgroundColor = "blue";
      tabla.rows[columna4].cells[fila4].style.backgroundColor = "blue";

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

      tabla.rows[columna3 + 1].cells[fila1].style.backgroundColor = "white";
      tabla.rows[columna3 + 2].cells[fila1].style.backgroundColor = "white";

      tabla.rows[columna1].cells[fila1].style.backgroundColor = "blue";
      tabla.rows[columna2].cells[fila2].style.backgroundColor = "blue";
      tabla.rows[columna3].cells[fila3].style.backgroundColor = "blue";
      tabla.rows[columna4].cells[fila4].style.backgroundColor = "blue";

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

      tabla.rows[columna1].cells[fila1 + 2].style.backgroundColor = "white";
      tabla.rows[columna1 + 1].cells[fila3 + 1].style.backgroundColor = "white";
      tabla.rows[columna1].cells[fila2].style.backgroundColor = "white";

      tabla.rows[columna1].cells[fila1].style.backgroundColor = "blue";
      tabla.rows[columna2].cells[fila2].style.backgroundColor = "blue";
      tabla.rows[columna3].cells[fila3].style.backgroundColor = "blue";
      tabla.rows[columna4].cells[fila4].style.backgroundColor = "blue";

      numRotado = 3;

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

      tabla.rows[columna1].cells[fila1 + 1].style.backgroundColor = "white";
      tabla.rows[columna2 + 1].cells[fila3].style.backgroundColor = "white";

      tabla.rows[columna1].cells[fila1].style.backgroundColor = "blue";
      tabla.rows[columna2].cells[fila2].style.backgroundColor = "blue";
      tabla.rows[columna3].cells[fila3].style.backgroundColor = "blue";
      tabla.rows[columna4].cells[fila4].style.backgroundColor = "blue";

      numRotado = 0;

      break;
  }
}

//Para manejarlo con las teclas, este metodo no da fallo aunque se siga pulsando al llegar a los limites de la pantalla ya que en cada metodo esta controlado con un if los limites de la pantalla.
//Mueve para abajo

document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowDown" && columna4 < 9) {
    aba();
  }
});
//Mueve a la izquierda
document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowLeft" && columna4 < 9) {
    izqui();
  }
});

//Mueve a la derecha
document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowRight" && columna4 < 9) {
    dere();
  }
});
//Rota
document.addEventListener("keydown", function (event) {
  if (event.key == " " && columna4 < 9) {
    rota();
  }
});

// Para manerjarlo con los botones
boton.addEventListener("click", empieza);
derecha.addEventListener("click", dere);
izquierda.addEventListener("click", izqui);
abajo.addEventListener("click", aba);
rotar.addEventListener("click", rota);
