const express = require('express');

const getLounas = require('../controller/Lounas');
const verfiyToken = require('../controller/middleware');


const router = express.Router();
router.get("/",getLounas)

module.exports =  router ;