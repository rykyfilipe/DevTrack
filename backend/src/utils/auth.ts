// bcrypt-example.js
import bcrypt from 'bcrypt';
import { User } from '../generated/prisma';
import jwt from "jsonwebtoken";

export interface Payload extends jwt.JwtPayload {
  user: {
    id: string;
    name: string;
  };
}

const SALT_ROUNDS = 12; 
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';


export async function hashPassword(plainPassword : string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash; 
}

export async function verifyPassword(hashFromDb : string, candidatePassword : string) {
  return await bcrypt.compare(candidatePassword, hashFromDb);
}

export async function createJwt(payload:Payload) {

  const token = jwt.sign(payload.user, JWT_SECRET as jwt.Secret,{expiresIn : '12h'});
 
  return token;
}

export async function verifyJwt(token:string) {
  console.log("Verifying token:", token);
  console.log("Using JWT_SECRET:", JWT_SECRET);
  const decoded = jwt.verify(token, JWT_SECRET as jwt.Secret) as Payload;
  return decoded;
}
