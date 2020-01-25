import axios from 'axios';

const getPickups = function(userID, actionDispatch) {
    axios.get('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/getPickups', {
        params: {
            id: userID
        }
    })
    .then((data) => {
        actionDispatch(data.data);
    })
    .catch((err) => {
        console.log(err);
    })
}

export default getPickups;