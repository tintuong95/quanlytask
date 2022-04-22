import Axios from "axios";
import { DOMAIN } from "../util/contants/contantService";
import { TOKEN } from "../util/contants/contantService";
export default class ConfigService {
    post = (url, data) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "POST",
            data: data,
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        });
    };

    get = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "GET",
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        });
    };

    put = (url, data) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "PUT",
            data: data,
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        });
    };

    delete = (url) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "DELETE",
            headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
        });
    };

    signup = (url, data) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "POST",
            data: data,
        });
    };
}