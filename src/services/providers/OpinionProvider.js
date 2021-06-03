import HttpProvider from './HttpProvider';
import axios from 'axios';

const baseURL = 'opinions';

const uploadImagesURL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_IMAGES_CLOUD_NAME}/image/upload`;

export default class OpinionProvider {

    static getAllOpinions(filter) {
        return HttpProvider.get(`${baseURL}/all?${filter}`).then(response => response.data);
    }

    static getMyOpinions(filter) {
        return HttpProvider.get(`${baseURL}/my-opinions?${filter}`).then(response => response.data);
    }

    static getFavoriteOpinions(filter) {
        return HttpProvider.get(`${baseURL}/favorites?${filter}`).then(response => response.data);
    }

    static getUserOpinions(filter) {
        return HttpProvider.get(`${baseURL}/user-opinions?${filter}`).then(response => response.data);
    }

    static getOpinion(id) {
        return HttpProvider.get(`${baseURL}/${id}`).then(response => response.data);
    }

    static createOpinion(data) {
        return HttpProvider.post(`${baseURL}`, data).then(response => response.data);
    }

    static uploadOpinionImage(image) {
        return axios.post(uploadImagesURL, image).then(response => response.data);
    }

}