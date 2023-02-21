const usersMDL = require ("../models/usersModel");

const profileCtrl =
{
    getUserProfile(req, res)
    {
        const {pseudo} = req.user;
        usersMDL.findOne ( {"pseudo": pseudo}, "_id pseudo mail signDate mostRecentGamePlayed bestGamePlayed worstGamePlayed", (err,user) =>
        {
            if (err)
            {
                res.sendStatus(422).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                return res.json(user);
            }
        });
    },
    updateUserProfile(req, res)
    {
        const {id, pseudo, mail, mostRecentGamePlayed, bestGamePlayed, worstGamePlayed } = req.user;
        console.log(worstGamePlayed);

        if (typeof(pseudo) !== "string" || typeof(mail) !== "string" || typeof(mostRecentGamePlayed) !== "string"  || typeof(bestGamePlayed) !== "string"  || typeof(worstGamePlayed) !== "string")
        {
            return res.status(422).json({message: "Un ou plusieurs champs ne sont pas du bon type"})
        }

        usersMDL.updateOne({_id: id},
        {
            $set:
            {
                pseudo: pseudo,
                mail: mail,
                mostRecentGamePlayed: mostRecentGamePlayed,
                bestGamePlayed: bestGamePlayed, 
                worstGamePlayed: worstGamePlayed
            }
        }, (err, datas) => 
        {
            if (err)
            {
                return res.status(500).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                return res.status(200).json({message:"Utilisateur modifié", user: datas});
            }
        });
    },
    deleteUserProfile(req, res)
    {
        const {pseudo} = req.user;
        usersMDL.deleteOne ( {"pseudo": pseudo}, (err,user) =>
        {
            if (err)
            {
                res.status(500).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                return res.status(200).json({message:"Utilisateur supprimé"});
            }
        });
    }
}

module.exports = profileCtrl;