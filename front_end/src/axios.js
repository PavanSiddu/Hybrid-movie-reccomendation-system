const axios = require('axios');
export async function get_recommend(id){
    return await axios({
      url: `http://localhost:5000/data?user=${id}`,
      method: 'get'
    })
  }  