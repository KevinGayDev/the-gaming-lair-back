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
                return res.status(422).json({message:"L'opération n'a pas pu être effectuée"});
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
                res.Status(422).json({message:"L'opération n'a pas pu être effectuée"});
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
    },
    addLike(req, res)
    {
        const {gameID, userID} = req.body;

        gamesMDL.findOne({slug: gameID}, (err, datas) => 
        {
            if (err)
            {
                return res.status(500).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                let hasAreadyLiked = false;
                for (let i = 0; i < datas.likes.length; i++)
                {
                    console.log("99 + datas.likes[i].userId " + datas.likes[i].userId)
                    if (datas.likes[i].userId === userID)
                    {
                        hasAreadyLiked = true;
                        break;
                    }
                } 
                if (!hasAreadyLiked)
                {
                    gamesMDL.updateOne({ slug: gameID },
                    {
                        $push: { likes: { userId:userID } }
                    } ,(err, datas) => 
                    {
                        if (err)
                        {
                            return res.status(500).json({message:"L'ajout de like n'a pas pu être effectuée"});
                        }
                        else
                        {
                            return res.status(200).json({message:"Nombre de likes modifié"});
                        }
                    });
                }
                else
                {
                    gamesMDL.updateOne({ slug: gameID },
                    {
                        $pull: { likes: { userId:userID } }
                    } ,(err, datas) => 
                    {
                        if (err)
                        {
                            return res.status(500).json({message:"La suppression de like n'a pas pu être effectué"});
                        }
                        else
                        {
                            return res.status(200).json({message:"Nombre de likes modifié"});
                        }
                    });
                }
            }
        });
    },
    addComment(req, res)
    {
        const {gameID, pseudo, comment} = req.body;
        
        gamesMDL.findOne({slug: gameID}, (err, datas) => 
        {
            if (err)
            {
                return res.status(500).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                gamesMDL.updateOne({ slug: gameID },
                {
                    $push: { comments: { commenterName:pseudo, commenterPost:comment} }
                } ,(err, datas) => 
                {
                    if (err)
                    {
                        return res.status(500).json({message:"L'ajout de commentaire n'a pas pu être effectuée"});
                    }
                    else
                    {
                        return res.status(200).json({message:"Commentaire ajouté"});
                    }
                });
            }  
        });
    }
}
module.exports = gamesCtrl;