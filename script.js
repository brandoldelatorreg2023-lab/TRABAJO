const contenedor = document.getElementById("contenedor-productos");
const btnAgregar = document.getElementById("btn-agregar");
const formulario = document.getElementById("formulario");
const guardar = document.getElementById("guardar");

let productos = [];

fetch("productos.json")
  .then(response => response.json())
  .then(datos => {
    const guardados = localStorage.getItem("productos");
    productos = guardados ? JSON.parse(guardados) : datos;
    mostrarProductos();
  })
  .catch(error => console.log("Error al cargar el JSON:", error));

function mostrarProductos() {
  contenedor.innerHTML = "";
  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button onclick="eliminarProducto(${index})">🗑️ Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

btnAgregar.addEventListener("click", () => {
  formulario.style.display = formulario.style.display === "none" ? "block" : "none";
});

guardar.addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const imagen = document.getElementById("imagen").value;

  if (nombre && precio && imagen) {
    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      precio,
      imagen
    };

    productos.push(nuevoProducto);
    localStorage.setItem("productos", JSON.stringify(productos));
    mostrarProductos();

    formulario.style.display = "none";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("imagen").value = "";
  } else {
    alert("Por favor completa todos los campos.");
  }
});

function eliminarProducto(index) {
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}
