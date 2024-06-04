import { LitElement, html, css } from 'lit';

export class DataDisplay extends LitElement {
  // style
    static styles = css`
    
    :host {
      display: block;
      width: 90vw; /* Ocupa todo el ancho de la pantalla */
      box-sizing: border-box;
    }

    .contenedor_informes {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      
      box-sizing: border-box;
      
      width: 100%; /* Asegura que el contenedor ocupe todo el ancho */
    }
    .card{
      width: 30%; /* Asegura que el contenedor ocupe todo el ancho */
      margin-top: 20px;
    }
    .item {
      border: 1px solid #ccc;
      padding: 16px;
      margin-bottom: 16px;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .form-container {
      display: none;
      border: 1px solid #ccc;
      padding: 16px;
      margin-bottom: 16px;
      width: 80%;
      border-radius: 8px;
      background-color: #eef;
    }
    .cont_edicion{
        display: flex;
        justify-content:center ;
        align-items: center;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #2f2f2f25;
        top: 0;
        right:0;
    }
    .form-container.active {
      display: block;
     
    }
    button {
      margin: 5px;
    }
    @media (max-width: 980px) {
      .card {
        width: 90%; /* Asegura que el contenedor ocupe todo el ancho */
      }
    }
    @media (max-width: 500px) {
      .card {
        width: 90%; /* Asegura que el contenedor ocupe todo el ancho */
      }
      :host { 
        width: 70vw; /* Ocupa todo el ancho de la pantalla */
      }
    }
  `;
  static properties = {
    data: { type: Array },
    editItem: { type: Object }
  };

  constructor() {
    super();
    this.data = [];
    this.editItem = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.traerData();
  }
  clickdiv() {
    this.editItem = null;
    this.requestUpdate();
  }
  
