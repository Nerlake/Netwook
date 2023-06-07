require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer');

const authRoute = require('./route/authRoute');
const userRoute = require('./route/userRoute');
const postRoute = require('./route/postRoute');
const messageRoute = require('./route/messageRoute');
const auth = require('./middleware/auth');
const upload = multer({ dest: 'images/' }); // Définissez le dossier de destination pour les téléchargements


const port = process.env.PORT || 8000;

// url = "mongodb://localhost:27017/netwook_bdd"
// url = "mongodb+srv://nerlake:yn7Xw0MVAKeNat8v@clusternetwook.e8qkoej.mongodb.net/"
url = process.env.DATABASE_URL


mongoose.connect(url)
    .then(() => {
        console.log('Connecté à la base de données avec succès');
    })
    .catch((err) => {
        console.error('Erreur de connexion à la base de données :', err);
    });

app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/users", auth, userRoute);
app.use("/api/posts", auth, postRoute);
app.use("/api/messages", auth, messageRoute)

app.listen(port, () => {
    console.log(`Application is currently running on port ${port}`);
});