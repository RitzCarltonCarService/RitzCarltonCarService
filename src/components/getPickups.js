import axios from 'axios';

const getPickups = function(actionDispatch) {
    axios.get('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/getPickups', {
        params: {
            id: 1
        }
    })
    .then((data) => {
        console.log("This is the GET data from the server: ", data)
        actionDispatch(data.data);
    })
    .catch((err) => {
        console.log(err);
    })
}

export default getPickups;