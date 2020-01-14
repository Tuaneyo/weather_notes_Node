var express = require('express');
var router = express.Router();

var routes = {
    home: {
        path: '/',
        breadCrumbTitle: 'Home'
    },
    deelnemer: {
        path: '/deelnemer',
        breadCrumbTitle: 'Deelnemer',
        parentBreadCrumb: 'home'
    }
};

const getBreadCrumb = (breadcrumbKey) => {
    // route ophalen
    // if route parent
    // continue recursion
    // else
    // breadcrumb string
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('auth/login');
});


router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

router.get('/register', function(req, res, next) {
    res.render('auth/register');
});

module.exports = router;
