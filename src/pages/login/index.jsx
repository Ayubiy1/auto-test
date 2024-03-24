import { Button, Form, Input, Typography } from "antd";
import axios from "axios";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import Contex from "../../components/contex";

const Login = () => {
  const { setUserActive, userId, setUserId } = useContext(Contex);

  const navigator = useNavigate();

  const { data } = useQuery("users-login", () => {
    return axios.get(`http://localhost:3004/users`);
  });

  const onFinish = (values) => {
    const res = data?.data.find((value) => {
      return (
        value?.number === values.number && value?.password == values?.password
      );
    });

    if (res) {
      navigator("/");
      setUserId(res.id);
      setUserActive(true);
    }
  };

  return (
    <>
      <div className="h-[100vh] flex items-center justify-center">
        <Form
          onFinish={onFinish}
          layout="vertical"
          className="w-[400px] p-[15px] shadow-lg rounded-lg"
        >
          <h2 className="text-center">Login</h2>

          <Form.Item
            label="Number"
            name="number"
            rules={[
              {
                required: true,
                message: "Please input your Number!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="flex gap-2 justify-center">
            <Form.Item>
              <Button className="w-[100px]" type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>

            <Typography
              onClick={() => {
                navigator("/register");
              }}
              className="h-[32px] text-blue-600 flex items-center justify-center cursor-pointer"
            >
              Register
            </Typography>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
