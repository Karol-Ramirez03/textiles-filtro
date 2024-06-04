import { LitElement, html } from "lit";
import { CostosForm } from "../formsProd/costosIndi.js";

export class manoDeObra extends LitElement{
    static properties(){
        manoObra:{}

    }
    constructor(){
        super();
        this.manoObra={
            empleados:"",
            horas_trabajadas:'',
            salario_base:"",
            beneficios:"",
            prestaciones:'',
            costos_indirectos:""
        }
    }
    render(){
        return html`
        <style>
            @import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
            @import "./public/style.css";
        </style>
        <form  class="form-data calcMano row g-3 d-flex justify-content-center align-items-center" >
        <div class="row">
            <div class="col-md-6">
                <label for="empleados" class="form-label">Cantidan de empledos</label>
                <input type="number" name="nroEmpleados" class="in form-control" id="empleados" placeholder="Ingrese el Id" >
            </div>
            <div class="col-md-6">
                <label for="totalHoras" class="form-label">Total horas trabajadas</label>
                <input type="number" name="totalHoras" class="in form-control" id="totalHoras" >
            </div>
            <div class="col-md-6">
                <label for="salario" class="form-label">Salario base</label>
                <input type="number" name="SalarioBase" class="in form-control" id="salario" >
            </div>
            <div class="col-md-6">
                <label for="beneficios">Benefios</label>
                <input type="number" class="in form-control" name="beneficios" placeholder="" id="beneficios">
            </div>
            <div class="col-md-6">
                <label for="Prestaciones">Prestaciones</label>
                <input type="number" class="in form-control" name="prestaciones" placeholder="" id="Prestaciones">
            </div>
            <div class="col-md-6">
                <label for="costo" cass="form-label">Total costos Indirectos empleados</label>
                <input type="number" name="costosIndirecto" class="in form-control" id="costo">
            </div>
            
        </div>
        <div class="col-12">
            <button  class="guardar btn btn-primary" type="submit">Cargar Producto</button>
        </div>
        </form>
        
        `;
    }
    updated(){
        const btnguardar=this.shadowRoot.querySelector('.guardar')
        btnguardar.addEventListener('click',(e)=>{
            e.preventDefault();
            const  form= this.shadowRoot.querySelector('.form-data')
            const  datos= Object.fromEntries(new FormData(form).entries())
            const  datosMano= JSON.parse(JSON.stringify(datos));
            const {nroEmpleados,totalHoras,SalarioBase,beneficios,prestaciones,costosIndirecto}=datosMano
            console.log(datosMano)
            this.manoObra.empleados=nroEmpleados
            this.manoObra.horas_trabajadas=totalHoras
            this.manoObra.salario_base=SalarioBase
            this.manoObra.beneficios=beneficios
            this.manoObra.prestaciones=prestaciones
            this.manoObra.costos_indirectos=costosIndirecto
            console.log(this.manoObra)
            localStorage.setItem('manoObra', JSON.stringify(this.manoObra))
            const divInfo = this.shadowRoot.querySelector(".calcMano");
            divInfo.innerHTML = "";
            const costdiv = document.createElement("costo-div");
            divInfo.appendChild(costdiv);
            customElements.define("costo-div", CostosForm);
        })

    }
    
}