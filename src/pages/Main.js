import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Avatar, AutoComplete, Popover } from "antd";

import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectSagaAction,
  getDetailProjectSaga,
  getProjectCategorySagaAction,
} from "../redux/actions/projectAction";
import { ADD_USER_PROJECT_SAGA } from "../redux/contants/userContant";
import {
  addUserToProjectAction,
  findUserSagaAction,
  removeProjectSaga,
  removeUserProjectSagaAction,
} from "../redux/actions/userAction";
import Editproject from "../components/EditProject";
import { showModal } from "../redux/actions/Modal";

export default function Main() {
  //get idproject delete
  const [idProject, setIdProject] = useState("");
  //add user
  const [valueAddUser, setValueAddUser] = useState("");

  //dispatch và select
  const dispatch = useDispatch();
  const { allProjectData } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    //lấy toàn bộ project
    dispatch(getAllProjectSagaAction());
  }, []);
  //find user
  const { findUserData } = useSelector((state) => state.userReducer);

  //table
  const columns = [
    {
      title: "STT",
      render: (text, record, index) => {
        return <p className="my-0">{++index}</p>;
      },
    },
    {
      title: "Tên dự án",
      dataIndex: "projectName",
      render: (text, record, index) => {
        return (
          <Link
            onClick={() => {
              dispatch(getDetailProjectSaga(record.id));
            }}
            to={`/project/${record.id}`}
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: "Loại ",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Người tạo ",
      dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator.name}</Tag>;
      },
    },
    {
      title: "Thành viên ",
      dataIndex: "members",
      key: "members",
      render: (text, record, index) => {
        const columnsUser = [
          { title: "Tên", dataIndex: "name" },
          {
            title: "Hình",
            dataIndex: "avatar",
            render: (text, record, index) => <Avatar src={text} />,
          },
          {
            title: "Xóa",
            dataIndex: "remove",
            render: (text, record, index) => (
              <Button
                onClick={() => {
                  dispatch(
                    removeUserProjectSagaAction({
                      projectId: idProject,
                      userId: record.userId,
                    })
                  );
                }}
                style={{ padding: "5px 7px" }}
                icon={<DeleteOutlined />}
                type="dashed"
                danger
              />
            ),
          },
        ];
        return (
          <div>
            {record.members.map((item, index) => {
              if (index < 2) {
                return <Avatar src={item.avatar} />;
              }
            })}

            <Popover
              placement="bottomLeft"
              content={
                <Table columns={columnsUser} dataSource={record.members} />
              }
              trigger="click"
            >
              <Avatar
                onClick={() => {
                  setIdProject(record.id);
                }}
              >
                <span style={{ fontSize: "16px" }}>
                  {record.members.length}+
                </span>
              </Avatar>
            </Popover>

            <Popover
              placement="bottomLeft"
              trigger="click"
              content={
                <AutoComplete
                  value={valueAddUser}
                  options={findUserData.map((item) => ({
                    label: item.name,
                    value: item.userId,
                  }))}
                  style={{ width: 200 }}
                  onSelect={(value, option) => {
                    setValueAddUser(option.label);
                    dispatch(
                      addUserToProjectAction({
                        projectId: record.id,
                        userId: value,
                      })
                    );
                  }}
                  onSearch={(value) => {
                    dispatch(findUserSagaAction(value));
                  }}
                  onChange={(value) => {
                    setValueAddUser(value);
                  }}
                  placeholder="Nhập nội dung"
                />
              }
            >
              <Avatar icon={<PlusOutlined />} />
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Sửa",
      render: (text, record, index) => (
        <Button
          onClick={() => {
            try {
              //get detail project
              dispatch(getDetailProjectSaga(record.id));
            } catch (err) {
              console.log("loi");
            }
            dispatch(
              showModal({
                component: <Editproject />,
                title: "Sửa dự án",
                width: 490,
              })
            );
          }}
          type="link"
        >
          Sửa
        </Button>
      ),
    },
    {
      title: "Xóa ",
      render: (text, record, index) => (
        <Button
          onClick={() => {
            dispatch(removeProjectSaga(record.id));
          }}
          type="link"
          danger
        >
          Xóa
        </Button>
      ),
    },
  ];
  //

  return (
    <>
      <Space style={{ marginBottom: 16 }}></Space>
      <Table columns={columns} dataSource={allProjectData} />
    </>
  );
}
