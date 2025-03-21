const express = require('express');
const router = express.Router();
const {signup,login} = require('../Controllers/Authentication');
const {fileupload} = require('../Controllers/fileupload');
const {fileshare} = require('../Controllers/fileshare');
const {fetchfiles} = require('../Controllers/fetchfiles');
const {profile} = require('../Controllers/profile');
const {recfiles} = require('../Controllers/recfiles');
const { analyzeFile } = require('../Controllers/GeminiController');

router.post('/signup',signup);
router.post('/login',login);
router.post('/upload',fileupload);
router.post('/share',fileshare);
router.get('/files/:id',fetchfiles);
router.get('/profile/:id',profile);
router.get('/recfiles/:id',recfiles);
router.post('/analyze', analyzeFile);

module.exports = router; 