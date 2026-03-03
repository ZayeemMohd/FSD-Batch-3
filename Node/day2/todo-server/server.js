const express = require("express");
const app = express();



app.get("/html", (req, res)=>{
    res.send("<h1>I am HTML</h1>")
    
})

app.get('/api/restaurant', (req, res)=>{
    res.json({
        "restaurant": "Shah Ghouse"
    })
})


// app.post()

// app.put()

// app.delete()


const PORT = 3000;
app.listen(PORT, () =>{
    console.log("Server is listenting at ", PORT);
})