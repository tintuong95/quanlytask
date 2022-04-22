import { HIDE_MODAL, SHOW_MODAL } from "../contants/modalContant";

const initialState = {
  visible: false,
  component: "",
  width: "",
  title:"",
  handleSubmit:"",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_MODAL: {
     
      return { ...state, visible: true, ...payload};
    }

    case HIDE_MODAL:
      return { ...state, visible: false };

    case 'HANDLE_SUBMIT':
        return { ...state, handleSubmit:payload};

    default:
      return state;
  }
};
