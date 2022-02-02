import React, { Component } from "react"
import { useState, useEffect } from "react";
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import SIGNUPAPI from "../service/signup-service"
import Cookies from "js-cookie"
import Router from "next/router"
import Link from "next/link"

toast.configure()

export default function Signup() {

  const [namefromsignup, setnamefromsignup] = useState("")
  const [phonefromsignup, setphonefromsignup] = useState("")

  const encryptedText =  btoa(phonefromsignup)

  function validateName() {
    if (namefromsignup === "") {
      toast.warning("Please enter the name")
      return false
    }
    return true
  }
  function validatePhone() {
    if (phonefromsignup === "") {
      toast.warning("Please enter the phone number")
      return false
    }
    else if (/^[+-]?[0-9]+$/.test(phonefromsignup) == false) {
      toast.warning("Please enter a valid phone number")
      return false
    }
    return true
  }

  function handleSignup(e) {
    if (!validateName()) return
    if (!validatePhone()) return
    let data = {
      "name": namefromsignup,
      "phone_number": phonefromsignup,
    }
    console.log(data);
    SIGNUPAPI
      .signup(data)
      // .then(this.props.handleShow())
      .then((res) => {
        console.log(res);
        toast.success("OTP sent successfully")
        Router.push(`./verifyotp/signup/${encryptedText}`)
        // this.props.onLoginCallback()
      })
      .catch((error) => {
        // this.props.handleHide()
        console.log(error)
        toast.error(
          error.response.data.msg ? `${error.response.data.msg}`
            : "Something went wrong"
        )
      })
  }

  return (
    <div data-screen="login-view">
      <div className="logincomponent">
        <div className='container-fluid'>
          <div className='row justify-content-center my-auto text-center'>
            <div className='col-xl-4 col-lg-5 col-md-6 col-sm-9 col-12 formcol'>
              <div className='loginheading mb-4'>SIGNUP</div>
              <form className=''>
                <Input
                  type='id'
                  className='form-control mb-4 inputformat'
                  placeholder='Name'
                  onChange={(e) => {
                    setnamefromsignup(e.target.value)
                  }}
                />
                <div className="row">
                  <div className="col-lg-2 col-md-2 col-sm-2 col-3 num">
                    <Input
                      className='form-control mb-4 inputformat'
                      placeholder='+91'
                      disabled={true}
                      style={{color: "black"}}
                    />
                  </div>
                  <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                    <Input
                      className='form-control mb-4 inputformat'
                      placeholder='Phone Number'
                      type="phone"
                      onChange={(e) => {
                        setphonefromsignup(e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <Link href="../login"><u role="button" className="text-end">Already have an Account? Log In</u></Link>
                </div>
                <button
                  className='btn btn-primary btnlogin mt-5 w-100'
                  type='button'
                  onClick={(e) => {
                    handleSignup();
                  }}>
                  SIGNUP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


