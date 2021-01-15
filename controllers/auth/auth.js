const jwt = require('jsonwebtoken')
const User = require('../../model/user')


exports.testMetodAuth = (req, res, next) => {
    res.status(200).json({
        posts: [{ title: 'First Post', content: 'this is the first Content' }]
    });
}

exports.signin=(req,res)=>{
    const {email,password} = req.body
    console.log(email,"=======")
   
    return User.findAll({
        where: {
            email:email
        }
    })
    .then((result)=>{
       
       // console.log(result.length === 0)
        if(result.length === 0){
            res.status(200).json({
                responseStatus : 401,
                responseMessage: "user Not found"
            })
        }else if(result[0].password === password && result[0].email === email){
            const token = jwt.sign({
                email : result.email,
                password : result.password,
            },'fatih' )
            res.status(200).json({
                responseStatus : 200,
                response : result,
                token : token,
                responseMessage : "user Loggin Successfully"
            })
        
        }
    })
    .catch(err=>{
        console.log('sflkjmlf', err)
        res.status(200).json({
            responseStatus : 401,
            responseMessage : "Server Error",
            response : err
        })
    })

}

exports.signup =(req,res) =>{
    const {name ,email , password} = req.body

    return User.create({
        email,
        name,
        password,
    })
    .then((result)=>{
        res.status(200).json({
            responseStatus : 200,
            response : result,
            message : "User created"
        })
    })
    .catch((err)=>{
        res.status(200).json({
            responseStatus : 400,
            response : err,
            message : "User not created"
        })
    })
}