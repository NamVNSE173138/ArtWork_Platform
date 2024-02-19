import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Authentication.css"
import { Button, Image, Divider, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '../../assets/icons/facebook.png'
import eFurniLogo from '../../assets/logos/eFurniLogo_transparent.png'
import { generatePassword } from "../../assistants/Generators";

interface User {
  _id: string,
  email: string,
  password: string,
  nickName: string,
  role: string,
  numOfFollower: number,
  avatar: string,
  status: boolean,
}
interface OtherLoginResponse {
  id: string;
  userID: string;
  accessToken: string;
  name?: string | undefined;
  email?: string | undefined;
  picture?:
  | {
    data: {
      height?: number | undefined;
      is_silhouette?: boolean | undefined;
      url?: string | undefined;
      width?: number | undefined;
    };
  }
  | undefined;
}
interface CredentialResponse {
  credential?: string;
  select_by?: 'auto' | 'user' | 'user_1tap' | 'user_2tap' | 'btn' | 'btn_confirm' | 'btn_add_session' | 'btn_confirm_add_session';
  clientId?: string;
}

export default function Signin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { Text } = Typography;
  const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      toast.warning("This email has already been registered within the system. Please enter your password to sign in.")
    }
  }, [])


  const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    var decoded: OtherLoginResponse
    if (credentialResponse.credential) {
      decoded = jwtDecode(credentialResponse.credential)
      console.log("SIGNIN SUCCESSFULLY. Google login user's email:", decoded.email)

      await fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(data => {
          var foundUserByEmail = data.find((account: User) => (account.email === decoded.email))
          if (foundUserByEmail) {
            console.log("Email is already registered.")
          }
          else {
            var registerUser = {
              email: decoded.email,
              password: generatePassword(30, ""),
              nickname: decoded.name,
              role: "user",
              numOfFollower: 0,
              avatar: "unset",
              status: true,
            }
            axios.post("http://localhost:5000/users", registerUser)
              .catch((err: any) => {
                console.log("Error: ", err.response.data)
              })
            console.log("A new account has been created by email ", decoded.email)
            setTimeout(() => {
              setIsLoading(false)
            }, 2000)
          }
        })
        .catch(err => console.log(err))
      navigate('/')
    } else {
      console.log("Not found data")
    }
  }

  const onGoogleError = () => {
    console.log("Failed to login with Google")
  }

  const responseFacebook = async (response: OtherLoginResponse) => {
    console.log("Facebook login credentials: ", response)
    await fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => {
        var foundUserByEmail = data.find((account: User) => (account.email === response.email))
        if (foundUserByEmail) {
          console.log("Email is already registered.")
        }
        else {
          var registerUser = {
            email: response.email,
            password: generatePassword(30, ""),
            nickname: response.name,
            role: "user",
            numOfFollower: 0,
            avatar: "unset",
            status: true,
          }
          axios.post("http://localhost:5000/users", registerUser)
            .catch((err: any) => {
              console.log("Error: ", err.response.data)
            })
          console.log("A new account has been created by Facebook email: ", response.email)
          setTimeout(() => {
            setIsLoading(false)
          }, 2000)
        }
      })
      .catch(err => console.log(err))
    navigate('/')
  }

  const loginForm = useFormik({
    initialValues: {
      email: location.state?.email,
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      setIsLoading(true)
      await fetch('http://localhost:5000/users')
        .then(res => res.json())
        .then(data => {
          var loginUser = data.find((account: User) => (account.email === values.email) && (account.password === values.password))
          if (loginUser) {
            setTimeout(() => {
              navigate('/')
            }, 2000)
          }
          else {
            setTimeout(() => {
              setIsLoading(false)
              toast.error("Incorrect credentials. Please try again.")
            }, 1000)
          }
        })
        .catch(err => {
          toast.error("Cannot connect to the server. Please try again later.")
          console.log(err)
          setIsLoading(false)
        })
    }
  })

  return (
    <div className="container">
      <div className="left-container">
        <Image src={randomImage} width={400} preview={false} />
      </div>
      <Divider type="vertical" />
      <div className="right-container row">
        <Image className="image" src={eFurniLogo} width={250} preview={false} />
        <form onSubmit={loginForm.handleSubmit}>
          <div className="mb-2 mt-2">
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.email}
            />
          </div>
          <div className="mb-2 password-input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={loginForm.handleChange}
              onBlur={loginForm.handleBlur}
              value={loginForm.values.password}
            />
          </div>
          <Button type="link" className="forgot" onClick={() => { navigate('/forgot') }}>
            Forgot password?
          </Button>
          <Button type="primary" htmlType="submit" shape="round" size="large" disabled={isLoading ? true : false}>
            {isLoading ? <LoadingOutlined /> : <p>Sign in</p>}
          </Button>
        </form>
        <Divider><Text italic style={{ fontSize: "70%" }}>or you can sign in with</Text></Divider>
        <div className="otherLogin">
          <GoogleLogin
            size="large"
            type="icon"
            logo_alignment="center"
            onSuccess={onGoogleSuccess}
            onError={onGoogleError}
          />
          <FacebookLogin
            appId="689804996380398"
            autoLoad={true}
            fields="name,email"
            callback={responseFacebook}
            size="small"
            cssClass="my-facebook-button-class"
            textButton=""
            icon={<Image src={FacebookIcon} width={20} preview={false} height={22} />}
          />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="form-footer">
          <p>Don't have an account yet?&nbsp;</p>
          <a onClick={() => { navigate('/signup/email') }}>Sign up</a>
        </div>
      </div>
    </div>
  )
}
