import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Contex from "../contex";

import Logo from "./logo_new.png";

const { Header } = Layout;
const HeaderComp = ({ collapsed, setCollapsed }) => {
  const { userActive } = useContext(Contex);
  const userActiveR = useSelector((state) => state?.userActive);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Header
        style={{
          background: colorBgContainer,
        }}
        className="flex items-center justify-between px-10"
      >
        <img
          src={Logo}
          className="w-[181px] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />

        <ul className="hidden md:flex gap-2 items-center justify-center list-none m-0 p-0">
          <li>Bosh sahifa</li>
          <li>Testlar</li>
          <li></li>
        </ul>

        {/* <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        /> */}

        {userActive == true ? (
          <span className="text-[30px] cursor-pointer">
            <FaUserCircle />
          </span>
        ) : (
          <Button
            type="primary"
            className="rounded-full"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
      </Header>
    </>
  );
};

export default HeaderComp;
