import { useState, useEffect } from 'react';
import { BiTrendingUp, BiStopwatch } from 'react-icons/bi';
import styled from 'styled-components';
import { CardTitle } from '../styles/shared/CardTitle';
import { Card } from '../styles/shared/Card';
import { millisecondsToHours, millisecondsToMinutes } from '../utils/countdownHelpers';
import { durationToMiliseconds, isToday } from '../utils/helpers';
import { useTaskStore } from '../stores';

const BigSquareIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    background-color: var(--primary-400);
    border-radius: var(--border-radius-md);

    svg {
        color: var(--primary-800);
        width: var(--xl);
        height: var(--xl);
    }
`;

const InfoItemContainer = styled.div`
    display: flex;
`;

const InfoTextContainer = styled.div`
    margin-left: var(--xs);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InfoLabel = styled.p`
    font-weight: 500;
    font-size: var(--sm);
    color: var(--text-tertiary);
    margin-bottom: 0.2rem;
`;

const InfoText = styled.p`
    font-weight: 600;
    font-size: var(--sm);
    color: var(--text-primary);
`;

const Spacer = styled.div`
    margin-bottom: var(--md);
`;


function Overview() {
    const [hours, setHour] = useState(0);
    const [minutes, setMinute] = useState(0);
    const [completedToday, setCompletedToday] = useState(0);

    const { tasks } = useTaskStore();

    useEffect(() => {
        if (!tasks) return;
        calculateTimeLeft();
        calculateCompletedToday();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks]);

    function calculateCompletedToday() {
        const taskArray = Object.values(tasks);
        let count = 0;

        taskArray.forEach(task => {
            if (task.done && isToday(task.completionDate)) count++;
        });

        setCompletedToday(count);
    }


    function calculateTimeLeft() {
        const taskArray = Object.values(tasks).filter(task => !task.done);
        if (taskArray.length === 0) {
            setHour(0);
            setMinute(0);
        };

        const totalDurationInMs = taskArray.reduce((prevTask, currentTask, index) => {
            if (index === 0) {
                return durationToMiliseconds(prevTask.duration) + durationToMiliseconds(currentTask.duration);
            }
            return prevTask + durationToMiliseconds(currentTask.duration);
        }, { duration: '0m' });

        setHour(millisecondsToHours(totalDurationInMs))
        setMinute(millisecondsToMinutes(totalDurationInMs))
    }

    function getTimeLeftText() {
        let timeLeftString = '';

        if (hours === 1) timeLeftString += '1 hour ';
        if (hours > 1) timeLeftString += hours + ' hours ';
        if (minutes === 1) timeLeftString += '1 minute';
        if (minutes > 1) timeLeftString += minutes + ' minutes ';
        if (!timeLeftString) return 'Done';

        return timeLeftString;
    }


    return (
        <>
            <CardTitle>
                <h3>Overview</h3>
            </CardTitle>
            <Card>
                <Spacer>
                    <InfoItemContainer>
                        <BigSquareIcon>
                            <BiTrendingUp />
                        </BigSquareIcon>
                        <InfoTextContainer>
                            <InfoLabel>Completed today</InfoLabel>
                            <InfoText>{completedToday} {completedToday === 1 ? 'activity' : 'activities'}</InfoText>
                        </InfoTextContainer>
                    </InfoItemContainer>
                </Spacer>

                <InfoItemContainer>
                    <BigSquareIcon>
                        <BiStopwatch />
                    </BigSquareIcon>
                    <InfoTextContainer>
                        <InfoLabel>Time left</InfoLabel>
                        <InfoText>
                            {getTimeLeftText()}
                        </InfoText>
                    </InfoTextContainer>
                </InfoItemContainer>
            </Card>
        </>
    );
}

export default Overview;
