import { useState, useEffect } from "react";
import styled from 'styled-components';
import { useCountdown } from "../contexts/countdownContext";
import { useTasks } from "../contexts/TasksContext";
import { millisecondsToHours, millisecondsToMinutes, millisecondsToSeconds, pad } from '../utils/countdownHelpers';
import doneSound from '../sounds/task_done.mp3';
import finishSound from '../sounds/alarm_beep_3.mp3';

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CountdownWrapper = styled.p`
    font-size: 3rem;
    letter-spacing: -2px;
    margin-bottom: .6rem;
    color: var(--text-primary);
    font-family: 'Roboto Mono', monospace;

    span {
        white-space: nowrap;
        display: inline-block;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    margin-top: .5rem;
`;

const ControlButton = styled.button`
    font-family: var(--font-family-sans);
    border: none;
    padding: .5rem;
    border-radius: var(--border-radius-sm);  
    display: ${props => props.hide ? 'none' : 'block'};
    cursor: pointer;
    background-color: var(--secondary-400);
    color: var(--gray-92);
    box-shadow: var(--shadow-sm);
    flex-grow: 1;
`;

function Countdown() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    const { msDifference, start, stop, pause, countdownIsRunning, countdownHasFinished } = useCountdown();
    const { clearLoadedTask, loadedTask, markTaskDone } = useTasks();

    const taskDoneSound = new Audio(doneSound);
    const countdownFinishSound = new Audio(finishSound);

    // when msDifference changes, update displayed hh:mm:ss
    useEffect(() => {
        setHour(millisecondsToHours(msDifference));
        setMinute(millisecondsToMinutes(msDifference));
        setSecond(millisecondsToSeconds(msDifference));
    }, [msDifference]);

    useEffect(() => {
        if (countdownHasFinished) {
            console.log('done');
            countdownFinishSound.play();
            stop();
        }
    }, [countdownHasFinished]);

    function handleDoneClick() {
        if (!loadedTask.id) return;
        taskDoneSound.play();
        markTaskDone(loadedTask.id);
        clearLoadedTask();
        stop();
    }

    return (
        <Container>
            <CountdownWrapper>
                <span>{hour}:</span>
                <span>{pad(minute)}:</span>
                <span>{pad(second)}</span>
            </CountdownWrapper>
            <ButtonsContainer>
                {countdownIsRunning ? (
                    <ControlButton onClick={() => pause()}>Pause</ControlButton>
                ) : (
                    <ControlButton onClick={() => start()}>Start</ControlButton>
                )}
                <ControlButton onClick={handleDoneClick} style={{ marginLeft: '1rem' }}>
                    Done
                </ControlButton>
            </ButtonsContainer>
        </Container>
    );
}

export default Countdown;
