import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import HeaderComp from "../../components/header";
import { useLocalStorageState } from "ahooks";
import { Outlet, useNavigate } from "react-router";
const { Sider, Content } = Layout;

const App = () => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useLocalStorageState("collapsed", {
    defaultValue: false,
  });
  const [activeMenu, setActiveMenu] = useLocalStorageState("active-menu", {
    defaultValue: 1,
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="h-[100vh]">
      <Layout>
        <HeaderComp collapsed={collapsed} setCollapsed={setCollapsed} />

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflowY: "scroll"
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
{
  /* <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[`${activeMenu}`]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Home",
              onClick: () => {
                navigate("/");
                setActiveMenu(1);
              },
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Tests",
              onClick: () => {
                navigate("/tests");
                setActiveMenu(2);
              },
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "History",
              onClick: () => {
                navigate("/history");
                setActiveMenu(3);
              },
            },
          ]}
        />
      </Sider> */
}
