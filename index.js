const express = require("express") ; 

const app = express() ; 
const PORT = 8001 ; 
 
app.use(express.json()) ; 

const {connectToMongoDB} = require('./connection') ; 
const urlRoute  = require('./routes/url') ; 

const URL = require('./models/url') ; 

// Connection: 
connectToMongoDB('mongodb://127.0.0.1:27017/url-shortner')
.then(()=>console.log('mongodb connected')) ; 


app.use('/url' , urlRoute) ; 

app.get('/:shortId' , async(req , res)=>{
    const shortId = req.params.shortId ;
    const entry = await URL.findOneAndUpdate({
        shortId
    } ,{$push : {
        visitHistory : [
            {timestamp : Date.now() }
        ]
    }} )

    res.redirect(entry.redirectUrl) ;
    
})

app.listen(PORT , ()=>console.log(`server running at the http://localhost:${PORT}`)) ;
