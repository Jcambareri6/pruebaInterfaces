    let canvas = document.getElementById("canvasP");
    let ctx = canvas.getContext('2d');

    
    ctx.fillStyle = "#FF0000";  
   
    ctx.fillRect(0, 0, canvas.width, canvas.height);  
    ctx.beginPath();
    // posx=300;
    // posY=500
    // radio=50
    // ctx.fillStyle = "#8A2BE2";
    // ctx.arc(posx, posY, radio, 0, 2 * Math.PI);
    // ctx.fill()
    // let dragin = false;
    
    // canvas.addEventListener('mousedown', function(e) {
        
    //   if(e.layerX>=posx-radio && (e.layerY<posY+radio && e.layerY>=posY-(radio*2))){
    //     console.log("true");
    //     dragin=true;
    //   }
    // });
    // canvas.addEventListener("mousemove",function(e){
    //     if(dragin){
    //         newX= e.layerX;
    //         newY=e.layerY;
          
    //     }
    //     drawCircle(newX,newY);
    //     posx=newX;
    //     posY=newY;
    // })
    // function drawCircle(x, y) {
    //     ctx.clearRect(x, y,canvas.width,canvas.height); 
        
    //     ctx.fillStyle = "#FF0000";  
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);  
    //     ctx.beginPath();
    //     ctx.fillStyle = "#8A2BE2";
    //     ctx.arc(x, y, radio, 0, 2 * Math.PI);  
    //     ctx.fill();
    // }
    // canvas.addEventListener('mouseup', function(e) {
        
    //     if (dragin) {
    //         dragin = false;
          
    //     }
    // });
    
  

    //  let tablero = new Tablero(200,-55,ctx,6,7,null);
    //  tablero.draw();
    //  tablero.posicionarFicha(0,new ficha(30,20,ctx,50));
    //  tablero.posicionarFicha(0,new ficha(30,20,ctx,50));
    let juego1= new Juego(6);
     juego1.play();
   
   
    
    //  juego1.play();

       
 
   
