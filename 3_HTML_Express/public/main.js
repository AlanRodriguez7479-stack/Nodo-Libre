const div = document.getElementById("miDiv");
const miboton = document.getElementById("miBoton");
let opcion = false;

miboton.addEventListener("click", function() {
    opcion = !opcion;
    if (opcion) {
        div.innerHTML = "<p>¡Has hecho clic en el botón!</p>";
    } else {
        div.innerHTML = "";
    }
});
