const usersMDL = require ("../models/usersModel");

const profileCtrl =
{
    getUserProfile(req, res)
    {
        const {pseudo} = req.user;
        usersMDL.findOne ( {"pseudo": pseudo}, "pseudo mail signDate mostRecentGamePlayed bestGamePlayed worstGamePlayed", (err,user) =>
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
    updateUserPrfoile(req, res)
    {
    },
    deleteUserProfile(req, res)
    {
        const {pseudo} = req.user;
        usersMDL.deleteOne ( {"pseudo": pseudo}, (err,user) =>
        {
            if (err)
            {
                res.sendStatus(500).json({message:"L'opération n'a pas pu être effectuée"});
            }
            else
            {
                return res.sendStatus(200).json({message:"Utilisateur supprimé"});
            }
        });
    }
}

module.exports = profileCtrl;