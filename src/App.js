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
import AdminPage from "./pages/admin";
import UserAdmin from "./pages/admin/users";
import TestsAdmin from "./pages/admin/tests";

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
          <Route path="admin" element={<AdminPage />}>
            <Route path="users" element={<UserAdmin />} />
            <Route path="tests" element={<TestsAdmin />} />
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
