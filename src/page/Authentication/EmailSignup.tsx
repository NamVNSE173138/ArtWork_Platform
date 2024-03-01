import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./Authentication.css";
import { Button, Image, Divider, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import FacebookIcon from '../../assets/icons/facebook.png'
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { generatePassword } from "../../assistants/Generators";
import logo from "../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png";

interface User {
  _id: string;
  email: string;
  password: string;
  nickName: string;
  role: string;
  numOfFollower: number;
  avatar: string;
  status: boolean;
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

export default function EmailSignup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { Text } = Typography;
  const randomImage =
    "https://i.pinimg.com/564x/3a/e6/7d/3ae67df286b9b8e568de17e4657fd21d.jpg";

  const emailForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Please enter your email"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      await fetch("http://localhost:5000/users")
        .then((res) => res.json())
        .then((data) => {
          var foundAccountByEmail = data.find(
            (account: User) => account.email === values.email
          );
          if (foundAccountByEmail) {
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
            setTimeout(() => {
              navigate("/signin", { state: { email: values.email } });
            }, 2000);
          } else {
            navigate("/signup", { state: { email: values.email } });
          }
        })
        .catch((err) => console.log(err));
    },
  });

  const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    var decoded: OtherLoginResponse
    if (credentialResponse.credential) {
      decoded = jwtDecode(credentialResponse.credential)
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
      navigate('/home')
    } else {
      console.log("Not found data")
    }
  }

  const onGoogleError = () => {
    console.log("Failed to login with Google");
  };

  const responseFacebook = async (response: any) => {
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
    navigate('/home')
  };

  return (
    <div className="container">
      <div className="left-container">
        <Image src={randomImage} width={400} preview={false} />
      </div>
      <Divider type="vertical" />
      <div className="right-container row">
        <Image
          className=""
          src={logo}
          height={100}
          width={100}
          preview={false}
        />
        <form onSubmit={emailForm.handleSubmit}>
          <div className="mb-2 mt-2">
            <br />
            <h6 style={{ textAlign: "start" }}>Enter your email address:</h6>
            <input
              type="text"
              name="email"
              placeholder="email@example.com"
              onChange={emailForm.handleChange}
              onBlur={emailForm.handleBlur}
              value={emailForm.values.email}
            />
            <div className="error">
              {emailForm.errors.email ? <i>{emailForm.errors.email}</i> : null}
            </div>
          </div>
          <br />
          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            size="large"
            disabled={isLoading ? true : false}
          >
            {isLoading ? <LoadingOutlined /> : <p>Continue</p>}
          </Button>
        </form>
        <Divider>
          <Text italic style={{ fontSize: "70%" }}>
            or you can sign in with
          </Text>
        </Divider>
        <div className="otherLogin">
          <GoogleLogin
            onSuccess={onGoogleSuccess}
            onError={onGoogleError}
            size="large"
            type="icon"
          />
          <FacebookLogin
            appId="1059535368457585"
            autoLoad={false}
            fields="name,email"
            callback={responseFacebook}
            size="small"
            cssClass="my-facebook-button-class"
            textButton=""
            icon={
              <Image
                src={FacebookIcon}
                width={20}
                preview={false}
                height={22}
              />
            }
          />
        </div>
        <div className="form-footer">
          <p>Already have account?&nbsp;</p>
          <a
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
