import axios from 'axios';

const API_KEY = `sk-BynQ65ea04fbcdce64496`;

let resString = "test"
/**
 * DAVOU
 * @async
 * @function Retrieves results of a user search.
 * @param {string} search - user search
 * @returns results of the axios call as object
 */
export default {
    getPerenualNameResults: async function (search, watering = '', sunlight = '', isIndoors = '') {
        const wateringStr = `&watering=${watering}`;
        const sunlightStr = `&sunlight=${sunlight}`;
        const isIndoorsStr = `&indoor=${isIndoors}`;
        const searchStr = `&q=${search}`;

        

        if (watering === '' && sunlight === '' && isIndoors === '' ) {
            console.log(`results for ${search}`);
            return axios.get(`https://perenual.com/api/species-list?key=${API_KEY}&q=${search}`)
        }
        else {
            
            return axios.get(`https://perenual.com/api/species-list?key=${API_KEY}${search === '' ? '': searchStr}${watering === ''? '':wateringStr}${sunlight === ''? '':sunlightStr}${isIndoors === ''? '':isIndoorsStr}`)
        }
    },
    

}

//export 