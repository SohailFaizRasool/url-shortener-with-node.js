// routes/index.js

const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/shortUrl');


router.get('/', async (req, res,next) => {
    try {
        const urls = await ShortUrl.find();
        res.render("index", { urls });
    } catch (err) {
        err.status= 500
        err.message= 'Internal Server Error'
        next(err)
    }
});

router.post('/shortUrl', async (req, res,next) => {
    try {
        const { fullURL } = req.body;
        if (!fullURL) {
            const error = new Error('URL not found');
            error.status = 404;
            throw error;
            
        }
        await ShortUrl.create({ full: fullURL });
        res.redirect('/');
    } catch (err) {
        err.status= 500
        err.message= 'Internal Server Error'
        next(err)
        
    }
});

router.get('/:shortUrl', async (req, res,next) => {
    try {
        const url = await ShortUrl.findOne({ short: req.params.shortUrl });
        if (!url) {
            const error = new Error('URL not found');
            error.status = 404;
            throw error;
        }
        url.clicks++;
        await url.save();
        res.redirect(url.full);
    } catch (err) {
        err.status= 500
        err.message= 'Internal Server Error'
        next(err)
        
    }
});

module.exports = router;
