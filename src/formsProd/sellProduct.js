import { LitElement, html } from "lit";
import { manoDeObra } from "./calcLabour";

export class vender extends LitElement{
    static properties={
        infoVenta:{},
        producto:{type:Array},
        cont:{},
        ids:{type:Array},
        datos:{type:Array}

    }
    constructor(){
        super()
        this.infoVenta={
            nroLote:'',
            productos:[],
            
        }
        this.producto=[]
        this._bindListeners()
        this.cont=0
        this.ids=[]
        this.datos=[]
    }
    _bindListeners() {
        this._guardarClickHandler = this._guardarClickHandler.bind(this);
        this._añadirClickHandler =this._añadirClickHandler.bind(this)
    }
    render(){
        return html`
        <link rel="stylesheet" href="style.css">
        <link rel="stylesheet" href="bootstrap.min.css">
        <div class="mate d-flex flex-column">
            <div class="materiales col-md-4 align-self-center">
                    <label for="cost-product" class="form-label">Ventas Por Lotes</label>
            </div>
            <div class="materiales-product">
                <form style="color:white;" class="form-data">
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
            const dataV = await response.json();
    
            // Trabajar con los datos recibidos
            function buscarProductoPorId(id) {
                return dataV.find(producto => Object.values(producto).includes(id));
            }
            this.dataV = buscarProductoPorId(idProducto);
        } catch (error) {
            console.error('Fetch error:', error);
        }
        if (this.dataV==undefined){
            alert('Producto no se encuentra en registrado')
        }else if(this.dataV.idProducto==idProducto){
            
            let bandera = true;
            const promises = this.dataV.materiales.map(async (element) => {
            console.log(element);
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
                this.data = buscarProductoPorId(element.idMateria);
            } catch (error) {
                console.error('Fetch error:', error);
            }
            const stock = this.data.cantidadEnStock;
            const can = element.Cantidad;
            const producto = cantidad * can;
            const resta=stock - producto
            if (resta > 0) {
                console.log('bien');
                this.data.cantidadEnStock=this.data.cantidadEnStock-producto
                this.ids.push(this.data.id)
                this.datos.push(this.data)
            } else {
                alert(`Stock insuficiente agrega mas ${this.data.nombre}`);
                bandera = false;
            }
            });

            // Esperar a que todas las promesas se resuelvan
            Promise.all(promises).then(() => {
                console.log(bandera)
            if (bandera === true) {
                const costo = this.dataV.costoTotal;
                const nombre = this.dataV.nombre;
                this.producto[this.cont] = venta;
                this.producto[this.cont].valor = costo;
                this.producto[this.cont].producto = nombre;
                this.cont += 1;
                this.infoVenta.nroLote = nroLote;
                this.ids.forEach((element,index)=>{
                    this.actualizar(element,this.datos[index])
                })
                
                this.clearFormFields();
            } else {
                console.log('mal');
            }
            });

                
        }else{
            alert('Ingrese un id')
        }

    }
    async actualizar(id, updatedItem) {
        try {
          const response = await fetch(`https://6659f969de346625136e9f20.mockapi.io/MateriaPrima/${id}`, { 
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedItem)
          });
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          this.editItem = null; 
          this.traerData(); 
        } catch (error) {
          console.error('Error updating item:', error);
        }
      }
    
}