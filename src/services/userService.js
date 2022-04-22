import ConfigService from "./configService";

class UserService extends ConfigService {
    constructor() {
        super()
    }

    findUser(keyword) {
        return this.get(`/api/Users/getUser?keyword=${keyword}`)
    }

    addUserProject(data) {
        return this.post("/api/Project/assignUserProject", data)
    }

    removerUserProject(data) {
        return this.post("/api/Project/removeUserFromProject", data)
    }
}

export const userService = new UserService()