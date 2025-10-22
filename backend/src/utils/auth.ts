// bcrypt-example.js
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12; 

export async function hashPassword(plainPassword : string) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash; 
}

export async function verifyPassword(hashFromDb : string, candidatePassword : string) {
  return await bcrypt.compare(candidatePassword, hashFromDb);
}

