import { createUserSchema } from "../../src/validators";
import * as Models from "../../src/database/models/user"

describe("Unit Test - createUserSchema", () =>{
    it("Should validate a correct user DTO", ()=>{
        const validData = {
            fullName: "Stephan Mut",
            email: "stephmut@test.com",
            password: "Password1",
            globalRole: Models.Role1.USER,
        }
        expect(()=> createUserSchema.parse(validData)).not.toThrow()
    })

    it("Should fail if fullName is too short", ()=>{
        const invalidData = {
            fullName: "St",
            email: "stephmut@test.com",
            password: "Password1",
            globalRole: Models.Role1.USER,
        }
        expect(()=> createUserSchema.parse(invalidData)).toThrow("Full name must contain at least 3 characters")
    });

    it("Should fail if email is invalid",()=>{
        const invalidData = {
            fullName: "St",
            email: "stephmut",
            password: "Password1",
            globalRole: Models.Role1.USER,
        }
        expect(()=> createUserSchema.parse(invalidData)).toThrow("Invalid email address")
    })
    it("Should fail if password not meet requirements",()=>{
        const invalidData = {
            fullName: "St",
            email: "stephmut",
            password: "password",
            globalRole: Models.Role1.USER,
        }
        expect(()=> createUserSchema.parse(invalidData)).toThrow()
    })
})