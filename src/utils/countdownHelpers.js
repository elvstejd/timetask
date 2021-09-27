/* 
countdown logic borrowed from: 
https://github.com/john-smilga/javascript-basic-projects/blob/master/12-countdown-timer/final/app.js
*/

const ONESECOND = 1000; // 1s = 1000ms
const ONEMINUTE = 60 * ONESECOND; // 1m = 60s
const ONEHOUR = 60 * ONEMINUTE; // 1hr = 60m

export function millisecondsToHours(ms) {
    const hours = ms / ONEHOUR;
    return Math.floor(hours);
}

export function millisecondsToMinutes(ms) {
    const minutes = (ms % ONEHOUR) / ONEMINUTE;
    return Math.floor(minutes);
}

export function millisecondsToSeconds(ms) {
    const seconds = (ms % ONEMINUTE) / 1000;
    return Math.floor(seconds);
}

export function pad(n) {
    if (n < 10) {
        return "0" + n.toString();
    }
    return n;
}
