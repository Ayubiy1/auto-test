import { Button, Form, Input, Typography, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";

const Register = () => {
  const [form] = useForm();
  const navigator = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Successfully added to the account",
    });
  };
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Ma'lumotlaringizni tekshirin qayta kiriting!",
    });
  };
  const token = Array(3).fill().map(() => Math.random().toString(36).substring(2)).join('').substring(0, 30);

  const { mutate: mutateTokens } = useMutation((dataP) => {

    return axios.post("http://localhost:3004/tokens", dataP)
  })
  const { data } = useQuery("users-reg", () => {
    return axios.get(`https://auto-test-api-8ch5.onrender.com/users`);
  });
  const { mutate, isLoading } = useMutation(
    (newUser) => {
      return axios.post(
        `https://auto-test-api-8ch5.onrender.com/users`,
        newUser
      );
    },
    {
      onSuccess: (respons) => {
        const newToken = {
          userId: respons?.data?.id,
          token: token,
          createdAt: new Date().toISOString()
        }

        success();
        navigator("/login");
        if (respons?.data?.id) {
          mutateTokens(newToken)
        }
      },
    }
  );

  const onFinish = (values) => {
    const inspection = data?.data.find(
      (u) => u?.userName == values.userName || u?.number == values.number
    );

    const user = { ...values };

    if (inspection) {
      error();
    } else {
      mutate(user);
    }
  };

  return (
    <>
      {contextHolder}

      {!isLoading ? (
        <div className="h-[100vh] flex items-center justify-center">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            className="w-[400px] shadow-lg rounded-lg p-4"
          >
            <h2 className="text-center">Register</h2>
            <Form.Item
              label="Ism"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: "iltimos Ism kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Familya"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "iltimos Familya kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Foydalanuvchi nomi"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "iltimos Foydalanuvchi nomi kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Telefon raqam"
              name="number"
              rules={[
                {
                  required: true,
                  message: "Iltimos Telefon raqamingizni kirintng!",
                },
              ]}
            >
              <Input placeholder="(+998) 90 123 45 67" />
            </Form.Item>

            <Form.Item
              label="Parol"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Iltimos parol yozing!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="flex gap-2 justify-center">
              <Form.Item>
                <Button className="w-[100px]" type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>

              <Typography
                onClick={() => {
                  navigator("/login");
                }}
                className="h-[32px] text-blue-600 flex items-center justify-center cursor-pointer"
              >
                login
              </Typography>
            </div>
          </Form>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[100vh]">
          Loading...
        </div>
      )}
    </>
  );
};

export default Register;
