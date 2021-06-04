import HttpProvider from './HttpProvider';
import axios from 'axios';

const uploadImagesURL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_IMAGES_CLOUD_NAME}/image/upload`;

export default class UserProvider {

    static signIn(data) {
        return HttpProvider.post('signin', data).then(response => response.data);
    }

    static signUp(data) {
        return HttpProvider.post('signup', data).then(response => response.data);
    }

    static getUser() {
        return HttpProvider.get('user').then(response => response.data);
    }

    static getUserProfile(id) {
        return HttpProvider.get(`user-profile/${id}`).then(response => response.data);
    }

    static updateUser(data) {
        return HttpProvider.put('user', data).then(response => response.data);
    }

    static updateUserFavoriteOpinions(data) {
        return HttpProvider.put('user/favorite-opinions', data).then(response => response.data);
    }

    static uploadUserProfilePic(image) {
        return axios.post(uploadImagesURL, image).then(response => response.data);
    }

}