import * as bcrypt from 'bcrypt';

export class HashPasswordService {
  async hashPassword(password: string) {
    try {
      //hash password with bcrypt
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      return hash;
    } catch (error) {
      console.log(error);
      throw new Error('Error while hashing password');
    }
  }
}