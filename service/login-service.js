import axios from "axios";
import {func} from "prop-types";
import {LOGIN} from "../utils/constant";

const httpOptions = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export class loginAPI {
    static login(data) {
        return axios.post(`${LOGIN}`, JSON.stringify(data),  httpOptions)
    }
}

export default loginAPI;
