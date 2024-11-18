import { Button, Form, Input, Typography } from "antd";
import axios from "axios";
import { useContext } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import Contex from "../../components/contex";

const Login = () => {
  const { setUserActive, userId, setUserId } = useContext(Contex);

  const navigator = useNavigate();

  const { data, isLoading } = useQuery("users-login", () => {
    return axios.get(`https://auto-test-api-8ch5.onrender.com/users`);
  });

  const { mutate } = useMutation((dataP) => {
    return axios.post("http://localhost:3004/tokens", dataP)
  });

  const { data: dataTokens } = useQuery("tokens-login-page", () => {
    return axios.get("http://localhost:3004/tokens")
  });

  const { mutate: updateToken } = useMutation((updatedTokenData) => {
    return axios.put(`http://localhost:3004/tokens/${updatedTokenData.id}`, updatedTokenData)
  });

  const onFinish = (values) => {
    const res = data?.data.find((value) => {
      return (
        value?.number === values.number && value?.password == values?.password
      );
    });

    if (res) {
      // Yangi token yaratish
      const newToken = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

      // Foydalanuvchi uchun mavjud tokenni tekshirish
      const existingToken = dataTokens?.data?.find((t) => t?.userId === res?.id);

      if (existingToken) {
        // Agar token mavjud bo'lsa, uni yangilash
        updateToken({
          ...existingToken,
          token: newToken,
        });
      } else {
        // Agar token mavjud bo'lmasa, yangi token qo'shish
        mutate({
          userId: res.id,
          token: newToken,
        });
      }

      // Tokenni localStorage-ga saqlash va foydalanuvchini asosiy sahifaga yo'naltirish
      localStorage.setItem("user-token", newToken);
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

        {/* {isLoading ? (
          <>loading...</>
        ) : (
       
        )} */}
      </div>
    </>
  );
};

export default Login;



// import { Button, Form, Input, Typography } from "antd";
// import axios from "axios";
// import { useContext } from "react";
// import { useMutation, useQuery } from "react-query";
// import { useNavigate } from "react-router";
// import Contex from "../../components/contex";

// const Login = () => {
//   const { setUserActive, userId, setUserId } = useContext(Contex);

//   const navigator = useNavigate();

//   const { data, isLoading } = useQuery("users-login", () => {
//     return axios.get(`https://auto-test-api-8ch5.onrender.com/users`);
//   });

//   const { mutate } = useMutation((dataP) => {
//     return axios.post("http://localhost:3004/tokens", dataP)
//   })
//   const { data: dataTokens } = useQuery("tokens-login-page", () => {
//     return axios.get("http://localhost:3004/tokens")
//   })
//   const { data: dataToken } = useQuery("token-login-page", () => {
//     return axios.get(`http://localhost:3004/tokens?userId=${userId}`)
//   })
//   const { mutate: mutateToken, isLoading: isLoadingToken } = useMutation((updatedTokenData) => {
//     console.log(updatedTokenData);
//     return axios.put(`http://localhost:3004/tokens?userId=${updatedTokenData?.userId}`, updatedTokenData)
//   }, {
//     onSuccess: () => {
//       alert("Success")
//     }
//   })



//   const onFinish = (values) => {

//     const res = data?.data.find((value) => {
//       return (
//         value?.number === values.number && value?.password == values?.password
//       );
//     });
//     const dataCheck = dataTokens?.data?.find((t => t?.userId == res?.id))


//     if (res && dataCheck) {
//       const newToken = Array(3).fill().map(() => Math.random().toString(36).substring(2)).join('').substring(0, 30);
//       localStorage.setItem("user-token", newToken)
//       mutateToken({
//         ...dataCheck, token: newToken, createdAt: new Date().toISOString()
//       })
//       navigator("/");
//       setUserId(res.id);
//       setUserActive(true);
//     }
//   };


//   return (
//     <>
//       <div className="h-[100vh] flex items-center justify-center">
//         {isLoading && isLoadingToken ? <>loading...</> :
//           <Form
//             onFinish={onFinish}
//             layout="vertical"
//             className="w-[400px] p-[15px] shadow-lg rounded-lg"
//           >
//             <h2 className="text-center">Login</h2>

//             <Form.Item
//               label="Number"
//               name="number"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your Number!",
//                 },
//               ]}
//             >
//               <Input type="number" />
//             </Form.Item>

//             <Form.Item
//               label="Password"
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your password!",
//                 },
//               ]}
//             >
//               <Input.Password />
//             </Form.Item>

//             <div className="flex gap-2 justify-center">
//               <Form.Item>
//                 <Button className="w-[100px]" type="primary" htmlType="submit">
//                   Login
//                 </Button>
//               </Form.Item>

//               <Typography
//                 onClick={() => {
//                   navigator("/register");
//                 }}
//                 className="h-[32px] text-blue-600 flex items-center justify-center cursor-pointer"
//               >
//                 Register
//               </Typography>
//             </div>
//           </Form>
//         }
//       </div>
//     </>
//   );
// };

// export default Login;
