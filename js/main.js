
let productos = []
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        const personalizadas = (productos.filter(productos => productos.categoria.id === 'personalizadas'))
        cargarProductos(personalizadas)
    })






//DECLARAMOS VARIABLES Y SELECCIONAMOS LAS CLASES - ID DEL HTML

//DECLARAMOS VARIABLES Y SELECCIONAMOS LAS CLASES - ID DEL HTML

const contenedorFundas = document.querySelector('.contenedor-fundas')
const boton_active = document.querySelectorAll('.btn-categoria')
const tituloFundas = document.querySelector('#tituloFundas')
const numerContador = document.querySelector('#numeroContador')







//PLANTILLA PARA CARGAR PRODUCTOS

function cargarProductos(productosSeleccionados) {

    //VACIAMOS EL INNER HTML PARA QUE NO SE MULTIPLIQUEN LOS PRODUCTOS AL HACER CLICK EN SU RESPECTIVO BOTON

    contenedorFundas.innerHTML = ''


    productosSeleccionados.forEach(productos => {
        const div = document.createElement('div')
        div.classList.add('fundas')
        div.innerHTML = `<img src="${productos.img}" alt="${productos.producto}">
                        <div class="caracteristicas-img">
                            <h3>${productos.producto}</h3>
                            <p>${productos.precio}$</p>
                            <button id="${productos.id}" class="boton-agregar">COMPRAR</button>
                        </div>`

        contenedorFundas.append(div)

    })

    const botonesComprar = document.querySelectorAll(`.boton-agregar`)

    botonesComprar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            agregarCarrito(e.target.id)
        })
    })

}

//CREAMOS LOS BOTONES AÑADIENDO LA CLASE ACTIVE

boton_active.forEach(boton => {
    boton.addEventListener("click", (e) => {
        boton_active.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active")
        //HACEMOS QUE AL HACER CLICK EN DICHO BOTON MUESTRE SUS RESPECTIVOS PRODUCTOS
        const productosMostrar = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
        // CUANDO HACEMOS CLICK CAMBIA EL TITULO CON SU RESPECTIVO NOMBRE
        const tituloProductos = productos.find(producto => producto.categoria.id === e.currentTarget.id)
        tituloFundas.innerHTML = `EJEMPLOS DE ${tituloProductos.categoria.nombre}`

        cargarProductos(productosMostrar)


    })
})



//CREAMOS EL CARRITO DE COMPRAS
//CREAMOS LA VARIABLE CARRITO Y LA VARIABLE CARRITO MAIN PARA ALMACENAR EL LOCALSTORAGE
let carrito = JSON.parse(localStorage.getItem('carrito')) || []


//CREAMOS UNA FUNCION. SI EL PRODUCTO DEL CARRITO EXISTE SE LE AUMENTE LA CANTIDAD EN EL CARRITO Y SI NO EXISTE LO AGREGUE AL CARRITO

function agregarCarrito(id) {
    let prodEcontrado = productos.find(producto => producto.id === parseInt(id))
    const existe = carrito.find(productos => productos.id === parseInt(id));
    if (existe) {
        existe.cantidad++
        localStorage.setItem('carrito', JSON.stringify(carrito))
        actualizarNumeroCarrito()
    } else {
        carrito.push(prodEcontrado)
        localStorage.setItem('carrito', JSON.stringify(carrito))
        actualizarNumeroCarrito()
        
    }
    Toastify({
        text: "PRODUCTO AGREGADO AL CARRITO 🌟",
        style: {
            background: "#cdb4db",
            color: "#fafafa",
            border: "#fafafa solid .1rem",
            padding: "10px",
            "border-radius": "1.4rem",
            "font-size": "1.2rem"
        },
        duration: 2000
    }).showToast();
}



//CREAMOS UA FUNCION PARA QUE SE REFLEJE EN EL NUMERO DEL BOTON DEL CARRITO LA CANTIDAD DE PRODUCTOS


function actualizarNumeroCarrito() {
    let numeroDelCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.cantidad, 0)
    numerContador.innerText = numeroDelCarrito
    console.log(numeroDelCarrito)
}

actualizarNumeroCarrito()