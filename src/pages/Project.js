import React, { useEffect } from "react";
import { Card, Col, Row, Avatar, Tooltip, Input, Button } from "antd";
import {
  UserOutlined,
  AntDesignOutlined,
  CheckOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../redux/actions/Modal";
import EditTask from "../components/EditTask";
import { DragDropContext } from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { getDetailProjectSaga } from "../redux/actions/projectAction";
import {
  getDetailTaskSagaAction,
  putUpdateStatusSagaAction,
} from "../redux/actions/taskAction";
//search
const { Search } = Input;

export default function Project() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.projectReducer.projectDetail);
  useEffect(() => {
    dispatch(getDetailProjectSaga(id));
  }, [id]);
  const handleEndDrag = (result) => {
    dispatch(
      putUpdateStatusSagaAction({
        taskId: result.draggableId,
        statusId: result.destination.droppableId,
        id: id,
      })
    );
  };
  return (
    <>
      <div className="d-flex mb-3">
        <Search
          size="large"
          className="mt-0"
          placeholder="input search text"
          style={{ width: 200 }}
        />
        <Avatar.Group
          className="ml-3"
          maxCount={2}
          maxPopoverTrigger="click"
          size="large"
          maxStyle={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            cursor: "pointer",
          }}
        >
          {data?.members.map((item) => (
            <Avatar src={item.avatar} />
          ))}

          <Tooltip title="Ant User" placement="top">
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          </Tooltip>
          <Avatar
            style={{ backgroundColor: "#1890ff" }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
        <Button style={{ height: 43 }} className="mx-2" type="dashed">
          Nhiệm vụ của tôi
        </Button>{" "}
        <Button style={{ height: 43 }} className="mx-2" type="dashed">
          Cập nhật lại
        </Button>
      </div>
      <div className="site-card-wrapper">
        <DragDropContext onDragEnd={handleEndDrag}>
          <Row gutter={16}>
            {data?.lstTask.map((item) => (
              <Droppable droppableId={item.statusId}>
                {(provided) => {
                  return (
                    <Col
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      span={6}
                    >
                      <Card
                        style={{
                          backgroundColor: "#f5f5f5",
                          borderRadius: "10px",
                        }}
                        bordered={false}
                      >
                        <p style={{ color: "#8c8c8c", fontWeight: 600 }}>
                          {item.statusName}
                        </p>
                        {/* card child */}
                        {item.lstTaskDeTail.map((value, index) => {
                          return (
                            <Draggable
                              draggableId={value.taskId.toString()}
                              key={value.taskId.toString()}
                              index={index}
                            >
                              {(provided) => {
                                return (
                                  <Card
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() => {
                                      dispatch(
                                        getDetailTaskSagaAction(value.taskId)
                                      );

                                      dispatch(
                                        showModal({
                                          width: 1000,
                                          title: "CHI TIẾT NHIỆM VỤ ",
                                          component: <EditTask />,
                                        })
                                      );
                                    }}
                                    className="mt-3 task"
                                    bordered={false}
                                  >
                                    <p className="mb-1">{value.taskName}</p>
                                    <div className="d-flex">
                                      <div className=" d-flex w-100 p-2">
                                        <CheckOutlined
                                          className="mx-1"
                                          style={{
                                            color: "green",
                                          }}
                                        />
                                        <ArrowDownOutlined
                                          className="mx-1"
                                          style={{
                                            color: "red",
                                          }}
                                        />
                                      </div>
                                      <div className="d-flex p-2">
                                        <Avatar.Group
                                          maxCount={2}
                                          maxPopoverTrigger="click"
                                          size="small"
                                          maxStyle={{
                                            color: "#f56a00",
                                            backgroundColor: "#fde3cf",
                                            cursor: "pointer",
                                          }}
                                        >
                                          {value.assigness.map((val) => (
                                            <Avatar src={val.avatar} />
                                          ))}

                                          <Avatar
                                            style={{
                                              backgroundColor: "#1890ff",
                                            }}
                                            icon={<AntDesignOutlined />}
                                          />
                                        </Avatar.Group>
                                      </div>
                                    </div>
                                  </Card>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {/* card child */}
                      </Card>
                      {provided.placeholder}
                    </Col>
                  );
                }}
              </Droppable>
            ))}
          </Row>
        </DragDropContext>
      </div>
    </>
  );
}
