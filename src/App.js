import { Route, Routes, useLocation, useNavigate } from "react-router";
import ContentComp from "./components/contant/inde";
import Tests from "./pages/tests";
import Home from "./pages/home";
import "./App.css";
import History from "./pages/history";
import Test from "./pages/test";
import Results from "./pages/results";
import Contex from "./components/contex";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import { useLocalStorageState } from "ahooks";
import SettingPage from "./pages/setting";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [chooseAllAnswer, setChooseAllAnswer] = useLocalStorageState(
    "results",
    {
      defaultValue: null,
    }
  );
  const [userActive, setUserActive] = useLocalStorageState("user", {
    defaultValue: false,
  });
  const [userId, setUserId] = useLocalStorageState("user-id", {
    defaultValue: 0,
  });

  useEffect(() => {
    const tokenVerification = localStorage.getItem("user-token")
    if (!tokenVerification) {
      localStorage.clear()
      // navigate("/login")
    } else if (location.pathname == "/register") {
      // navigate("/register")
    }

  }, [location.pathname])

  // useEffect(() => {
  //   if (userActive !== true && location.pathname != "/") {
  //     navigate("/login");
  //   }
  // }, [userActive]);

  return (
    <>
      <Contex.Provider
        value={{
          chooseAllAnswer,
          setChooseAllAnswer,
          userActive,
          setUserActive,
          userId,
          setUserId,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<ContentComp />} />
            <Route path="/tests" element={<Tests />}></Route>

            <Route path="test/:variant" element={<Test />} />
            <Route path="test/results" element={<Results />} />
            <Route path="/history" element={<History />} />
            <Route path="/setting" element={<SettingPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={
              <div className="flex justify-center items-center h-[100vh] text-[50px]">
                404
              </div>
            }
          />
        </Routes>
      </Contex.Provider>
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
