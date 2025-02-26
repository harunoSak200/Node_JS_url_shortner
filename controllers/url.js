const shortid = require('shortid');


const URL = require('../models/url')
async function HandleGenerateNewShortUrl(req , res){
    const body = req.body  ; 
    if(!body.url)return res.status(400).json({"err" : 'url is required'}) ;


    const short_id = shortid.generate() ; 

    await URL.create({
        shortId : short_id , 
        redirectUrl : body.url , 
        visitHistory : [] , 
    });

    return res.status(201).json({ id : short_id}) ; 
    
}


async function handleGetAnalytics(req , res){
    const shortId = req.params.shortId ; 
    const result  = await URL.findOne({shortId})  ;
    return res.json({
        totalClicks : result.visitHistory.length , 
        analytics  : result.visitHistory 
    })
}

module.exports = {
    HandleGenerateNewShortUrl , 
    handleGetAnalytics , 
}



