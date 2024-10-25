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
                fila.push(new casillero(posiciones.posx, posiciones.posY, this.ctx, this.widthCelda, this.heightCelda,'./img/casillero.png',i));  
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
    dropZone(layerX,layerY) {
          
            const inicioX = this.posX;
            const finX = this.posX + this.tamañoTableroX * this.widthCelda;
            const inicioY = this.posY;
            const finY = this.posY + this.heightCelda;
        
            
            return layerX >= inicioX+this.widthCelda && layerX <= finX + this.widthCelda && layerY >= inicioY && layerY <= finY;
        
    }
    dibujarCasillero(columna, ficha){
        let i=0;
        let encontro = false;
        while (i <= this.tamañoTableroY && !encontro){
            let casillero = this.matriz[columna][i];
            if(casillero.getFicha()!==ficha){
                //dibujar
            }
            if (casillero.getFicha==ficha){
                //dibujar
                encontro=true;
            } 
        }
        return false;
    }
}