import React, { useEffect, useState } from "react";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu } from "antd";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { useLocalStorageState } from "ahooks";
import { useDispatch } from "react-redux";
import { FaUsers } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { useMutation } from "react-query";
const { Content, Sider } = Layout;

const AdminPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()
    // const choosedMenu = useMutation(state => state?.counterSlice?.choosedMenu)
    const [collapsed, setCollapsed] = useLocalStorageState("collapsed", {
        defaultValue: false,
    });
    const [choosedMenu, setChoosedMenu] = useLocalStorageState("choosed-menu", {
        defaultValue: "",
    });


    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ backgroundColor: "#22272B" }}
            >
                <div className="flex items-center gap-2 ms-3 my-4">
                    <Button
                        type="primary"
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            color: "white",
                        }}
                    >
                        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    </Button>

                    {!collapsed && (
                        <div
                            className="flex items-center gap-2 ms-3 cursor-pointer"
                            onClick={() => {
                                navigate("/");
                            }}
                        >
                            <img
                                src="https://cdn-icons-png.freepik.com/512/2496/2496109.png"
                                className="w-[30px] rounded-md"
                            />
                            <span className="text-white text-[20px]">Trello</span>
                        </div>
                    )}
                </div>

                <Menu
                    theme="dark"
                    defaultSelectedKeys={[
                        `${location.pathname != "/" ? choosedMenu : "1231231312312312312"}`,
                    ]}
                    onClick={(e) => {
                         setChoosedMenu(e?.key);
                    }}
                    className="custom-menu bg-[#22272B]"
                >
                    <Menu.Item
                        key={"users"}
                        icon={<FaUsers />}
                        onClick={() => {
                            navigate("/admin/users")
                        }}
                    >
                        Users
                    </Menu.Item>
                    <Menu.Item
                        key={"tests"}
                        icon={<IoDocumentsOutline />}
                        onClick={() => {
                            navigate("/admin/tests")
                        }}
                    >
                        Tests
                    </Menu.Item>
                </Menu>

                <div className="demo-logo-vertical" />
            </Sider>

            <Layout
                style={{
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >

                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: "16px 0",
                        }}
                    >
                    </Breadcrumb>
                    <div>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout >
    );
};
export default AdminPage;