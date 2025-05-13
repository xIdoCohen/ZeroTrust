import axios from "axios";



const Connections = {
  postData: function (url, data) {
    return axios.post(url, data, { withCredentials: true }) 
      .then(response => response.data)
      .catch(error => {
        console.error("Axios Error:", error);
        throw new Error(error);
      });
  },

  getData: function (url, params = {}) {
  return axios.get(url, {
    params,
    withCredentials: true
  })
    .then(response => response.data)
    .catch(error => {
      console.error("Axios Error:", error);
      throw new Error(error);
    });
}

};

export default Connections;
