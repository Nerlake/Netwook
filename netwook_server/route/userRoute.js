const router = require("express").Router();
const User = require("../model/User");

router.get("/basic/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        //recupere uniquement firstName, name, profilePicture
        const { firstName, name, profilePicture } = user;
        res.status(200).json({ firstName, name, profilePicture });
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Recuperer un utilisateur
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

// Mettre à jour un utilisateur
router.put("/:id", async (req, res) => {
    if (req.id === req.params.id || req.auth.isAdmin) {
        // Si l'utilisateur veut mettre à jour son mot de passe
        if (req.body.password) {
            try {
                // Générer un nouveau mot de passe
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            // Mettre à jour l'utilisateur
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            })
            res.status(200).json("Le compte a été mis à jour avec succès")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("Vous n'êtes pas autorisé à mettre à jour ce compte")
    }
})


//DELETE

router.delete("/:id", async (req, res) => {
    if (req.id === req.params.id || req.auth.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("You can't delete this account")
    }
})

//FOLLOW 

router.put("/:id/follow", async (req, res) => {
    if (req.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.id);
            if (!user.friends.includes(req.id)) {
                await user.updateOne({ $push: { friends: req.id } });
                await currentUser.updateOne({ $push: { friends: req.params.id } });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You are already following this person")
            }
        } catch (error) {
            res.status(500).json(error);
        }

    } else {
        res.status(403).json("You can't follow yourself");
    }
})

//UNFOLLOW


router.put("/:id/unfollow", async (req, res) => {
    if (req.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.id);
            if (user.friends.includes(req.id)) {
                await user.updateOne({ $pull: { friends: req.id } });
                await currentUser.updateOne({ $pull: { friends: req.params.id } });
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You are already unfollowing this person")
            }
        } catch (error) {
            res.status(500).json(error);
        }

    } else {
        res.status(403).json("You can't unfollow yourself");
    }
})

router.get("/friends/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const friends = await Promise.all(
            user.friends.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend => {
            const { _id, firstName, name, profilePicture } = friend;
            friendList.push({ _id, firstName, name, profilePicture })
        });
        res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error);
    }
})

// chercher un utilisateur (moteur de recherche)
router.get("/search/:query", async (req, res) => {
    try {
        const user = await User.find({
            $or: [
                { firstName: { $regex: req.params.query, $options: "i" } },
                { name: { $regex: req.params.query, $options: "i" } },
            ],
        });
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})


module.exports = router;