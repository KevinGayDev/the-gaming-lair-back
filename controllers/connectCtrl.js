const usersMDL = require ("../models/usersModel")
const dateformat = Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short"
  });

const mailRegExp = new RegExp("^[a-zA-Z0-9_!#$%&amp;'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&amp;'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");
const passwordRegExp = new RegExp("^(.*[a-zA-Z0-9!@#$%^&*]){1,16}$");

const connectCtrl =
{
    signUp(req, res)
    {
        const {pseudo, mail, password} = req.body;
        if ((typeof(pseudo) && typeof(mail) && typeof(password)) !== "string")
        {
            return res.status(422).json({message :"Un ou plusieurs champs ne sont pas du bon type"})
        }
        if ((pseudo || mail || password) === "")
        {
            return res.status(422).json({message :"Un ou plusieurs champs sont vides"})
        }
        if (!mailRegExp.test(mail))
        {
            return res.status(422).json({message :"Adresse mail incorrecte"});
        }
        if (password.length < 3)
        {
            return res.status(422).json({message :"Mot de passe trop court"})
        }
        if (!passwordRegExp.test(password))
        {
            return res.status(422).json({message :"Mot de passe incorrect"})
        }

        // Get Date
        const date = new Date();
        let newUser = new usersMDL(
        {
            pseudo: pseudo,
            mail: mail,
            password: password,
            siteRole: "user",
            signDate: new Date()
        });
        newUser.save((err) => 
        {
            if (err)
            {
                console.log(err);
                console.log(err.keyValue.mail);
                if (pseudo === err.keyValue.pseudo)
                {
                    return res.status(422).json({message:"Un compte ayant ce pseudo est déjà présent"});
                }
                if (mail === err.keyValue.mail)
                {
                    return res.status(422).json({message:"Un compte ayant ce mail est déjà présent"});
                }
            }
            else 
            {
                res.status(201).json({message :"Compte crée"});
            }
        });
    },
    login(req, res)
    {
        const {mail, password} = req.body;
        if ((typeof (mail, password) !== "string") && (mail, password !== ""))
        {
            res.status(422).json({message :""})
        }
    }
}

module.exports = connectCtrl;