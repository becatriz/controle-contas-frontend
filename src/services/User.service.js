import config from '../../config.js'
import axios from 'axios';

export default class UserService {

    static async findAll(){
      try {
        const response = await axios.get(`${config.apiHost}/users`)
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    static async create(user){
      try {
        const response = await axios.post(`${config.apiHost}/users`, user);
        console.log(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }

    static async update(user){
      try {
        const response = await axios.put(`${config.apiHost}/users`, user);
        console.log(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }


}