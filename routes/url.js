const express = require('express') ; 
const {HandleGenerateNewShortUrl, handleGetAnalytics} = require('../controllers/url')

const router = express.Router() ; 

router.post('/' , HandleGenerateNewShortUrl) ;

router.get('/analytics/:shortId' , handleGetAnalytics )

module.exports = router ; 
