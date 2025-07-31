import { useState } from "react";
import { Card, Button, Divider, Typography, Form,Input,} from "antd";
const { Title, Text } = Typography;
import { loginUser,registerUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/context/AuthContext";

const Login = () => {
  let [isLogin, setIslogin] = useState(true);
 const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUserAndToken,error } = useAuth(); 


// function to handle login user and register user
const handleFinish=async(values)=>{
  console.log(values)
  setLoading(true)
  try {
    if(isLogin){
        //  login logic 
        let response=await loginUser(values.email,values.password)
        if(response.token){
           localStorage.setItem("token",response.token)
           localStorage.setItem("user",JSON.stringify(response.user))
          //  rolebased login...
           setUserAndToken(response.user, response.token);

          if (response.user.role === 'vendor') {
            navigate('/vendor');
          } else if (response.user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/shop');
            console.log("Navigating to /shop", response.user.role);
          }
          console.log('Login response:', response);
        }
    }else{
      // register logic
      // adding role to the new user
      let newUser={
         ...values, // username email password
         role:"public", // add default role 
         isActive:true

      }
      await registerUser(newUser)
      setIslogin(true)
    }
  } catch (error) {
    console.log("error",error.message || "")
  }

}

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">
      <Card className="p-4 rounded shadow-lg w-100" style={{ maxWidth: 400 }}>
        <div className="text-center mb-3">
          <Title level={3}>
            {isLogin ? "Login to Riceworld" : "Register for Riceworld"}
          </Title>
          <Text type="secondary fs-6">
            {isLogin
              ? "sign to shop the best rice"
              : "create your account to getstarted"}
          </Text>
        </div>

        {/* form_layout starts */}
        <Form layout="vertical" onFinish={handleFinish}>
            {/* username start */}
          {!isLogin && (
          <>
            <Form.Item name="fullname" label="fullname" rules={[{ required: true, message: "Please input your Username!" },]}>
              <Input prefix={<i class="bi bi-person"></i>} placeholder="your name" />
            </Form.Item>
          </> )}
          {/* username end */}
          {/* email and password field starts */}
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input your Username!" },]}>
            <Input prefix={<i class="bi bi-envelope"></i>} placeholder="your email" />
        </Form.Item>
        <Form.Item name="password" label="password" rules={[{ required: true, message: "Please input your Username!" },]}>
            <Input prefix={<i class="bi bi-lock"></i>} placeholder="your password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block>{isLogin?"login":"register"}</Button>
        </Form>
        {/* form_layout ends */}
        <Divider orientation="center" className="border-success">OR</Divider>
        <Button type="link" block onClick={()=>setIslogin(!isLogin)} className="text-success fw-bold text-capitalize">
           {!isLogin?"Already you an account?login":"dont have an account register"}
        </Button>
      </Card>
    </div>
  );
};

export default Login;
