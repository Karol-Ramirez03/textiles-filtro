import { LitElement, html, css } from 'lit';
import { cargarDatos } from '../mockapi/mockapiData';

export class costosproductividad extends LitElement {
  static styles = css`
    @import "node_modules/bootstrap/dist/css/bootstrap.min.css";
  `;

  constructor() {
    super();
    this.inform={
      manoDeObra: "",
      costosIndirectos: "",
      materiaPrima: "",
      productividad: "5"
    }
  }

  render() {
    return html`
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="bootstrap.min.css">
      <div class="container mt-5">
        <div class="row">
          <div class="col"></div>
          <div class="col-8">
            <div class="card">
              <div class="card-body">
              <div class="card-body d-flex justify-content-between">
                <h5 class="card-title">Registro de productividad</h5>
              </div>
                <form style="color:white;" class="row g-3 divcostos" id="frmproductividad">
                    <div class="col-md-8">
                        <label for="productosterminados" class="form-label text-black">    porfavor ingresa los productos defectuosos</label>
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



        //traer datos mandar mockapi
        const costosindi =localStorage.getItem("costoIndirectoTotal")
        const dataindi=JSON.parse(costosindi)
        console.log(dataindi)
        const manoObra =localStorage.getItem("manoObra")
        const dataMAno=JSON.parse(manoObra)
        console.log(dataMAno)
        const materiaPrima =localStorage.getItem("costoMateriaPrima")
        const dataMateria=JSON.parse(materiaPrima)
        console.log(dataMateria.productos)
        
      this.inform.manoDeObra=dataMAno
      this.inform.costosIndirectos=dataindi
      this.inform.materiaPrima=dataMateria.productos
      this.inform.productividad=defectuosos
      cargarDatos('https://6659f969de346625136e9f20.mockapi.io/informe',this.inform)

        
    })

  }

}

