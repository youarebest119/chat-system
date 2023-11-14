import axios from "axios";
import store from "../redux/store/store";
import { setLoading } from "../redux/features/loading.slice";
import { toast } from "react-hot-toast";


const handleError = (error, reject, showToast) => {
    let message = error.message;
    if (error.response) {
        message = error.response.data.message;
    }
    if (!message) {
        message = "something went wrong";
    }
    reject({
        success: false,
        message,
    })
    store.dispatch(setLoading(false));
    console.log('error', error);
    if (showToast) {
        toast.error(message || "something went wrong");
    }
}

const handleSuccess = (response, showToast, resolve) => {
    resolve({
        success: true,
        data: response.data,
    })
    store.dispatch(setLoading(false));
    if (showToast) {
        // toast.success(response.data.message || "success")
    }
}
axios.interceptors.request.use(
    config => {
        config.headers['auth'] = `${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export const AXIOS_POST = (url, data, config, showToast = true) => {
    store.dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.post(url, data, config);
            handleSuccess(response, showToast, resolve);
        } catch (error) {
            handleError(error, reject, showToast);
        }
    })
}

export const AXIOS_GET = (url, config, showToast = true) => {
    store.dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.get(url, config);
            handleSuccess(response, showToast, resolve);
        } catch (error) {
            handleError(error, reject, showToast);
        }
    })
}

export const AXIOS_DELETE = (url, config, data, showToast = true) => {
    store.dispatch(setLoading(true));
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.delete(url, config, data);
            handleSuccess(response, showToast, resolve);
        } catch (error) {
            handleError(error, reject, showToast);
        }
    })
}


export const AXIOS_PUT = (url, data, config, showToast = true) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = await axios.put(url, data, config);
            handleSuccess(response, showToast, resolve);
        } catch (error) {
            handleError(error, reject, showToast);
        }
    })
}