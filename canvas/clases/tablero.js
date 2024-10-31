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
                if (j!=0){
                    fila.push(new casillero(posiciones.posx, posiciones.posY, this.ctx, this.widthCelda, this.heightCelda,'./img/casillero.png',i));  
                }else {
                    fila.push(new casillero(posiciones.posx, posiciones.posY, this.ctx, this.widthCelda, this.heightCelda,'./img/Variant2.png',i));  
                }
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
            !this.verificarDiagonales(jugador,nFichas,filas,columnas ,fila, columna)
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

        verificarDiagonales(jugador, nFichas,filas,columnas, fila, columna) {

            // Función auxiliar para contar fichas consecutivas en una dirección
            const contarFichasEnDireccion = (deltaFila, deltaColumna) => {
                let acumulado = 0;
                let nuevaFila = fila;
                let nuevaColumna = columna;
        
                // Recorre en la dirección especificada (deltaFila, deltaColumna)
                while (
                    nuevaFila >= 0 && nuevaFila <= filas &&
                    nuevaColumna >= 0 && nuevaColumna <= columnas
                ) {
                    const casillero = this.matrizLogica[nuevaColumna][nuevaFila];
                    if (!casillero || casillero.getFicha()?.getEquipo() !== jugador) break;
        
                    acumulado++;
                    nuevaFila += deltaFila;
                    nuevaColumna += deltaColumna;
                }
                return acumulado;
            };
        
            // Verificar la diagonal de derecha a izquierda (↘ y ↖)
            let totalFichasDiagonal1 = 
                contarFichasEnDireccion(1, 1) +  // Dirección ↘
                contarFichasEnDireccion(-1, -1) - 1; // Dirección ↖ (restamos 1 para no contar la ficha inicial dos veces)
        
            // Verificar la diagonal de izquierda a derecha (↙ y ↗)
            let totalFichasDiagonal2 = 
                contarFichasEnDireccion(1, -1) +  // Dirección ↙
                contarFichasEnDireccion(-1, 1) - 1; // Dirección ↗ (restamos 1 para no contar la ficha inicial dos veces)
        
            return totalFichasDiagonal1 >= nFichas || totalFichasDiagonal2 >= nFichas;
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