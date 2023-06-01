const stockProductos = [ { id: 1, img: "./img/mercaderia/remeralisa.jpg", nombre: "Remeras DESKA",cantidad: 1, precio: 1500 },
                    { id: 2, img: "./img/mercaderia/gorra.jpg", nombre: "Gorras Deska",cantidad: 1, precio: 2000 },
                    { id: 3, img: "./img/mercaderia/vasotermico.jpg", nombre: "Vasos Deska",cantidad: 1, precio: 700 },
                    { id: 4, img: "./img/mercaderia/buzo.jpg", nombre: "Buzos Deska",cantidad: 1, precio: 3500 },
                    { id: 5, img: "./img/mercaderia/gorro.jpg", nombre: "Gorros Deska",cantidad: 1, precio: 820 },
                    { id: 6, img: "./img/mercaderia/bermuda.jpg", nombre: "Bermudas Deska",cantidad: 1, precio: 1700 },
                    ]
 let carrito = [];                  

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");

document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });
if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        toast : true,
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
      localStorage.clear()
    }
  });
}

if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito();
    });
  }



stockProductos.forEach((prod)=>{
    const { id, nombre, precio, img, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="mercaderia__tarjeta">
      <img class="tarjeta__img" src="${img}" alt="Tarjeta imagen">
      <div class="card-body">
        <h5 class="tarjeta__nombre">${nombre}</h5>
        <p class="tarjeta__precio">Precio: ${precio}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="button-outline" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
    </div>
      `;
    }
  }); 

  const agregarProducto = (id) => {
    const existe = carrito.some(prod => prod.id === id)
  
    if(existe){
      const prod = carrito.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carrito.push(item)
    }
    mostrarCarrito()
  
  };
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { id, nombre, precio, img, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${img}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        
    
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("Nada");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Todavia no tienes ningun producto!</p>
      `;
    } else {
      console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const productoId = id;
    carrito = carrito.filter((producto) => producto.id !== productoId);
    mostrarCarrito();
  }









