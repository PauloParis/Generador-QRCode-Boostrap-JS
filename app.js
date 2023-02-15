const contenedorQR = document.getElementById('contenedorQR')
const formulario = document.getElementById('formulario')
const divSave = document.getElementById('divSave')
const alertas = document.getElementById('alertas')

const exRegular = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

let urlVieja = ''
formulario.addEventListener('submit', (e)=> {
    e.preventDefault();
    if(exRegular.exec(formulario.link.value) === null) { 
        alert('Porfavor, Ingrese una URL válida', 'danger')
    }
    else {
        if(urlVieja === formulario.link.value) {
            alert('Cuidado, ya haz utilizado está URL, intentelo otra vez, o limpie los campos', 'warning')
        }
        else {
            const QR = new QRCode(contenedorQR);
            QR.makeCode(formulario.link.value); //recibe la url para generar el qr
            urlVieja = formulario.link.value  
            divSave.innerHTML = `<button id="saveQR" class="col-12 w-75 btn btn-outline-dark">Descargar QR</button>`
            const canvas = document.querySelector('.contenedorQR canvas')
            const btnsave = document.getElementById('saveQR');
    
            saveQRCode(canvas, btnsave);
        }
    }    
} )


// función para descargar la imagen (QR)
function saveQRCode (canvas, btnsave){
        btnsave.addEventListener('click', () => {
        let enlace = document.createElement('a');
        enlace.download = 'miQRCode.png';
        enlace.href = canvas.toDataURL('image/png');
        enlace.click();
    })
}
    

// evento para limpiar los campos
const clear = document.getElementById('clear')
clear.addEventListener('click', (e) => {
    e.preventDefault();
    while(contenedorQR.firstChild) {
        contenedorQR.removeChild(contenedorQR.firstChild)
    }
    formulario.link.value = ''; // se limpia el pinput
    divSave.innerHTML = '' // se limpia el boton descargar QR
    urlVieja = '' // se limpia la url vieja
    alertas.innerHTML = '' // se limpia la alerta
})


// función para crear alertas
function alert (mensaje, color) {
    alertas.innerHTML = [
      `<div class="alert alert-${color} alert-dismissible" role="alert">`,
      `   <div>${mensaje}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    //alertas.append(wrapper) // para mostrar varias veces la alarma
  }




    

