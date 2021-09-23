import { useState, useRef } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
// import { FaBullseye } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
// import doneSound from '../sounds/task_done.mp3';
// import countdownOverSound from '../sounds/alarm_beep_3.mp3';
import { useTasks } from '../contexts/TasksContext';

function CurrentSession() {
    const [hideExtend, setHideExtend] = useState(true);
    const [userClickedDone, setUserClickedDone] = useState()

    const { clearLoadedTask, markTaskDone, loadedTask, setCountdownIsRunning, countdownIsRunning, extendTime, date } = useTasks();

    // const doneSound = new Audio(doneSound);
    // const countdownFinishSound = new Audio(countdownOverSound);

    // const userClickedDone = useRef(false);
    let countdownApi = useRef();

    function onStartClick() {
        setUserClickedDone(false);
        countdownApi.start();

        if (loadedTask) { // if loadedTask
            setCountdownIsRunning(true);
        }
    };

    function onPauseClick() {
        countdownApi.pause();
        setCountdownIsRunning(false);
    };

    function onCountdownComplete(e) {
        if (!userClickedDone) {
            setHideExtend(false);
            // countdownFinishSound.play();
        }
        // reset the flag
        setUserClickedDone(false);
    };

    function setRef(countdown) {
        if (countdown) {
            countdownApi = countdown.getApi();
        }
    };

    function onExtendClick() {
        extendTime();
        setTimeout(countdownApi.start, 0);
        setHideExtend(true);
    }

    function handleDoneClick() {
        const taskId = loadedTask.id;

        if (taskId) {
            markTaskDone(taskId);
            // doneSound.play();
        }

        setHideExtend(true);
        setCountdownIsRunning(false);
        setUserClickedDone(true);
        clearLoadedTask();
    }

    function renderer({ hours, minutes, seconds }) {
        return <span className="countdown">{hours}:{zeroPad(minutes)}:{zeroPad(seconds)}</span>;
    };


    return (
        <div>
            <div className="info-title">
                <BiTargetLock />
                <h3>Current Session</h3>
            </div>

            <div className="info-card timer">
                <p id="task-title">{loadedTask.title ? loadedTask.title : "No task selected"}</p>
                <Countdown
                    ref={setRef}
                    date={date}
                    controlled={false}
                    autoStart={false}
                    onPause={() => console.log('pause handler')} // onPause={this.handlePause}
                    overtime={false}
                    renderer={renderer}
                    onComplete={onCountdownComplete}
                />

                <div id="timer-btns">
                    <button
                        onClick={countdownIsRunning ? onPauseClick : onStartClick}
                        className={`control-btn ${!hideExtend && "hide"}`}
                    >
                        {countdownIsRunning ? "Pause" : "Start"}
                    </button>
                    <button
                        onClick={onExtendClick}
                        className={`control-btn ${hideExtend && "hide"}`}
                    >
                        Extend
                    </button>
                    <button
                        className="control-btn"
                        onClick={handleDoneClick}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );

}


export default CurrentSession;