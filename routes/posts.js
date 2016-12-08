var express = require('express'),
  Post = require('../models/Post');
var router = express.Router();

// List를 보여준다.
router.get('/', function (req, res, next) {
  Post.find({}, function (err, posts) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', { posts: posts });
  });
});


// 글쓰기 페이지를 보여준다.
router.get('/new', function (req, res, next) {
  res.render('posts/edit', { post: {} }); // view에서 edit.jade 갔는데 post.id 의 값이 없어서 글쓰기 form으로 나온다.
});


// 글을 쓴다.
router.post('/', function (req, res, next) {
  Post.findOne({ email: req.body.email }, function (err, post) { //findOne : 인자로 넘겨 받은 오브젝트에 해당하는 데이터를 하나 찾는다.
    if (err) {
      return next(err);
    }
    var nPost = new Post({
      email: req.body.email,
      title: req.body.title,
      content: req.body.content,
      //password :req.body.password,
      city:  req.body.city,
      address:  req.body.address,
      cash:  req.body.cash,
      facilities:  req.body.facilities,
      rule:  req.body.rule
    });

    nPost.save(function (err) { //save 메소드를 호출해 저장.
      if (err) {
        return next(err);
      } else {
        res.redirect('/posts');
      }
    });
  });
});



// 글내용 보기
router.get('/:id', function (req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err);
    }
    post.read++;
    post.save(function (err) {
      if (err) {
        return next(err);
      }
      res.render('posts/show', { post: post });
    });
  });
});


// 글수정 페이지를 보여준다.
// 해당 아이디값에 맞는 데이터를 가져와서 글수정이 되도록 한다.
// get으로 글수정할 수 있도록 form을 가져옴
router.get('/:id/edit', function (req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', { post: post }); // view에서 edit.jade 가서 기존에 썼던 post값을 쓴다.
  });
});


// 글수정해서 수정된 정보를 보낸다.
router.put('/:id', function (req, res, next) {
  Post.findById({ _id: req.params.id }, function (err, post) {
    if (err) {
      return next(err);
    }
    post.email = req.body.email;
    post.title = req.body.title;
    post.content = req.body.content;

    post.save(function (err) {
      if (err) {
        return next(err);
      }
      res.render('posts/show', { post: post });
    });
  });
});


// 글을 삭제한다.
router.delete('/:id', function (req, res, next) {
  Post.findOneAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});

module.exports = router;
