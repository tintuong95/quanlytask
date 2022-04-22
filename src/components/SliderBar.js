import React,{useState} from 'react'
import { Menu, Layout } from "antd";
import {

    PlusOutlined,
    SearchOutlined,
    QuestionCircleOutlined,
  
  } from "@ant-design/icons";
import {useSelector,useDispatch} from "react-redux"
import { showModal } from '../redux/actions/Modal';
import CreateTask from "./CreateTask"
const {  Sider } = Layout;


export default function SliderBar() {

  //dispatch
const dispatch=useDispatch()
      //layout
  const [state, setState] = useState({
    collapsed: false,
  });
  const onCollapse = (collapsed) => {
    setState({ collapsed });
  };
  return (
    <Sider
    style={{ backgroundColor: "#2f54eb" }}
    collapsible
    defaultCollapsed={true}
    onCollapse={onCollapse}
  >
    <div className="logo">
      <p></p>
    </div>
    <Menu
      style={{ backgroundColor: "#2f54eb", color: "white", border: "none" }}
      mode="inline"
    >
      <Menu.Item onClick={()=>{
        dispatch(showModal({component:<CreateTask/>,title:"Tạo mới nhiệm vụ",width:1000}))//
      }} key="1" icon={<PlusOutlined />}>
        Tạo mới nhiệm vụ
      </Menu.Item>
      <Menu.Item key="2" icon={<SearchOutlined />}>
        Tìm kiếm nhiệm vụ
      </Menu.Item>
      <Menu.Item key="3" icon={<QuestionCircleOutlined />}>
        Thông tin ứng dụng
      </Menu.Item>
    </Menu>
  </Sider>
  )
}
