let carrito = JSON.parse(localStorage.getItem('carrito')) || []

const carritoProductos=document.querySelector('.carrito')
const contadorCarrito=document.querySelector('.contador-carrito')
let botonEliminar=document.querySelectorAll('.btnEliminar')
const contenedorTotal= document.querySelector('.contenedor-carritoTotal')
const tituloCarrito= document.querySelector('.titulo-carrito')
const tituloCarrito2=document.querySelector('.titulo-carrito2')

//CREAMOS LA PLANTILLA DE LOS PRODUCTOS DEL CARRITO

function cargarProductosCarrito(){

    if(carrito.length > 0){

        contenedorTotal.classList.remove('disabled')
        tituloCarrito.classList.remove('disabled')
        tituloCarrito2.classList.add('disabled')


        carritoProductos.innerHTML=""

    

    carritoProductos.innerHTML=""

    carrito.forEach(prod=>{
        const div=document.createElement('div')
        div.className=('carritoDeCompras')
        div.innerHTML=`
        <div class=contenedorCarritoCompras>
        <img class="imagenProducto" src='.${prod.img}' alt='${prod.id}'>
        <div class="nombreProducto">
            <h3>PRODUCTO</h3>
            <P>${prod.producto}</P>
        </div>
        <div class="cantidadProducto">
            <h3>CANTIDAD</h3>
            <p>${prod.cantidad}</p>
        </div>
        <div class="precioProducto">
            <h3>PRECIO</h3>
            <P>${prod.precio*prod.cantidad}$</P>
        </div>
        <div class="botonEliminar">
            <button id=${prod.id} class="btnEliminar"><img src="../img/iconos/eliminar.png" alt=""></button>
        </div>
        </div>
        `
    
        carritoProductos.appendChild(div)
        
    })
    



botonesEliminarCarrito()//FUNCION DEL BOTON PARA ELIMINAR PRODUCTO DEL CARRITO
actualizarTotal()//PRECIO TOTAL A PAGAR





}else{
    contenedorTotal.classList.add('disabled')
    tituloCarrito.classList.add('disabled')
    tituloCarrito2.classList.remove('disabled')
    carritoProductos.classList.add('disabled')
}
}

cargarProductosCarrito()


// CREAMOS LOS BOTONES PARA ELIMINAR LOS PRODUCTOS DEL CARRITO

