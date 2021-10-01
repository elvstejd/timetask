import Countdown from './Countdown';
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

function CurrentSession() {
    const { loadedTask } = useTasks();

    return (
        <div>
            <CardTitle>
                <h3>Current Session</h3>
            </CardTitle>

            <TimerCard>
                <TaskTitle>{loadedTask.title ? loadedTask.title : "-- --"}</TaskTitle>
                <Countdown />
            </TimerCard>
        </div>
    );
}


export default CurrentSession;
