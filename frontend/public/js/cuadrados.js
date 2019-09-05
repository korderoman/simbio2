class Cuadrados{
    constructor(x,y,w_c,h_c,fila,columna,mi_color={r:255,g:255,b:255}){
        this.x=x;
        this.y=y;
        this.w_c=w_c;
        this.h_c=h_c;
        //colores
        this.id=columna + 5*fila;
        this.mi_color=mi_color;
    }
    dibujarCuadrado(){
        rectMode(CENTER)
        stroke(0);
        fill(this.mi_color.r,this.mi_color.g,this.mi_color.b);
        rect(this.x,this.y,this.w_c,this.h_c);
    }

    cambiarColor(){
        
    }




}