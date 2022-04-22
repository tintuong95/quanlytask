import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Radio, Select } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  getDetailProject,
  getProjectCategorySagaAction,
} from "../redux/actions/projectAction";
import { handleSubmit } from "../redux/actions/Modal";

const Editproject = () => {
  //select
  const { allProjectCategory } = useSelector((state) => state.projectReducer);
  const projectDetail = useSelector(
    (state) => state.projectReducer.projectDetail
  );
  const nameProject = projectDetail.projectName;
  const dispatch = useDispatch();

  //tinymce
  const editorRef = useRef(null);
  //form create project
  const [form] = Form.useForm();
  //FORMIK
  const formik = useFormik({
    initialValues: {
      projectName: projectDetail?.projectName,
      projectCategory: projectDetail?.projectCategory,
    },
  });
  const { projectName, categoryId } = formik.values;
  //life cycle
  useEffect(() => {
    dispatch(getProjectCategorySagaAction());

    dispatch(handleSubmit(handleSubmitForm));

    formik.setValues({ ...projectDetail });
  }, [nameProject, projectName, categoryId]);
  // handle submit
  const handleSubmitForm = () => {
    dispatch({
      type: "UPDATE_PROJECT_SAGA",
      payload: {
        id: formik.values.id,
        data: {
          ...formik.values,
          creator: 0,
          categoryId: formik.values.projectCategory.id,
        },
      },
    });
  };

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Loại dự án">
        <Radio.Group
          onChange={(e) => {
            let { name, value } = e.target;
            dispatch(
              getDetailProject({ ...formik.values, projectCategory: value })
            );

            formik.setFieldValue(name, value);
          }}
          name="projectCategory"
        >
          {allProjectCategory.map((item, index) => {
            return (
              <Radio.Button
                key={index}
                selected={index == 0 ? true : false}
                className="sizefont"
                value={{ id: item.id, name: item.projectCategoryName }}
              >
                {item.projectCategoryName}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên dự án">
        <Input
          size="large"
          onChange={(e) => {
            let { name, value } = e.target;
            dispatch(getDetailProject({ ...formik.values, [name]: value }));

            formik.setFieldValue(name, value);
          }}
          value={formik.values?.projectName}
          name="projectName"
          placeholder="Nhập tên dự án"
        />
      </Form.Item>
      <Form.Item label="Mô tả dự án">
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          apiKey="vkiz48700ffb9y0k4nl4z000gsebclalwrxdwd2176p6bluk"
          initialValue={projectDetail?.description}
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
};

export default Editproject;
