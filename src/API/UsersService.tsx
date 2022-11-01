import axios from "axios";


export class UsersService {
    static async getAll() {
        const response = axios.get('https://reqres.in/api/users')
        return response;
    }
}