const { cloudinary } = require("../cloudinaryConfig")

module.exports={
    
     verifyToken : (req, res, next) => {
        const token = req.headers['authorization'];
      
        if (!token) {
          return res.status(401).json({ message: 'No token provided' });
        }
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            return res.status(401).json({ message: 'Invalid token' });
          }
          // Save the decoded information to the request object
          req.user = decoded;
          next();
        });
      },
      
      
}