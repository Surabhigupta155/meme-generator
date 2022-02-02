import axios from "axios";
import {func} from "prop-types";
import {SIGNUP} from "../utils/constant";

const httpOptions = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export class SIGNUPAPI {
    static signup(data) {
        return axios.post(`${SIGNUP}`, JSON.stringify(data),  httpOptions)
    }
}

export default SIGNUPAPI;