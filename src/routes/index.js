var express = require('express')
  , router = express.Router()
  , UserCtrl = require('../controllers').UserCtrl
	, utils = require('../lib/utils');

var apiDesc = [];

var routerSettings = {
  '/categories': {
    name: '农业分类API',
    router: require('./category')
  },
  '/users': {
    name: '用户API',
    router: require('./user')
  }
};

var routerPaths = utils._.keys(routerSettings);

var apisDesc = [];

utils._.each(routerPaths, function (path) {
  var obj = {
    path: path,
    desc: routerSettings[path].name
  };
  apisDesc.push(obj);
  router.use(path, routerSettings[path].router);
});


router.post('/signin', UserCtrl.signin);

router.post('/signup', UserCtrl.signup);

router.post('/signout', UserCtrl.signout);

router.get('/', function (req, res) {
	res.json(apisDesc);
});

module.exports = router;
