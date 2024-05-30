import { LitElement, html } from 'lit';
import { formulario } from '../forms/addProduct';

export class Interfaz extends LitElement {
  static properties = {
    condition: {},
    btnLlamar:{}
  };

  constructor() {
    super();
    this.condition = true;
  }

  render() {
    return html`
      <style>
        @import "./node_modules/bootstrap/dist/css/bootstrap.css";
        @import "./style.css";
      </style>
      <nav class="navbar">
        <div class="container-fluid">
          <div class="d-flex flex-column align-items-center justify-content-center">
            <a id="nameLogo" class="navbar-brand">Confecciones Pepita</a>
            <img class="logo" src="public/img/logo.png" alt="">
          </div>
          <form class="d-flex search" role="search">
            <button class="btn btn-dark" type="submit">Salir</button>
          </form>
        </div>
      </nav>
      <div class="d-flex">
        <div class="menu">
          <nav class="main-menu">
            <ul>
                <li>
                    <a href="https://jbfarrow.com">
                        <i class=" fa fa-home fa-2x"><img class="img" src="./public/img/home.png" alt=""></i>
                        <span class="nav-text">
                           Home
                        </span>
                    </a>
                  
                </li>
                <li class="has-subnav">
                    <a href="#">
                        <i class="llamar fa fa-globe fa-2x"><img class="img" src="./public/img/product.png" alt=""></i>
                        <span class="nav-text">
                            Products
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-comments fa-2x"><img class="img" src="./public/img/calculate.png" alt=""></i>
                        <span class="nav-text">
                            Cost Calculate
                        </span>
                    </a>
                    
                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-camera-retro fa-2x"><img class="img" src="./public/img/inform.png" alt=""></i>
                        <span class="nav-text">
                            Informs
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-film fa-2x"></i>
                        <span class="nav-text">
                            Surveying Tutorials
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-book fa-2x"></i>
                        <span class="nav-text">
                           Surveying Jobs
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                       <i class="fa fa-cogs fa-2x"></i>
                        <span class="nav-text">
                            Tools & Resources
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                        <i class="fa fa-map-marker fa-2x"></i>
                        <span class="nav-text">
                            Member Map
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                       <i class="fa fa-info fa-2x"></i>
                        <span class="nav-text">
                            Documentation
                        </span>
                    </a>
                </li>
            </ul>

            <ul class="logout">
                <li>
                   <a href="#">
                         <i class="fa fa-power-off fa-2x"></i>
                        <span class="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>
        </div>
        <div class="info">
          <info-div>
          </info-div>
        </div>
      </div>
    `;
    
  }
  updated(){
    const btnLlamar=this.shadowRoot.querySelector('.llamar')
    btnLlamar.addEventListener('click',()=>{
        customElements.define("info-div",formulario)
    })
  }
  
}


