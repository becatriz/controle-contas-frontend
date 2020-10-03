import config from '../../config.js'
import axios from 'axios';

export default class AccountService {

    static async findAll(){
      try {
        const response = await axios.get(`${config.apiHost}/accounts`)
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }

    static async create(account){
      try {
        const response = await axios.post(`${config.apiHost}/accounts`, account);
        console.log(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }

    static async delete(account){
      try {
        const response = await axios.delete(`${config.apiHost}/accounts/${account._id}`, account);
        console.log(response.data);
        return response;
      } catch (error) {
        console.log(error);
      }
    }


}