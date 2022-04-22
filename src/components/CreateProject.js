import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Input, Form, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectSagaAction,
  getProjectCategorySagaAction,
} from "../redux/actions/projectAction";
import { useFormik } from "formik";
import { handleSubmit } from "../redux/actions/Modal";
export default function CreateProject() {
  //dispatch
  const dispatch = useDispatch();

  const { allProjectCategory } = useSelector((state) => state.projectReducer);
  console.log(allProjectCategory)

  
  //tinymce
  const editorRef = useRef(null);

  //form create project
  const [form] = Form.useForm();
  //FORMIK
  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: "",
    },
  });
  const {projectName,description,categoryId}=formik.values
  useEffect(() => {
    dispatch(handleSubmit(handleSubmitForm));
  },[projectName,description,categoryId]);

//handle submit form
  function handleSubmitForm() {
    dispatch(
      addProjectSagaAction({
        ...formik.values,
        description: editorRef.current.getContent(),
      })
    );
  }

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Loại dự án">
        <Radio.Group onChange={formik.handleChange} name="categoryId">
          {allProjectCategory.map((item, index) => (
            <Radio.Button key={index} className="sizefont" value={item.id}>
              {item.projectCategoryName}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên dự án">
        <Input
          size="large"
          onChange={formik.handleChange}
          value={formik.values.projectName}
          name="projectName"
          placeholder="Nhập tên dự án"
        />
      </Form.Item>
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
    </Form>
  );
}
