//variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
let cantidadPresupuesto;
const formulario = document.querySelector('#agregar-gasto');

class Presupuesto {
  constructor(presupuesto){
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
  }
  //metodo para restar al presupuesto actual
  presupuestoRestante(cantidad = 0){
    return this.restante -= Number(presupuesto);
  }
}

//clase para lo relacionado con HTML
class Interfaz {
  insertarPresupuesto(cantidad){
    const presupuestoSpan = document.querySelector('span#total');
    const restanteSpan = document.querySelector('span#restante');
    //insertar en HTML
    presupuestoSpan.innerHTML = `${cantidad}`;
    restanteSpan.innerHTML = `${cantidad}`;
  }
  imprimirMensaje(mensaje, tipo){
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert');
    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
    } else{
      divMensaje.classList.add('alert-success');
    }
    divMensaje.appendChild(document.createTextNode(mensaje));
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    setTimeout(function(){
      document.querySelector('.primario .alert').remove();
      formulario.reset();
    }, 2500);
  }
  //inserta gastos a istado
  agregarGastoListado(nombre, cantidad){
    const gastosListado = document.querySelector('#gastos ul');
    // crear li
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center'
    // insertar gastos
    li.innerHTML = `
      ${nombre}
      <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
    `;
    // insertar en HTML
    gastosListado.appendChild(li);

  }
}


document.addEventListener('DOMContentLoaded', function(){
  if(presupuestoUsuario === null || presupuestoUsuario === ''){
    window.location.reload();
  } else {
    cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
      const ui = new Interfaz();
      ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
  }

  });
  formulario.addEventListener('submit', function(e){
    e.preventDefault();
    const ui = new Interfaz();

    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;
    if (nombreGasto === ''|| cantidadGasto === ''){
      //2 parametros: mensaje y tipo de mensaje
      ui.imprimirMensaje('Hubo un error', 'error');
    }else{
      // ui.imprimirMensaje('El gasto se agrego', '');
      ui.imprimirMensaje('Gasto guardado', 'correcto');
      ui.agregarGastoListado(nombreGasto, cantidadGasto);
    }
  })
