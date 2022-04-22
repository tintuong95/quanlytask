import ConfigService from "./configService";

class TaskTypeService extends ConfigService {
    constructor() {
        super()
    }

    getTaskType() {
        return this.get("/api/TaskType/getAll")
    }

    createTaskType(data) {
        return this.post("/api/Project/createTask", data)
    }

    getTaskDetail(id) {
        return this.get(`/api/Project/getTaskDetail?taskId=${id}`)
    }

    putUpdateTaskDetail(data) {

        return this.post("/api/Project/updateTask", data)
    }

    putUpdateStatusTask(data) {
        return this.put("/api/Project/updateStatus", data)
    }

    addUserToTask(data) {
        return this.post("/api/Project/assignUserTask", data)
    }

    addCommentToTask(data) {
        return this.post("/api/Comment/insertComment", data)
    }

    deleteCommmentTask(id) {
        return this.delete(`/api/Comment/deleteComment?idComment=${id}`)
    }

    putUpdateCommentTask(id, content) {
        return this.put(`/api/Comment/updateComment?id=${id}&contentComment=${content}`)
    }
}

const taskTypeService = new TaskTypeService()

export default taskTypeService