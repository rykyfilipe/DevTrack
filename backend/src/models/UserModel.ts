import { PrismaClient,UserRole } from "../generated/prisma";

const prisma = new PrismaClient();

// Definim o interfață pentru a tipa datele de intrare
export interface IUserInput {
  name: string;
  email: string;
  password : string;
  role: UserRole;
}



// Clasa UserModel — responsabilă doar de interacțiunea cu DB
export class UserModel {
  // ✅ poți păstra prisma ca o dependență
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  // ✅ Metodă pentru adăugarea unui user nou
  async createUser({ name, email, role,password }: IUserInput) {
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password : password,
        role,
      },
    });
  }

  // ✅ Metodă pentru găsirea unui user după email
  async findByEmail(email: string) {
    console.info("in model")
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async deleteAll(){
    return await this.prisma.user.deleteMany();
  }

 

  // ✅ Metodă pentru obținerea tuturor userilor
  async getAll() {
    return await this.prisma.user.findMany();
  }
}
