import { useState, useEffect } from "react";
import styled from 'styled-components';
import { useCountdown } from "../contexts/countdownContext";
import { useTasks } from "../contexts/TasksContext";
import { millisecondsToHours, millisecondsToMinutes, millisecondsToSeconds, pad } from '../utils/countdownHelpers';


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

function Countdown() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    const { msDifference, start, stop, pause, countdownIsRunning } = useCountdown();
    const { clearLoadedTask, loadedTask, markTaskDone } = useTasks();

    // when msDifference changes, update displayed hh:mm:ss
    useEffect(() => {
        setHour(millisecondsToHours(msDifference));
        setMinute(millisecondsToMinutes(msDifference));
        setSecond(millisecondsToSeconds(msDifference));
    }, [msDifference]);

    function handleDoneClick() {
        if (!loadedTask.id) return;
        markTaskDone(loadedTask.id);
        clearLoadedTask();
        stop();
    }

    return (
        <div>
            <CountdownWrapper>
                {hour}:{pad(minute)}:{pad(second)}
            </CountdownWrapper>
            <ButtonsContainer>
                {countdownIsRunning ? (
                    <ControlButton onClick={() => pause()}>Pause</ControlButton>
                ) : (
                    <ControlButton onClick={() => start()}>Start</ControlButton>
                )}
                <ControlButton onClick={handleDoneClick}>
                    Done
                </ControlButton>
            </ButtonsContainer>
        </div>
    );
}

export default Countdown;
