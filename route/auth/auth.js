const express = require('express')

const authController = require('../../controllers/auth/auth')

const router = express.Router()

router.post('/testAuth' , authController.testMetodAuth)
router.post('/signin' , authController.signin)
router.post('/signup',authController.signup)


module.exports = router