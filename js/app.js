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

    //Elimina cursos del carrito

    carrito.addEventListener('click', eliminarCurso);

}

//Funciones

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//Eliminar curso

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del array articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobr el carrito y mostrar html

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

    //Revisar si ya existe en el carrito 
    const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id);
   
    if(existe){

        const cursos = articulosCarrito.map(curso=> {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;//devuelve el objecto actulizado
            } else{
                return curso;//devuelve los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
        console.table(cursos);

    } else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();

}


//Cargar el html del carrito

function carritoHTML(){

    limpiarHTML();

    articulosCarrito.forEach(curso => {
        const {imagen, titulo,precio, id, cantidad} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100px"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}">X</a>
        </td>
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