const productos = [ { id: 1, imagen: "./img/mercaderia/remeralisa.jpg", nombre: "Remeras DESKA", precio: 1500 },
                    { id: 2, imagen: "./img/mercaderia/gorra.jpg", nombre: "Gorras Deska", precio: 2000 },
                    { id: 3, imagen: "./img/mercaderia/vasotermico.jpg", nombre: "Vasos Deska", precio: 700 },
                    { id: 4, imagen: "./img/mercaderia/buzo.jpg", nombre: "Buzos Deska", precio: 3500 },
                    { id: 5, imagen: "./img/mercaderia/gorro.jpg", nombre: "Gorros Deska", precio: 820 },
                    { id: 6, imagen: "./img/mercaderia/bermuda.jpg", nombre: "Bermudas Deska", precio: 1700 },
                    ]


const imgCarrito = document.getElementById("imgCarrito")
const container = document.querySelector("div.container")
const inputSearch = document.querySelector("input#inputSearch")
const carrito = recuperarCarrito()

function filtrarProductos(valor) {
    let resultado = productos.filter( producto => producto.nombre.toLowerCase().includes(valor.toLowerCase()))
        if (resultado.length > 0) {
            cargarProductos(resultado)
        }
}

function retornoCardHTML(producto) {
return ` <div class= "mercaderia__tarjeta">
                <div class="tarjeta__nombre">${producto.nombre}</div>
                <div class="tarjeta__img"><img src="${producto.imagen}"></div>
                <div class="tarjeta__precio">${producto.precio}</div>
                <div class="tarjeta__button">
                   <button class="button button-outline button-add" id="${producto.id}" title="Clic para agregar al carrito"><p>agregar al carrito</p></button>
                </div>
        </div>`
}

function cargarProductos(array) {
    container.innerHTML = ""
    array.forEach(producto => {
        container.innerHTML += retornoCardHTML(producto)
    })
    activarClickEnBotones()
}

inputSearch.addEventListener("keyup", (e)=> {
    filtrarProductos(e.target.value)
})

function activarClickEnBotones() {
    const botones = document.querySelectorAll("button.button.button-outline.button-add")
          for (const boton of botones) {
            boton.addEventListener("click", ()=> {
                let resultado = productos.find(producto => producto.id === parseInt(boton.id))
                    carrito.push(resultado)
                    guardarCarrito()
            })
          }
}

function guardarCarrito() {
    localStorage.setItem("carritoProductos", JSON.stringify(carrito))
}

function recuperarCarrito() {
    return JSON.parse(localStorage.getItem("carritoProductos")) || []
}

//Llamamos a la función cargar productos y recuperamos un carrito, si existe
cargarProductos(productos)
recuperarCarrito()
