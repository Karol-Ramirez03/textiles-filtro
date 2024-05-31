import { LitElement, html } from 'lit';
import { Interfaz } from './interfaz/interfazPrincipal';

export class inicio extends LitElement {
    static properties = {
      condition: {},
      btnLlamar:{}
    };
  
    constructor() {
      super();
      this.condition = true;
    }
    render(){
        return html`
        <style>
            @import "./node_modules/bootstrap/dist/css/bootstrap.css";
            @import "./style.css";
        </style>
        <div class="div-inicio d-flex align-items-center justify-content-center flex-column ">
            <img class="logoImg" src="./public/img/logo.png" alt="">
            <h1>Bienvenidos a Confecciones pepita</h1>
            <br>
            <button class="inicio btn btn-secondary">Comenzar</button>
            
        </div>
        <div-inicio></div-inicio>
        `
    }
    updated(){
        const div=this.shadowRoot.querySelector('.div-inicio')
        const btnInicio=this.shadowRoot.querySelector('.inicio')
        btnInicio.addEventListener('click',()=>{
            div.innerHTML=''
            customElements.define('div-inicio', Interfaz);
        })
    }
}

customElements.define('interfaz-div', inicio);