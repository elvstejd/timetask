import { useState, useRef } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
// import { FaBullseye } from 'react-icons/fa';
import { BiTargetLock } from 'react-icons/bi';
// import doneSound from '../sounds/task_done.mp3';
// import countdownOverSound from '../sounds/alarm_beep_3.mp3';
import { useTasks } from '../contexts/TasksContext';
import { Card } from '../styles/shared/Card';
import { CardTitle } from '../styles/shared/CardTitle';
import styled from 'styled-components';


const TimerCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TaskTitle = styled.p`
    font-size: 1.2rem;
    text-align: center;
    margin-bottom: .6rem;
    overflow: hidden;
`;

const CountdownWrapper = styled.span`
    font-size: 3rem;
    margin-bottom: .6rem;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ControlButton = styled.button`
    font-family: var(--font-family-sans);
    border: none;
    padding: .5rem .7rem;
    border-radius: var(--border-radius-md);  
    display: ${props => props.hide ? 'none' : 'block'} 
`;

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
        return <CountdownWrapper>{hours}:{zeroPad(minutes)}:{zeroPad(seconds)}</CountdownWrapper>;
    };


    return (
        <div>
            <CardTitle>
                <BiTargetLock />
                <h3>Current Session</h3>
            </CardTitle>

            <TimerCard>
                <TaskTitle>{loadedTask.title ? loadedTask.title : "No task selected"}</TaskTitle>
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

                <ButtonsContainer>
                    <ControlButton
                        onClick={countdownIsRunning ? onPauseClick : onStartClick}
                        hide={!hideExtend}
                    >
                        {countdownIsRunning ? "Pause" : "Start"}
                    </ControlButton>
                    <ControlButton
                        onClick={onExtendClick}
                        hide={hideExtend}
                    >
                        Extend
                    </ControlButton>
                    <ControlButton
                        onClick={handleDoneClick}
                    >
                        Done
                    </ControlButton>
                </ButtonsContainer>
            </TimerCard>
        </div>
    );
}


export default CurrentSession;
