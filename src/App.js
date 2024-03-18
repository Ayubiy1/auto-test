import { Route, Routes } from "react-router";
import ContentComp from "./components/contant/inde";
import Tests from "./pages/tests";
import Home from "./pages/home";
import "./App.css";
import History from "./pages/history";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<ContentComp />} />
          <Route path="/tests" element={<Tests />}></Route>
          <Route path="/history" element={<History />} />
        </Route>
        <Route path="login" element={<>Login</>} />
      </Routes>
    </>
  );
}

export default App;

{
  /* <Routes>
        <Route path="/">
          <Layout className="h-[100vh]">
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                  {
                    key: "1",
                    icon: <UserOutlined />,
                    label: "nav 1",
                  },
                  {
                    key: "2",
                    icon: <VideoCameraOutlined />,
                    label: "nav 2",
                  },
                  {
                    key: "3",
                    icon: <UploadOutlined />,
                    label: "nav 3",
                  },
                ]}
              />
            </Sider>
            <Layout>
              <HeaderComp collapsed={collapsed} setCollapsed={setCollapsed} />

              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  minHeight: 280,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Route path="tests" element={<Tests />} />
              </Content>
            </Layout>
          </Layout>
        </Route>
      </Routes> */
}
