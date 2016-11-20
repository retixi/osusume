/**
 * Created by renxi on 2016/11/20.
 */
var express = require('express');
var router = express.Router();
var db=require('../db').db
var bodyParser=require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/',function (req,res,next) {
    db.presents.findOne({category:req.body.catesel},function (err,docs) {
        res.render('goods.html',{goodslist:docs})
    })
})

router.post('/add',function (req,res) {
    db.presents.findOne({category:req.body.category},function (err,docs) {
        var number=docs.goods.length+1
        var newgood={
            gid:docs.category+number,
            price:req.body.price,
            title:req.body.title,
            link:req.body.link,
            image:''
        }
        docs.goods.push(newgood)

        db.presents.update({category:req.body.category},{$set:{goods:docs.goods}
        })
    })
    res.render('success.html')

})

router.get('/del',function (req,res) {
    db.presents.findAndModify({
        query:{category:req.query.category},
        update:{$pull:{goods:{gid:req.query.gid}}}
    },function (err,doc1) {
        console.log(doc1)
    })
    res.render('success.html')
})

router.post('/update',function (req,res) {
    res.render('success.html')
})

router.get('/update',function (req,res) {
    res.render('update.html')
})






module.exports = router;
