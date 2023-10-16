import { createContext, useState, useContext, useEffect, useRef } from 'react';

const CountdownContext = createContext();

export function useCountdown() {
    return useContext(CountdownContext);
}


function CountdownProvider({ children }) {
    const [status, setStatus] = useState("init");
    const [msDifference, setMsDifference] = useState(0);
    const [targetTime, setTargetTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const interval = useRef();

    useEffect(() => {
        switch (status) {
            case "startedFromStoppedOrInit":
            case "started":
                // start counting
                interval.current = setInterval(update, 1000);
                break;
            case "stopped":
                clearInterval(interval.current);
                setTargetTime(0);
                setCurrentTime(0);
                setMsDifference(0);
                break;
            case "paused":
                setCurrentTime(0);
                clearInterval(interval.current);
                break;
            case "finished":
                clearInterval(interval.current);
                break;
            default:
                break;
        }

        return () => clearInterval(interval.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    // when currentTime or targetTime change, update msDifference
    useEffect(() => {
        if (!currentTime || !targetTime) return;
        const dt = targetTime - currentTime;
        if (dt <= 0) {
            setStatus("finished");
            return;
        }
        setMsDifference(dt);
    }, [currentTime, targetTime]);

    function update() {
        if (status === "startedFromStoppedOrInit") {
            setCurrentTime(new Date().getTime() - 1000);
        } else {
            setCurrentTime(new Date().getTime());
        }
    }

    function start() {
        if (msDifference === 0) return;
        setTargetTime(new Date().getTime() + msDifference);

        if (status === "init" || status === "stopped") {
            setStatus("startedFromStoppedOrInit");
        } else {
            setStatus("started");
        }
    }

    function stop() {
        setStatus("stopped");
    }

    function pause() {
        setStatus("paused");
    }

    function setTimeInMs(ms) {
        setMsDifference(ms);
    }


    const value = {
        countdownIsRunning: status === 'started' || status === 'startedFromStoppedOrInit',
        countdownHasFinished: status === 'finished',
        msDifference,
        start,
        pause,
        stop,
        setTimeInMs
    }

    return (
        <CountdownContext.Provider value={value}>
            {children}
        </CountdownContext.Provider>
    );
}

export default CountdownProvider;
