const mongoose = require ("mongoose");

const usersSchema = new mongoose.Schema(
    {
        pseudo: {type: String, unique: true, required: true}, 
        mail: {type: String, unique: true, required: true}, 
        password: {type: String, required: true, select: false},
        mostRecentGamePlayed: String,
        bestGamePlayed: String,
        worstGamePlayed: String,
        siteRole: String, //de base, simple utilisateur
        signDate: String
    }
)

module.exports = mongoose.model("users", usersSchema);