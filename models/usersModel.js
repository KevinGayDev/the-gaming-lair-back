const mongoose = require ("mongoose");

const usersSchema = new mongoose.Schema(
    {
        pseudo: {type: String, unique: true, require: true}, 
        mail: {type: String, unique: true, require: true}, 
        password: {type: String, require: true},
        profliePic: String,
        mostRecentGamePlayed: {
            gameId: String,
            image: String,
            name: String
        },
        bestGamePlayed: {
            gameId: String,
            image: String,
            name: String
        },
        worstGamePlayed: {
            gameId: String,
            image: String,
            name: String
        },
        siteRole: String, //de base, simple utilisateur
        signDate: Date
    }
)

module.exports = mongoose.model("users", usersSchema);