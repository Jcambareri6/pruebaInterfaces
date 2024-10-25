class Tablero extends dibujable{
    constructor(posX, posY ,ctx,tamañoTableroX,tamañoTableroY, Winner,){
        super(posX,posY,ctx)
 
        this.tamañoTableroX=tamañoTableroX;
        this.tamañoTableroY=tamañoTableroY;
        
        this.Winner=Winner;
        this.heightCelda=70;
        this.widthCelda=70;
        this.matrizLogica = this.GenerarMatriz();
        this.Winner=null;
    }

    GenerarMatriz() { 


        this.matriz = []; 

        for (let i = 0; i < this.tamañoTableroX; i++) {
            let fila = [];
            for (let j = 0; j < this.tamañoTableroY; j++) {
                let posiciones = this.calcularPosCasilleros(i, j);
               
                fila.push(new casillero(posiciones.posx, posiciones.posY, this.ctx, this.widthCelda, this.heightCelda));
            }
            this.matriz.push(fila); 
        }
        console.log(this.matriz);
        return this.matriz;
    }
      draw(){
        this.matriz.forEach(fila => {
            fila.forEach(casillero => casillero.draw());
        });
      }
      
      calcularPosCasilleros(x, y) {
        return {
            posx: this.posX  + x * this.widthCelda, 
            posY: this.posY + y * this.heightCelda 
        };
    }
      posicionarFicha( col, ficha){
       
        for (let i = this.tamañoTableroY- 1; i >= 0; i--) {
            let casillero = this.matriz[col][i];
            if(casillero.getFicha()==null){
                casillero.setFicha(ficha);
                console.log(`posicion en fila ${i}`)
                console.log(this.matriz[col][i])
                return true;
            }
           
        }
        
        return false;
      }
}