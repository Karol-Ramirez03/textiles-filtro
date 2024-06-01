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
                <h5 class="card-title">Registro de productividad</h5>
              </div>
                <form class="row g-3 divcostos" id="frmproductividad">
                    <div class="col-md-8">
                        <label for="productosterminados" class="form-label">porfavor ingresa los productos defectuosos</label>
                        <input type="number" class="form-control" name="productosterminados" id="productosterminados">
                    </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary mandar" id="allcostos">Sign in</button>
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
  updated(){
    const botondefect = this.shadowRoot.querySelector('.mandar')
    botondefect.addEventListener('click', (e) => {
        e.preventDefault()
        const formulario = this.shadowRoot.querySelector('#frmproductividad')
        const formdata = new  FormData(formulario)
        const defectuosos = formdata.get('productosterminados') 
        console.log(defectuosos)
    })

  }

}

