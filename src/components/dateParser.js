const dateParser = {};

dateParser.getDateFromDate = datetime => {
    datetime = new Date(datetime).toString().split(" ");
    return datetime[0] + " " + datetime[1] + " " + datetime[2];
}

dateParser.getTimeFromDate = datetime => {
    datetime = new Date(datetime).toString().split(" ");
    let time = datetime[4];
    return dateParser.translateTime(time);
}

dateParser.translateTime = time => {
    let hr = Number(time.substring(0, 2));
    let ampm = "AM";

    if (hr >= 12) {
        hr -= 12;
        ampm = "PM";
    }

    if (hr === 0) {
        hr = 12;
    }

    return hr + time.substring(2, 5) + " " + ampm;
}

export default dateParser;