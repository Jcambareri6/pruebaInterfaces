class Juego {
    constructor(Modalidad){
        this.canvas= document.getElementById("canvasP");
        this.ctx= this.canvas.getContext("2d");
    
        this.Modalidad=Modalidad;
        
        this.tablero = this.setTablero(Modalidad);
     
    }
    setTablero(Modalidad){
        console.log(Modalidad)
        switch (Modalidad){
            
            case 4 :
       
                return  new Tablero(100,0,this.ctx,6,7,null);
            break;
            case 5:
                return new Tablero(350,50,this.ctx,7,8,null)
            case 6:
                
             return new Tablero(350,50,this.ctx,8,9,null);
             
            break;
            
            
        }
        
    }
    play(){
        this.tablero.draw();
    } 
    gestionarTurnos(){
        
    }
}