const jwt = require('jsonwebtoken');

module.exports={
    
     verifyToken : (req, res, next) => {
        const token = req.headers['authorization']
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token.split(' ')[1], process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            console.log(token);
            return res.status(401).json({ message: 'Invalid token' });
          }
          // Save the decoded information to the request object
          req.user = decoded;
          console.log("verified token",req.user);
          next();
        })
      },
      
      
}