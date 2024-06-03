import { LitElement, html } from "lit"

export class producto extends LitElement{
    static properties={
        condition:{},
        producto:{},
        cont:{}
    }
    constructor(){
        super()
        this.producto={
            idProducto:'',
            nombre:'',
            horasDeElaboracion:'',
            personalRequrido:'',
            materiales:{}
        }
        this.cont=0
        this._bindListeners()
    }
    _bindListeners() {
        this._guardarClickHandler = this._guardarClickHandler.bind(this);
        this._agregarClickHandler = this._agregarClickHandler.bind(this);
        this._quitarClickHandler = this._quitarClickHandler.bind(this)
        this._editarClickHandler = this._editarClickHandler.bind(this)
    }
    render(){
        return html`
        <style>
            @import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
            @import "./style.css";
        </style>
        <form  class="form-data addProduct row g-3 d-flex justify-content-center" >
        <div class="info-product">
            <div class="col-md-12">
                <label for="id" class="form-label">ID</label>
                <input type="text" name="idProducto" class="in form-control" id="id" placeholder="Ingrese el Id" >
            </div>
            <div class="col-md-12">
                <label for="name" class="form-label">Nombre</label>
                <input type="text" name="nombre" class="in form-control" id="name" >
            </div>
            <div class="col-md-12">
                <label for="horas">Horas Requeridas en su elaboracion</label>
                <input type="number" class="in form-control" name="horasDeElaboracion" placeholder="" id="horas"></input>
            </div>
            <div class="col-md-12">
                <label for="trabajadores" class="form-label">Trabajadores requeridos</label>
                <input type="number" name="personalRequrido" class="in form-control" id="trabajadores">
            </div>
            
        </div>
        <div class="materiales d-flex flex-column">
            <div class="col-md-4 align-self-center">
                <label for="cost-product" class="form-label">Materiales</label>
                <button class="agregar btn btn-primary" type="submit">+</button>
            </div>
            <div class="materiales-product">
            </div>
        </div> 
        </form>
        <div class="col-12">
            <button  class="guardar btn btn-primary" type="submit">Cargar Producto</button>
        </div>
        <div class="divEditar col-12">
            <button  class="editar btn btn-warning" type="submit">Editar Producto</button>
        </div>
        
        `
    }
    updated(){

    }

    firstUpdated() {
        const btnGuardar = this.shadowRoot.querySelector('.guardar');
        const btnAgregar = this.shadowRoot.querySelector('.agregar');
        const divMateriales=this.shadowRoot.querySelector('.materiales-product')
        const btnEditar = this.shadowRoot.querySelector('.editar');

        btnAgregar.addEventListener('click', this._agregarClickHandler);
        btnGuardar.addEventListener('click', this._guardarClickHandler);
        divMateriales.addEventListener('click', this._quitarClickHandler);
        btnEditar.addEventListener('click', this._editarClickHandler);

    }

    _agregarClickHandler(e) {
        e.preventDefault();
        this.cont += 1;
        const divMateriales = this.shadowRoot.querySelector('.materiales-product');
        
        const div =`
        <div class="row justify-content-md-center material${this.cont}">
            <div class="col-md-8">
                <label for="idMateria${this.cont}" class="form-label">Id De la materia prima</label>
                <input type="text" class="form-control" name="idMateria${this.cont}" id="idMateria${this.cont}">
            </div>
            <div class="col-md-2">
                <label for="Cantidad${this.cont}" class="form-label">Cantidad</label>
                <input type="number" class="form-control" name="Cantidad${this.cont}" id="cantidad${this.cont}">
            </div>
            <div class="col-md-1 position-relative">
                <button type="button" name="quitar" class=" btn btn-danger position-absolute bottom-0 start-0" data-id="${this.cont}">-</button>
            </div>
        </div>
        `;
        divMateriales.insertAdjacentHTML('beforeend', div);
    }

    _guardarClickHandler(e) {
        e.preventDefault();
        const form = this.shadowRoot.querySelector('.form-data');
        const datos = Object.fromEntries(new FormData(form).entries());
        const producto = JSON.parse(JSON.stringify(datos));
        const { idProducto, nombre, horasDeElaboracion, personalRequrido, ...material } = producto;
        this.producto.idProducto = idProducto;
        this.producto.nombre = nombre;
        this.producto.horasDeElaboracion = horasDeElaboracion;
        this.producto.personalRequrido = personalRequrido;
        this.producto.materiales = material;
        console.log(this.producto);
        const response=  fetch('https://6659f969de346625136e9f20.mockapi.io/productos', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.producto)
          })
          
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              alert('Datos guardados exitosamente!');
          })
          .catch((error) => {
              console.error('Error:', error);
              alert('Hubo un error al guardar los datos.');
          });
    }
    _quitarClickHandler(e){
        e.preventDefault();
        console.log(e.target.dataset.id)
        if (e.target.name=='quitar'){
            let id=e.target.dataset.id
            let divEliminar=this.shadowRoot.querySelector(`.material${id}`)
            divEliminar.parentNode.removeChild(divEliminar)
        }
    }
    _editarClickHandler(e){
        e.preventDefault();
        
    }
}