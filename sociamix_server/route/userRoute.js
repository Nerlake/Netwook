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
    if (req.id === req.params.id || req.isAdmin) {
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
            const newUser = await User.findById(req.params.id)
            res.status(200).json(newUser)
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

router.put("/:id/request", async (req, res) => {
    if (req.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.id);
            if (!user.friends.includes(req.id) && !user.friendsRequestReceived.includes(req.id) && !user.friendsRequestSent.includes(req.id)) {
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


//AJout ami direct
router.put("/:id/follow", async (req, res) => {
    if (req.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.id);
            if (!user.friends.includes(req.id) && !user.friendsRequestReceived.includes(req.id) && !user.friendsRequestSent.includes(req.id)) {
                await user.updateOne({ $push: { friendsRequestReceived: req.id } });
                await currentUser.updateOne({ $push: { friendsRequestSent: req.params.id } });
                res.status(200).json("Friend request has been sent");
            } else {
                res.status(403).json("You can't send a friend request to this person")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't follow yourself");
    }
})


//ACCEPT FRIEND REQUEST
router.put("/:id/accept", async (req, res) => {
    if (req.id !== req.params.id) {
        try {
            const friend = await User.findById(req.params.id);
            const currentUser = await User.findById(req.id);
            if (currentUser.friendsRequestReceived.includes(req.params.id) && friend.friendsRequestSent.includes(req.id)) {
                await friend.updateOne({ $pull: { friendsRequestSent: req.id } });
                await currentUser.updateOne({ $pull: { friendsRequestReceived: req.params.id } });
                await friend.updateOne({ $push: { friends: req.id } });
                await currentUser.updateOne({ $push: { friends: req.params.id } });
                res.status(200).json("Friend request has been accepted");
            } else {
                res.status(403).json("You can't accept this friend request")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't accept your own friend request");
    }
})


// try {
//     const user = await User.findById(req.params.id);
//     const currentUser = await User.findById(req.id);
//     if (!user.friends.includes(req.id)) {
//         await user.updateOne({ $push: { friends: req.id } });
//         await currentUser.updateOne({ $push: { friends: req.params.id } });
//         res.status(200).json("User has been followed");
//     } else {
//         res.status(403).json("You are already following this person")
//     }



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



// demande d'ami
router.get("/friendsRequests/:id", async (req, res) => {
    if (req.id !== req.params.id)
        return res.status(403).json("You can't access this");
    try {
        const user = await User.findById(req.params.id);
        const friendsRequestReceived = [];
        const friendsRequestSent = [];

        await Promise.all(
            user.friendsRequestReceived.map(async (friendId) => {
                const userTmp = await User.findById(friendId);
                const { _id, firstName, name, profilePicture } = userTmp;
                friendsRequestReceived.push({ _id, firstName, name, profilePicture });
            })
        );

        await Promise.all(
            user.friendsRequestSent.map(async (friendId) => {
                const userTmp = await User.findById(friendId);
                const { _id, firstName, name, profilePicture } = userTmp;
                friendsRequestSent.push({ _id, firstName, name, profilePicture });
            })
        );

        res.status(200).json({
            friendsRequestReceived,
            friendsRequestSent,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


// refuser une demande d'ami
router.put("/:id/refuse", async (req, res) => {
    if (req.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.id);
            if (currentUser.friendsRequestReceived.includes(req.params.id) && user.friendsRequestSent.includes(req.id)) {
                await user.updateOne({ $pull: { friendsRequestSent: req.id } });
                await currentUser.updateOne({ $pull: { friendsRequestReceived: req.params.id } });
                res.status(200).json("Friend request has been refused");
            } else {
                res.status(403).json("You can't refuse this friend request")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't refuse your own friend request");
    }
})


// annuler la demande d'ami
router.put("/:id/remove", async (req, res) => {
    if (req.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.id);
            if (user.friendsRequestReceived.includes(req.id) && currentUser.friendsRequestSent.includes(req.params.id)) {
                await user.updateOne({ $pull: { friendsRequestReceived: req.id } });
                await currentUser.updateOne({ $pull: { friendsRequestSent: req.params.id } });
                res.status(200).json("Friend request has been removed");
            } else {
                res.status(403).json("You can't remove this friend request")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json("You can't remove your own friend request");
    }
})



// liste d'amis
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