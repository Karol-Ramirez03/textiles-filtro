  import { LitElement, html } from "lit";

export class materiaPrima extends LitElement{
    
    static properties={
        condition:{},
        product:{},
        fecha:{}
    }
    constructor(){
        super();
        this.product={
            idMateriaPrima: "",
            nombre: "",
            descripcion: "",
            categoria: "",
            proveedor: "",
            costoPorunidad: 0,
            unidadDeMedida: "",
            cantidadEnStock: 0,
            fechaDeAdquisicion: "",
            fechabeVencimiento: "",
            ubicacionEnAlmacen: "",
            notasAdicionales: ""
            }
        this.fecha=[0,'null']
    }
    render(){
       return html`
        <style>
            @import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
            @import "./style.css";
        </style>
        <form  class="form-data addMatriaPrima row g-3" >
        <div class="col-md-4">
          <label for="id-product" class="form-label">ID</label>
          <input type="text" name="idMateriaPrima" class="in form-control" id="id-product" placeholder="Ingrese el Id" >
        </div>
        <div class="col-md-4">
          <label for="name-product" class="form-label">Nombre</label>
          <input type="text" name="nombre" class="in form-control" id="name-product" >
        </div>
        <div class="col-md-4">
          <label for="description-product">Descripcion</label>
          <textarea class="in form-control" name="descripcion" placeholder="Leave a comment here" id="description-product" style="height: 100px"></textarea>
        </div>
        <div class="col-md-3">
          <label for="type-product" class="form-label">Categoria</label>
          <select class="in form-select" name="categoria" id="type-product">
            <option selected disabled value="">Elige...</option>
            <option>Hilos</option>
            <option>Tela</option>
            <option>Botones</option>
          </select>
        </div>
        <div class="col-md-4">
          <label for="provider-product" class="form-label">Proveedor</label>
          <input type="text" name="proveedor" class="in form-control" id="provider-product">
        </div>
        <div class="col-md-4">
          <label for="cost-product" class="form-label">costo c/u</label>
          <input type="number" name="costoPorunidad" class="in form-control" id="cost-product">
        </div>
        <div class="col-md-4">
          <label for="unidad-product" class="form-label">Unidad de medida</label>
          <input type="text" name="unidadDeMedida" class="in form-control" id="unidad-product">
        </div>
        <div class="col-md-4">
          <label for="stock-product" class="form-label">Stock</label>
          <input type="number" name="cantidadEnStock" class="in form-control" id="stock-product">
        </div>
        <div class="col-md-3">
          <label for="fechaDeAdquisicion" class="form-label">Fecha de llegada</label>
          <input type="date" name="fechaDeAdquisicion" class="in form-control" id="fechaDeAdquisicion" >
        </div>
        <div class="col-md-3">
          <label for="fechaDeAdquisicion" class="form-label">Fecha de vencimiento</label>
          <input type="date" name="fechaDeAdquisicion" class="in form-control" id="fechaDeAdquisicion" >
        </div>
        <div class=" col-md-4">
          <label for="ubicacion-product" class="form-label">Ubicacion del producto</label>
          <input type="text" name="ubicacionEnAlmacen" class="in form-control" id="ubicacion-product" placeholder="" >
        </div>
        <div class="col-md-4">
          <label for="notes-product">Notas Adicionales</label>
          <textarea class="in form-control" name="notasAdicionales" placeholder="Leave a comment here" id="notes-product" style="height: 100px"></textarea>
        </div>
        <div class="col-12">
          <button  class="rosado guardar btn btn-primary" type="submit">Submit form</button>
        </div>
      </form>
      `;
    }
    updated(){
        const btnGuardar=this.shadowRoot.querySelector('.guardar')
        btnGuardar.addEventListener('click',(e)=>{
            e.preventDefault();
            const  form= this.shadowRoot.querySelector('.form-data')
            const  date= this.shadowRoot.querySelectorAll('input[type="date"]')
            const  datos= Object.fromEntries(new FormData(form).entries())
            const  producto= JSON.parse(JSON.stringify(datos));
            const {idMateriaPrima,nombre,descripcion,categoria,proveedor,costoPorunidad,unidadDeMedida,cantidadEnStock,fechaDeAdquisicion,ubicacionEnAlmacen,notasAdicionales}=producto
            date.forEach(( element,index )=>{
              this.fecha[index]=element.value
            })
            console.log(date)
            this.product.idMateriaPrima=idMateriaPrima
            this.product.nombre=nombre
            this.product.descripcion=descripcion
            this.product.categoria=categoria
            this.product.proveedor=proveedor
            this.product.costoPorunidad=costoPorunidad
            this.product.unidadDeMedida=unidadDeMedida
            this.product.cantidadEnStock=cantidadEnStock
            this.product.fechaDeAdquisicion=this.fecha[0]
            this.product.fechabeVencimiento=this.fecha[1]
            this.product.ubicacionEnAlmacen=ubicacionEnAlmacen
            this.product.notasAdicionales=notasAdicionales
            
            console.log(this.product)
            console.log({idMateriaPrima,nombre,descripcion,categoria,proveedor,costoPorunidad,unidadDeMedida,cantidadEnStock,fechaDeAdquisicion,ubicacionEnAlmacen,notasAdicionales})

          const response=  fetch('https://6659f969de346625136e9f20.mockapi.io/MateriaPrima', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.product)
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

        })
    }
   
};