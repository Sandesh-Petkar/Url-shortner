const express = require('express')
const router = express.Router()
const urlController = require('../app/controllers/urlcontroller')


router.get('/urls',urlController.list)
router.get('/urls/:id',urlController.show)
router.post('/urls',urlController.create)
router.put('/urls/:id',urlController.update)
router.delete('/urls/:id',urlController.destroy)
router.get('/:hash',urlController.redirect)

module.exports = router