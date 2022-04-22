import {
  AutoComplete,
  Avatar,
  Button,
  Col,
  Input,
  InputNumber,
  Popover,
  Row,
  Select,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { UserOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import parse from "html-react-parser";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { findUserSagaAction } from "../redux/actions/userAction";
import { useParams } from "react-router-dom";
import { array } from "yup/lib/locale";
import {
  addCommentTaskSagaAction,
  deleteCommentTaskSagaAction,
  getPrioritySagaAction,
  getStatusSagaAction,
  getTaskDetailAction,
  getTaskTypeSagaAction,
  putUpdateCommentSagaAction,
  putUpdateTaskDetailAction,
} from "../redux/actions/taskAction";
import { handleSubmit } from "../redux/actions/Modal";
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function EditTask() {
  //SELECT
  const { taskTypeData } = useSelector((state) => state.taskTypeReducer);
  const { priorityData } = useSelector((state) => state.priorityReducer);
  const { statusData } = useSelector((state) => state.statusReducer);
  const { findUserData } = useSelector((state) => state.userReducer);
  const { taskTypeDetailData } = useSelector((state) => state.taskTypeReducer);
  const {
    assigness,
    description,
    lstComment,
    originalEstimate,
    priorityId,
    statusId,
    taskName,
    taskTypeDetail,
    timeTrackingRemaining,
    typeId,
    comments,
  } = taskTypeDetailData;

  //LIFE CYCEL
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskTypeSagaAction());
    dispatch(getPrioritySagaAction());
    dispatch(getStatusSagaAction());
    dispatch(findUserSagaAction(""));
    dispatch(handleSubmit(handleSubmitForm));
    formik.setValues({ ...taskTypeDetailData });
  }, [
    assigness,
    description,
    lstComment,
    originalEstimate,
    priorityId,
    statusId,
    taskName,
    taskTypeDetail,
    timeTrackingRemaining,
    typeId,
  ]);

  // hide show
  const [visibleName, setVisibleName] = useState(false);
  const [visibleEditor, setvisibleEditor] = useState(true);

  //tinymce
  const editorRef = useRef(null);

  //formik
  const formik = useFormik({
    initialValues: {
      assigness,
      description,
      lstComment,
      originalEstimate,
      priorityId,
      statusId,
      taskName,
      taskTypeDetail,
      timeTrackingRemaining,
      typeId,
      comments,
    },
  });

  //put task detal reducer
  const putTaskReducer = (name, value) => {
    dispatch(getTaskDetailAction({ ...taskTypeDetailData, [name]: value }));
  };
  //handleSubmitForm
  const { id } = useParams();
  const handleSubmitForm = () => {
    dispatch(
      putUpdateTaskDetailAction({
        data: formik.values,
        id: id,
      })
    );
  };
