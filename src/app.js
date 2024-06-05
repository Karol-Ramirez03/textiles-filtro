import { LitElement, html } from "lit";
import { Interfaz } from "./interfaz/interfazPrincipal";

export class inicio extends LitElement {
  static properties = {
    condition: {},
    btnLlamar: {},
  };

  constructor() {
    super();
    this.condition = true;
  }
  render() {
    return html`
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="bootstrap.min.css">
      <div class="init">
        <div
          class="rosado div-inicio d-flex align-items-center justify-content-end flex-column text-white"
        >
          <h1 class="welcome">Bienvenidos a Confecciones pepita</h1>
          <img class="logoImg" src="img/logo.png" alt="" />
          <br />
          <button class="inicio btn amarillo "><strong class="second">Comenzar</strong></button>
        </div>
      </div>
      <div-inicio></div-inicio>
    `;
  }
  updated() {
    const div = this.shadowRoot.querySelector(".div-inicio");
    const init =this.shadowRoot.querySelector('.init')
    const btnInicio = this.shadowRoot.querySelector(".inicio");
    btnInicio.addEventListener("click", () => {
      div.innerHTML = "";
      customElements.define("div-inicio", Interfaz);
      init.innerHTML=''
    });
  }
}

customElements.define("interfaz-div", inicio);
