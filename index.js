const express=require("express");
const path=require("path");
const IO_server=require("socket.io");
const app=express();



//Archivos estáticos
app.use(express.static(path.join(__dirname,"frontend/public")));
//Habilitamos el servidor y asignamos a una variable que usará  socket io
app.get("/simbio",(req,res)=>{
    console.log(req.query.room)
    res.render("layout.pug");
})
let servidor=app.listen(process.env.PORT? process.env.PORT : 3000,()=>{
    console.log("Estamos en línea");
})

//Iniciamos los servicios de socket.io
const io=IO_server(servidor);
io.of("/").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio1").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio2").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio3").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio4").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio5").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio6").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio7").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio8").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio9").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})

io.of("/simbio10").on("connection",(socket)=>{
    console.log("Conexión extablecida",socket.id);
    socket.on("dibujar",(datos)=>{
        console.log(datos);
        socket.broadcast.emit("redibujar",datos);
    })
})