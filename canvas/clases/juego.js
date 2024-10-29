class Juego {
    constructor(Modalidad,canvas,ctx) {
        this.canvas=canvas;
        this.ctx=ctx;
     

        this.Modalidad = Modalidad;

        this.currentPlayer = "humanos";
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
        let tamañoX=0;
        let tamañoY=7;
        switch (this.Modalidad) {
          
            case 4:
                tamañoX = 6;
                this.generarFichas((tamañoX*tamañoY)/2)
                break;
            case 5:
                tamañoX=7;
                 
                this.generarFichas((tamañoX*tamañoY)/2)
            case 6:

                 tamañoX=8;
                  
                this.generarFichas((tamañoX*tamañoY)/2)

                break;


        }
      
    }
    generarFichas(cantFichas){
        const posYMin = 100;
        const posYMax = 500;
        console.log(cantFichas)
          // Función para generar posiciones aleatorias en un rango específico
          const getRandomPosition = (minX, maxX, minY, maxY) => {
            const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            return { x, y };
        };
    
        // Generar fichas para Aliens
        for (let i = 0; i < 4; i++) {
            const alienPos = getRandomPosition(this.canvas.width - 250, this.canvas.width - 100, posYMin, posYMax);
            let fichaAlien = new ficha(alienPos.x, alienPos.y, this.ctx, 25, './img/ficha1.png');
            fichaAlien.setPosicionInicial(alienPos.x, alienPos.y);
            this.fichasAliens.push(fichaAlien);
        }
    
        // Generar fichas para Humanos
        for (let i = 0; i <4; i++) {
            const humanoPos = getRandomPosition(100, 250, posYMin, posYMax);
            let fichaHumano = new ficha(humanoPos.x, humanoPos.y, this.ctx, 25, './img/ficha_Humano.png');
            fichaHumano.setPosicionInicial(humanoPos.x, humanoPos.y);
            this.fichasHumanos.push(fichaHumano);
        }
    }
    setTablero(Modalidad) {
        
        switch (Modalidad) {

            case 4:

                return new Tablero(485.5, 70, this.ctx, 6, 8, null);
                break;
            case 5:
                return new Tablero(450.5, 70, this.ctx, 7, 8, null)
            case 6:

                return new Tablero(415.5, 50, this.ctx, 8, 8, null);

                break;


        }

    }
    play() {
     
        this.tablero.draw();
      
    }
    gestionarTurnos() {
        console.log("cambiando el turno.....")
 
        if (this.currentPlayer == 'humanos'){
            //if (aliens.lenght > 0) {
            this.currentPlayer = 'aliens';
            //else { finishGame()}
        } else{
            //if (humanos.lenght > 0) {
            this.currentPlayer = 'humanos';
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

        if (this.selectedFicha.getIsDraggin() == true && this.selectedFicha.getSeleccionada()==true){
            if (this.tablero.dropZone(e.layerX,e.layerY)){}
                if(this.selectedFicha!=null){
                    if(this.tablero.dropZone(e.layerX,e.layerY)){
                     
                        const columna = Math.floor((e.layerX - this.tablero.posX) / this.tablero.widthCelda);
                        console.log(`columna numero ${columna-1}`)
                        let FilafichaPosicionada= this.tablero.posicionarFicha(columna-1,this.selectedFicha)
                        if (FilafichaPosicionada!= -1){
                            console.log(`ficha posicionada en  columna ${columna-1} y fila ${FilafichaPosicionada}`)
                            console.log("posicione ficha")
                            this.selectedFicha.setIsDraggin(false);
                            this.selectedFicha.setSeleccionada(false);
                            this.tablero.dibujarCasillero(columna-1,FilafichaPosicionada, this.selectedFicha);
                            
                            this.reDrawCanvas();
                            this.redibujarFichas()
                           
                            // this.eliminarFicha(this.currentPlayer);
                            this.gestionarTurnos();
                            this.selectedFicha=null;
                        }else{
                            this.reset()
                        }
                    }else{
                      
                        this.reset()
                    }
                    
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
    eliminarFicha(equipo){ 
        console.log(`entre ${equipo} `)
        if(equipo=="humanos"){
            let posf=this.fichasHumanos.indexOf(this.selectedFicha);
            console.log(`posicion en arreglo ${posf}`)

            this.fichasHumanos.splice(posf,1);
            console.log(`size ${this.fichasHumanos.length()}`)
        }else{
            let posf=this.fichasAliens.indexOf(this.selectedFicha);
            this.fichasAliens.splice(posf,1);
        }
        console.log("fichas humanos "+ this.fichasHumanos.length())
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
    reset(){
        this.selectedFicha.setIsDraggin(false);
        this.selectedFicha.setSeleccionada(false);
        this.selectedFicha.resetPosicionInicial();
        this.reDrawCanvas();
        this.redibujarFichas();
        this.selectedFicha=null;
    }
    
    redibujarFichas() {
        // Redibuja todas las fichas de ambos jugadores
        this.fichasAliens.forEach(ficha => ficha.draw());
        this.fichasHumanos.forEach(ficha => ficha.draw());
    }

}