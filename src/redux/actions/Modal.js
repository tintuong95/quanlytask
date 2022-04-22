import { HANDLE_SUBMIT, HIDE_MODAL, SHOW_MODAL } from "../contants/modalContant"

export const showModal = (data) => {
    return {
        type: SHOW_MODAL,
        payload: data
    }
}

export const hideModal = () => {
    return {
        type: HIDE_MODAL
    }
}

export const handleSubmit = (handleSubmit) => {
    return {
        type: HANDLE_SUBMIT,
        payload: handleSubmit
    }
}