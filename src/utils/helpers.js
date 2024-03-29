import shortid from "shortid";

export function createTask(title) {
    let duration = "30m";
    let newTitle = title;
    if (parseDurationFromName(title)) {
        duration = parseDurationFromName(title);
        newTitle = title.replace(duration, "");
    }
    return {
        id: shortid.generate(),
        title: newTitle,
        duration,
        done: false,
        completedDate: null
    }
}

function parseDurationFromName(taskTitle) {
    const re = /(\d+h)(\d+m)|(\d+h)|(\d+m)/g;
    const duration = taskTitle.match(re);

    if (duration) {
        return duration[0];
    }
}

export function durationToMiliseconds(duration) {
    if (!duration) return 0;

    const hourRegex = /\d+h/g;
    const minutesRegex = /\d+m/g;
    const hourMatch = duration.match(hourRegex);
    const minuteMatch = duration.match(minutesRegex);

    let hours = hourMatch ? hourMatch[0].slice(0, -1) : 0;
    let minutes = minuteMatch ? minuteMatch[0].slice(0, -1) : 0;

    return minutes * 60000 + hours * 3600000;
}

export function isValidDuration(duration) {
    const re = /(\d+h)(\d+m)|(\d+h)|(\d+m)/i;
    if (duration.length > 5) {
        return false;
    }
    if (re.test(duration)) {
        return true;
    }

    return false;
}

export function getRandomIndexForArrayOfLength(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}

export const isToday = (someDate) => {
    // https://flaviocopes.com/how-to-determine-date-is-today-javascript/
    if (!someDate) return;
    const thatDate = new Date(someDate);
    const today = new Date()
    // eslint-disable-next-line eqeqeq
    return thatDate.getDate() == today.getDate() &&
        // eslint-disable-next-line eqeqeq
        thatDate.getMonth() == today.getMonth() &&
        // eslint-disable-next-line eqeqeq
        thatDate.getFullYear() == today.getFullYear();
}
