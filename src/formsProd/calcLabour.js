import { LitElement, html } from "lit";

export class manoDeObra extends LitElement{
    static properties(){
        manoObra:{}

    }
    constructor(){
        super();
        this.manoObra={
            nroEmpleados:"",
            SalarioBse:"",
            beneficios:"",
            costosIndirectos:""
        }
    }
    render(){
        return html`
        <style>
            @import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
            @import "./style.css";
        </style>
        <form  class="form-data  row g-3 d-flex justify-content-center" >
        <div class="">
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
        </form>
        <div class="col-12">
            <button  class="guardar btn btn-primary" type="submit">Cargar Producto</button>
        </div>
        `;
    }
    updated(){
        const btnguardar=this.shadowRoot.queryselector('.guardar')
        btnguardar.addEventListener('click',(e)=>{
            e.preventDefault();
            const  form= this.shadowRoot.querySelector('.form-data')
            const  date= this.shadowRoot.querySelectorAll('input[type="date"]')
            const  datos= Object.fromEntries(new FormData(form).entries())
            const  producto= JSON.parse(JSON.stringify(datos));
        })

    }
}