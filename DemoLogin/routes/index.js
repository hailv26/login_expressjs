var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/cookie',function(req,res,next){
  res.cookie('name','Le Van Hi');
  res.send(req.cookies.name);
});
router.use('/session',function(req,res,next){
  
  res.send(req.cookies.name);
});

router.use('/login',function(req,res,next){
  console.log(req.cookies);
  if(req.method=="POST"){
    if(req.param('username')=="admin" & req.param('password')=="admin"){
      res.cookie('key',1);
      res.cookie('name','Le Van Hai');
      res.cookie('age',21);
      res.cookie('address','Ha noi');
      console.log(req.param('username'));
      
      res.redirect('home');
    }
    else res.send("Dang nhap that bai");
  }
  else
    res.render('login');
});

router.use('/home',function(req, res, next){
  if(req.cookies.key==1){
    res.render('home',{'data': req.cookies});
  }
  else res.redirect('login');
  
});

router.use('/logout',function(req, res, next){
  res.clearCookie('key');
  res.clearCookie('name');
  res.clearCookie('age');
  res.clearCookie('username');
  res.clearCookie('password');
  res.clearCookie('address');
  res.redirect('login');
});

module.exports = router;
