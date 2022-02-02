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
import { COUNTRIESDATA } from "../utils/constant";
import Cookies from "js-cookie"
import Router from "next/router"
import Link from "next/link"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

toast.configure()

// export async function getServerSideProps() {
//     // Fetch data from external API
//     const response = await fetch(COUNTRIESDATA)
//     const data = await response.json()
//     console.log(data)

//     return {
//         props: {
//             countries: data,
//         },
//     }
// }


export default function Login({ countries }) {

    const [phonefromlogin, setphonefromlogin] = useState("")
    const encryptedText = btoa(phonefromlogin)
    // const encryptedText = reactCryptGsm.encrypt(phonefromlogin);
    console.log("encypted data is", encryptedText);
    // const decryptedText = reactCryptGsm.decrypt(encryptedText);

    function validatePhone() {
        if (phonefromlogin === "") {
            toast.warning("Please enter the phone number")
            return false
        }
        else if (/^[+-]?[0-9]+$/.test(phonefromlogin) == false) {
            toast.warning("Please enter a valid phone number")
            return false
        }
        return true
    }

    function handleLogin(e) {
        if (!validatePhone()) return
        let data = {
            "phone_number": phonefromlogin,
        }
        console.log(data);
        loginAPI
            .login(data)
            // .then(this.props.handleShow())
            .then((res) => {
                console.log(res);
                toast.success("OTP sent successfully")
                Router.push(`./verifyotp/login/${encryptedText}`)
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
                    <div className='row justify-content-center my-auto'>
                        <div className='col-xl-4 col-lg-5 col-md-6 col-sm-9 col-12 formcol'>
                            <div className='loginheading mb-4 text-center'>LOGIN</div>
                            <form className=''>
                                <div className="row">
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-3 num">
                                        {/* <FormControl
                                            variant='outlined'
                                            className='mb-lg-4 mb-md-4 mb-3 full-width border-clip-label'>
                                            <InputLabel style={{ fontSize: 'calc(80% + 0.01vw + 0.01vh)' }}
                                                htmlFor='demo-simple-select-outlined-label'>
                                                Specialization
                                            </InputLabel>
                                            <Select
                                                labelId='demo-simple-select-outlined-label'
                                                id='demo-simple-select-outlined'
                                                style={{ fontSize: "calc(80% + 0.01vw + 0.01vh)" }}
                                                onChange={(e) => {
                                                    // this.props.setSpecialization(e.target.value)
                                                }}>
                                                {educationForm?.branches &&
                                                    educationForm?.branches.map((col) => {
                                                        return <MenuItem style={{ fontSize: 'calc(80% + 0.01vw + 0.01vh)' }}
                                                            value={col.id}>{col.name}</MenuItem>
                                                    })}
                                            </Select>
                                        </FormControl> */}
                                        <Input
                                            className='form-control mb-4 inputformat'
                                            placeholder='+91'
                                            disabled={true}
                                            style={{ color: "black" }}
                                        />
                                    </div>
                                    <div className="col-lg-10 col-md-10 col-sm-10 col-9">
                                        <Input
                                            className='form-control mb-4 inputformat'
                                            placeholder='Phone Number'
                                            type="phone"
                                            onChange={(e) => {
                                                setphonefromlogin(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <Link href="../signup"><u role="button" className="text-end">New Here? Create Account</u></Link>
                                </div>
                                <button
                                    className='btn btn-primary btnlogin mt-5 w-100'
                                    type='button'
                                    onClick={(e) => {
                                        handleLogin();
                                    }}>
                                    LOGIN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


