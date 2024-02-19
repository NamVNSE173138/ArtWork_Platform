// import React, { useState, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'react-toastify/dist/ReactToastify.css';
// import "./Authentication.css"
// import { Button, Image, Divider, Typography, Modal } from 'antd';
// import { LoadingOutlined } from '@ant-design/icons'
// import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
// import { useNavigate, useLocation } from "react-router-dom";
// import 'react-toastify/dist/ReactToastify.css';
// import { useFormik } from 'formik'
// import * as Yup from 'yup';
// import { JwtPayload, jwtDecode } from "jwt-decode";
// import FacebookLogin from 'react-facebook-login';
// import FacebookIcon from '../../assets/icons/facebook.png'
// import emailjs from '@emailjs/browser';
// import axios from "axios";
// import eFurniLogo from '../../assets/logos/eFurniLogo_transparent.png'

// interface User {
//     _id: string,
//     email: string,
//     password: string,
//     nickName: string,
//     role: string,
//     numOfFollower: number,
//     avatar: string,
//     status: boolean,
// }

export default function Signup() {
//     const navigate = useNavigate()
//     const formRef = useRef<HTMLInputElement>();
//     const location = useLocation()
//     const [isLoading, setIsLoading] = useState(false)
//     const { Text } = Typography;
//     const randomImage = "https://t4.ftcdn.net/jpg/05/51/69/95/360_F_551699573_1wjaMGnizF5QeorJJIgw5eRtmq5nQnzz.jpg"

//     const [registerUser, setRegisterUser] = useState({
//         userId: '',
//         email: '',
//         password: '',
//         fullName: '',
//         roleId: '',
//         phone: '',
//         createAt: '',
//         status: false,
//     })

//     const [verifyCode, setVerifyCode] = useState("")
//     const [codeStatus, setCodeStatus] = useState("")

//     const [open, setOpen] = useState(false);
//     const showModal = () => {
//         setOpen(true);
//     };

//     const handleCancel = () => {
//         setOpen(false);
//     };

//     const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
//         setIsLoading(true)
//         var decoded: JwtPayload
//         if (credentialResponse.credential) {
//             decoded = jwtDecode(credentialResponse.credential)
//             console.log("Google Login user's data:", decoded)
//         }
//         // await fetch("http://localhost:5000/users")
//         //     .then(res => res.json())
//         //     .then(data => {
//         //         var foundUserByEmail = data.find((account: User) => (account.email === decoded.email))
//         //         if (foundUserByEmail) {
//         //             navigate('/')
//         //         }
//         //         else {
//         //             const newUserId = generateId(15, "us")
//         //             const createAt = dateFormat(new Date, "yyyy/mm/dd HH:MM:ss")
//         //             setRegisterUser({
//         //                 userId: newUserId,
//         //                 email: decoded.email,
//         //                 password: "",
//         //                 fullName: decoded.name,
//         //                 roleId: "US",
//         //                 phone: "",
//         //                 createAt: createAt,
//         //                 status: true,
//         //             })
//         //             axios.post("http://localhost:3344/register", registerUser)
//         //             setTimeout(() => {
//         //                 setIsLoading(false)
//         //             }, 2000)
//         //         }
//         //     })
//         //     .catch(err => console.log(err))

//     }

//     const onGoogleError = () => {
//         console.log("Failed to login with Google")
//     }

//     const responseFacebook = (response: any) => {
//         console.log("ResponseFacebook: ", response)
//     }

//     const sendEmail = () => {
//         emailjs.sendForm('service_qm91avr', 'template_yyrd4jj', formRef.current, 'WcYGL3eDIXuI0SMzS')
//             .then((result) => {
//                 console.log(result.text);
//             }, (error) => {
//                 console.log(error.text);
//             });
//     };

//     const signupForm = useFormik({
//         initialValues: {
//             email: location.state?.email,
//             password: '',
//             confirm: '',
//             fullName: '',
//             code: generateId(6, ""),
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email("Invalid email address").required('Please enter your email'),
//             password: Yup.string().min(5, "Password must contains within 5-18 symbols").max(18, "Password must contains within 5-18 letters").required("Please enter your password"),
//             confirm: Yup.string().test('passwords-match', 'Passwords does not match', function (value) { return this.parent.password === value }),
//             fullName: Yup.string().required("Please enter your full name"),
//         }),
//         onSubmit: async (values) => {
//             const newUserId = generateId(15, "us")
//             const createAt = dateFormat(new Date, "yyyy/mm/dd HH:MM:ss")
//             setVerifyCode(values.code)
//             setRegisterUser({
//                 userId: newUserId,
//                 email: values.email,
//                 password: values.password,
//                 fullName: values.fullName,
//                 roleId: "US",
//                 phone: "",
//                 createAt: createAt,
//                 status: true,
//             })
//             // sendEmail()
//             showModal()
//         }
//     })

//     const codeVerifyForm = useFormik({
//         initialValues: {
//             code: "",
//             email: registerUser.email,
//         },
//         validationSchema: Yup.object({
//             code: Yup.string().min(6, "Verify code should be a 6-digit one.").max(6, "Verify code should be a 6-digit one.").required("")
//         }),
//         onSubmit: (values) => {
//             if (values.code === verifyCode) {
//                 axios.post('http://localhost:3344/register', registerUser)
//                     .then((response) => {
//                         console.log(response);
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                     });
//                 setIsLoading(true)
//                 setTimeout(() => {
//                     setOpen(false);
//                     setIsLoading(false);
//                     console.log("Successfully registered");
//                 }, 2000);
//             }
//             else {
//                 setCodeStatus("Incorrect verification code ! Please check your email and try again.")
//             }
//         }
//     })

