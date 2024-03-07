import axios from 'axios';

const API_KEY = `sk-BynQ65ea04fbcdce64496`;

export default {
  getPlantDetails: async function (plantId) {
    const plantID = `${plantId}`
    return axios.get(`https://perenual.com/api/species/details/${plantID}?key=${API_KEY}`)
  }

}
