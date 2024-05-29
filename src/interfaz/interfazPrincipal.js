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
            <a class="navbar-brand">Confecciones Pepita</a>
            <img class="logo" src="public/img/logo.png" alt="">
          </div>
          <form class="d-flex search" role="search">
            <button class="btn btn-dark" type="submit">Salir</button>
          </form>
        </div>
      </nav>
      <div class="d-flex">
        <div class="menu">
          <button @click=${()=>{this.condition=!this.condition}} class="llamar btn btn-danger">llamar</button>
        </div>
        <div class="info">
          <info-div>
          ${this.condition
            ? html`
              <p>Render some HTML if condition is true.</p>
            `
            : html`
              <p>Render some other HTML if condition is false.</p>
            `
          }</info-div>
        </div>
      </div>
    `;
    
  }
  
}

customElements.define('interfaz-div', Interfaz);
