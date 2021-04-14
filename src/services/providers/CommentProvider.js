import HttpProvider from './HttpProvider';

const baseURL = 'comments';

export default class CommentProvider {

    static getComments(opinionId) {
        return HttpProvider.get(`${baseURL}?opinionId=${opinionId}`).then(response => response.data);
    }

    static createComment(data) {
        return HttpProvider.post(`${baseURL}`, data).then(response => response.data);
    }    

}