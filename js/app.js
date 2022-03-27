//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = carrito.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
}

//Funciones

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}


//Coger contenidos del div #lista-cursos para extraer info y agragar al carrito


function leerDatosCurso(curso){

    //Crear un objecto con el contenido
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Agregar elementos al array de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];

    console.table(articulosCarrito)
    carritoHTML();

}


//Cargar el html del carrito

function carritoHTML(){

    limpiarHTML();

    articulosCarrito.forEach(curso => {
        console.log(curso);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${curso.imagen}" width="100px">
        </td>
        
        <td>${curso.titulo};</td>
        <td>${curso.precio};</td>
        <td>${curso.cantidad};</td>
        `;
        //Agregar el html al carritoHTML
        contenedorCarrito.appendChild(row);
    })
}


//Limpiar HTML, eliminar los cursos del tbody

function limpiarHTML(){
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);

    }

}