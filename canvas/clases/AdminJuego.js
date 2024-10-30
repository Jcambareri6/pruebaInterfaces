class AdminJuego{
    constructor(canvas){
        this.canvas=canvas;
        this.ctx= this.canvas.getContext('2d');;
        this.fichaPresentacionAliens = [];
        this.fichaPresentacionHumanos=[];
        this.botonesModalidad = [];

    }

    mostrarConfiguracionDeJuego(){
        this.drawBtones();
    }
    reiniciar(){

    }
    iniciarJuego(){

    }
    iniciarBtones(){
        const canvasWidth = 1227;
        const buttonWidth = 250;
        const buttonSpacing = (canvasWidth - (buttonWidth * 3)) / 4; // Espacio entre botones y los márgenes
    
        // Calcular las posiciones en X para cada botón de manera que queden centrados
        let posX4 = buttonSpacing;
        let posX5 = posX4 + buttonWidth + buttonSpacing;
        let posX6 = posX5 + buttonWidth + buttonSpacing;
        let posY = (this.canvas.height/2)+110; // Altura en la que los botones se dibujarán
    
        // Crear y agregar los botones al array
        let btnModalidad4 = new btnModalidad(this.ctx, posX4, posY, 4);
        let btnModalidad5 = new btnModalidad(this.ctx, posX5, posY, 5);
        let btnModalidad6 = new btnModalidad(this.ctx, posX6, posY, 6);
        this.botonesModalidad.push(btnModalidad4,btnModalidad5,btnModalidad6);
        console.log(this.botonesModalidad)

    }
    iniciarFichas(){
        
    }
    drawBtones(){
        this.botonesModalidad.forEach(btn =>{
            btn.draw();
        })
    }

}