import { User, UserRole } from "../../generated/prisma";
import { UserModel } from "../../models/UserModel";
import { UserService } from "../UserService";

// 1️⃣ Mockăm întreaga clasă UserModel
jest.mock("../../models/UserModel");

describe("UserService tests", () => {
  let userModelMock: jest.Mocked<UserModel>;
  let userService: UserService;

  beforeEach(() => {
    // 2️⃣ Cream o instanță mockată
    userModelMock = new UserModel() as jest.Mocked<UserModel>;
    userService = new UserService();

    // Suprascriem modelul intern din service cu mock-ul
    // (altfel service-ul folosește o instanță reală)
    (userService as any).userModel = userModelMock;
  });

  it("should create user when it does not exist", async () => {
    const mockedUser: User = {
      id: "sd34fg5h",
      name: "test",
      email: "test@email.com",
      password: "testpass",
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 3️⃣ Definim comportamentul mock-ului
    userModelMock.findByEmail.mockResolvedValue(null);
    userModelMock.createUser.mockResolvedValue(mockedUser);

    // 4️⃣ Apelăm metoda
    const result = await userService.createUser(mockedUser);

    // 5️⃣ Verificăm rezultatul
    expect(userModelMock.findByEmail).toHaveBeenCalledWith("test@email.com");
    expect(userModelMock.createUser).toHaveBeenCalled();
    expect(result).toEqual(mockedUser);
  });

  it("should throw error when user already exists", async () => {
  const mockedUser: User = {
    id: "sd34fg5h",
    name: "test",
    email: "test@email.com",
    password: "testpass",
    role: UserRole.ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // 🔹 Mock: user deja există
  userModelMock.findByEmail.mockResolvedValue(mockedUser);


  // 🔹 Verificăm că aruncă eroare
  await expect(userService.createUser(mockedUser))
    .rejects
    .toThrow("User already exists");

  // 🔹 Și verificăm că metoda createUser NU a fost apelată
  expect(userModelMock.createUser).not.toHaveBeenCalled();
});

  it('should return all the users',async () => {

    const mockedUsers: User[] = [
        {
      id: "sd34fg5h",
      name: "test",
      email: "test@email.com",
      password: "testpass",
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
        },
     {
        id: "sd34fg5h",
        name: "test",
        email: "test@email.com",
        password: "testpass",
        role: UserRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
        }];

    userModelMock.getAll.mockResolvedValue(mockedUsers);

    const result = await userModelMock.getAll();

    expect(result).toBe(mockedUsers);
  });
  
});
