var express = require('express'),
    Post = require('../models/Post');
var router = express.Router();

// List를 보여준다.
router.get('/', function(req, res, next) {
  Post.find({}, function(err, docs) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', {posts: docs});
  });
});


// 글쓰기 페이지를 보여준다.
router.get('/new', function(req, res, next) {
  res.render('posts/edit', {post: {}}); // view에서 edit.jade 갔는데 post.id 의 값이 없어서 글쓰기 form으로 나온다.
});


// 글을 쓴다.
router.post('/', function(req, res, next) {
  var post = new Post({
    email: req.body.email, 
    title: req.body.title,
    //password: req.body.password,
    content: req.body.content,
    city: req.body.city,
    adress: req.body.adress,
    fee: req.body.fee,
    facility: req.body.facility,
    rule: req.body.rule,
    read: 0
  });
  // 완료작업
  post.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('posts'); // List페이지로 다시 간다.
  });
});



// 글내용 보기
router.get('/:id', function(req, res, next) {                      
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    post.read++;
    post.save(function(err) {
      if (err) {
        return next(err);
      }
      res.render('posts/show', {post: post});
    });
  });
});


// 글수정 페이지를 보여준다.
// 해당 아이디값에 맞는 데이터를 가져와서 글수정이 되도록 한다.
// get으로 글수정할 수 있도록 form을 가져옴
router.get('/:id/edit', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post:post}); // view에서 edit.jade 가서 기존에 썼던 post값을 쓴다.
  });
});


// 글수정해서 수정된 정보를 보낸다.
router.put('/:id', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, user) {
    if(err) {
      return next(err);
    }
    //user.email = req.body.email;
    user.title = req.body.title; 
    user.content = req.body.content;
    user.city= req.body.city;
    user.adress= req.body.adress;
    user.fee= req.body.fee;
    user.facility= req.body.facility;
    user.rule= req.body.rule;
 
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.render('posts/show', {post:user});
    });
  });
});


// 글을 삭제한다.
router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});

module.exports = router;
