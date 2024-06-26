import { LitElement, html, css } from "lit";
import { materiaPrima } from "../forms/addMateriaPrima.js";
import { CostosForm } from "../formsProd/costosIndi.js";
import { DataDisplay } from "../reportes/datos.js";
import { producto } from "../forms/addProduct.js";
import { HomeComponent } from "./home-component.js.js";
import { vender } from "../formsProd/sellProduct.js";




export class Interfaz extends LitElement {
  static properties = {
    condition: {},
    btnLlamar: {},
  };


  static styles = css`
  @media (max-width: 580px) {
  .logout{
    display: none;
  }
  }
`;
  constructor() {
    super();
    this.condition = true;
  }




  render() {
    return html`
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="bootstrap.min.css">
      <nav class="navbar fixed-top">
        <div class="container-fluid">
          <div class="d-flex navr flex-column align-items-center justify-content-center">
            <a id="nameLogo" class="navbar-brand ">Confecciones Pepita</a>
            <img class="logo" src="public/img/logo.png" alt="">
          </div>
          <form class="d-flex search" role="search">
            <button  class="btn  btn-dark logout" type="submit">Salir</button>
          </form>
        </div>
      </nav>
      <div class="d-flex">
        <div class="menu">
          <nav class="main-menu">
            <ul>
                <li class='home'>
                    <a  href="#">
                        <i class=" fa fa-home fa-2x"><img class="img" src="img/1home.png" alt=""></i>
                        <span class="nav-text">
                           Home
                        </span>
                    </a>
                 
                </li>
                <li class="has-subnav">
                    <a class="llamar" href="#">
                        <i class="fa fa-globe fa-2x"><img class="img" src="img/2mp.png" alt=""></i>
                        <span class="nav-text">
                            Materia prima
                        </span>
                    </a>
                   
                </li>
                <li class='costo' class="has-subnav">
                    <a href="#">
                       <i class="fa fa-comments fa-2x"><img class="img" src="img/3cal.png" alt=""></i>
                        <span class="nav-text">
                            Cost Calculate
                        </span>
                    </a>
                   
                </li>
                <li class="informes">
                    <a href="#">
                       <i class="fa fa-camera-retro fa-2x"><img class="img" src="img/4info.png" alt=""></i>
                        <span class="nav-text">
                            Informs
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a class="producto" href="#">
                        <i class="fa fa-film fa-2x"><img class="img" src="img/5prod.png" alt=""></i>
                        <span class="nav-text">
                            productos
                        </span>
                    </a>
                </li>
            </ul>
        </nav>
        <hr>
        </div>
        <div class="info">
        <home-component>
        </home-component>
        </div>
      </div>
    `;
  }
  updated() {
    localStorage.clear()
    customElements.define("home-component", HomeComponent);
    const btnLlamar = this.shadowRoot.querySelector(".llamar");
    btnLlamar.addEventListener("click", (e) => {
      const divInfo = this.shadowRoot.querySelector(".info");
      divInfo.innerHTML = "";
      const infodiv = document.createElement("info-div");
      divInfo.appendChild(infodiv);
      customElements.define("info-div", materiaPrima);
    });
    const btncosto = this.shadowRoot.querySelector(".costo");
    btncosto.addEventListener("click", (e) => {
      const divInfo = this.shadowRoot.querySelector(".info");
      divInfo.innerHTML = "";
      const costdiv = document.createElement("cost-div");
      divInfo.appendChild(costdiv);
      customElements.define("cost-div", vender);
    });
    const btninforme = this.shadowRoot.querySelector(".informes");
    btninforme.addEventListener("click", (e) => {
      const divInfo = this.shadowRoot.querySelector(".info");
      divInfo.innerHTML = "";
      const infordiv = document.createElement("infor-div");
      divInfo.appendChild(infordiv);
      customElements.define("infor-div", DataDisplay);
    });
    const btnproducto = this.shadowRoot.querySelector(".producto");
    btnproducto.addEventListener("click", (e) => {
      const divInfo = this.shadowRoot.querySelector(".info");
      divInfo.innerHTML = "";
      const produdiv = document.createElement("produ-div");
      divInfo.appendChild(produdiv);
      customElements.define("produ-div", producto);
    });
    const btnhome = this.shadowRoot.querySelector(".home");
    btnhome.addEventListener("click", (e) => {
      const divInfo = this.shadowRoot.querySelector(".info");
      divInfo.innerHTML = "";
      const homediv = document.createElement("home-component");
      divInfo.appendChild(homediv);
      customElements.define("home-component", HomeComponent);
    });
  }
}