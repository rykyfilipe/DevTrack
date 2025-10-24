import bcrypt from 'bcrypt';
import { createJwt, hashPassword, Payload, verifyJwt, verifyPassword } from '../auth';
import { number } from 'joi';
describe('Auth Utils - Password Hashing', () => {
    describe('hashPassword', () => {
        it('should return a hashed password', async () => {
            const plainPassword = 'mySecurePassword123';
            
            const hash = await hashPassword(plainPassword);
            
            expect(hash).toBeDefined();
            expect(hash).not.toBe(plainPassword);
            expect(typeof hash).toBe('string');
            expect(hash.length).toBeGreaterThan(0);
        });

        it('should generate different hashes for the same password', async () => {
            const plainPassword = 'samePassword';
            
            const hash1 = await hashPassword(plainPassword);
            const hash2 = await hashPassword(plainPassword);
            
            // Diferite salt-uri => hash-uri diferite
            expect(hash1).not.toBe(hash2);
        });

        it('should create bcrypt-compatible hash', async () => {
            const plainPassword = 'testPassword';
            
            const hash = await hashPassword(plainPassword);
            
            // Bcrypt hash începe cu $2a$ sau $2b$
            expect(hash).toMatch(/^\$2[ab]\$/);
        });
    });

    describe('verifyPassword', () => {
        it('should return true for correct password', async () => {
            const plainPassword = 'correctPassword123';
            const hash = await hashPassword(plainPassword);
            
            const isValid = await verifyPassword(hash, plainPassword);
            
            expect(isValid).toBe(true);
        });

        it('should return false for incorrect password', async () => {
            const plainPassword = 'correctPassword123';
            const wrongPassword = 'wrongPassword456';
            const hash = await hashPassword(plainPassword);
            
            const isValid = await verifyPassword(hash, wrongPassword);
            
            expect(isValid).toBe(false);
        });

        it('should return false for empty password', async () => {
            const plainPassword = 'correctPassword123';
            const hash = await hashPassword(plainPassword);
            
            const isValid = await verifyPassword(hash, '');
            
            expect(isValid).toBe(false);
        });

        it('should handle case-sensitive passwords correctly', async () => {
            const plainPassword = 'Password123';
            const hash = await hashPassword(plainPassword);
            
            const isValidLower = await verifyPassword(hash, 'password123');
            const isValidCorrect = await verifyPassword(hash, 'Password123');
            
            expect(isValidLower).toBe(false);
            expect(isValidCorrect).toBe(true);
        });
    });

});


describe('Jwt funtctions', () => {
    
    it('should create a valid JWT token', async () => {
        const payload : Payload= { user : {id: "id", name: 'testuser' }};
        
        const token = await createJwt(payload);
        
        expect(token).toBeDefined();
        expect(typeof token).toBe('string');
        expect(token.split('.').length).toBe(3); 
    });

    it('should return true if token is valid', async () => {
        const payload : Payload= { user : {id: "id", name: 'testuser' }};
        const token = await createJwt(payload);

        const result = await verifyJwt(token as string);

        expect(result).toBeDefined();
        expect(result).toEqual({ id: "id", name: "testuser", iat: expect.any(Number), exp: expect.any(Number) });
    });
    
    it('should throw an error for invalid token', async () => {
        const invalidToken = 'invalid.token.string';

        await expect(verifyJwt(invalidToken)).rejects.toThrow();
    });

    it('should throw error for empty string', async () => {
        const invalidToken = '';

        await expect(verifyJwt(invalidToken)).rejects.toThrow();
    });
    

});