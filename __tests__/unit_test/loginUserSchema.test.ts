import { loginSchema } from "../../src/validators/auth.validator";

describe("Unit test -Login user", ()=>{
    it("Should valid a user login", ()=>{
        const validData = {
            email: "stephmut@test.com",
            password: "Password1",
        }
        expect(()=>loginSchema.parse(validData)).not.toThrow()
    })

    it("Should fail if email is invalid", ()=>{
        const validData = {
            email: "stephmut",
            password: "Password1",
        }
        expect(()=>loginSchema.parse(validData)).toThrow()
    })
    it("Should fail if password not meet requirements ", ()=>{
        const validData = {
            email: "stephmut@test.com",
            password: "password1",
        }
        expect(()=>loginSchema.parse(validData))
    })
})