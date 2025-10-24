import { User, UserRole } from "../../generated/prisma";
import { IUserInput } from "../../models/UserModel";
import { AuthService } from "../AuthService";
import { UserService } from "../UserService";
import * as authUtils from "../../utils/auth";

jest.mock('../UserService');
jest.mock('../../utils/auth');

describe('AuthService tests', () => {
    let userService: jest.Mocked<UserService>;
    let authService: AuthService;

    beforeEach(() => {
        userService = new UserService() as jest.Mocked<UserService>;
        authService = new AuthService();

        (authService as any).userService = userService;
    });

    it('should return user if user exists and credentials are correct', async () => {
        const fakeUser: User = {
            id: "sd34fg5h",
            name: "test",
            email: "test@email.com",
            password: "hashedpassword123", // This would be a hashed password
            role: UserRole.ADMIN,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const userInput: IUserInput & { password: string } = {
            name: "test",
            email: "test@email.com",
            password: "testpass",
            role: UserRole.ADMIN,
        };

        // Mock the service and auth utility
        userService.getUserByEmail.mockResolvedValue(fakeUser);
        (authUtils.verifyPassword as jest.Mock).mockResolvedValue(true);

        const result = await authService.logIn(userInput);

        // Assertions
        expect(userService.getUserByEmail).toHaveBeenCalledWith(userInput.email);
        expect(authUtils.verifyPassword).toHaveBeenCalledWith(fakeUser.password, userInput.password);
        expect(result).toBe(fakeUser);
    });

    it('should throw error if user does not exist', async () => {
        const userInput: IUserInput & { password: string } = {
            name: "test",
            email: "nonexistent@email.com",
            password: "testpass",
            role: UserRole.ADMIN,
        };

        userService.getUserByEmail.mockResolvedValue(null);

        await expect(authService.logIn(userInput)).rejects.toThrow("User not found");
        expect(userService.getUserByEmail).toHaveBeenCalledWith(userInput.email);
    });

    it('should throw error if password is invalid', async () => {
        const fakeUser: User = {
            id: "sd34fg5h",
            name: "test",
            email: "test@email.com",
            password: "hashedpassword123",
            role: UserRole.ADMIN,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const userInput: IUserInput & { password: string } = {
            name: "test",
            email: "test@email.com",
            password: "wrongpassword",
            role: UserRole.ADMIN,
        };

        userService.getUserByEmail.mockResolvedValue(fakeUser);
        (authUtils.verifyPassword as jest.Mock).mockResolvedValue(false);

        await expect(authService.logIn(userInput)).rejects.toThrow("Email or password is wrong");
    });
});