//     return (
//         <div className="container">
//             <div className="left-container">
//                 <Image src={randomImage} width={400} preview={false} />
//             </div>
//             <Divider type="vertical" />
//             <div className="right-container row">
//                 <Image className="image" src={eFurniLogo} width={250} preview={false} />
//                 <form ref={formRef} onSubmit={signupForm.handleSubmit}>
//                     <div className="mb-2 mt-2">
//                         <input
//                             type="text"
//                             name="email"
//                             placeholder="Email"
//                             onChange={signupForm.handleChange}
//                             onBlur={signupForm.handleBlur}
//                             value={signupForm.values.email}
//                         />
//                         <div className="error">
//                             {signupForm.touched.email && signupForm.errors.email ? (
//                                 <i>{signupForm.errors.email}</i>
//                             ) : null}
//                         </div>
//                     </div>
//                     <div className="mb-2 mt-2">
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             onChange={signupForm.handleChange}
//                             onBlur={signupForm.handleBlur}
//                             value={signupForm.values.password}
//                         />
//                         <div className="error">
//                             {signupForm.touched.password && signupForm.errors.password ? (
//                                 <i>{signupForm.errors.password}</i>
//                             ) : null}
//                         </div>
//                     </div>
//                     <div className="mb-2 mt-2">
//                         <input
//                             type="password"
//                             name="confirm"
//                             placeholder="Confirm password"
//                             onChange={signupForm.handleChange}
//                             onBlur={signupForm.handleBlur}
//                             value={signupForm.values.confirm}
//                         />
//                         <div className="error">
//                             {signupForm.touched.confirm && signupForm.errors.confirm ? (
//                                 <i>{signupForm.errors.confirm}</i>
//                             ) : null}
//                         </div>
//                     </div>
//                     <div className="mb-2 mt-2">
//                         <input
//                             type="text"
//                             name="fullName"
//                             placeholder="Full name"
//                             onChange={signupForm.handleChange}
//                             onBlur={signupForm.handleBlur}
//                             value={signupForm.values.fullName}
//                         />
//                         <div className="error">
//                             {signupForm.touched.fullName && signupForm.errors.fullName ? (
//                                 <i>{signupForm.errors.fullName}</i>
//                             ) : null}
//                         </div>
//                     </div>
//                     <input
//                         type="hidden"
//                         name="code"
//                         onChange={signupForm.handleChange}
//                         onBlur={signupForm.handleBlur}
//                         value={signupForm.values.code}
//                     />
//                     <br />
//                     <Button type="primary" htmlType="submit" shape="round" size="large" disabled={isLoading ? true : false}>
//                         {isLoading ? <LoadingOutlined /> : <p>Sign up</p>}
//                     </Button>
//                 </form>
//                 <Divider><Text italic style={{ fontSize: "70%" }}>or you can sign up with</Text></Divider>
//                 <div className="otherLogin">
//                     <GoogleLogin
//                         onSuccess={onGoogleSuccess}
//                         onError={onGoogleError}
//                         size="large"
//                         type="icon"
//                         icon={true}
//                     />
//                     <FacebookLogin
//                         appId="689804996380398"
//                         autoLoad={true}
//                         fields="name,email"
//                         callback={responseFacebook}
//                         size="small"
//                         cssClass="my-facebook-button-class"
//                         textButton=""
//                         icon={<Image src={FacebookIcon} width={20} preview={false} height={22} />}
//                     />
//                     <Modal
//                         title="Email sent"
//                         open={open}
//                         onCancel={handleCancel}
//                         confirmLoading={isLoading}
//                         footer={null}
//                     >
//                         <form onSubmit={codeVerifyForm.handleSubmit}>
//                             <h5>Please check your email for the verification code.</h5>
//                             <br />
//                             <input type="text"
//                                 name="code"
//                                 placeholder="Enter the code here"
//                                 onChange={codeVerifyForm.handleChange}
//                                 onBlur={codeVerifyForm.handleBlur}
//                                 value={codeVerifyForm.values.code}
//                             />
//                             <div className="error">
//                                 {codeStatus != "" ? (
//                                     <i>{codeStatus}</i>
//                                 ) : null}
//                             </div>
//                             <input
//                                 type="hidden"
//                                 name="email"
//                                 onChange={signupForm.handleChange}
//                                 onBlur={signupForm.handleBlur}
//                                 value={signupForm.values.email}
//                             />
//                             <span className="modal-button-group">
//                                 <Button type="default" shape="round" onClick={handleCancel}>Cancel</Button>
//                                 <Button type="primary" htmlType="submit" shape="round" disabled={isLoading ? true : false}>
//                                     {isLoading ? <LoadingOutlined /> : <p>Verify {verifyCode}</p>}
//                                 </Button>
//                             </span>
//                         </form>
//                     </Modal>
//                 </div>
//                 <div className="form-footer">
//                     <p>Already have account?&nbsp;</p>
//                     <a onClick={() => { navigate('/signin') }}>Sign in</a>
//                 </div>
//             </div>
//         </div>
//     )
}
