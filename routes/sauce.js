const express = require('express');
const router = express.Router();
const upload = require('../upload');
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');


router.get('/',auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, upload, sauceCtrl.saveOneSauce);
router.put('/:id', auth, upload, sauceCtrl.updateOneSauce);
router.delete('/:id', auth, sauceCtrl.deleteOneSauce);
router.post('/:id/like', auth, sauceCtrl.likeOneSauce);





module.exports = router;