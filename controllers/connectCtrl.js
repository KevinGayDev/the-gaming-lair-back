const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const usersMDL = require ("../models/usersModel");

const mailRegExp = new RegExp("^[a-zA-Z0-9_!#$%&amp;'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&amp;'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$");
const passwordRegExp = new RegExp("^(.*[a-zA-Z0-9!@#$%^&*]){1,16}$");
const secretKey = "th3g4m1ngl41rs3cr3tk3y";

const dateFormatting = Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "long"
  });

const connectCtrl =
{
    // Method for users to sign up to the site
    signUp(req, res)
    {
        const {pseudo, mail, password} = req.body;

        console.log(req.body);
        console.log(typeof(pseudo));
        console.log(typeof(mail));
        console.log(typeof(password));

        // Check to see if there are error errors
        if (typeof(pseudo) !== "string" || typeof(mail) !== "string" || typeof(password) !== "string")
        {
            return res.status(422).json({message: "Un ou plusieurs champs ne sont pas du bon type"})
        }
        if (pseudo  === "" || mail  === "" || password === "")
        {
            return res.status(422).json({message: "Un ou plusieurs champs sont vides"})
        }
        if (!mailRegExp.test(mail))
        {
            return res.status(422).json({message: "Adresse mail incorrecte"});
        }
        if (password.length < 3 || password.length > 16)
        {
            return res.status(422).json({message: "Longueur du mot de passe incorrecte"})
        }
        if (!passwordRegExp.test(password))
        {
            return res.status(422).json({message: "Mot de passe incorrect"})
        }

        // Encrypt password to database
        const hashedPwd=bcrypt.hashSync(password, 10, (err, hash) =>
        {
            if (err)
            {
                return res.status(500).json({message: "Erreur inconnue"});
            }
            return hash;
        })
        
        let date = new Date();
        const dateFormat = dateFormatting.format(date);
        // Create a new user based on the datas sent and save to the database
        let newUser=new usersMDL(
        {
            pseudo:pseudo,
            mail:mail,
            password: hashedPwd,
            siteRole: "user",
            mostRecentGamePlayed: "",
            bestGamePlayed: "",
            worstGamePlayed: "",
            signDate: dateFormat
        });
        newUser.save((err) => 
        {
            if (err)
            {
                console.log(err);
                return res.status(422).json({message:"L'adresse mail ou le pseudo demandé existe déjà"});        
            }
            else 
            {
                return res.status(201).json({message: "Compte crée"});
            }
        });
    },
    // Method for users to log to the site
    login(req, res)
    {
        const {mail, password} = req.body;

        // Check to see if there are error errors
        if (typeof(mail) !== "string" && typeof(password) !== "string")
        {
            return res.status(422).json({message: "Un ou plusieurs champs ne sont pas du bon type"})
        }
        if (mail === "" || password === "")
        {
            return res.status(422).json({message: "Un ou plusieurs champs sont vides"})
        }
        if (!mailRegExp.test(mail))
        {
            return res.status(422).json({message: "Adresse mail incorrecte"});
        }
        if (password.length < 3 || password.length > 16)
        {
            return res.status(422).json({message: "Longueur du mot de passe incorrecte"})
        }
        
        usersMDL.findOne( {mail : mail}, "password pseudo", (err,user) =>
        {
            // Compare password to what is on database
            const match = bcrypt.compareSync(password, user.password);
            if (!match)
            {
                return res.status(422).json({message: "L'adresse mail ou le mot de passe est incorrect"}) 
            }
            // Generate json web token
            const token = jwt.sign( {userId: user._id}, secretKey, { expiresIn: "24h" });
            res.json({success:true, message: "Connexion réussie", token: token, user: {pseudo: user.pseudo}});
        });
    },
    getCurrentUser(req, res)
    {
        const id = req.user;
        console.log(req.user);
        
        usersMDL.findOne( {_id: id}, (err,user) =>
        {
            if (err)
            {
                return res.status(404).json({message: "Utilisateur non trouvé"}) 
            }
            console.log(res.json);
            return res.json({user});
        });
    }
}

module.exports=connectCtrl;