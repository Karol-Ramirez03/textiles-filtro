import { LitElement, html } from "lit"
import { cargarDatos,llamarDatos,actualizarData } from "../mockapi/mockapiData"



export class producto extends LitElement{
    static properties={
        condition:{},
        producto:{},
        cont:{},
        mat:{type:Array},
        data:{type:Array}
    }
    constructor(){
        super()
        this.producto={
            idProducto:'',
            nombre:'',
            horasDeElaboracion:'',
            personalRequrido:'',
            materiales:[],
            costoTotal:''
        }
        this.cont=0
        this._bindListeners()
        this.mat=[]
        this.data=[]
        
    }
    _bindListeners() {
        this._guardarClickHandler = this._guardarClickHandler.bind(this);
        this._agregarClickHandler = this._agregarClickHandler.bind(this);
    }
    render(){
        return html`
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="bootstrap.min.css">
        <div class="pro d-flex justify-content-center align-items-center flex-column">
            <form  style="color:white;" class="form-data addProduct row g-3" >
            <div class="d-flex justify-content-center">
                <div class="info-produc">
                    <div class="col-md-12">
                        <label for="id" class="form-label">ID</label>
                        <input type="text" name="idProducto" class="in form-control" id="id" placeholder="Ingrese el Id" >
                    </div>
                    <div class="col-md-12">
                        <label for="name" class="form-label">Nombre</label>
                        <input type="text" name="nombre" class="in form-control" id="name" placeholder="Nombre"  >
                    </div>
                    <div class="col-md-12">
                        <label for="horas">Horas Requeridas en su elaboracion</label>
                        <input type="number" class="in form-control" name="horasDeElaboracion" placeholder="Horas" id="horas">
                    </div>
                    <div class="col-md-12">
                        <label for="trabajadores" class="form-label">Trabajadores requeridos</label>
                        <input type="number" name="personalRequrido" class="in form-control" id="trabajadores" placeholder="Trabajadores" >
                    </div>
                </div>
            </div>
            </form>
            <div class=" d-flex flex-column">
                <div class="materiales col-md-4 align-self-center">
                    <label for="cost-product" class="form-label">Materiales</label>
                </div>
                <div class="materiales-product">
                <form class="mat-form">
                    <div class="row d-flex material align-items-center">
                        <div class="col-md-6">
                            <label for="idMateria" class="form-label"placeholder="Id Materia prima" >Id De la materia prima</label>
                            <input type="text" class="form-control" name="idMateria" id="idMateria">
                        </div>
                        <div class="col-md-2">
                            <label for="Cantidad" class="form-label">Cantidad</label>
                            <input type="number" class="form-control" name="Cantidad" id="cantidad">
                        </div>
                        <div class="col-md-4">
                            <button type="button" name="anadir" class="añadir btn btn-warning">Añadir materia prima</button>
                        </div>
                    </div>
                </form>
                </div>
            </div> 
            <div class="botones d-flex flex-column justify-content-center  gap-3">
                <div class="col-4">
                    <button  class="guardar btn btn-primary" type="submit">Cargar Producto</button>
                </div> 
            </div>
        </div>
        
        `
    }
    updated(){
       
    }

    firstUpdated() {
        const btnGuardar = this.shadowRoot.querySelector('.guardar');
        const btnAgregar = this.shadowRoot.querySelector('.añadir');
        const divMateriales=this.shadowRoot.querySelector('.materiales-product')
        const btnAñadir = this.shadowRoot.querySelector('.añadir');

        btnAgregar.addEventListener('click', this._agregarClickHandler);
        btnGuardar.addEventListener('click', this._guardarClickHandler);
    }
    
    async _agregarClickHandler(e) {
        e.preventDefault();
        const form = this.shadowRoot.querySelector('.mat-form');
        const datos = Object.fromEntries(new FormData(form).entries());
        const producto = JSON.parse(JSON.stringify(datos));
        const {idMateria,Cantidad}=producto
        try {
            const response = await fetch('https://6659f969de346625136e9f20.mockapi.io/MateriaPrima');
    
            // Verificar si la solicitud fue exitosa
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            // Trabajar con los datos recibidos
            function buscarProductoPorId(id) {
                return data.find(producto => Object.values(producto).includes(id));
            }
            this.data = buscarProductoPorId(idMateria);
        } catch (error) {
            console.error('Fetch error:', error);
        }
        if (this.data==undefined){
            alert('Material no se encuentra en inventario')
        }else if(this.data.idMateriaPrima==idMateria){
            const costo=this.data.costoPorUnidad
            const precio=costo*Cantidad
            this.mat[this.cont]=producto
            this.mat[this.cont].costo=precio
            this.cont += 1;
            this.clearFormFields1()
        }else{
            alert('Ingrese un id')
        }
        console.log(this.mat)
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
        this.producto.materiales=this.mat
        let suma=0
        for (let i=0;i<=this.mat.length-1;i++){
            const valor = this.mat[i].costo
            suma+=valor
        }
        this.producto.costoTotal=suma
        this.clearFormFields()
        cargarDatos('https://6659f969de346625136e9f20.mockapi.io/productos',this.producto)
    }

     clearFormFields() {
        const form= this.shadowRoot.querySelector('.form-data');
        const inputs = form.querySelectorAll('input[type="text"], input[type="number"], textarea, select,nput[type="date"]');
        inputs.forEach(input => {
            input.value = ''; // Restablecer el valor a vacío
        });
    }
    clearFormFields1() {
        const form= this.shadowRoot.querySelector('.mat-form-');
        const inputs = form.querySelectorAll('input[type="text"], input[type="number"], textarea, select,nput[type="date"]');
        inputs.forEach(input => {
            input.value = ''; // Restablecer el valor a vacío
        });
    }
}