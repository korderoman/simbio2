const expres=require("express");
const path=require("path");
const IO_server=require("socket.io");
const app=expres();


//Archivos estáticos
app.use(expres.static(path.join(__dirname,"frontend/public")));
//Habilitamos el servidor y asignamos a una variable que usará  socket io
let servidor=app.listen(process.env.PORT || 3000,()=>{
    console.log("Estamos en línea");
})
//Iniciamos los servicios de socket.io
const io=IO_server(servidor);
io.on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        
        socket.broadcast.emit("redibujar",datos);
    })
})