  async traerData() {
    try {
      const response = await fetch('https://6659f969de346625136e9f20.mockapi.io/informe'); 
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      this.data = data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async actualizar(id, updatedItem) {
    try {
      const response = await fetch(`https://6659f969de346625136e9f20.mockapi.io/informe/${id}`, { 
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

  async eliminar(id) {
    try {
      const response = await fetch(`https://6659f969de346625136e9f20.mockapi.io/informe/${id}`, { 
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      this.traerData(); // Refresh data after delete
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  render() {
    return html`
    <div class="contenedor_informes">
    ${this.data.map(item => {
      // mano obra
      const salario_base = parseInt(item.manoDeObra.salario_base, 10)
      const horas_trabajadas = parseInt(item.manoDeObra.horas_trabajadas, 10)
      const beneficios = parseInt(item.manoDeObra.beneficios, 10)
      const prestaciones = parseInt(item.manoDeObra.prestaciones, 10)
      const costos_indirectos = parseInt(item.manoDeObra.costos_indirectos, 10)
      const empleados = parseInt(item.manoDeObra.empleados, 10)

      const base_horas = salario_base*horas_trabajadas
      const suma_obra = beneficios+prestaciones+costos_indirectos
      const sumaporempleados = suma_obra*empleados
      const manoDeObraTotal = base_horas + sumaporempleados;
      

      // materia prima
      let materiaPrimaTotal = 0;
      let sumaCantidad = 0;
      

      const materiaPrimaDetalles = item.materiaPrima.map(producto => {
        const totalProducto =parseInt(producto.valor ,10)  * parseInt(producto.cantidad,10);
        materiaPrimaTotal += totalProducto;
        sumaCantidad += parseInt(producto.cantidad,10);
        return html`
          <p class="card-title">${producto.producto}: ${totalProducto}</p>
        `;
      });

      //costos indirectos

      let sumacosto = 0
      const costos = item.costosIndirectos.descripcion
      const horasmes = horas_trabajadas*empleados
      let costosindirectos= 0

      const detallesCostoaIndirectos = costos.map(costo =>{
          sumacosto += parseInt(costo.valor,10)
          costosindirectos = (sumacosto*horas_trabajadas)/horasmes
          return html `
           <p class="card-title">${costo.tipocosto}: ${costo.valor}</p>
          `
      })

      //productividad

      const defectuosos =  parseInt(item.productividad,10)
      const sumatotal = costosindirectos+materiaPrimaTotal+manoDeObraTotal
      const produccionEfectiva = sumaCantidad-defectuosos

      console.log(sumaCantidad)
      console.log(horas_trabajadas)
      const productividad = Math.ceil(sumaCantidad / horas_trabajadas)
      const costoOperativos =sumatotal/sumaCantidad
      const tasaDefectuosos = (defectuosos/sumaCantidad)*100
      const eficienciaOperativa = produccionEfectiva/sumatotal

      //por producto
      const manoObraProducto = manoDeObraTotal/sumaCantidad
      const materiaPrimaProducto = materiaPrimaTotal/sumaCantidad
      const costosProducto = costos_indirectos/sumaCantidad

     const sumaproducto = manoObraProducto+materiaPrimaProducto+costosProducto

      return html`
      <style rel="stylesheet">
        @import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
      </style>
      <div class="card" >
      
        <h5 class="card-header">${item.id}</h5>
        
        <div class="card-body">
        <h3 class="card-title">Productividad: </h3>
          <p class="card-title">productividad: ${productividad} unidades por hora</p>
          <p class="card-title">costo operativos por unidad: ${costoOperativos}</p>
          <p class="card-title">tasa de defectos: ${tasaDefectuosos}%</p>
          <p class="card-title">eficiencia operativa: ${eficienciaOperativa}</p>
          
          <h3 class="card-title">Costos por lote:</h3>
          <h6 class="card-title">Mano de obra: </h6>
          ${manoDeObraTotal}
          <h6 class="card-title">Materia prima: </h6>
          ${materiaPrimaDetalles}
          <p class="card-title">costos totales: ${materiaPrimaTotal}</p>


          <h6 class="card-title">Costos indirectos:</h6>
          ${detallesCostoaIndirectos}
          <p class="card-title">costos indirectos totales por lote: ${costosindirectos}</p>


          <h5 class="card-title">Costos por lote: ${sumatotal}</h5>

          <h3 class="card-title">Costos por producto: </h3>
          <p class="card-title">Mano de obra: ${manoObraProducto} </p>
          <p class="card-title">Materia prima: ${materiaPrimaProducto} </p>
          <p class="card-title">Costos indirectos: ${costosProducto} </p>
          <h5 class="card-title">Costos por producto: ${sumaproducto}</h5>


          <button class="btn btn-primary" @click="${() => { this.editItem = { ...item }; }}">Editar</button>
          <button class="btn btn-primary" @click="${() => this.eliminar(item.id)}">Eliminar</button>
        </div>
      </div>`;
      
    })}
    </div>
      
      ${this.editItem ? html`
        <div class="cont_edicion" >
        
        <div class="form-container active">
        <p @click="${this.clickdiv}">X</p>
        <form @submit="${(e) => {
          e.preventDefault();
          e.stopPropagation()
          this.actualizar(this.editItem.id, this.editItem);
        }}">
          <h3>Editando ID: ${this.editItem.id}</h3>
          <fieldset>
            <legend>Mano de Obra</legend>
            <label>
              Salario Base:
              <input type="number" name="manoDeObra.salario_base" .value="${this.editItem.manoDeObra.salario_base}" @input="${(e) => {
                this.editItem.manoDeObra.salario_base = e.target.value;
            
              }}">
            </label>
            <label>
              Beneficios:
              <input type="number" name="manoDeObra.beneficios" .value="${this.editItem.manoDeObra.beneficios}" @input="${(e) => {
                this.editItem.manoDeObra.beneficios = e.target.value;
            
              }}">
            </label>
            <label>
              Prestaciones:
              <input type="number" name="manoDeObra.prestaciones" .value="${this.editItem.manoDeObra.prestaciones}" @input="${(e) => {
                this.editItem.manoDeObra.prestaciones = e.target.value;
            
              }}">
            </label>
            <label>
              Costos Indirectos:
              <input type="number" name="manoDeObra.costos_indirectos" .value="${this.editItem.manoDeObra.costos_indirectos}" @input="${(e) => {
                this.editItem.manoDeObra.costos_indirectos = e.target.value;
            
              }}">
            </label>
            <label>
              Horas Trabajadas:
              <input type="number" name="manoDeObra.horas_trabajadas" .value="${this.editItem.manoDeObra.horas_trabajadas}" @input="${(e) => {
                this.editItem.manoDeObra.horas_trabajadas = e.target.value;
            
              }}">
            </label>
            <label>
              Empleados:
              <input type="number" name="manoDeObra.empleados" .value="${this.editItem.manoDeObra.empleados}" @input="${(e) => {
                this.editItem.manoDeObra.empleados = e.target.value;
            
              }}">
            </label>
          </fieldset>
          <fieldset>
            <legend>Costos Indirectos</legend>
            ${this.editItem.costosIndirectos.descripcion.map((desc, index) => html`
              <div>
                <label>
                  Tipo de Costo:
                  <input type="text" name="costosIndirectos.descripcion.${index}.tipocosto" .value="${desc.tipocosto}" @input="${(e) => {
                    this.editItem.costosIndirectos.descripcion[index].tipocosto = e.target.value;
                
                  }}">
                </label>
                <label>
                  Valor:
                  <input type="number" name="costosIndirectos.descripcion.${index}.valor" .value="${desc.valor}" @input="${(e) => {
                    this.editItem.costosIndirectos.descripcion[index].valor = e.target.value;
                
                  }}">
                </label>
              </div>
            `)}
            
          </fieldset>
          <fieldset>
            <legend>Materia Prima</legend>
            ${this.editItem.materiaPrima.map((mp, index) => html`
              <div>
                <label>
                  Producto:
                  <input type="text" name="materiaPrima.${index}.producto" .value="${mp.producto}" @input="${(e) => {
                    this.editItem.materiaPrima[index].producto = e.target.value;
                
                  }}" readonly>
                </label>
                <label>
                  Cantidad:
                  <input type="number" name="materiaPrima.${index}.cantidad" .value="${mp.cantidad}" @input="${(e) => {
                    this.editItem.materiaPrima[index].cantidad = e.target.value;
                
                  }}">
                </label>
              </div>
            `)}
          </fieldset>
          <label>
            Productos defectuosos:
            <input type="number" name="productividad" .value="${this.editItem.productividad}" @input="${(e) => {
              this.editItem.productividad = e.target.value;
            
            }}">
          </label>
          <button type="submit">Guardar</button>
        </form>
      </div>
        </div>
        
      ` : ''}
    `;
    

  }
}

