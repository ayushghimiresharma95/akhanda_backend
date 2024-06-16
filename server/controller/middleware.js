const Jwt =  require("jsonwebtoken")

const verfiyToken = (req,res,next) => {
    try {
        console.log(verfiy)
        let token = req.header('Authorization');
        if(!token){
            
            res.status(403).json('Access Denied');
        }

        
        if (token.startsWith("Bearer ")) {
            
            token = token.slice(7, token.length).trimLeft();
          }

        const verfied = Jwt.verify(token,process.env.JWT_SECRET)
        
        req.user = verfied ;
        next();
    } catch (error) {

       res.status(500).json({message:error.message}) ;

    }

    
}
module.exports = verfiyToken

