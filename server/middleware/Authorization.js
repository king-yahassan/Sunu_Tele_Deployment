//import { verify } from 'jsonwebtoken';
const jwt = require("jsonwebtoken")
const secretKey = process.env.JWT_KEY;

// Middleware authentication(to recover and verify the token of users or admins) and manage the role from admins
module.exports.authenticateSuperAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }
    // console.log(token.split(" ")[1]);
    const decodedToken = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decodedToken.data; // L'utilisateur connecté est maintenant disponible dans req.user
    // console.log("-------------------",decodedToken.data);
    if (req.user.role !== "SuperAdmin"){
        return res.status(403).json({ message: 'Your are not authorized on this request' });
    }
    next();
  
};


// SubscriberAdmin Authorizations 
module.exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: '+++Token missing' });
  }
    // console.log( "*************",token.split(" ")[1]);
    const decodedToken = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decodedToken.data; // L'utilisateur connecté est maintenant disponible dans req.user
    // console.log("-------------------",decodedToken);
    if (req.user.role === "comptaAdmin"){
      return res.status(403).json({ message: '+-+-+-+Your are not authorized on this request' });
    }
    next();

};

//comptaAdmin Authorizations 

module.exports.authenticateAdminCompta = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }
    // console.log(token.split(" ")[1]);
    const decodedToken = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decodedToken.data; // L'utilisateur connecté est maintenant disponible dans req.user
    if (req.user.role === "SubscriberAdmin" ){
      role_ = req.user.role
      return res.status(403).json({ message: '-----------Your are not authorized on this request',role_ });
    }
    next();

};

// //ComptaAdmin 

// module.exports.authenticateAdminCompta = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: 'Token missing' });
//   }
//     // console.log(token.split(" ")[1]);
//     const decodedToken = jwt.verify(token.split(" ")[1], secretKey);
//     req.user = decodedToken.data; // L'utilisateur connecté est maintenant disponible dans req.user
//     console.log("-------------------",decodedToken.data);
//     if (req.user.role != "SuperAdmin" || req.user.role !== "ComptaAdmin"){
//       role_ = req.user.role
//       return res.status(403).json({ message: '-----------Your are not authorized on this request',role_ });
//     }
//     next();

// };