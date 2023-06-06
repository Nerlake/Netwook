const router = require("express").Router();
const Message = require("../model/Message");
const User = require("../model/User");

router.post("/create", async (req, res) => {
    try {
        const newMessage = new Message({
            userId: req.body.userId,
            recipientId: req.body.recipientId,
            content: req.body.content,
        })
        const message = await newMessage.save()
        res.status(200).json(message)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});

router.get("/conversation/:userId/:recipientId", async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { $and: [{ userId: req.params.userId }, { recipientId: req.params.recipientId }] },
                { $and: [{ userId: req.params.recipientId }, { recipientId: req.params.userId }] }
            ]
        })
        //récupération 
        const updatedMessages = [];

        for (var message of messages) {
            var user = await User.findById(message.recipientId);
            message = message.toObject();
            message.profilePicture = user.profilePicture;
            message.firstName = user.firstName;
            message.name = user.name;
            updatedMessages.push(message);
        }
        res.status(200).json(updatedMessages)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
});









module.exports = router;