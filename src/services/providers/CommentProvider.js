import HttpProvider from './HttpProvider';

const baseURL = 'commments';

export default class CommentProvider {

    static getComments(filter) {
        return HttpProvider.get(`${baseURL}?${filter}`).then(response => response.data);
    }

    static createComment(data) {
        return HttpProvider.post(`${baseURL}`, data).then(response => response.data);
    }    

}