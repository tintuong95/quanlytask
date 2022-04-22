import { Menu, Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import {
  UploadOutlined,
  ControlOutlined,
  FileAddOutlined,
  DotChartOutlined,
  FundProjectionScreenOutlined,
  BulbOutlined,
  OneToOneOutlined,
} from "@ant-design/icons";
import CreateProject from "./CreateProject";
import { showModal } from "../redux/actions/Modal";


import {

  getProjectCategorySagaAction,
} from "../redux/actions/projectAction";


const { Sider } = Layout;
export default function MenuBar() {

  
const dispatch=useDispatch()


  return (
    <Sider style={{ backgroundColor: "#f5f5f5" }} width="300">
      <div className="logo d-flex ml-3 mt-4 ">
        <img width={50} src="./logo.png" alt="logo" />
        <p className="ml-2 my-2 text-logo">TASK APP 1.0</p>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        className="mt-3"
        style={{ backgroundColor: "#f5f5f5" }}
        mode="inline"
      >
        <Menu.Item key="1" icon={<ControlOutlined />}>
          <Link to="/home">Quản lý dự án</Link>
        </Menu.Item>
        <Menu.Item onClick={()=>{
          dispatch(getProjectCategorySagaAction());
         dispatch(showModal({component:<CreateProject/>,title:"Tạo mới dự án",width:490}))
        }} key="2" icon={<FileAddOutlined />}>
          Tạo mới dự án
        </Menu.Item>
        <hr width="82%" />
        <Menu.Item key="3" icon={<UploadOutlined />}>
          Releases
        </Menu.Item>
        <Menu.Item key="4" icon={<OneToOneOutlined />}>
          Issues and filters
        </Menu.Item>
        <Menu.Item key="5" icon={<FundProjectionScreenOutlined />}>
          Pages
        </Menu.Item>
        <Menu.Item key="6" icon={<BulbOutlined />}>
          Reports
        </Menu.Item>
        <Menu.Item key="7" icon={<DotChartOutlined />}>
          Components
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
