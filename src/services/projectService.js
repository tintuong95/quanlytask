import ConfigService from "./configService";

class ProjectService extends ConfigService {
    constructor() {
        super()
    }
    getAllProject() {
        return this.get("/api/Project/getAllProject")
    }

    getProjectCategory() {
        return this.get("/api/ProjectCategory")
    }

    createProject(data) {
        return this.post("/api/Project/createProjectAuthorize", data)
    }

    getDetailProject(id) {
        return this.get(`/api/Project/getProjectDetail?id=${id}`)
    }


    removeProject(id) {
        return this.delete(`/api/Project/deleteProject?projectId=${id}`)
    }

    updataProject(id, data) {
        return this.put(`/api/Project/updateProject?projectId=${id}`, data)
    }
}


export const projectService = new ProjectService()