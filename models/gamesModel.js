const mongoose = require ("mongoose");

const gamesSchema = new mongoose.Schema(
    {
        image: String,
        name: String,
        genre: String,
        developper: String,
        slug: {type: String, unique: true, index: true}, //nom du jeu formatté
        editor: String,
        consoles: [String], 
        rating: String,
        releaseDate: Date,
        description: String,
        likes: [{userId:Number}],
        comments:[{
            commenterName: String,
            commenterPost: String
        }]
    }
)

module.exports = mongoose.model("games", gamesSchema);