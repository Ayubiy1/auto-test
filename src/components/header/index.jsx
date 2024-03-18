import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const { Header } = Layout;
const HeaderComp = ({ collapsed, setCollapsed }) => {
  const userActive = useSelector((state) => state?.userActive);

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
          src="https://e-avtomaktab.uz/Vesperr/assets/img/logo_new.png"
          className="w-[181px]"
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
          <Button type="primary" className="rounded-full">
            Login
          </Button>
        )}
      </Header>
    </>
  );
};

export default HeaderComp;
