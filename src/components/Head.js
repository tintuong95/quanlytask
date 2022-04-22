import React from "react";
import { Breadcrumb, Avatar, Layout, Popover, Button } from "antd";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import {useSelector} from "react-redux"
import { useParams } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../util/contants/contantService";
import { history } from "../util/libs/history";
const { Header } = Layout;
export default function Head(props) {
  const {id}=useParams()
  const nameProject=useSelector(state=>state.projectReducer.projectDetail.projectName)
  const userLogin=localStorage.getItem(USER_LOGIN)
  const content=()=>{
    return <Button onClick={()=>{
      localStorage.removeItem(USER_LOGIN)
      localStorage.removeItem(TOKEN)
      history.push("/login")
    }}>Đăng xuất</Button>
  }
  return (
    <Header className="bg-white my-0 d-flex justify-content-between align-items-center w-100">
      <div className="p-2">
        <Breadcrumb style={{ marginTop: 80 }}>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <UserOutlined />
            <span>Quản lý dự án</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id?nameProject:""}</Breadcrumb.Item>
        </Breadcrumb>
        ,
      </div>
      <div className="p-2">
      <Popover placement="bottom" title={JSON.parse(userLogin).name} content={content()} trigger="click">
         <Avatar
          style={{ backgroundColor: "#87d068" }}
          icon={<UserOutlined />}
        />
      </Popover>
       
      </div>
    </Header>
  );
}
