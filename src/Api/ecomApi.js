import requestClient from './requestClient';

const ecomApi = {
    getProducts() {
        const url = 'Products.json';
        return requestClient.get(url);
    },
    getOneProduct(id) {
        const url = `Products/${id}.json`;
        return requestClient.get(url);
    },
    getBlogs() {
        const url = 'Posts.json';
        return requestClient.get(url);
    },
    getOneBlog(id) {
        const url = `Posts/${id}.json`;
        return requestClient.get(url);
    },
    getUsers() {
        const url = `Users.json`;
        return requestClient.get(url);
    }
}
export default ecomApi;

