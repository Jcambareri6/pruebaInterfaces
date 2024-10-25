class Juego {
    constructor(Modalidad) {
        this.canvas = document.getElementById("canvasP");
        this.ctx = this.canvas.getContext("2d");

        this.Modalidad = Modalidad;

        this.currentPlayer = "aliens";
        this.selectedFicha = null;
        this.tablero = this.setTablero(Modalidad);
        this.fichasAliens = [];
        this.fichasHumanos = [];
        this.iniciarFichas()
   
       
        this.canvas.addEventListener('mousedown', (e) => this.MouseDown(e));
        this.canvas.addEventListener('mouseup', (e) => this.MouseUp(e));
        this.canvas.addEventListener('mousemove', (e) => this.Move(e));

    }
    iniciarFichas() {

        let posY = 100;



        let fichaAlien = new ficha(this.canvas.width - 100, posY, this.ctx, 25,'./img/ficha1.png');
         console.log(fichaAlien.posX);
        
        
        this.fichasAliens.push(fichaAlien);



        let fichaHumano = new ficha(100, 100, this.ctx, 25,'./img/ficha_Humano.png');
       
        
        this.fichasHumanos.push(fichaHumano);


    }

    setTablero(Modalidad) {
        console.log(Modalidad)
        switch (Modalidad) {

            case 4:

                return new Tablero(485, 50, this.ctx, 6, 8, null);
                break;
            case 5:
                return new Tablero(420.25, 50, this.ctx, 7, 8, null)
            case 6:

                return new Tablero(385.5, 50, this.ctx, 8, 8, null);

                break;


        }

    }
    play() {
     
        this.tablero.draw();
      
    }
    gestionarTurnos() {
        if (this.currentPlayer == 'humanos'){
            //if (aliens.lenght > 0) {
            this.currentPlayer == 'aliens';
            //else { finishGame()}
        } else  if (this.currentPlayer == 'aliens'){
            //if (humanos.lenght > 0) {
            this.currentPlayer == 'humanos';
            //else { finishGame()}
        }

    }
    MouseDown(e) {
        let mouseX= this.canvas.offsetLeft;
        this.fichasHumanos.forEach(ficha => {
            // console.log(ficha)
             
            //  console.log(e.layerY)
          
            if (ficha.isMouseOver((e.layerX-this.canvas.offsetLeft), e.layerY)) {
              
                this.configurarDrag("humanos",ficha)
            }
           
        })

        this.fichasAliens.forEach(ficha => {
            // console.log(ficha)
            // console.log(e.layerX)
            // console.log("LayerX:", e.layerX, "LayerY:", e.layerY);
            // console.log("posicion en el canvas posX:", ficha.posX, "posY:", ficha.posY);
            console.log(`radio ${ficha.radio}`)
            if (ficha.isMouseOver((e.layerX-this.canvas.offsetLeft), e.layerY)) {
                this.configurarDrag("aliens",ficha)
            }
           
        })

      
    }
    
    MouseUp(e) {
        console.log("en la funcion moseup")
        if (this.selectedFicha.getIsDraggin() == true && this.selectedFicha.getSeleccionada()==true){
            if (this.tablero.dropZone(e.layerX,e.layerY)){}
                if(this.selectedFicha!=null){
                    this.selectedFicha.setIsDraggin(false);
                    this.selectedFicha.setSeleccionada(false);
                    //dibujar en el casillero al que corresponde, tablero.dibujarCasillero(selectedFicha)
                    this.cambiarTurnos();
                    this.selectedFicha=null;
                }
        }      
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
    configurarDrag(turno,ficha){
        if (this.currentPlayer == turno) {
            this.selectedFicha = ficha;
            this.selectedFicha.setSeleccionada(true);
            this.selectedFicha.setIsDraggin(true);
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