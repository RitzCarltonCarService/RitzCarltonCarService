const dateParser = {};

dateParser.getDateFromDate = datetime => {
    datetime = new Date(datetime).toString().split(" ");
    return datetime[0] + " " + datetime[1] + " " + datetime[2];
}

dateParser.getTimeFromDate = datetime => {
    datetime = new Date(datetime).toString().split(" ");
    return datetime[4];
}



export default dateParser;