function botonesEliminarCarrito(){
    botonEliminar=document.querySelectorAll('.btnEliminar')
    botonEliminar.forEach(boton=>{
        boton.addEventListener('click',eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){
    const idBoton=e.currentTarget.id
    const index=carrito.findIndex(prod=>prod.id==idBoton)
    carrito.splice(index,1)
    facturaCompra.classList.add('disabled')
    Toastify({

        text: "PRODUCTO ELIMINADO 🗑️",
        style: {
            background: "#cdb4db",
            color:"#fafafa",
            border: "#fafafa solid .1rem",
            padding: "10px",
            "border-radius":"1.4rem",
            "font-size":"1.2rem"
          },
        duration: 1000
        
        }).showToast();
    cargarProductosCarrito()
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

//ACTUALIZAMOS EL PRECIO TOTAL A PAGAR 
const precioTotal= document.querySelector('#precio')
const botonComprar=document.querySelector('#comprar')
const precioTotalPagar= document.querySelector('#producto')
const facturaCompra=document.querySelector('.facturaCompra')


const primerCuota= document.querySelector('#primerCuota')
const tercerCuota= document.querySelector('#tercerCuota')
const sextaCuota= document.querySelector('#sextaCuota')




function actualizarTotal(){
    let totalCarrito= carrito.reduce((acumulador,prod)=>acumulador+(prod.precio * prod.cantidad),0)
    precio.innerText= `TOTAL: $${totalCarrito}`
}



function pagoCuotas(){
    const precioCuotaUno= carrito.reduce((acum,prod)=>acum+(prod.precio * prod.cantidad),0)
    primerCuota.innerText=`1 cuota de $${precioCuotaUno}`
    primerCuota.value=`1 CUOTA DE $${precioCuotaUno}`

    const precioCuotaTres= carrito.reduce((acum,prod)=>acum+Math.floor((prod.precio * prod.cantidad)/3),0)
    tercerCuota.innerText=`3 cuotas de $${precioCuotaTres}` 
    tercerCuota.value=`3 CUOTAS DE $${precioCuotaTres}`

    const precioCuotaSeis= carrito.reduce((acum,prod)=>acum+Math.floor((prod.precio * prod.cantidad)/6),0)
    sextaCuota.innerText=`6 cuotas de $${precioCuotaSeis}`
    sextaCuota.value=`6 CUOTAS DE $${precioCuotaSeis}`

}

pagoCuotas()




botonComprar.addEventListener("click",()=>{
    carrito.length>0 ? facturaCompra.classList.remove('disabled') : facturaCompra.classList.add('disabled')
})




const btnPagar= document.querySelector('.btn-pagar')
const recibo=document.querySelector('.contenedorRecibo')
const tituloCompras=document.querySelector('.titulo-compras')
let nombreFactura=document.querySelector('#nombre')
let apellidoFactura=document.querySelector('#apellido')
let domicilioFactura=document.querySelector('#domicilio')
let celularFactura=document.querySelector('#celular')
let emailFactura=document.querySelector('#mail')
let codigoFactura=document.querySelector('#codigoPostal')
let nombreTitularFactura=document.querySelector('#nombreTitular')
let tarjetaFactura=document.querySelector('#tarjeta')
let cuotas=document.querySelector("#cuotasTarjeta")
const vaciarCarrito=document.querySelector('#vaciar')





const boletaContenedor=document.querySelector("#contenedorBoleta");
const resumenCompra=document.querySelector('#resumenCompra')





resumenCompra.addEventListener("click", () => {
    if(carrito=!''){
        let persona = {
            //DATOS PERSONALES//
            Nombre: nombreFactura.value,
            Apellido: apellidoFactura.value,
            Domicilio: domicilioFactura.value,
            Celular: celularFactura.value,
            Email: emailFactura.value,
            Codigo: codigoFactura.value,
            //TARJETA DE CREDITO//
            NombreTitular: nombreTitularFactura.value,
            NumeroTarjeta: tarjetaFactura.value,
            cuotasTotal:cuotas.value
            
        };
        
        localStorage.setItem('persona', JSON.stringify(persona));

        
        const div= document.createElement('div');
        div.className=('cuerpoBoleta');
        div.innerHTML=`
                <h2 id="titulo">¡GRACIAS POR TU COMPRA! ${persona.Nombre}  </h2>
                <h3 id="envio">CORROBORAR EL ENVIO EN TU MAIL: <span class="colorVerde"> ${persona.Email}</span></h3>
                <h3 id="pago">FORMA DE PAGO<span class="colorVerde"> ${persona.cuotasTotal}$</span></h3> </h3>
                <h3 id="titular">TITULAR DE LA TARJETA:  <span class="colorVerde">${persona.NombreTitular}</span> NUMERO DE LA TARJETA:<span class="colorVerde">${persona.NumeroTarjeta}</h3>
                <button class="btn-pagar">PAGAR</button>
        `
        boletaContenedor.append(div);
        pagarTodo();    
    }
    
    
    tituloCarrito.classList.add("disabled");
    tituloCarrito2.classList.add("disabled");
    carritoProductos.classList.add("disabled");
    contenedorTotal.classList.add("disabled");
    facturaCompra.classList.add("disabled");
})

function pagarTodo() {
    const btnPagar= document.querySelector('.btn-pagar')
    btnPagar.addEventListener("click", () => {
    if (carrito != "") {
        Swal.fire({
            title: "PRODUCTO COMPRADO",
            text: "GRACIAS POR SU COMPRA!",
            icon: "success",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
            contenedorTotal.classList.add('disabled')
            tituloCarrito.classList.add('disabled')
            tituloCarrito2.classList.remove('disabled')
            carritoProductos.classList.add('disabled')
            boletaContenedor.classList.add('disabled')
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            }
        })
       
    }
});
}

vaciarCarrito.addEventListener('click',()=>{
    Swal.fire({
        title: 'ESTAS SEGURO?',
        text: "NO VAS A PODER RECUPERAR EL PRODUCTO!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, BORRAR!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'ELIMINADO!',
            'EL PRODUCTO FUE ELIMINADO.',
            'success'
          )
        contenedorTotal.classList.add('disabled')
        tituloCarrito.classList.add('disabled')
        tituloCarrito2.classList.remove('disabled')
        carritoProductos.classList.add('disabled')
        boletaContenedor.classList.add('disabled')
        carrito.length = 0;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        }
    })
})




