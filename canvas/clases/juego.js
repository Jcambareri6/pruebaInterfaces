class Juego {
    constructor(Modalidad,canvas, fichaElegidaAliens,fichaElegidaHumanos) {
        this.canvas=canvas;
        this.ctx= canvas.getContext('2d');
     

        this.Modalidad = Modalidad;
        this.fichaElegidaAliens=fichaElegidaAliens;
        this.fichaElegidaHumanos=fichaElegidaHumanos;
        console.log(`fichas humanos ${this.fichaElegidaHumanos}`)
        console.log(`fichas aliens ${this.fichaElegidaAliens}`)
        this.currentPlayer = "humanos";
        this.selectedFicha = null;
        this.tablero = this.setTablero(this.Modalidad);
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
          
            case '4':
                tamañoX = 6;
            
                this.generarFichas((tamañoX*tamañoY)/2)
                break;
            case '5':
                tamañoX=7;
                 
                this.generarFichas((tamañoX*tamañoY)/2)
            case '6':

                 tamañoX=8;
                  
                this.generarFichas((tamañoX*tamañoY)/2)

                break;


        }
      
    }
    generarFichas(cantFichas) {
        
        const posYMin = 100;           // Inicio de la altura del tablero
        const posYMax = 500;          // Fin de la altura del tablero
    
        // Anchos y posiciones para cada modalidad de tablero
        const tableroConfig = {
            4: { posX: 601, ancho: 360, margen: 220 }, // 4 en línea
            5: { posX: 571, ancho: 420, margen: 250 }, // 5 en línea
            6: { posX: 541, ancho: 480, margen: 280 }  // 6 en línea
        };
    
        // Obtiene la configuración del tablero actual
        const tablero = tableroConfig[this.Modalidad];
    
        // Función para generar posiciones aleatorias en un rango específico
        const getRandomPosition = (minX, maxX, minY, maxY) => {
            const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
            const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
            return { x, y };
        };
    
        // Generar fichas para Aliens (derecha del tablero)
        for (let i = 0; i < cantFichas; i++) {
            const alienPos = getRandomPosition(tablero.posX + tablero.ancho + tablero.margen, tablero.posX + tablero.ancho + 100, posYMin, posYMax);
   
            let fichaAlien = new ficha(alienPos.x, alienPos.y, this.ctx, 25, this.fichaElegidaAliens, 'aliens');
            fichaAlien.setPosicionInicial(alienPos.x, alienPos.y);
            this.fichasAliens.push(fichaAlien);
        }
    
        // Generar fichas para Humanos (izquierda del tablero)
        for (let i = 0; i < cantFichas; i++) {
            const humanoPos = getRandomPosition(tablero.posX - 100, tablero.posX - tablero.margen, posYMin, posYMax);
            
            let fichaHumano = new ficha(humanoPos.x, humanoPos.y, this.ctx, 25, this.fichaElegidaHumanos, 'humanos');
            fichaHumano.setPosicionInicial(humanoPos.x, humanoPos.y);
            this.fichasHumanos.push(fichaHumano);
        }
    }
    setTablero(Modalidad) {
      // Use Modalidad, not this.Modalidad
        let tablero;
    
        switch (Modalidad) {
            case "4":
                tablero = new Tablero(601, 90, this.ctx, 6, 8, null);
                break; // Use break to prevent fallthrough
            case "5":
                tablero = new Tablero(571, 90, this.ctx, 7, 8, null); // Add 'new' keyword
                break;
            case "6":
                tablero = new Tablero(541, 90, this.ctx, 8, 8, null);
                break;
            default:
                console.error("Modalidad desconocida");
                tablero = new Tablero(601, 90, this.ctx, 6, 8, null); // Fallback case
        }
    
        console.log(tablero);
        return tablero;
    }
    play() {
        
        this.tablero.drawTablero();
        // this.iniciarFichas()
      
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
        
          
            if ( !ficha.getPosicionada()  && ficha.isMouseOver((e.layerX-this.canvas.offsetLeft), e.layerY)) {

                this.configurarDrag("humanos",ficha)
            }
           
        })

        this.fichasAliens.forEach(ficha => {

            if ( !ficha.getPosicionada() && ficha.isMouseOver((e.layerX-this.canvas.offsetLeft), e.layerY)) {
                this.configurarDrag("aliens",ficha)
            }
           
        })

      
    }
    
    MouseUp(e) {

        if (this.selectedFicha.getIsDraggin() == true && this.selectedFicha.getSeleccionada()==true){
                if(this.selectedFicha!=null){
                    if(this.tablero.dropZone(e.layerX,e.layerY)){
                     
                        const columna = Math.floor((e.layerX - this.tablero.posX) / this.tablero.widthCelda);
                        let FilafichaPosicionada= this.tablero.posicionarFicha(columna-1,this.selectedFicha);
                        if (FilafichaPosicionada!= -1 ){
                            if(this.selectedFicha.getIsDraggin()==true && this.selectedFicha.getSeleccionada()==true){
                             
                                this.selectedFicha.setPosicionada(true);
                             
                               
                                this.tablero.dibujarCasillero(columna-1,FilafichaPosicionada, this.selectedFicha);
                                this.selectedFicha.setIsDraggin(false);
                           
                                this.reDrawCanvas();
                                this.redibujarFichas()
                              
                               
                                // this.eliminarFicha(this.currentPlayer);
                                if(this.tablero.hayGanador( this.currentPlayer,this.Modalidad,FilafichaPosicionada,columna-1)){
                                    if(this.selectedFicha.getIsDraggin()==false && this.selectedFicha.getSeleccionada()==false){
                                        
                                    }
                                    alert(`ganador ${this.currentPlayer}`)
                                }
                                //si no quedan fichas o lugares empate
                                this.gestionarTurnos();
                                this.selectedFicha=null;
                                console.log("ganador?: " + this.tablero.hayGanador(this.currentPlayer,this.Modalidad,FilafichaPosicionada,columna-1));
                                
                            }
                           
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