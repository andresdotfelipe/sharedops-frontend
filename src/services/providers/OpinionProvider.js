import HttpProvider from './HttpProvider';
import axios from 'axios';

const baseURL = 'opinions';

const uploadImagesURL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_IMAGES_CLOUD_NAME}/image/upload`;

export default class OpinionProvider {

    static getOpinions(filter) {
        return HttpProvider.get(`${baseURL}?${filter}`).then(response => response.data);
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