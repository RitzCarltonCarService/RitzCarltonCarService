import axios from 'axios';

<<<<<<< HEAD
=======
<<<<<<< HEAD
const getPickups = function(userID, actionDispatch) {
    axios.get('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/getPickups', {
        params: {
            id: userID
=======
>>>>>>> 6e42e1c5697b3a909226cee05f835dd13c27e9f5
const getPickups = function(actionDispatch) {
    axios.get('http://ritzcarservice.us-east-2.elasticbeanstalk.com/api/getPickups', {
        params: {
            id: 1
<<<<<<< HEAD
        }
    })
    .then((data) => {
=======
>>>>>>> robsotherbranch
        }
    })
    .then((data) => {
        console.log("This is the GET data from the server: ", data)
>>>>>>> 6e42e1c5697b3a909226cee05f835dd13c27e9f5
        actionDispatch(data.data);
    })
    .catch((err) => {
        console.log(err);
    })
}

export default getPickups;