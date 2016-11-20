var express = require('express');
var router = express.Router();
var db=require('../db').db
var bodyParser=require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.presents.find(function (err,docs){
    var arr=[]
      for (var i = 0; i < docs.length; i++) {
        arr.push(docs[i].category)
      }
    res.render('category.html',{datalist:arr})
    })
    })









module.exports = router;
