import shortid from "shortid";

function createTask(name) {
    let duration = "30m";
    let newName = name;
    if (parseDurationFromName(name)) {
        duration = parseDurationFromName(name);
        newName = name.replace(duration, "");
    }
    return {
        id: shortid.generate(),
        name: newName,
        duration,
        done: false
    }
}

function parseDurationFromName(taskTitle) {
    const re = /(\d+h)(\d+m)|(\d+h)|(\d+m)/g;
    const duration = taskTitle.match(re);

    if (duration) {
        return duration[0];
    }
}

function durationToMiliseconds(duration) {
    if (!duration) return 0;

    const hourRegex = /\d+h/g;
    const minutesRegex = /\d+m/g;
    const hourMatch = duration.match(hourRegex);
    const minuteMatch = duration.match(minutesRegex);

    let hours = hourMatch ? hourMatch[0].slice(0, -1) : 0;
    let minutes = minuteMatch ? minuteMatch[0].slice(0, -1) : 0;

    return minutes * 60000 + hours * 3600000;
}

function isValidDuration(duration) {
    const re = /(\d+h)(\d+m)|(\d+h)|(\d+m)/i;
    if (duration.length > 5) {
        return false;
    }
    if (re.test(duration)) {
        return true;
    }

    return false;
}

export { createTask, durationToMiliseconds, isValidDuration };