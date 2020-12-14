const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const router = Router();
const User = require('../models/User');

router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Incorrect password').isLength({ min: 8 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({
            errors: errors.array(),
            message: 'Incorrect data',
        });

        const { email, password } = req.body;
        const candidate = await User.findOne({ email });

        if (candidate) {
            return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPass = await bcrypt.hash(password, 12);
        console.log(hashedPass);
        const user = new User({ email, password: hashedPass });
        console.log(user)

        await user.save();
        console.log('saved')

        res.status(201).json({ message: 'User create successfully' })

    } catch(err) {
        res.status(500).json({ message: 'Oops, please, try again' })
    }
})

router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect data',
            });

            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'No user matching request' });

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) return res.status(400).json({ message: 'Incorrect password, try again' });

            const token = jwt.sign({userId: user.id}, config.get('jwtSecret'), { expiresIn: '1h' });

            res.json({ token, userId: user.id });
        } catch (err) {
            res.status(500).json({message: 'Oops, please, try again'})
        }
    }
);

module.exports = router;