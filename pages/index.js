import React, { Component } from "react"
import { useState, useEffect } from "react";
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import loginAPI from "../service/login-service"
import Cookies from "js-cookie"
import Link from "next/link"

toast.configure()

export default function Login() {

  const [namefromlogin, setnamefromlogin] = useState("")
  const [passfromlogin, setpassfromlogin] = useState("")
  const [showpassword, setshowpassword] = useState(false)

  // const history = useNavigate();

  // const routeChange = () => {
  // 	let path = `/dashboard`;
  // 	history(path);
  // }

  function validateName() {
    if (namefromlogin === "") {
      toast.warning("Please enter the User ID")
      return false
    }
    return true
  }
  function validatePassword() {
    if (passfromlogin === "") {
      toast.warning("Please enter the password")
      return false
    }
    return true
  }

  function handleLogin(e) {
    if (!validateName()) return
    if (!validatePassword()) return
    let data = {
      "name": namefromlogin,
      "password": passfromlogin,
    }
    loginAPI
      .login(data)
      // .then(this.props.handleShow())
      .then((res) => {
        console.log(res);
        let data = res.data
        let accessToken = data.access_token
        toast.success("Logged in Successfully!")
        Cookies.set("token", accessToken, { expires: 1 / 2, secure: true })
        // this.props.onLoginCallback()
      })
      .catch((error) => {
        // this.props.handleHide()
        console.log(error)
        toast.error(
          error?.response?.data?.message
            ? error.response.data.message
            : "Invalid credentials"
        )
      })
  }

  return (
    <div data-screen="login-view">
      <div className="logincomponent">
        <div className='container-fluid'>
          <div className='row justify-content-center my-auto text-center'>
            <div className='col-xl-4 col-lg-5 col-md-6 col-sm-9 col-12 formcol'>
              <div className='heading mb-4'>Welcome to Meme Generator</div>
              <div className="row">
                <Link href="/login">
                  <button
                    className='btn btn-secondary mb-4 btn-main'
                    type='button'>
                    LOGIN
                  </button>
                </Link>
              </div>
              <div className="row">
                <Link href="/signup">
                  <button
                    className='btn btn-secondary btn-main'
                    type='button'>
                    SIGNUP
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


