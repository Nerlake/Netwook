const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

//REGISTER
router.post("/register", async (req, res) => {
    try {
        if (req.body.username.length < 3) return res.status(400).json("Le nom d'utilisateur doit contenir au moins 3 caractères")
        if (req.body.password.length < 6) return res.status(400).json("Le mot de passe doit contenir au moins 6 caractères")
        if (req.body.firstName.length <= 2) return res.status(400).json("Le prénom doit contenir au moins 2 caractères")
        if (req.body.name.length <= 2) return res.status(400).json("Le nom doit contenir au moins 2 caractères")
        if (req.body.email.length <= 2) return res.status(400).json("L'email doit contenir au moins 2 caractères")
        // si email ne contient pas @ et .
        if (!req.body.email.includes('@') || !req.body.email.includes('.')) return res.status(400).json("Le format de l'email est incorrect")

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
            res.status(404).json("The email or password is incorrect");
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            // const validPassword = req.body.password === user.password;
            if (!validPassword) {
                res.status(404).json("The email or password is incorrect");
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