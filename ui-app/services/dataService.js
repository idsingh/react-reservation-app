import axios from 'axios';
import toastr from 'toastr';

class DataService {
    request(url, urlData = {}, config = {}, axiosProperties = {}) {
        // Convert query params to URL search params
        let params = new window.URLSearchParams();
        if(config.params) {
            let keys = Object.keys(config.params);
            keys.forEach((key) => {
                let value = config.params[key];
                if (Array.isArray(value)) {
                    value.forEach((value) => {
                        params.append(key, value);
                    });
                } else {
                    params.append(key, value);
                }
            });
        }
        config.params = params;
        config.url = eval('`' + url + '`');
        config.headers = Object.assign({
            "Content-Type": "application/json",
        }, config.headers || {});
        var instance = axios.create(Object.assign({
            baseURL: "/",
            headers: config.headers,
        }, axiosProperties));

        return instance.request(config).then((response) => {
            return response.data;
        }, (error) => {
            toastr.error("Error: " + error);
            throw error.response;
        });
    }
    post(url, urlData = {}, config = {}, axiosProperties) {
        config.method = "post";
        return this.request(url, urlData, config, axiosProperties);
    }
    get(url, urlData = {}, config = {}, axiosProperties) {
        config.method = "get";
        return this.request(url, urlData, config, axiosProperties);
    }
}

export default new DataService;
