const { Router } = require('express');

const UserController = require('./controller/UserController');

const router = Router();

router.get('/users', UserController.index);
router.get('/users/:id', UserController.show);
router.post('/users', UserController.store);
router.put('/users', UserController.update);
router.delete('/users/:id', UserController.delete);

module.exports = router;
