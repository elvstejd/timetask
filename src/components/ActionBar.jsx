import { useRef } from 'react';
import { BiArchive, BiDice5 } from 'react-icons/bi';
import styled from 'styled-components';
import { useTasks } from '../contexts/TasksContext';
import { getRandomIndexForArrayOfLength } from '../utils/helpers';
import { useTaskStore } from '../stores';

const ActionBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
`;

const ActionButton = styled.button`
    border: none;
    font-family: var(--font-family-sans);
    color: var(--gray-30);
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: var(--sm);

    span {
        margin-left: 0.15rem;
    }

    &:hover {
        text-decoration: underline;
    }
`;

function ActionBar() {
    const { loadTask } = useTasks();
    const { tasks, clearCompletedTasks } = useTaskStore();

    const previousRandomIndex = useRef();

    function pickRandomTask() {
        const taskArray = Object.values(tasks);
        if (taskArray.length === 0) {
            alert('You have no tasks to pick from!');
            return;
        };
        let randomIndex = getRandomIndexForArrayOfLength(taskArray.length);

        while (previousRandomIndex.current === randomIndex) {
            randomIndex = getRandomIndexForArrayOfLength(taskArray.length);
        }

        loadTask(taskArray[randomIndex]);
        previousRandomIndex.current = randomIndex;
    }

    return (
        <ActionBarContainer>
            <div>
                <ActionButton onClick={() => clearCompletedTasks()}>
                    <BiArchive />
                    <span>Clear completed</span>
                </ActionButton>
            </div>
            <div>
                <ActionButton onClick={() => pickRandomTask()}>
                    <BiDice5 />
                    <span>Pick random</span>
                </ActionButton>
            </div>
        </ActionBarContainer>
    );
}

export default ActionBar;
