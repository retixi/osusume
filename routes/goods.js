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
    require('crypto').randomBytes(16, function(ex, buf) {
        var token = buf.toString('hex');
        db.presents.findAndModify({
            query:{category:req.body.category},
            update:{$push:
            {goods:{
                title:req.body.title,
                link:req.body.link,
                price:req.body.price,
                image:req.body.image,
                gid:req.body.category+"-"+token
            }
            }
            }
        },function (err,doc2) {
        res.render('success.html')

    })



    })

   /*
    db.presents.findOne({category:req.body.category},function (err,docs) {
        require('crypto').randomBytes(16, function(ex, buf) {
            global.token = buf.toString('hex');
            console.log(token);
            var newgood={
                gid:docs.category+"-"+token,
                price:req.body.price,
                title:req.body.title,
                link:req.body.link,
                image:req.body.image
            }
            docs.goods.push(newgood)
            db.presents.update({category:req.body.category},{$set:{goods:docs.goods}
            })
        })
        });
    res.render('success.html')

    */
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
    db.presents.findAndModify({
        query: {category: req.query.category},
        update: {$pull:{goods:{gid:req.query.gid}}}
    },function (err,doc1) {
        db.presents.findAndModify({
            query:{category:req.query.category},
            update:{$push:
            {goods:{
                title:req.body.title,
                link:req.body.link,
                price:req.body.price,
                image:req.body.image,
                gid:req.query.gid
            }
            }
            }
        },function (err,doc2) {
        })

    })
    res.render('success.html')
})


router.get('/update',function (req,res) {
    res.render('update.html',{title:req.query.title})
        })









    module.exports = router;