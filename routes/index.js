var express = require('express'),
    todos = require('./todos'),
    User = require('../models/User');
var router = express.Router();
var _ = require('lodash');

var countries = [
  "서울", "베이징", "도쿄", "런던", "상하이", "부산", "LA"
 ];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.post('/signin', function(req, res, next) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      res.render('error', {message: "Error", error: err});
    } else if (!user) {
      req.flash('danger', '존재하지 않는 사용자 입니다.');
      res.redirect('back');
    } else if (user.password !== req.body.password) {
      req.flash('danger', '비밀번호가 일치하지 않습니다.');
      res.redirect('back');
    } else {
      req.session.user = user;
      req.flash('success', '로그인 되었습니다.');
      res.redirect('/');
    }
  });
});

router.get('/signout', function(req, res, next) {
  delete req.session.user;
  req.flash('success', '로그아웃 되었습니다.');
  res.redirect('/');
});

router.get('/suggest', function(req, res, next) {
  var q = req.query.q;

  // q의 내용이 name에 포함된 이름만 모아서 배열로 반환
  var ret = _.filter(countries, function(name) {
    // name, query 모두 소문자로 변경하여 대소문자 구별 없이 포함하고 있는지 비교
    return name.toLowerCase().indexOf(q.toLowerCase()) > -1;
  });

  // JSON으로 결과를 return
  res.json(ret);
});

router.use('/todos', todos);

module.exports = router;
