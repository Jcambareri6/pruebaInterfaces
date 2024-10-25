class Juego {
    constructor(Modalidad) {
        this.canvas = document.getElementById("canvasP");
        this.ctx = this.canvas.getContext("2d");

        this.Modalidad = Modalidad;

        this.currentPlayer = "humanos";
        this.selectedFicha = null;
        this.tablero = this.setTablero(Modalidad);
        this.fichasAliens = [];
        this.fichasHumanos = [];
        this.iniciarFichas();
       
        this.canvas.addEventListener('mousedown', (e) => this.MouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.MouseUp(e));
        this.canvas.addEventListener('mousemove', (e) => this.Move(e));

    }
    iniciarFichas() {

        let posY = 100;



        let fichaAlien = new ficha(this.canvas.width - 100, posY, this.ctx, 25,'./img/ficha1.png');
        
        
        this.fichasAliens.push(fichaAlien);



        let fichaHumano = new ficha(100, 200, this.ctx, 25,'./img/ficha_Humano.png');
       
        
        this.fichasHumanos.push(fichaHumano);


    }

    setTablero(Modalidad) {
        console.log(Modalidad)
        switch (Modalidad) {

            case 4:

                return new Tablero(425, 50, this.ctx, 6, 7, null);
                break;
            case 5:
                return new Tablero(380.25, 50, this.ctx, 7, 7, null)
            case 6:

                return new Tablero(335.5, 50, this.ctx, 8, 7, null);

                break;


        }

    }
    play() {
        this.tablero.draw();
      
    }
    gestionarTurnos() {
        //si currentPlayerJugo(){
        //  this.currentPlayer=cambiarTurno(); 
        // }

    }
    MouseDown(e) {
        this.fichasHumanos.forEach(ficha => {
            // console.log(ficha)
             console.log(e.layerX)
             console.log(e.layerY)
     
            if (ficha.isMouseOver(e.layerX, e.layerY)) {
              
                if (this.currentPlayer == "humanos") {
                    
                
                    this.selectedFicha = ficha;
                    this.selectedFicha.setSeleccionada(true);
                    this.selectedFicha.setIsDraggin(true);
                }
            }
           
        })

        this.fichasAliens.forEach(ficha => {
            console.log(ficha)
            console.log(e.layerX)
     
            if (ficha.isMouseOver(e.layerX, e.layerY)) {
                if (this.currentPlayer == "aliens") {
                    this.selectedFicha = ficha;
                    this.selectedFicha.setSeleccionada(true);
                    this.selectedFicha.setIsDraggin(true);
                }
            }
           
        })

      
    }
    MouseUp(e) {
        console.log("en la funcion moseup")
        // if (this.selectedFicha.getIsDraggin() == true && this.selectedFicha.getSeleccionada()==true){
            //if tablero.dropZone(e.layerX,e.layerY){}
                if(this.selectedFicha!=null){
                   
        
                    this.selectedFicha.setIsDraggin(false);
                    this.selectedFicha.setSeleccionada(false);
                    this.selectedFicha=null;
                }
        // }      
    }
    Move(e) {
        //  console.log(this.selectedFicha)
        if(this.selectedFicha!=null){
            if (this.selectedFicha.getIsDraggin() == true && this.selectedFicha.getSeleccionada()==true) {
                // console.log(this.selectedFicha)
                let newX = e.layerX-this.canvas.offsetLeft;
                let newY = e.layerY;
               
                this.selectedFicha.setPosX(newX);
                 this.selectedFicha.setPosY(newY);
                // Limpiar el canvas
                 this.reDrawCanvas()
                 this.selectedFicha.draw();
                
                 this.redibujarFichas();            
                
    
            }
        }
        
        
     
    }

    reDrawCanvas() {
        // Borra todo el canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "#FF0000";  
   
        ctx.fillRect(0, 0, canvas.width, canvas.height);  
        ctx.beginPath()
        
        this.play()
        
    }
    
    redibujarFichas() {
        // Redibuja todas las fichas de ambos jugadores
        this.fichasAliens.forEach(ficha => ficha.draw());
        this.fichasHumanos.forEach(ficha => ficha.draw());
    }

}