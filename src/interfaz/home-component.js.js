import { LitElement, html, css } from "lit";

export class HomeComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      text-align: center;
      padding: 1rem;
      width: 90vw;
    }
    .div-ph {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    .div-inicio {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      background-color: #fff9d0;
      color: #151515;
      padding: 1rem;
      border-radius: 5px;
    }
    .container {
      display: flex;
      gap: 6rem; /* Incrementado el gap para más separación */
      justify-content: center;
      align-items: flex-start; /* Mueve los elementos hacia arriba */
      margin-top: 2rem; /* Espacio superior para mover los elementos hacia arriba */
    }
    .button-wrapper {
      position: relative;
      width: 100px;
      height: 100px;
    }
    .button1,
    .button2,
    .button3 {
      position: absolute;
      top: 120%; /* Mueve los botones hacia abajo */
      left: 50%;
      transform: translate(-50%, -50%);
      border: none;
      background: none;
      cursor: pointer;
      outline: none;
    }
    .button1 img,
    .button2 img,
    .button3 img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      transition: transform 0.3s ease-in-out;
    }
    .button1:hover img,
    .button2:hover img,
    .button3:hover img {
      transform: scale(1.5);
    }
    @keyframes rotate1 {
      0% {
        transform: translate(-50%, -50%) rotate(0deg) translateX(50px);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg) translateX(50px);
      }
    }
    @keyframes rotate2 {
      0% {
        transform: translate(-50%, -50%) rotate(0deg) translateX(50px);
      }
      100% {
        transform: translate(-50%, -50%) rotate(-360deg) translateX(50px);
      }
    }
    @keyframes rotate3 {
      0% {
        transform: translate(-50%, -50%) rotate(0deg) translateX(50px);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg) translateX(50px);
      }
    }
    .button1 {
      animation: rotate1 4s linear infinite;
    }
    .button2 {
      animation: rotate2 5s linear infinite;
    }
    .button3 {
      animation: rotate3 6s linear infinite;
    }
  `;

  handleClick() {
    console.log("MUY BIEN!");
  }

  render() {
    return html`
      <div class="div-ph">
        <div class="div-inicio">
          <h1><strong>Hola bienvenido de nuevo a</strong></h1>
          <h2>CONFECCIONES PEPITA</h2>
        </div>
        <div class="container">
          <div class="button-wrapper">
            <button class="button1">
              <img src="public/img/boton.png" alt="Button 1" />
            </button>
          </div>
          <div class="button-wrapper">
            <button class="button2">
              <img src="public/img/tela.png" alt="Button 2" />
            </button>
          </div>
          <div class="button-wrapper">
            <button class="button3">
              <img src="public/img/cra.png" alt="Button 3" />
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("home-component", HomeComponent);
