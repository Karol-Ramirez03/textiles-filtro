export const calcProductividad = (productosTerminados,horasProduccion)=>{
    const productividad=productosTerminados/horasProduccion
    return productividad
}
export const calcCostoOperativo = (costosOperTotales,cantidadProductosTerminados)=>{
    const costoOperativo=costosOperTotales/cantidadProductosTerminados
    return costoOperativo
}
export const calctasaDefectos = (productosDefectuosos,totalProductosTerminados)=>{
    const defectos=(productosDefectuosos/totalProductosTerminados)*100
    return defectos
}
export const calcEficienciaOperativa=(productosTerminados,productosDefectuosos,costosOperTotales)=>{
    const efOperativa= (productosTerminados-productosDefectuosos)/(costosOperTotales)
}