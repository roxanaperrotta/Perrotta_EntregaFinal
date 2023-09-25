//declarar productos

const productos = [
    { id: 1, nombre: "empanada de carne", sabor:"carne", precio: 450, img: "empanadacarne.jpeg", cantidad:1 },
    { id: 2, nombre: "empanada de jamón y queso", sabor: "jamón y queso", precio: 450, img: "empanadajyq.jpeg", cantidad:1 },
    { id: 3, nombre: "empanada de verdura", sabor:"verdura", precio: 450, img: "empanadaverdura.jpeg", cantidad:1 },  
    { id: 4, nombre: "tarta de verdura", sabor:"verdura", precio: 3500, img: "tartaverdura.jpeg", cantidad:1},
    { id: 5, nombre: "tarta de jamón y queso", sabor:"jamón y queso", precio: 3500, img: "tartajyq.jpeg", cantidad:1 },
    { id: 6, nombre: "pizza muzarella", sabor:"muzarella", precio: 3900, img: "pizzamuzza.jpeg" },
    { id: 7, nombre: "pizza napolitana", sabor:"muzarella, tomate y albahaca", precio: 4000, img: "pizzanapo.jpeg", cantidad:1 },
    { id: 8, nombre: "pizza cuatro quesos", sabor:"cuatro quesos", precio: 4200, img: "pizzacuatroquesos.jpeg", cantidad:1},
    { id: 9, nombre: "pizza italiana", sabor:"rúcula, jamón crudo y parmesano", precio: 5200, img: "pizzaitaliana.jpeg", cantidad:1},
  ];

const carrito=[]
  
 
const agregarAlCarrito = (id) => {
    const ProductoExistente = carrito.find(producto => producto.id === id);
    if (ProductoExistente){
      ProductoExistente.cantidad+= 1;
      localStorage.setItem('carrito',JSON.stringify(carrito));
    }
    else{
      const producto = productos.find(producto =>producto.id===id);
      carrito.push(producto);
      localStorage.setItem('carrito',JSON.stringify(carrito));
    }
  }

function actualizarCarrito() {
    let aux = '';
    carrito.forEach((producto) => {
      aux += `
                <div class="card col-xl-3 col-md-6 col-sm-12">
                    <img src="img/${producto.id}.jpg" class="card-img-top img-fluid py-3">
                    <div class="card-body">
                        <h3 class="card-title"> ${producto.nombre} </h3>
                        <p class="card-text"> ${producto.precio} </p>
                        <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                    </div>
                </div>
                `;
    });
  }

  const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    if (producto){
      if (producto.cantidad>1){
        producto.cantidad -= 1;
        localStorage.setItem('carrito',JSON.stringify(carrito));
      } else{
        carrito.splice(carrito.indexOf(producto), 1);
        localStorage.setItem('carrito',JSON.stringify(carrito));
      }
    
    actualizarCarrito();
  }};

  const totalCompra = document.getElementById("fin");
  
  

  const calcularTotalCompra = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    totalCompra.innerHTML = total;
  };
  const vaciarCarrito = () => {
    carrito.splice(0, carrito.length);
  }

//crear elementos en html
const encabezado=document.querySelector("#encabezado");
const contenedor = document.querySelector("#contenedor");
const contenedor1=document.querySelector("#contenedor1");
const contenedor2=document.querySelector("#contenedor2");

function crearencabezado (){
encabezado.innerHTML="";
const html=document.createElement("div");
html.className="div.encabezado"
html.innerHTML = 
` <h1>Bienvenido a Ruta 11</h1>
<h2>Casa de Comidas</h2>
<h3>Hoy pedis y comes en casa</h3>
<h4>Hacé tu pedido</h4>
<img class="logo" src="./imagenes/nuevologo.PNG" alt="logo">
<label for="ingreso">Buscar producto</label>
                <input type="text" name="ingreso" id="ingreso" autofocus />
          
                <button id="btnSearch" class="btn btn-search">BUSCAR</button>`
encabezado.appendChild(html);
function filtrarProducto(arr, nombre) {
  return arr.filter((el) => el.nombre.includes(nombre));
}

const btnSearch = document.querySelector("#btnSearch"),
inputIngreso = document.querySelector("#ingreso");

btnSearch.addEventListener("click", (e) => {
  const filtrados = filtrarProducto(productos, inputIngreso.value);
  crearHtml(filtrados);
});
}

crearencabezado();

function crearHtml(arr) {
  contenedor.innerHTML = "";
  let html;
for (const el of arr) {
  const html = document.createElement("div");
  html.className = "divproductos";
  html.innerHTML = `
                    <div class="card">
                       <img class="tarjeta" src="./imagenes/${el.img}" alt="${el.nombre}">
                       <h3>${el.nombre}</h3>
                       <p>Precio: $${el.precio} </p>  
                       <div class="card-action">
                          <button class="btn btn-add" id="boton${el.id}">Agregar</button>
                       </div>
                    </div>
            `;
  contenedor.appendChild(html);
  const btnAgregar = document.getElementById(`boton${el.id}`);
  btnAgregar.addEventListener("click", () => {
    Toastify({
      text: `Se agregó ${el.nombre} a tu pedido`,
      className: "info",
      position:"right",
      style: {
        background: "linear-gradient(to right, #232526, #414345)",
      }
    }).showToast();
    agregarAlCarrito(el.id);
    crearHtml1(carrito);
  });
}};

crearHtml(productos);



const carritovacio=carrito.length===0;
console.log(carritovacio);



function crearHtml1(arr) {
  contenedor1.innerHTML = "";
  let html;
  for (const el of arr) {
  const html = document.createElement("div");
  html.className = "divcarrito";
  html.innerHTML = `
              <div class="card1">
                 <img class="tarjeta1" src="./imagenes/${el.img}" alt="${el.nombre}">
                 <h5>${el.nombre}</h5>
                 <h5>Precio: $${el.precio} </h5>
                 <h5>Cantidad: ${el.cantidad}</h5>
                 <div class="card-action">
                    <button class="btn btn-remove" id="${el.id}">Quitar</button>
                </div>`
                  ;

  contenedor1.appendChild(html);
  const btnQuitar = document.getElementById(`${el.id}`);
  btnQuitar.addEventListener("click", () => {
    Toastify({
      text: `Producto eliminado del carrito`,
      fontcolor: "black",
      className: "info",
      position: "right",
      style: {
      background: "linear-gradient(to right, #232526, #414345)",
      }
    }).showToast();
    eliminarDelCarrito(el.id);
    crearHtml1(carrito);

  });
  }
}



totalCompra.addEventListener("click", ()=>{
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
   swal.fire({
    
    title: "Finalizar Compra", 
    text: "El total de tu compra es $" + total,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    confirmButtonColor:"#232526",
    cancelButtonColor:"#232526",

   }).then((result)=>{
    if (result.isConfirmed){
        Swal.fire({
          title: 'Gracias por tu compra',
          icon: 'success',
          
        })
      
      vaciarCarrito();
      actualizarCarrito();
      crearHtml1(carrito);  
    }

   })
      
  });
 
  localStorage.setItem('productos',JSON.stringify(productos));
  const productoss=localStorage.getItem("productos");

//ruta relativa

fetch("./data/data.json")
.then(response=>response.json())
.then(datos=>{
  console.log(datos);
})