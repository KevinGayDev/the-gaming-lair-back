const gamesMDL = require ("../models/gamesModel");

const dateFormatting = Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short"
  });

const gamesCtrl =
{
    getGamesList(req, res)
    {
        gamesMDL.find((err,games) =>
        {
            if (err)
            {
                return res.sendStatus(422).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                return res.json(games);
            }
        }).sort({_id:-1}).limit(10);
    },
    searchGame(req, res)
    {
        gamesMDL.find ( {'name': { '$regex' : req.body.name, '$options' : 'i' } }, (err,games) =>
        {
            if (err)
            {
                //res.sendStatus(422).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                return res.json(games);
            }
        });
    },
    addGameToList(req, res)
    {
        const {image, name, genre, developper, slug, consoles, rating, description, releaseDate} = req.body;
        const date = new Date();
        console.log(dateFormatting.format(date));
        // Create a new game based on the datas sent and save to the database
        let newGame = new gamesMDL(
        {
            image:image,
            name:name,
            genre: genre,
            developper: developper,
            slug: slug,
            consoles:consoles,
            rating: rating,
            description: description,
            releaseDate: releaseDate,
            addedDate: dateFormatting.format(date)
        });
        newGame.save((err) => 
        {
            if (err)
            {
                return res.status(422).json({message:"Une erreur est survenue"});
            }
            else 
            {
                res.status(201).json({message: "Jeu enregistré"});
            }
        });
    },
    getGameByName(req, res)
    {
        const {slug} = req.body;
        gamesMDL.findOne ( {"slug": slug}, (err,game) =>
        {
            if (err)
            {
                res.sendStatus(422).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                return res.json(game);
            }
        });
    }
}
module.exports = gamesCtrl;