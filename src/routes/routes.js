const express = require('express');
const router = new express.Router;
const User = require('../controllers/user/user.controller');
const Auth = require('../controllers/auth/auth.controller');
const Rtsp = require('../controllers/rtsp/rtsp.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.get('/',(req,res)=>res.send('ok'));

router.post('/rtsp/start',Rtsp.startSocket);

// user routes
router.post('/user',User.create);
router.post('/auth',Auth.create);


router.use(authMiddleware);
router.post('/user/find/rtsp',User.rtspByUser);

// rtsp routes
router.post('/rtsp',Rtsp.create);



module.exports = router;