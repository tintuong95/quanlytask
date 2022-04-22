import React from "react";
import { Layout } from "antd";

import "antd/dist/antd.css";
import MenuBar from "../components/MenuBar";
import SliderBar from "../components/SliderBar";
import Head from "../components/Head";
import Main from "../pages/Main";
import { Route } from "react-router-dom";
import ModalHoc from "../hoc/ModalHoc";
const { Content } = Layout;

const MainLayout = (props) => {
  const {Component,...rest}=props

  return (
    <Route {...rest}  render={(propsRouter)=>{
      return <Layout style={{ minHeight: "100vh" }}>
      {/* modal */}
      <ModalHoc />
      {/* slider bar */}
      <SliderBar />
      <Layout className="site-layout">
        <Content style={{ margin: "0 " }}>
          <Layout style={{ height: "100%" }}>
            {/* menu bar */}
            <MenuBar />
            {/* phan noi dung */}
            <Layout className="bg-white">
              {/* Header */}
              <Head />

              <Content style={{ margin: "0px 16px 0" }}>
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  
                  {/* content */}
                 <Component {...propsRouter} />
                  {/* content */}
                </div>
              </Content>
            </Layout>
          </Layout>
        </Content>
      </Layout>
    </Layout>
    }} />
    
  );
};

export default MainLayout;
