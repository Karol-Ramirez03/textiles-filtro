import { LitElement, html, css } from 'lit';

export class costosproductividad extends LitElement {
  static styles = css`
    @import "node_modules/bootstrap/dist/css/bootstrap.min.css";
  `;

  constructor() {
    super();
  }

  render() {
    return html`
    <style>
        @import "node_modules/bootstrap/dist/css/bootstrap.min.css";
    </style>
      <div class="container mt-5">
        <div class="row">
          <div class="col"></div>
          <div class="col-8">
            <div class="card">
              <div class="card-body">
              <div class="card-body d-flex justify-content-between">
                <h5 class="card-title">Registro de costos indirectos</h5>
                <button type="button" class="btn btn-warning" id="addcosto" @click="${this.addCostField}">+</button>
              </div>
                <form class="row g-3 divcostos" id="frmcosto">
                    <div class="col-md-8">
                        <label for="productosterminados" class="form-label">porfavor ingresa los productos terminados</label>
                        <input type="text" class="form-control" name="productosterminados" id="productosterminados">
                    </div>
                    <div class="col-md-2">
                        <label for="valor" class="form-label">Valor del costo</label>
                        <input type="number" class="form-control" name="valor" id="valor">
                    </div>
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

  
}

customElements.define('costos-productividad', costosproductividad);