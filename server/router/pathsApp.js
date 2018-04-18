'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _User = require('../model/User');

var _User2 = _interopRequireDefault(_User);

var _Nodes = require('../model/Nodes');

var _Nodes2 = _interopRequireDefault(_Nodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var urlencoded = _bodyParser2.default.urlencoded({
    extended: false
});

var user = new _User2.default();
var node = new _Nodes2.default();

router.get('/app', function (req, res) {
    res.render('application');
});

router.post('/profile', function (req, res) {
    if (!req.session.profile) {
        req.session.profile = false;
    }
    res.send(req.session.profile);
});

router.post('/getSession', urlencoded, function (req, res) {
    res.send(req.session.profile);
});

router.post('/getNodes', urlencoded, function (req, res) {
    node.getNodes().then(function (resolve) {
        res.send(resolve);
    }, function (reject) {
        res.send(reject);
    });
});

router.post('/getSessionAuto', urlencoded, function (req, res) {
    res.send({ firstName: 'John', login: 'spaceman' });
});

router.post('/register', urlencoded, function (req, res) {
    user.register(req.body).then(function (resolve) {
        res.send(resolve);
    }, function (reject) {
        res.send(reject);
    });
});

router.post('/auth', urlencoded, function (req, res) {
    user.auth(req.body).then(function (resolve) {
        req.session.profile = resolve.object;
        req.session.profile.visit++;
        res.send(resolve);
    }, function (reject) {
        res.send(reject);
    });
});

module.exports = router;