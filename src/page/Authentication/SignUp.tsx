import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Authentication.module.css"
import { Button, Image, Divider, Typography, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import emailjs from "@emailjs/browser";
import axios from "axios";
import logo from "../../assets/image/logo-transparent.png";
import { generatePassword, generateCode } from "../../assistants/Generators";
import randomImageUrl from '../../assets/image/signup.jpg'

interface User {
  _id?: string;
  email: string;
  password: string;
  nickname: string;
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

interface SignUpFormValues {
  email: string;
  password: string;
  confirm: string;
  nickname: string;
  code: string;
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
export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { Text } = Typography;
  const randomImage = randomImageUrl

  const [registerUser, setRegisterUser] = useState<User>({
    _id: "",
    email: "",
    password: "",
    nickname: "",
    role: "",
    numOfFollower: 0,
    avatar: "",
    status: false,
  });

  const [verifyCode, setVerifyCode] = useState("");
  const [codeStatus, setCodeStatus] = useState("");

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

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

  const formRef = useRef(null);
  const sendEmail = () => {
    if (formRef.current) {
      emailjs
        .sendForm(
          "service_yhbkxq8",
          "template_lhkes4m",
          formRef.current,
          "zGPCRFdr4MiXVNMNw"
        )
        .then(
          (result) => {
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const initialSignUpValues: SignUpFormValues = {
    email: location.state?.email,
    password: "",
    confirm: "",
    nickname: "",
    code: generateCode(6, ""),
  };

  const signUpForm = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: initialSignUpValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required(""),
      password: Yup.string()
        .min(5, "Password must contains within 5-18 symbols")
        .max(18, "Password must contains within 5-18 letters")
        .required(""),
      confirm: Yup.string().test(
        "passwords-match",
        "Passwords does not match",
        function (value) {
          return this.parent.password === value;
        }
      ),
      nickname: Yup.string().required(""),
    }),
    onSubmit: (values) => {
      setVerifyCode(values.code);
      setRegisterUser({
        email: values.email,
        password: values.password,
        nickname: values.nickname,
        role: "user",
        numOfFollower: 0,
        avatar: "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png",
        status: true,
      });
      sendEmail();
      showModal();
    },
  });

  const codeVerifyForm = useFormik({
    initialValues: {
      code: "",
      email: registerUser.email,
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .min(6, "Verify code should be a 6-digit one.")
        .max(6, "Verify code should be a 6-digit one.")
        .required(""),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      if (values.code === verifyCode) {
        axios
          .post("http://localhost:5000/users", registerUser)
          .then(() => {
            setTimeout(() => {
              setOpen(false);
              setIsLoading(false);
              navigate("/signin", { state: { noti: "create" } });
            }, 2000);
          })
          .catch((err: any) => {
            console.log("Error: ", err.response.data);
          });
      } else {
        setCodeStatus(
          "Incorrect verification code ! Please check your email and try again."
        );
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftContainer}>
          <Image src={randomImage} width={600} preview={false} className={styles.displayImage} />
        </div>
        <Divider type="vertical" />
        <div className={styles.rightContainer}>
          <Image
            src={logo}
            width={180}
            preview={false}
          />
          <form ref={formRef} onSubmit={signUpForm.handleSubmit}>
            <div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={signUpForm.handleChange}
                onBlur={signUpForm.handleBlur}
                value={signUpForm.values.email}
              />
              <div className={styles.error}>
                {signUpForm.touched.email && signUpForm.errors.email ? (
                  <i>{signUpForm.errors.email}</i>
                ) : null}
              </div>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={signUpForm.handleChange}
                onBlur={signUpForm.handleBlur}
                value={signUpForm.values.password}
              />
              <div className={styles.error}>
                {signUpForm.touched.password && signUpForm.errors.password ? (
                  <i>{signUpForm.errors.password}</i>
                ) : null}
              </div>
            </div>
            <div>
              <input
                type="password"
                name="confirm"
                placeholder="Confirm password"
                onChange={signUpForm.handleChange}
                onBlur={signUpForm.handleBlur}
                value={signUpForm.values.confirm}
              />
              <div className={styles.error}>
                {signUpForm.touched.confirm && signUpForm.errors.confirm ? (
                  <i>{signUpForm.errors.confirm}</i>
                ) : null}
              </div>
            </div>
            <div>
              <input
                type="text"
                name="nickname"
                placeholder="Your name"
                onChange={signUpForm.handleChange}
                onBlur={signUpForm.handleBlur}
                value={signUpForm.values.nickname}
              />
              <div className={styles.error}>
                {signUpForm.touched.nickname && signUpForm.errors.nickname ? (
                  <i>{signUpForm.errors.nickname}</i>
                ) : null}
              </div>
            </div>
            <input
              type="hidden"
              name="code"
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.code}
            />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                shape="round"
                size="large"
                style={{ width: '100%' }}
                disabled={isLoading ? true : false}
              >
                {isLoading ? <LoadingOutlined /> : <p>Sign up</p>}
              </Button>
            </div>
          </form>
          <Divider>
            <Text italic style={{ fontSize: "70%" }}>
              or you can sign in with
            </Text>
          </Divider>
          <div className={styles.otherLogin}>
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={onGoogleError}
              size="medium"
              type="standard"
            />
            <Modal
              title="Email sent"
              open={open}
              onCancel={() => {
                setOpen(false);
              }}
              confirmLoading={isLoading}
              footer={null}
            >
              <form onSubmit={codeVerifyForm.handleSubmit}>
                <h5>Please check your email for the verification code.</h5>
                <br />
                <input
                  type="text"
                  name="code"
                  placeholder="Enter the code here"
                  onChange={codeVerifyForm.handleChange}
                  onBlur={codeVerifyForm.handleBlur}
                  value={codeVerifyForm.values.code}
                />
                <div className={styles.error}>
                  {codeStatus !== "" ? <i>{codeStatus}</i> : null}
                </div>
                <input
                  type="hidden"
                  name="email"
                  value={signUpForm.values.email}
                />
                <span className={styles.modalButtonGroup}>
                  <Button
                    type="default"
                    shape="round"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    disabled={isLoading ? true : false}
                  >
                    {isLoading ? (
                      <LoadingOutlined />
                    ) : (
                      <p>Verify {verifyCode}</p>
                    )}
                  </Button>
                </span>
              </form>
            </Modal>
          </div>
          <div className={styles.formFooter}>
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
    </>
  );
}
