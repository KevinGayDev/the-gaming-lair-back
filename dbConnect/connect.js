const mongoose = require ("mongoose");

const dbURI = "mongodb://127.0.0.1:27017/the-gaming-lair";

mongoose.connect(dbURI).then(() => 
    {
        console.log("Connecté à la base de données");
    }
);