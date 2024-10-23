class ficha extends dibujable {
    constructor(posX, posY, ctx,radio) {
        super(posX, posY, ctx);
        this.radio=radio;
        this.seleccionada=false;
        this.isDraggin= false;
      
    }
    draw() {
       
        this.ctx.beginPath();
        this.ctx.fillStyle = "#8A2BE2";
        this.ctx.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }
    setSeleccionada(seleccionada){
        this.seleccionada=seleccionada
    }
    getSeleccionada(){
        return this.seleccionada;
    }
    setIsDraggin(isDraggin){
        this.isDraggin=isDraggin;
    }
    

   


}