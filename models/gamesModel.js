const mongoose = require ("mongoose");

const gamesSchema = new mongoose.Schema(
    {
        image: String,
        name: String,
        genre: String,
        developper: String,
        slug: String, //nom du jeu formatté
        consoles: String, 
        rating: String,
        releaseDate: String,
        description: String,
        addedDate: String,
        likes: [{userId:String}],
        comments:[{
            commenterName: String,
            commenterPost: String
        }]
    }
)

module.exports = mongoose.model("games", gamesSchema);