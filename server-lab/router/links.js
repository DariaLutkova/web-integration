const { Router } = require('express');
const router = Router();
const config = require('config');
const authMiddleware = require('../middleware/auth.middleware');
const Link = require('../Models/Link');
const shortid = require('shortid');

router.post('/gen', authMiddleware, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const { from } = req.body;
        const code = shortid.generate();

        const existing = await Link.findOne({ from });

        if (existing) {
            return res.json({link: existing})
        }

        const to = baseUrl + '/t/' + code;
        const newLink = new Link({
            code, to, from, owner: req.user.userId
        })

        await newLink.save();

        res.status(201).json({link: newLink});
    } catch(err) {
        res.status(500).json({ message: 'Oops, please, try again' })
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json({links})

    } catch(err) {
        res.status(500).json({ message: 'Oops, please, try again' })
    }
})


router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link)

    } catch(err) {
        res.status(500).json({ message: 'Oops, please, try again' })
    }
})

module.exports = router;