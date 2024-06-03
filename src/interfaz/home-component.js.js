import { LitElement, html, css } from "lit";

class HomeComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      padding: 2rem;
    }
    .btn {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 1rem 2rem;
      font-size: 1rem;
      cursor: pointer;
      border-radius: 5px;
    }
    .btn:hover {
      background-color: #0056b3;
    }
    .div-inicio {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #000;
      color: #fff;
      padding: 2rem;
      border-radius: 5px;
    }
  `;

  handleClick() {
    console.log("MUY BIEN!");
  }

  render() {
    return html`
      <div class="div-inicio">
        <h1>Hola de vuelta</h1>
        <p>HI.</p>
        <button class="btn inicio" @click="${this.handleClick}">VAMOS</button>
      </div>
    `;
  }

  updated() {
    const div = this.shadowRoot.querySelector('.div-inicio');
    const btnInicio = this.shadowRoot.querySelector('.inicio');
    btnInicio.addEventListener('click', () => {
      div.innerHTML = '';
      customElements.define('div-inicio', Interfaz); 
    });
  }
}

customElements.define("home-component", HomeComponent);
