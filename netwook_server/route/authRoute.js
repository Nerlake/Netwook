const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async (req, res) => {
    try {
        //GENERATE HASHED PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //CREATE NEW USER
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            firstName: req.body.firstName,
            name: req.body.name,
        })

        //SAVE USER AND RETURN RESPONSE
        const user = await newUser.save()
        const payload = { user };
        const secretKey = 'netwook_secret_key';
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
        res.status(200).json({ user, session_token: token })
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json({ ERROR: "BADLOGIN" });
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            // const validPassword = req.body.password === user.password;
            if (!validPassword) {
                res.status(400).json({ ERROR: "BADLOGIN" });
            }
            else {
                const payload = { user };
                const secretKey = 'netwook_secret_key';
                const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
                res.status(200).json({ user, session_token: token })
            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

//SUPPRIMER UN UTILISATEUR
// router.delete("/:id", async (req, res) => {
//     if (req.body.userId === req.params.id || req.body.isAdmin) {
//         try {
//             await User.findByIdAndDelete(req.params.id)
//             res.status(200).json("Le compte a été supprimé avec succès")
//         } catch (error) {
//             console.error(error)
//             res.status(500).json(error)
//         }
//     } else {
//         res.status(403).json("Vous ne pouvez supprimer que votre compte")
//     }
// })




module.exports = router;