import React from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../redux/actions/Modal";

export default function ModalHoc() {
  const dispatch = useDispatch();
  const { visible, component, title,handleSubmit,width } = useSelector(
    (state) => state.modalReducer
  );

  const handleOk = () => {
    handleSubmit()
    dispatch(hideModal());
  };

  const handleCancel = () => {
    dispatch(hideModal());
  };

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
       width={width}
      >
        {component}
      </Modal>
    </>
  );
}
