import ConfigService from "./configService";

class SignupService extends ConfigService {
    constructor() {
        super()
    }

    signupPost(data) {
        return this.signup("/api/Users/signup", data)
    }

    loginPost(data) {
        return this.signup("/api/Users/signin", data)
    }
}


export const signupService = new SignupService()