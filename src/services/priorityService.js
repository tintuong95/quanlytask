import ConfigService from "./configService";

class PriorityService extends ConfigService {
    constructor() {
        super()
    }

    getPriority() {
        return this.get("/api/Priority/getAll")
    }
}

const priorityService = new PriorityService()
export default priorityService