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
import * as Yup from "yup";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from "react-facebook-login";
import FacebookIcon from "../../assets/icons/facebook.png";
import logo from "../../assets/image/e1eb03f8282b4f89a438983023e90697 (1).png";
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
            console.log("Email is already registered.");
          } else {
            var registerUser = {
              email: decoded.email,
              password: generatePassword(30, ""),
              nickname: decoded.name,
              role: "user",
              numOfFollower: 0,
              avatar: "unset",
              status: true,
            };
            axios
              .post("http://localhost:5000/users", registerUser)
              .catch((err: any) => {
                console.log("Error: ", err.response.data);
              });
            console.log(
              "A new account has been created by email ",
              decoded.email
            );
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          }
        })
        .catch((err) => console.log(err));
      navigate("/home");
    } else {
      console.log("Not found data");
    }
  };

  const onGoogleError = () => {
    console.log("Failed to login with Google");
  };

  const responseFacebook = async (response: OtherLoginResponse) => {
    console.log("Facebook login credentials: ", response);
    await fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        var foundUserByEmail = data.find(
          (account: User) => account.email === response.email
        );
        if (foundUserByEmail) {
          console.log("Email is already registered.");
        } else {
          var registerUser = {
            email: response.email,
            password: generatePassword(30, ""),
            nickname: response.name,
            role: "user",
            numOfFollower: 0,
            avatar: "unset",
            status: true,
          };
          axios
            .post("http://localhost:5000/users", registerUser)
            .catch((err: any) => {
              console.log("Error: ", err.response.data);
            });
          console.log(
            "A new account has been created by Facebook email: ",
            response.email
          );
          setTimeout(() => {
            setIsLoading(false);
            navigate("/home");
          }, 2000);
        }
      })
      .catch((err) => console.log(err));
  };

  // const loginForm = useFormik({
  //   initialValues: {
  //     email: location.state?.email,
  //     password: ''
  //   },
  //   validationSchema: Yup.object({
  //     email: Yup.string().email().required(),
  //     password: Yup.string().required(),
  //   }),
  //   onSubmit: async (values) => {
  //     setIsLoading(true)
  //     await fetch('http://localhost:5000/users/login')
  //       .then(res => res.json())
  //       .then(data => {
  //         var loginUser = data.find((account: User) => (account.email === values.email) && (account.password === values.password))
  //         if (loginUser) {
  //           setTimeout(() => {
  //             navigate('/')
  //           }, 2000)
  //         }
  //         else {
  //           setTimeout(() => {
  //             setIsLoading(false)
  //             toast.error("Incorrect credentials. Please try again.")
  //           }, 1000)
  //         }
  //       })
  //       .catch(err => {
  //         toast.error("Cannot connect to the server. Please try again later.")
  //         console.log(err)
  //         setIsLoading(false)
  //       })
  //   }
  // })

  const loginForm = useFormik({
    initialValues: {
      email: location.state?.email || "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
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
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [image, setImage] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/artworks")
      .then((response) => response.json())
      .then((res) => {
        setImage(res);
        console.log(res);
      });
  }, []);
  // console.log(image);

  const getImages = async () => {
    try {
      const response = await axios.get<ArtworkResponse>(
        "http://localhost:5000/artworks"
      );
      console.log("reponse: ", response);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error fetching artwork:", error);
      throw error;
    }
  };

  const getNewPins = async () => {
    setLoading(true);

    try {
      const res = await getImages();

      // Check if res.data is defined and is an array before sorting
      const pinData = Array.isArray(res.data) ? res.data : [];

      setPins(pinData);
    } catch (error) {
      console.error("Error fetching new pins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewPins();
  }, []);
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
            height={100}
            width={100}
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
              size="large"
              type="icon"
              logo_alignment="center"
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
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
