import HttpProvider from './HttpProvider';

const baseURL = 'comments';

export default class CommentProvider {

    static createComment(data) {
        return HttpProvider.post(`${baseURL}`, data).then(response => response.data);
    }    

}