export const cargarDatos=(url,datos)=>{
    const response=  fetch(url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(datos)
          })
          
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              alert('Datos guardados exitosamente!');
          })
          .catch((error) => {
              console.error('Error:', error);
              alert('Hubo un error al guardar los datos.');
          });
}

export const llamarDatos=(url,)=>{
    // Hacer la solicitud GET a la API
    fetch(url)
    .then(response => {
    // Verificar si la solicitud fue exitosa
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Parsear la respuesta a formato JSON
    return response.json();
    })
    .then(data => {
    // Trabajar con los datos recibidos
    console.log(data); // Aquí puedes hacer lo que necesites con los datos
    
    })
    .catch(error => {
    // Capturar y manejar cualquier error que ocurra durante la solicitud
    console.error('There was a problem with the fetch operation:', error);
    })
}

export const actualizarData=(url,idDato)=>{

// Nuevos datos que deseas actualizar
const newData = {
  // Aquí puedes proporcionar los nuevos valores para los campos que deseas actualizar
    idProducto: "VE001",
    nombre: "Vestido Lino 2",
    horasDeElaboracion: "5",
    personalRequrido: "4",
    materiales: {
      idMateria1: "123",
      Cantidad1: "3",
      idMateria2: "456",
      Cantidad2: "4"
    },
    id: "1"
};

// Hacer la solicitud PATCH a la API para actualizar el post
fetch(url + '/' + idDato, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newData)
})
.then(response => {
  // Verificar si la solicitud fue exitosa
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // Parsear la respuesta a formato JSON
  return response.json();
})
.then(data => {
  // El post ha sido actualizado exitosamente
  console.log('El post ha sido actualizado:', data);
})
.catch(error => {
  // Capturar y manejar cualquier error que ocurra durante la solicitud
  console.error('There was a problem with the fetch operation:', error);
});

}