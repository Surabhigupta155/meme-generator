import axios from "axios";
import {func} from "prop-types";
import {RESENDOTP} from "../utils/constant";

const httpOptions = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export class ResendOTP {
    static resendOTP(data) {
        return axios.post(`${RESENDOTP}`, JSON.stringify(data),  httpOptions)
    }
}

export default ResendOTP;