import axios from "axios";
import {func} from "prop-types";
import {OTPVERIFICATION} from "../utils/constant";

const httpOptions = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export class OTPVerification {
    static verification(data) {
        return axios.post(`${OTPVERIFICATION}`, JSON.stringify(data),  httpOptions)
    }
}

export default OTPVerification;
