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
    .container {
      display: flex;
      gap: 2rem;
      justify-content: center;
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
      top: 50%;
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
      transform: scale(1.1);
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
      animation: rotate1 1.5s linear infinite;
    }
    .button2 {
      animation: rotate2 2s linear infinite;
    }
    .button3 {
      animation: rotate3 2.5s linear infinite;
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
        <button class="btn inicio" @click=${this.handleClick}>VAMOS</button>
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
    `;
  }
}

customElements.define("home-component", HomeComponent);
