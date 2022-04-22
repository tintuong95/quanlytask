import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Col, Row, Input, Form, Select, InputNumber } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import {
  findUserSagaAction,
} from "../redux/actions/userAction";
import { useFormik } from "formik";
import {  createTaskSagaAction, getDetailProjectSagaAction, getPrioritySagaAction, getStatusSagaAction, getTaskTypeSagaAction } from "../redux/actions/taskAction";
import { handleSubmit } from "../redux/actions/Modal";

//select project
const { Option } = Select;

export default function CreateTask() {
  //SELECT
  const { allProjectData } = useSelector((state) => state.projectReducer);
  const { taskTypeData } = useSelector((state) => state.taskTypeReducer);
  const { priorityData } = useSelector((state) => state.priorityReducer);
  const { statusData } = useSelector((state) => state.statusReducer);
  const { findUserData } = useSelector((state) => state.userReducer);

  //form create project

  //tinymce
  const editorRef = useRef(null);
  

  //formik
  const formik = useFormik({
    initialValues: {
      projectId: "",
      taskName: "",
      typeId: "",
      priorityId: "",
      statusId: "",
      listUserAsign: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      description: "",
    },
  });
  //setFieldValue
  const handleSetField = (name, value) => {
    formik.setFieldValue(name, value);
  };
  //handle submit
  const handleSubmitForm = () => {
    dispatch(createTaskSagaAction({...formik.values,description:editorRef.current.getContent()}))
    dispatch(getDetailProjectSagaAction(projectId))
  };
  //
  const {
    typeId,
    timeTrackingSpent,
    statusId,
    projectId,
    taskName,
    timeTrackingRemaining,
    description,
    listUserAsign,
    originalEstimate,
    priorityId,
  } = formik.values;
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTaskTypeSagaAction());

    dispatch(getPrioritySagaAction());

    dispatch(getStatusSagaAction());

    dispatch(findUserSagaAction(""));

    dispatch(handleSubmit(handleSubmitForm));
  }, [
    typeId,
    timeTrackingSpent,
    statusId,
    projectId,
    taskName,
    timeTrackingRemaining,
    description,
    listUserAsign,
    originalEstimate,
    priorityId,
  ]);
  //thoi gian ket thuc
  const [timeEnd,setTimeEnd]=useState(0)
  return (
    <Form onSubmit={formik.handleSubmit} layout="vertical">
      <Row>
        <Col span={8}>
          <Form.Item label="Tên dự án">
            <Select
              name="projectId"
              onChange={(value) => {
                handleSetField("projectId", value);
              }}
              size="large"
              defaultValue="Vui lòng chọn"
              style={{ width: "98%" }}
            >
              {allProjectData.map((item) => (
                <Option value={item.id}>{item.projectName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Tên công việc">
            <Input
              name="taskName"
              onChange={formik.handleChange}
              style={{ width: "98%" }}
              size="large"
              placeholder="Nhập nội dung"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="typeId" label="Loại công việc">
            <Select
              size="large"
              name="typeId"
              onChange={(value) => {
                handleSetField("typeId", value);
              }}
              defaultValue="Vui lòng chọn"
              style={{ width: "98%" }}
            >
              {taskTypeData.map((item) => (
                <Option value={item.id}>{item.taskType}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <Form.Item label="Mức độ">
            <Select
              name="priorityId"
              onChange={(value) => {
                handleSetField("priorityId", value);
              }}
              size="large"
              defaultValue="Vui lòng chọn"
              style={{ width: "98%" }}
            >
              {priorityData.map((item) => (
                <Option value={item.priorityId}>{item.description}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Trạng thái">
            <Select
              size="large"
              defaultValue="Vui lòng chọn"
              style={{ width: "98%" }}
              onChange={(value) => {
                handleSetField("statusId", value);
              }}
              name="statusId"
            >
              {statusData.map((item) => (
                <Option value={item.statusId}>{item.statusName}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Thành viên">
            <Select
              name="listUserAsign"
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Vui lòng chọn"
              onChange={(value) => {
                handleSetField("listUserAsign", value);
              }}
            >
              {findUserData.map((item) => (
                <Option key={item.userId}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <Form.Item label="Thời gian dự kiến">
            <InputNumber
             value={formik.values.originalEstimate}
              name="originalEstimate"
              size="large"
              style={{ width: "98%" }}
              min={0}
              max={24}
              onChange={(value) => {
                setTimeEnd(value+formik.values.timeTrackingSpent)
                handleSetField("originalEstimate", value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Thời gian bắt đầu">
            <InputNumber
              value={formik.values.timeTrackingSpent}
              name="timeTrackingSpent"
              size="large"
              style={{ width: "98%" }}
              min={0}
              max={23}
              onChange={(value) => {
                setTimeEnd(value+formik.values.originalEstimate)
                handleSetField("timeTrackingSpent", value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Thời gian kết thúc">
            <InputNumber
            disabled
            value={timeEnd}
              name="timeTrackingRemaining"
              style={{ width: "98%" }}
              size="large"
              placeholder="large size"
              onChange={(value) => {
                handleSetField("timeTrackingRemaining", value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Form.Item label="Mô tả dự án">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            apiKey="vkiz48700ffb9y0k4nl4z000gsebclalwrxdwd2176p6bluk"
            initialValue=""
            init={{
              menubar: false,
              branding: false,
              statusbar: false,
              height: 300,
              menubar: false,
              width: 950,
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
        </Form.Item>
      </Row>
      
    </Form>
  );
}
