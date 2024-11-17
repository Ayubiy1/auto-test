import { Layout, Button, theme, Menu, Dropdown } from "antd";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Contex from "../contex";

import Logo from "./logo_new.png";
import "./style.css"

const { Header } = Layout;
const HeaderComp = ({ collapsed, setCollapsed }) => {
  const { userActive } = useContext(Contex);
  const userActiveR = useSelector((state) => state?.userActive);
  const navigate = useNavigate();
  const location = useLocation()

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const menu = (
    <Menu onSelect={(e) => console.log(e)} className="w-[100px]">
      <Menu.Item className="w-full" onClick={() => {
        localStorage.clear()
        window.location.reload();
        // navigate("/login")
      }}>
        Log Out
      </Menu.Item>
      <Menu.Item className="w-full" onClick={() => {
        navigate("/setting")
      }}>
        Setting
      </Menu.Item>
    </Menu>
  );

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
          <li
            className={location.pathname === "/" ? "active-li" : ""}
            onClick={() => {
              navigate("/");
            }}
          >
            Bosh sahifa
          </li>
          <li
            className={location.pathname === "/tests" ? "active-li" : ""}
            onClick={() => {
              navigate("/tests");
            }}
          >
            Testlar
          </li>
          <li
            className={location.pathname === "/history" ? "active-li" : ""}
            onClick={() => {
              navigate("/history");
            }}
          >
            Tarix
          </li>
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
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
              style={{ fontWeight: 'bold' }}
            >
              <span className="w-[101px] text-[30px] cursor-pointer">
                <FaUserCircle />
              </span>
            </a>
          </Dropdown>
        ) : (
          <Button
            type="primary"
            className="w-[101px] rounded-full"
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
