import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Contex from "../../components/contex";
import "./style.css";
import { useLocation, useNavigate } from "react-router";

const SettingPage = () => {
    const { userId } = useContext(Contex);
    const [messageApi, contextHolder] = message.useMessage();
    const location = useLocation()
    const [form] = Form.useForm();
    const [userData, setUserData] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('refreshed')) {
            sessionStorage.setItem('refreshed', 'true');
            window.location.reload();
        }
    }, []);

    useEffect(() => {
        const userFound = localStorage.getItem("user");
        if (!userFound) {
            navigate("/");
        }
    }, [navigate, location.pathname, userData]);

    const successed = () => {
        messageApi.success("Ma'lumotlaringiz muvaffaqqiyatlik o'zgartirildi");
    };

    const { data, isLoading } = useQuery("user-data", () => {
        return axios.get(`https://auto-test-api-8ch5.onrender.com/users?id=${userId}`);
    }, {
        onSuccess: (response) => {
            setUserData(response.data);
        }
    });

    const { mutate, isLoading: isLoadingMutate } = useMutation((changedData) => {
        const userId = userData?.[0]?.id;
        return axios.put(`https://auto-test-api-8ch5.onrender.com/users/${userId}`, changedData);
    }, {
        onSuccess: () => {
            successed();
            setIsButtonDisabled(true);
        },
        onError: (error) => {
            messageApi.error("Xatolik yuz berdi. Qayta urinib ko'ring.");
            console.error("Error updating user data:", error);
        }
    });

    useEffect(() => {
        form.resetFields();
        if (userData) {
            form.setFieldsValue(userData[0]);
            setIsButtonDisabled(true); // Initially disable button
        }
    }, [userData, form, data, location.pathname]);

    const onFinish = (values) => {
        mutate(values);
    };

    const onValuesChange = (changedValues, allValues) => {
        const isChanged = Object.keys(allValues).some(
            key => allValues[key] !== userData[0][key]
        );
        setIsButtonDisabled(!isChanged);
    };

    if (isLoading || isLoadingMutate) {
        return (
            <section className="flex items-center justify-center h-[500px]">
                <div className="spinner spinner--steps2 icon-spinner-7" aria-hidden="true"></div>
            </section>
        );
    }

    return (
        <div className="h-full flex items-center justify-center">
            {contextHolder}

            <Form
                className="lg:w-[30%] mx-auto"
                onValuesChange={onValuesChange}
                form={form}
                onFinish={onFinish}
                initialValues={userData ? userData[0] : {}}
            >
                <Form.Item label="Ismi:" name="firstname">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Familiya:" name="lastName">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="User nomi:" name="userName">
                    <Input type="text" />
                </Form.Item>
                <Form.Item label="Telefon:" name="number">
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Email:" name="email">
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Parol:" name="password">
                    <Input.Password type="password" />
                </Form.Item>
                <Form.Item label="Holati:" name="rol">
                    <Input readOnly className="text-gray-400" />
                </Form.Item>
                <Form.Item className="text-end">
                    <Button type="primary" htmlType="submit" disabled={isButtonDisabled}>
                        O'zgartirish
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SettingPage;
