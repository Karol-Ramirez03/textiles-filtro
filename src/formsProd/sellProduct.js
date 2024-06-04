import { LitElement, html } from "lit";
import { manoDeObra } from "./calcLabour";

export class vender extends LitElement{
    static properties={
        infoVenta:{},
        producto:{type:Array},
        cont:{}

    }
    constructor(){
        super()
        this.infoVenta={
            nroLote:'',
            productos:[],
            valorLote:''
        }
        this.producto=[]
        this._bindListeners()
        this.cont=0
    }
    _bindListeners() {
        this._guardarClickHandler = this._guardarClickHandler.bind(this);
        this._añadirClickHandler =this._añadirClickHandler.bind(this)
    }
    render(){
        return html`
        <style>
            @import "node_modules/bootstrap/dist/css/bootstrap.min.css";
            @import "./style.css";
        </style>
        <div class="mate d-flex flex-column">
            <div class="materiales col-md-4 align-self-center">
                    <label for="cost-product" class="form-label">Ventas Por Lotes</label>
            </div>
            <div class="materiales-product">
                <form class="form-data">
                    <div class="row d-flex material align-items-center">
                        <div class="col-md-4">
                            <label for="idProducto" class="form-label">Id Del Producto</label>
                            <input type="text" class="form-control" name="idProducto" id="idProducto">
                        </div>
                        <div class="col-md-2">
                            <label for="Cantidad" class="form-label">Cantidad</label>
                            <input type="number" class="form-control" name="cantidad" id="cantidad">
                        </div>
                        <div class="col-md-3">
                            <label for="nroLote" class="form-label">Numero de lote</label>
                            <input type="number" class="form-control" name="nroLote" id="nroLote">
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="añadir btn btn-warning">Agregar producto</button>
                        </div>
                    </div>
                </form>
                <div class="col-md-4">
                    <button type="button" class="guardar btn btn-primary">Guardar</button>
                </div>
            </div>
        </div> 
        `
    }
    updated(){
        const btnAñadir=this.shadowRoot.querySelector('.añadir')
        const btnGuardar=this.shadowRoot.querySelector('.guardar')
        btnGuardar.addEventListener('click', this._guardarClickHandler);
        btnAñadir.addEventListener('click', this._añadirClickHandler)

    }
    _guardarClickHandler(){
        const form=this.shadowRoot.querySelector('.form-data')
        
        this.infoVenta.productos=this.producto
       
        let suma=0
        for (let i=0;i<=this.producto.length-1;i++){
            const valor = this.producto[i].costo
            suma+=valor
        }
        this.infoVenta.valorLote=suma
        localStorage.setItem('costoMateriaPrima', JSON.stringify(this.infoVenta))

        console.log(this.infoVenta)
            // hacer algo para almacenar

            const divInfo = this.shadowRoot.querySelector(".mate");
            divInfo.innerHTML=''
            const manodiv = document.createElement("mano-div");
            divInfo.appendChild(manodiv);
            customElements.define("mano-div", manoDeObra);
    }
    clearFormFields() {
        const form= this.shadowRoot.querySelector('.form-data');
        const inputs = form.querySelectorAll('input[type="text"], input[type="number"], textarea, select,nput[type="date"]');
        inputs.forEach(input => {
            input.value = ''; // Restablecer el valor a vacío
        });
    }
    async _añadirClickHandler(){
        const form=this.shadowRoot.querySelector('.form-data')
        const  datos= Object.fromEntries(new FormData(form).entries())
        const  venta= JSON.parse(JSON.stringify(datos));
        const {idProducto,cantidad,nroLote}=venta
        
        try {
            const response = await fetch('https://6659f969de346625136e9f20.mockapi.io/productos');
    
            // Verificar si la solicitud fue exitosa
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            // Trabajar con los datos recibidos
            function buscarProductoPorId(id) {
                return data.find(producto => Object.values(producto).includes(id));
            }
            this.data = buscarProductoPorId(idProducto);
        } catch (error) {
            console.error('Fetch error:', error);
        }
        if (this.data==undefined){
            alert('Producto no se encuentra en registrado')
        }else if(this.data.idProducto==idProducto){
            const costo=this.data.costoTotal
            const nombre=this.data.nombre
            this.producto[this.cont]=venta
            this.producto[this.cont].valor=costo
            this.producto[this.cont].producto=nombre
            this.cont+=1
            this.infoVenta.nroLote=nroLote
            this.clearFormFields()
        }else{
            alert('Ingrese un id')
        }
    }
    
}