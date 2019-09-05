var socket=io();
var dx=5*window.innerWidth/6; //variable general del ancho
var dy=5*window.innerHeight/6; //variable general del alto
var w_c=dx/5; // variable del ancho de un cuadrado
var h_c=dy/6; //variable del alto de un cuadrado 
var mando_colores=[]; //lista que almacena los cuadrados del mando
var malla_cuadrados=[] //cuadrícula de cuadrados

var color_actual;
function setup(){
    let canvas=seteo_canvas(dx,dy);
    for(fila=0;fila<5;fila++){
        for(columna=0;columna<5;columna++){
            let c=new Cuadrados(w_c/2+w_c*columna,h_c/2+h_c*fila,w_c,h_c,fila,columna);
            malla_cuadrados.push(c);       
        }
    }
    background(0);
    //inicializamos el color:
    color_actual={r:255,g:255,b:255};
    console.log(malla_cuadrados[1].id);
    malla_cuadrados.forEach(cuadrado=>{
        cuadrado.dibujarCuadrado();
    })
    menu_colores();
}


function seteo_canvas(){
    let canvas=createCanvas(dx,dy);
    let posx=(windowWidth-width)/2;
    let posy=(windowHeight-height)/2;
    canvas.position(posx, posy);
    canvas.parent("juego");
    return canvas
}

function menu_colores(){
    //Línea divisoria
    stroke(155,56,89);//color de línea
    strokeWeight(4);
    line(0, 5*h_c-2,5*w_c,5*h_c-2);
    //Fin de línea divisoria
    //cuadrados de mando
    strokeWeight(1);
    noStroke();
    lista_colores=[color(19,22,76),color(19,76,40),color(196,47,11),color(242,245,2),color(255)]
    for (let i = 0; i < 5; i++) {
        fill(lista_colores[i]);
        rectMode(CENTER);
        let rectangulo=rect(w_c/2+(w_c)*i, 5*h_c+h_c/2, w_c, h_c);    
        
        mando_colores.push(rectangulo);
    }
}

function mouseClicked(){
    //Grid de cuadrados
    for(let fila=0;fila<(dy/h_c)-1;fila++){
        for(let columna=0;columna<dx/w_c;columna++){
            if((w_c*columna<mouseX && mouseX<w_c*(columna+1)) &&(h_c*fila<mouseY && mouseY<h_c*(fila+1))){
                console.log(" fila: ", fila+1," columna: ",columna+1 );
                let pos_aux=columna+5*fila;
                let aux_x=malla_cuadrados[pos_aux].x;
                let aux_y=malla_cuadrados[pos_aux].y;
                let aux_cuadrado=new Cuadrados(aux_x,aux_y,w_c,h_c,fila,columna,color_actual);
                aux_cuadrado.dibujarCuadrado();
                malla_cuadrados[pos_aux]=aux_cuadrado;
                //el socekt emite
                socket.emit("dibujar",{id:pos_aux,mi_color:malla_cuadrados[pos_aux].mi_color}) ;
                //console.log(malla_cuadrados[pos_aux].id);

                
            }
        }
    }
    //Grid de mandos
    colores=[{r:19,g:22,b:76},{r:19,g:76,b:40},{r:196,g:47,b:11},{r:242,g:245,b:2},{r:255,g:255,b:255}];
    if(mouseY>5*h_c && mouseY<6*h_c){
        for(let columna=0;columna<dx/w_c;columna++){
            if(w_c*columna<mouseX && mouseX<w_c*(columna+1)){
                color_actual=colores[columna];
                //console.log(color_actual); revisamos si el color actual está cambiando
            }
        }
    }
     
}

//el socket a la escucha
//los adtos que recibe el socket son la posición, el id, y el color
socket.on("redibujar",(datos)=>{
    malla_cuadrados.forEach(cuadrado=>{
        if(cuadrado.id==datos.id){
            let aux_x=cuadrado.x;
            let aux_y=cuadrado.y;
            let aux_fila=cuadrado.fila;
            let aux_columna=cuadrado.columna;
            let aux_cuadrado=new Cuadrados(aux_x,aux_y,w_c,h_c,aux_fila,aux_columna,datos.mi_color);
            aux_cuadrado.dibujarCuadrado();
            malla_cuadrados[datos.id]=aux_cuadrado;
        }
    })
})

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
