import axios from 'axios';

const API_KEY = `sk-wcYG65e1ee80c70214408`;

export default {
  getPlantDetails: async function (plantId) {
    const plantID = `${plantId}`
    return axios.get(`https://perenual.com/api/species/details/${plantID}?key=${API_KEY}`)
  }

}