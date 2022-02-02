import React, { Component } from "react"
import { useState, useEffect } from "react";
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify"
import OTPVerification from "../../../service/verification-service"
import Cookies from "js-cookie"
// import OtpInput from "react-otp-input";
// import {OTPInput, ResendOTP}  from "otp-input-react";
import OtpTimer from 'otp-timer'
import ResendOTP from '../../../service/resendOTP-service'
import { useRouter } from 'next/router'
import Router from "next/router"
import Link from "next/link"
toast.configure()

export default function VerifyOTPLogin() {

    const router = useRouter()
    const phone = router.query.id

    console.log(phone);

    const decryptedText = atob(phone)
    // const decryptedText = reactCryptGsm.decrypt(phone);

    console.log("decrypted data is", decryptedText);

  const [OTP, setOTP] = useState("");
  const [disabled, setdisabled] = useState(false);

  function validateOTP() {
    if (OTP === "") {
      toast.warning("Please enter the OTP")
      return false
    }
    else if (/^[+-]?[0-9]+$/.test(OTP) == false) {
      toast.warning("Please enter a valid OTP")
      return false
    }
    else if (OTP.length !=6) {
      toast.warning("OTP should be of 6 digits only")
      return false
    }
    return true
  }

  function handleVerification(e) {
    if (!validateOTP()) return
    let data = {
      "otp": OTP,
      "type": "login",
      "phone_number": decryptedText,
    }
    console.log(data);
    OTPVerification
      .verification(data)
      // .then(this.props.handleShow())
      .then((res) => {
        console.log(res);
        let data = res.data
        let accessToken = data.accessToken
        Cookies.set("token", accessToken, { expires: 1 / 2, secure: true })
        toast.success("OTP verified and signed in successfully")
        Router.push("../../dashboard/meme")
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

  function resendotp() {
      // setdisabled(!disabled)
    let data = {
      "phone_number": decryptedText,
    }
    console.log(data);
    ResendOTP
      .resendOTP(data)
      // .then(this.props.handleShow())
      .then((res) => {
        console.log(res);
        toast.success("OTP sent successfully")
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
              <div className='loginheading mb-4'>OTP Verification</div>
              <form className='justify-content-center align-items-center text-center'>
                <Input
                  className='form-control mb-4 inputformat'
                  placeholder='Enter OTP'
                  // disabled={disabled}
                  type="OTP"
                  onChange={(e) => {
                    setOTP(e.target.value)
                  }}
                />
                <OtpTimer seconds= {30} minutes={2} resend={()=>resendotp()} />
                <button
                  className='btn btn-primary btnlogin mt-5 w-100'
                  type='button'
                  onClick={(e) => {
                    handleVerification();
                  }}>
                  ENTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

