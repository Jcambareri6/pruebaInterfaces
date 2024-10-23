class casillero extends dibujable{
    constructor (posX,posY,ctx,width,height){
        super(posX,posY,ctx);
        this.width=width;
        this.height=height;
         this.ficha = null;
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#8A2BE2";
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
            this.ctx.strokeStyle = "#000000"; // Define el color del stroke (negro en este caso)
        this.ctx.lineWidth = 2; // Ancho del stroke
        this.ctx.strokeRect(this.posX, this.posY, this.width, this.height);
        this.ctx.fill();
        this.ctx.closePath();
    }
    getFicha(){
        return this.ficha;
    }
    setFicha(ficha){
        this.ficha=ficha;
    }
}