import { LitElement, html, css } from 'lit';

export class CostosForm extends LitElement {
  static styles = css`
    @import "node_modules/bootstrap/dist/css/bootstrap.min.css";
  `;

  constructor() {
    super();
    this.uniqueId = 0;
  }

  render() {
    return html`
    <style>
        @import "node_modules/bootstrap/dist/css/bootstrap.min.css";
        @import "./style.css";
    </style>
      <div class="container mt-5 card-costo">
        <div class="row">
          <div class="col"></div>
          <div class="col-8">
            <div class="card">
              <div class="card-body">
              <div class="card-body d-flex justify-content-between">
                <h5 class="card-title">Registro de costos indirectos</h5>
                <button type="button" class="btn btn-warning" id="addcosto" @click="${this.addCostField}">+</button>
              </div>
                <form class="row g-3 divcostos" id="frmcosto" @submit="${this.datoscostos}">
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary" id="allcostos">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col"></div>
        </div>
      </div>
    `;
  }

  addCostField() {
    this.uniqueId += 1;
    const uniqueId = this.uniqueId;
    const container = this.shadowRoot.querySelector('#frmcosto');
    
    const nuevocuadro = document.createElement('div');
    nuevocuadro.classList.add('row', 'justify-content-md-center');
    nuevocuadro.id = `costo${uniqueId}`;
    
    nuevocuadro.innerHTML = `
      <div class="col-md-8">
        <label for="tipocosto${uniqueId}" class="form-label">Describe los costos indirectos</label>
        <input type="text" class="form-control" name="tipocosto${uniqueId}" id="tipocosto${uniqueId}">
      </div>
      <div class="col-md-2">
        <label for="valor${uniqueId}" class="form-label">Valor del costo</label>
        <input type="number" class="form-control" name="valor${uniqueId}" id="valor${uniqueId}">
      </div>
      <div class="col-md-1 position-relative">
        <button type="button" class="btn btn-danger position-absolute bottom-0 start-0" data-id="${uniqueId}">-</button>
      </div>
    `;
    
    container.insertBefore(nuevocuadro, container.querySelector('.col-12'));
    
    nuevocuadro.querySelector('button').addEventListener('click', () => this.quitarcuadro(uniqueId));
  }

  quitarcuadro(uniqueId) {
    const contenedorborrar = this.shadowRoot.querySelector(`#costo${uniqueId}`);
    if (contenedorborrar) {
      contenedorborrar.remove();
    }
  }
  async datoscostos(event) {
    event.preventDefault(); 
    const form = this.shadowRoot.querySelector('#frmcosto');
    const formData = new FormData(form);
    const costos = [];
    let sumacostos = 0

    for (let i = 1; i <= this.uniqueId; i++) {
      const tipocosto = formData.get(`tipocosto${i}`);
      const valor = formData.get(`valor${i}`);

      if (tipocosto && valor) {
        costos.push({ tipocosto, valor });
      }
    }
    
    console.log(costos);
    costos.forEach(item =>{
        sumacostos += parseInt(item.valor, 10)
    }) 
    let costoVarios = {
        descripcion:costos,
        costoTotal:sumacostos
    }
    try {
        const response = await fetch('https://6659f969de346625136e9f20.mockapi.io//costos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(costoVarios)
        });
  
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
  
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
  }
  
}


