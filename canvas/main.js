    let canvas = document.getElementById("canvasP");
    let ctx = canvas.getContext('2d');

    
    ctx.fillStyle = "#FF0000";  
   
    ctx.fillRect(0, 0, canvas.width, canvas.height);  
    ctx.beginPath();
    
        let juego1= new Juego(6,canvas,ctx);
        juego1.play();
        
        /*
        let admin = new AdminJuego(canvas);
        admin.iniciarBtones();
        admin.mostrarConfiguracionDeJuego();
        */
        
      
   
   

       
 
   
