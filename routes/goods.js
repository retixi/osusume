/**
 * Created by renxi on 2016/11/20.
 */
var express = require('express');
var router = express.Router();
var db=require('../db').db
var bodyParser=require('body-parser')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));










module.exports = router;
