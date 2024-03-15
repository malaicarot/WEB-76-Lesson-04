import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
// import { CommonUtils } from '../utils/common.util';
// import { BadRequestError } from '../error/BadRequest.error';

dotenv.config();

function verifyToken(req, res, next) {
   const token = req.header('auth-token');

   if(!token){
      return response.status(401).send({message: 'Access Denied'});
   }

   try {
      jwt.verify(token, process.env.TOKEN_SECRET);
      next();
      
   } catch (error) {

      return response.status(400).send({message: 'Invalid Token'});
   }
}

export default verifyToken