//comment
const [comment,setComment]=useState({
  id:"",
  content:"",
  taskId:"",
})
  return (
    <Row>
      <Col span={16} className="px-3">
        <Select
          name="typeId"
          size="large"
          onChange={(value) => {
            putTaskReducer("typeId", value);
            formik.setFieldValue("typeId", value);
          }}
          value={formik.values.typeId}
          style={{ width: 150 }}
        >
          {taskTypeData.map((item) => (
            <Option value={item.id}>{item.taskType}</Option>
          ))}
        </Select>

        <h4
          onDoubleClick={() => {
            setVisibleName(!visibleName);
          }}
          hidden={visibleName}
          className="mt-3"
        >
          {taskTypeDetailData?.taskName}
        </h4>
        <Input
          onDoubleClick={() => {
            setVisibleName(!visibleName);
          }}
          onChange={(e) => {
            let { name, value } = e.target;
            dispatch(
              getTaskDetailAction({ ...taskTypeDetailData, [name]: value })
            );
            formik.setFieldValue(name, value);
          }}
          name="taskName"
          hidden={!visibleName}
          style={{ fontSize: 30 }}
          size="large"
          className=" my-3"
          value={formik.values?.taskName}
        />
        <h6>Mô tả </h6>
        {visibleEditor ? (
          <p
            onDoubleClick={() => {
              setvisibleEditor(!visibleEditor);
            }}
          >
            {parse(
              formik.values?.description ? formik.values?.description : ""
            )}
          </p>
        ) : (
          <Editor
            onDoubleClick={() => {
              setvisibleEditor(!visibleEditor);
            }}
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="vkiz48700ffb9y0k4nl4z000gsebclalwrxdwd2176p6bluk"
            initialValue={formik.values?.description}
            init={{
              menubar: false,
              branding: false,
              statusbar: false,
              height: 300,
              menubar: false,
              width: 595,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:20px }",
            }}
          />
        )}

        <h6 className="my-3">Bình luận</h6>
        <div className="comments d-flex mb-2">
          <Avatar style={{ width: 35 }} icon={<UserOutlined />} />
          <Input
            onChange={formik.handleChange}
            name="comments"
            size="large"
            className="ml-2"
            placeholder="Basic usage"
          />
          <Button
            onClick={() => {
              dispatch(
                addCommentTaskSagaAction({
                  taskId: formik.values.taskId,
                  contentComment: formik.values.comments,
                })
              );
            }}
            type="primary"
          >
            Gửi
          </Button>
        </div>
        {formik.values?.lstComment?.map((valitem, index) => {
          return (
            <>
              <div className="comment   w-100">
                <div key={index} className="d-flex">
                  <Avatar className="mt-2" src={valitem.avatar}/>
                 
                  <Input
                    name={valitem.id}
                    size="large"
                    style={{ border: "none", fontSize: "20px" }}
                    defaultValue={valitem?.commentContent}
                    onChange={(e)=>{
                      let {name,value}=e.target
                      setComment({
                        id:name,
                        content:value,
                        taskId: formik.values.taskId,
                      })
                    }}
                  />
                </div>

                <Button onClick={()=>{
                  dispatch(putUpdateCommentSagaAction(comment))
                }} className=" " type="link">
                  Sửa
                </Button>
                <Button
                  onClick={() => {
                    dispatch(
                      deleteCommentTaskSagaAction({
                        id: valitem.id,
                        taskId: formik.values.taskId,
                      })
                    );
                  }}
                  className=" "
                  type="link"
                  danger
                >
                  Xóa
                </Button>
              </div>
            </>
          );
        })}
      </Col>
      <Col span={8}>
        <div className="mb-3">
          <h6>Trạng thái</h6>
          <Select
            name="statusId"
            onChange={(value) => {
              putTaskReducer("statusId", value);
              formik.setFieldValue("statusId", value);
            }}
            size="large"
            value={formik.values?.statusId}
            style={{ width: "100%" }}
          >
            {statusData.map((item) => (
              <Option value={item.statusId}>{item.statusName}</Option>
            ))}
          </Select>
        </div>
        <div className="my-3">
          <h6>Thành viên</h6>
          <Avatar.Group>
            {formik.values?.assigness?.map((item) => (
              <Avatar src={item.avatar} />
            ))}
            <Popover
              placement="topLeft"
              content={
                <AutoComplete
                  options={findUserData?.map((item) => ({
                    label: item.name,
                    value: item.userId,
                  }))}
                  style={{
                    width: 200,
                  }}
                  onSelect={(value) => {
                    dispatch({
                      type: "ADD_USER_TASK_SAGA",
                      payload: {
                        taskId: formik.values.taskId,
                        userId: value,
                      },
                    });
                  }}
                  placeholder="input here"
                />
              }
              trigger="click"
            >
              <Avatar icon={<PlusOutlined />} />
            </Popover>
          </Avatar.Group>
        </div>
        <div className="mb-3">
          <h6>Mức độ</h6>
          <Select
            name="priorityId"
            onChange={(value) => {
              putTaskReducer("priorityId", value);
              formik.setFieldValue("priorityId", value);
            }}
            size="large"
            value={formik.values?.priorityId}
            style={{ width: "100%" }}
          >
            {priorityData.map((item) => (
              <Option value={item.priorityId}>{item.description}</Option>
            ))}
          </Select>
        </div>
        <div className="mb-3">
          <h6>Thời gian dự kiến</h6>
          <InputNumber
            name="originalEstimate"
            onChange={(value) => {
              putTaskReducer("originalEstimate", value);
              formik.setFieldValue("originalEstimate", value);
            }}
            size="large"
            className="w-100"
            placeholder="Basic usage"
            value={formik.values?.originalEstimate}
          />
        </div>
        <div className="mb-3">
          <h6>Thời gian đã làm</h6>
          <InputNumber
            name="timeTrackingSpent"
            onChange={(value) => {
              putTaskReducer("timeTrackingSpent", value);
              formik.setFieldValue("timeTrackingSpent", value);
            }}
            size="large"
            className="w-100"
            placeholder="Basic usage"
            value={formik.values?.timeTrackingSpent}
          />
        </div>
        <div className="mb-3">
          <h6>Thời gian còn lại</h6>
          <InputNumber
            name="timeTrackingRemaining"
            onChange={(value) => {
              putTaskReducer("timeTrackingRemaining", value);
              formik.setFieldValue("timeTrackingRemaining", value);
            }}
            size="large"
            className="w-100"
            placeholder="Basic usage"
            value={formik.values?.timeTrackingRemaining}
          />
        </div>
      </Col>
    </Row>
  );
}
