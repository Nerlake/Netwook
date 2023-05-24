const router = require("express").Router();
const User = require("../model/User");

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
    if (req.body.userId === req.params.id || req.body.isAdmin) {
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
    if (req.body.userId === req.params.id || req.body.isAdmin) {
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
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
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
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
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
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = [];
        friends.map(friend => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture })
        });
        res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;