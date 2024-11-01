let canvas = document.getElementById("canvasP");
let ctx = canvas.getContext('2d');

dibujarTablero();
ctx.beginPath();
let fichaHumanoElegida = undefined;
let fichaAliensElegida=undefined;
 let fichasHumanos = document.querySelectorAll(".fichaHumano");
 let fichasAliens= document.querySelectorAll(".fichaAlien");
 let botonAnteriorHumanos = null;
 let btnAliensAnterior = null;
 let contenedorJuego= document.querySelector('.contenedorJuego');

fichasHumanos.forEach(btn => {
  btn.addEventListener('click', () => {
    
    
    if (botonAnteriorHumanos && botonAnteriorHumanos !== btn) {
        botonAnteriorHumanos.classList.remove('elegida');
    }

    let ruta = btn.src
     let explodeSrc = ruta.split("/")
     console.log(explodeSrc[4])
    fichaHumanoElegida= `/${explodeSrc[4]}/${explodeSrc[5]}`
    console.log(fichaHumanoElegida);

    btn.classList.add('elegida');

    
    botonAnteriorHumanos = btn;
  });
});

fichasAliens.forEach(btn => {
    btn.addEventListener('click', () => {
      
      if (btnAliensAnterior && btnAliensAnterior !== btn) {
        btnAliensAnterior.classList.remove('elegida');
      }
  
          let ruta = btn.src
         let explodeSrc = ruta.split("/")
         console.log(explodeSrc[4])
         fichaAliensElegida= `/${explodeSrc[4]}/${explodeSrc[5]}`
  

    btn.classList.add('elegida');
      btnAliensAnterior = btn;
    });
  });
  const botonesModalidad = document.querySelectorAll('.btnModalidad');
  botonesModalidad.forEach(boton => {
    boton.addEventListener('click', () => {
       
        const modalidad = boton.getAttribute('modalidad');
        console.log(typeof(fichaAliensElegida));
      
        const juego = new Juego(modalidad,canvas,fichaAliensElegida,fichaHumanoElegida);
        borrarTablero();
        dibujarTablero();
        iniciarJuego();
        juego.play();
        

       


       

    
    });
});
 function borrarTablero(){
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function dibujarTablero(){

    ctx.fillStyle = "#FF0000";
    let img = new Image();
    img.src = "./img/fondoCanvasPresentacion.png"
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
}
// let juego1 = new Juego(6, canvas, ctx);
// juego1.play();
  function iniciarJuego(){
    contenedorJuego.classList.add('none')
 }














