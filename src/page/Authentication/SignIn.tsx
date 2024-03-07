import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./Authentication.css";
import { Button, Image, Divider, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "../../assets/icons/facebook.png";
import logo from "../../assets/image/logo-transparent.png";
import { generatePassword } from "../../assistants/Generators";

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
interface CredentialResponse {
  credential?: string;
  select_by?:
  | "auto"
  | "user"
  | "user_1tap"
  | "user_2tap"
  | "btn"
  | "btn_confirm"
  | "btn_add_session"
  | "btn_confirm_add_session";
  clientId?: string;
}
interface Pin {
  _id: string;
  artworkId: number;
  userId: number;
  artworkName: string;
  createTime: Date;
  tags: string;
  numOfLike: number;
  price: string;
  describe: string;
  imageUrl: string;
}

interface ArtworkResponse {
  data: Pin[];
}
export default function Signin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { Text } = Typography;
  const randomImage =
    "https://i.pinimg.com/564x/3a/e6/7d/3ae67df286b9b8e568de17e4657fd21d.jpg";

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state?.noti === "signup") {
        toast.warning("Your email has been registered before. Please enter your password to sign in.")
      }
      if (location.state?.noti === "reset") {
        toast.success("Your password has been successfully reset.")
      }
      if (location.state?.noti === "create") {
        toast.success("Your account has been successfully signed up. Please login to continue.")
      }
    }
  }, []);

  const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setIsLoading(true)
    var decoded: OtherLoginResponse;
    if (credentialResponse.credential) {
      decoded = jwtDecode(credentialResponse.credential);
      console.log(
        "SIGNIN SUCCESSFULLY. Google login user's email:",
        decoded.email
      );

      await fetch("http://localhost:5000/users")
        .then((res) => res.json())
        .then((data) => {
          var foundUserByEmail = data.find(
            (account: User) => account.email === decoded.email
          );
          if (foundUserByEmail) {
            axios.post("http://localhost:5000/users/login",
              {
                email: foundUserByEmail.email,
                password: foundUserByEmail.password
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                localStorage.setItem("USER", res.data);
                setTimeout(() => {
                  setIsLoading(false)
                  navigate("/home");
                }, 2000);
              })
              .catch((err) => console.log("Error when try to sign in by Google: ", err))
          } else {
            var registerUser = {
              email: decoded.email,
              password: generatePassword(30, ""),
              nickname: decoded.name,
              role: "user",
              numOfFollower: 0,
              avatar: "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
              status: true,
            };
            axios.post("http://localhost:5000/users", registerUser)
              .then((res) => {
                console.log("A new account has been created by email ", decoded.email);
              })
              .catch((err: any) => {
                console.log("Error: ", err.response.data);
              });

            axios.post("http://localhost:5000/users/login",
              {
                email: registerUser.email,
                password: registerUser.password
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                localStorage.setItem("USER", res.data);
                setTimeout(() => {
                  setIsLoading(false)
                  navigate("/home");
                }, 2000);
              })
              .catch((err) => console.log("Error when try to sign in by Google: ", err))
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Not found data");
    }
  };

  const onGoogleError = () => {
    console.log("Failed to login with Google");
  };

  const loginForm = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: location.state?.email || "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(''),
      password: Yup.string().required(''),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const responseBody = await response.text();
          try {
            const data = JSON.parse(responseBody);
            localStorage.setItem("USER", data.token);
            setTimeout(() => {
              setIsLoading(false)
              navigate("/home");
            }, 2000);
          } catch (error) {
            localStorage.setItem("USER", responseBody);
            setTimeout(() => {
              setIsLoading(false)
              navigate("/home");
            }, 2000);
          }
        } else {
          // If there's an error, read the error response body as JSON
          const errorData = await response.json();
          toast.error(
            errorData.message || "An error occurred. Please try again."
          );
          setIsLoading(false);
        }
      } catch (error) {
        // Handle network or other errors
        toast.error("Cannot connect to the server. Please try again later.");
        console.error(error);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="left-container">
          <Image src={randomImage} width={400} preview={false} />
        </div>
        <Divider type="vertical" />
        <div className="right-container row">
          <Image
            className=""
            src={logo}
            width={300}
            preview={false}
          />
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
            <Button
              type="link"
              className="forgot"
              onClick={() => {
                navigate("/forgot");
              }}
            >
              Forgot password?
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              size="large"
              disabled={isLoading ? true : false}
            >
              {isLoading ? <LoadingOutlined /> : <p>Sign in</p>}
            </Button>
          </form>
          <Divider>
            <Text italic style={{ fontSize: "70%" }}>
              or you can sign in with
            </Text>
          </Divider>
          <div className="otherLogin">
            <GoogleLogin
              size="medium"
              type="standard"
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
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
            <a
              onClick={() => {
                navigate("/signup/email");
              }}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}