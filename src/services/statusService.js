import ConfigService from "./configService";

class StatusService extends ConfigService {
    constructor() {
        super()
    }

    getStatus() {
        return this.get("/api/Status/getAll")
    }
}

const statusService = new StatusService()

export default statusService