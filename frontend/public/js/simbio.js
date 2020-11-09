var sketch=function(p){
    p.room=document.getElementsByClassName('room')[0].id;
    p.room=p.room.split("_")[0];
    console.log(p.room);
    p.socket=io(`/${p.room}`);
    p.dx=5*window.innerWidth/6; //variable general del ancho
    p.dy=5*window.innerHeight/6; //variable general del alto
    p.grilla_y=11;
    p.grilla_x=10;
    p.w_c=p.dx/p.grilla_x; // variable del ancho de un cuadrado
    p.h_c=p.dy/p.grilla_y; //variable del alto de un cuadrado 
    p.mando_colores=[]; //lista que almacena los cuadrados del mando
    p.malla_cuadrados=[] //cuadrícula de cuadrados
    p.color_actual;
    
    p.setup=function(){
        p.seteoCanvas(p.dx,p.dy);
        for(fila=0;fila<p.grilla_y-1;fila++){
            for(columna=0;columna<p.grilla_x;columna++){
                let config={
                    x:p.w_c/2+p.w_c*columna,
                    y:p.h_c/2+p.h_c*fila,
                    w:p.w_c,
                    h:p.h_c,
                    color:null,
                    id:columna +10*fila,
                }
                p.malla_cuadrados.push(config);       
            }
        }
        p.background(0);
        
    }

    p.draw=function(){
        p.malla_cuadrados.forEach(config => {
            p.dibujarCuadrado(config);
        });
        p.menuColores();
    }
    p.seteoCanvas=function(){
        let canvas=p.createCanvas(p.dx, p.dy);
        let posx=(p.windowWidth-p.width)/2;
        let posy=(p.windowHeight-p.height)/2;
        canvas.position(posx, posy);
    }
    p.dibujarCuadrado=function(config){
        p.rectMode(p.CENTER);
        p.stroke(0);
        let color={"r":255,"g":255,"b":255}
        if(config.color!=null){
            color=config.color;
        }
        p.fill(color['r'],color['g'],color['b'])
        p.rect(config.x, config.y, config.w, config.h);
        
    }

    p.menuColores=function(){
        p.stroke(155,56,89);
        p.strokeWeight(4);
        p.line(0, (p.grilla_y-1)*p.h_c-2,p.grilla_x*p.w_c,(p.grilla_y-1)*p.h_c-2);
        p.strokeWeight(1);
        p.noStroke();
        p.lista_colores=[p.color(19,22,76),p.color(19,76,40),p.color(196,47,11),p.color(242,245,2),p.color(255)];
        for (let i=0;i<5;i++){
            p.fill(p.lista_colores[i]);
            p.rectMode(p.CENTER);
            p.rect(p.w_c/2+(p.w_c)*i, (p.grilla_y-1)*p.h_c+p.h_c/2, p.w_c, p.h_c);
        }
    }

    p.mouseClicked=function(){
        for(let fila=0;fila<(p.dy/p.h_c)-1;fila++){
            for(let columna=0;columna<p.dx/p.w_c;columna++){
                if((p.w_c*columna<p.mouseX && p.mouseX<p.w_c*(columna+1)) &&(p.h_c*fila<p.mouseY && p.mouseY<p.h_c*(fila+1))){
                    //console.log(" fila: ", fila+1," columna: ",columna+1 );
                    let pos_aux=columna+(p.grilla_y-1)*fila;
                    let aux_x=p.malla_cuadrados[pos_aux].x;
                    let aux_y=p.malla_cuadrados[pos_aux].y;
                    let config={
                        x:aux_x,
                        y:aux_y,
                        w:p.w_c,
                        h:p.h_c,
                        color:p.color_actual,
                        id:columna +10*fila}
                    p.dibujarCuadrado(config);
                    p.malla_cuadrados[pos_aux]=config;
                    //el socekt emite
                    p.socket.emit("dibujar",{id:pos_aux,mi_color:p.malla_cuadrados[pos_aux].color}) ;
                    //console.log(malla_cuadrados[pos_aux].id);
    
                    
                }
            }
        }
        let colores=[{"r":19,"g":22,"b":76},{"r":19,"g":76,"b":40},{"r":196,"g":47,"b":11},{"r":242,"g":245,"b":2},{"r":255,"g":255,"b":255}];
        if(p.mouseY>(p.grilla_y-1)*p.h_c && p.mouseY<p.grilla_y*p.h_c){
            for(let columna=0;columna<p.dx/p.w_c;columna++){
                if(p.w_c*columna<p.mouseX && p.mouseX<p.w_c*(columna+1)){
                    p.color_actual=colores[columna];
                    //console.log(color_actual); revisamos si el color actual está cambiando
                }
            }
        }
    }
    p.socket.on("redibujar",(datos)=>{
        p.malla_cuadrados.forEach(config=>{
            if(config.id==datos.id){
                config.color=datos.mi_color
                p.dibujarCuadrado(config);
            }
        })
    })

}






/************************* INICIO DE LLAMADA GENERAL  ****************/
$(document).ready(function () {
    $("button").click(function (e) { 
        e.preventDefault();
        var simbioRoom=e.target.name+"_main";
        $("#menu").hide();
        $("#container").append(`<div id='${simbioRoom}' class='room'></div>`);
        new p5(sketch,simbioRoom);
    });
});



/************************* FIN DE LLAMADA GENERAL  ****************/



/* LEÉME */
/*
Respecto al uso de dx o width, dx se comporta como una variable general mientras que width es una propiedad inherente de p5js y solo funciona
dentro de sus funciones o funciones que estén dentro de sus funciones, por ejemplo una función propia que esté dentro de setup, preload o draw
funciones que son de la API.
Para reducir la matemática se ha dividido en una cuadrícula de  5x6 referenciados en w_c y h_c esto ayudará a la lógica de posición que requiere la aplicación
Por ejemplo observe la posición de la línea  x1=(0,5*hc); si la grilla son 6hc estamos diciendo que la posición Y de X1 sea la fila 5; en X2 =(5*w_c,5*h_c)
estamos diciendo que termine en la columna si del ancho y en la fila 5 del alto.
*/
/**
 * Respecto al evento de cambio de color:
 * Se ha creado una variable general, que por defecto tiene color blanco y es un elemento opcional en el constructor
 */