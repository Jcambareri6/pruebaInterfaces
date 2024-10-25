class ficha extends dibujable {
    constructor(posX, posY, ctx,radio,src) {
        super(posX, posY, ctx);
        this.radio=radio;
        this.seleccionada=false;
        this.isDraggin= false;
        this.img = new Image();
        this.src= src
        this.setImagen(src)
        this.img.onload = () => {
            this.draw(); 
        };
       
      
    }
    setImagen(src){
        this.img.src = src;
    }
    draw() {
       
        this.ctx.beginPath();
       
        this.ctx.drawImage(
            this.img, 
            this.posX - this.radio,   
            this.posY - this.radio,  
            this.radio * 2,         
            this.radio * 2            
        );
    
        
        this.ctx.fill();
        this.ctx.closePath();
    }
   
   
    isMouseOver(x = 0, y = 0) {
       
        return(x>=this.posX-this.radio && (y<this.posY+this.radio && y>=this.posY-(this.radio*2))); 
    }
        // Getter y Setter para "seleccionada"
    setSeleccionada(seleccionada) {
        this.seleccionada = seleccionada;
    }

    getSeleccionada() {
        return this.seleccionada;
    }

    // Getter y Setter para "isDraggin"
    setIsDraggin(isDraggin) {
        this.isDraggin = isDraggin;
    }

    getIsDraggin() {
        return this.isDraggin;
    }

    // Getter y Setter para "posX"
    setPosX(posX) {
        this.posX = posX;
    }

    getPosX() {
        return this.posX;
    }

    // Getter y Setter para "posY"
    setPosY(posY) {
        this.posY = posY;
    }

    getPosY() {
        return this.posY;
    }

    // Getter y Setter para "radio"
    setRadio(radio) {
        this.radio = radio;
    }

    getRadio() {
        return this.radio;
    }
   


}