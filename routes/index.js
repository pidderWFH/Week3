var express = require('express');
var router = express.Router();
const PostsControllers = require("../controllers/posts");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', PostsControllers.getAllPosts);


router.post('/posts', PostsControllers.createdPosts);

router.delete('/posts', PostsControllers.deleteAllPosts);

router.delete('/posts/:id', PostsControllers.deleteOnePosts);

router.patch('/posts/:id', PostsControllers.patchPosts);
module.exports = router;
