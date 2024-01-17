// Time Conversion
function digitalClock(seconds) {
    let digitalArray = [];
    let remainder = seconds;

    let hours = Math.trunc(seconds/3600) % 24; // Get hours by mod 3600 = 60 * 60 (second -> minute * minute -> hour)
    if (hours <= 9) digitalArray.push(`0${hours}`);
    else if (hours <= 23) digitalArray.push(hours);

    remainder = remainder%3600;
    let minutes = Math.trunc(remainder/60); // Get minutes
    if (minutes <= 9) digitalArray.push(`0${minutes}`);
    else digitalArray.push(minutes)

    let second = remainder%60; // Get second
    if (second <= 9) digitalArray.push(`0${second}`);
    else digitalArray.push(second);

    return digitalArray.join(":");  // join array after push it into format xx:xx:xx
}