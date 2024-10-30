class Tablero {
    constructor(posX, posY ,ctx,tamañoTableroX,tamañoTableroY, Winner,){
        
        this.posX=posX;
        this.posY= posY;
        this.ctx=ctx;
 
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
                return i;
            } 
        }
        return -1;
    }
    dropZone(layerX,layerY) {
          
            const inicioX = this.posX;
            const finX = this.posX + this.tamañoTableroX * this.widthCelda;
            const inicioY = this.posY;
            const finY = this.posY + this.heightCelda;
        
            
            return layerX >= inicioX+this.widthCelda && layerX <= finX + this.widthCelda && layerY >= inicioY && layerY <= finY;
        
    }

    hayGanador(jugador, nFichas, fila, columna) {
        const columnas = this.matrizLogica.length-1;
        const filas = this.matrizLogica[0].length-1;
        if (!this.verificarHorizontal(jugador,nFichas,columnas,fila)&&
            !this.verificarVertical(jugador,nFichas,filas,columna)&&
            !this.verificarDiagonalDerechaAIzquierda(jugador,nFichas,filas,columnas)&&
            !this.verificarDiagonalIzquierdaADerecha(jugador,nFichas,filas,columnas)
            ){
                return false;
        } else return true;
    }

        verificarHorizontal(jugador, nFichas, columnas , fila) {
        let acumulado = 0;
        let ganador = false;
            for (let i = 0; i <= columnas; i++) {
                let casillero = this.matrizLogica[i][fila];
                if (casillero.getFicha()!=null){
                    if (casillero.getFicha().getEquipo() !== jugador) {
                        acumulado = 0;
                    } else if (casillero.getFicha().getEquipo() == jugador && acumulado < nFichas){
                        acumulado++;
                        if (acumulado == nFichas){
                            ganador=true;
                        }
                    }
                } else if(!ganador){
                    acumulado = 0;
                }
            }
            return ganador;
        }  
            
    
        verificarVertical(jugador, nFichas, filas, columna){
        let acumulado = 0;
        let ganador = false;
            for (let i = 1; i <= filas; i++) {
                let casillero = this.matrizLogica[columna][i];
                if (casillero.getFicha()!=null){
                    if (casillero.getFicha().getEquipo() !== jugador) {
                        acumulado = 0;
                    } else if (casillero.getFicha().getEquipo() == jugador && acumulado < nFichas){
                        acumulado++;
                        if (acumulado == nFichas){
                            ganador=true;
                        }
                    }
                } else if(!ganador) {
                    acumulado = 0;
                }
            }
            return ganador;
        }


        verificarDiagonalIzquierdaADerecha(jugador, nFichas, filas, columnas) {
            for (let filaActual = 1; filaActual <= filas - nFichas; filaActual++) {
                for (let colActual = 0; colActual <= columnas - nFichas; colActual++) {
                    let acumulado = 0;
        
                    for (let i = 0; i < nFichas; i++) {
                        const casillero = this.matrizLogica[filaActual + i][colActual + i];
                        if (casillero.getFicha() != null && casillero.getFicha().getEquipo() == jugador) {
                            acumulado++;
                            if (acumulado == 1) return true;
                        } else {
                            acumulado = 0;
                            break;
                        }
                    }
                }
            }
            return false;
        }
        
        verificarDiagonalDerechaAIzquierda(jugador, nFichas, filas, columnas) {
            for (let filaActual = 1; filaActual <= filas - nFichas; filaActual++) {
                for (let colActual = nFichas - 1; colActual < columnas; colActual++) {
                    let acumulado = 0;
        
                    for (let i = 0; i < nFichas; i++) {
                        const casillero = this.matrizLogica[filaActual + i][colActual - i];
                        if (casillero.getFicha() != null && casillero.getFicha().getEquipo() == jugador) {
                            acumulado++;
                            if (acumulado == 1) return true;
                        } else {
                            acumulado = 0;
                            break;
                        }
                    }
                }
            }
            return false;
        }
        
    
    dibujarCasillero(columna,fila, ficha){
        const casillero = this.matriz[columna][fila];
    
        
        const fichaPosX = casillero.posX + (this.widthCelda / 2);
        const fichaPosY = casillero.posY + (this.heightCelda / 2);

        ficha.setPosX(fichaPosX);
        ficha.setPosY(fichaPosY);
        ficha.draw();
      
    }
}