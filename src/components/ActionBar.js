import { BiArchive, BiDice5 } from 'react-icons/bi';
import styled from 'styled-components';
import { useTasks } from '../contexts/TasksContext';

const ActionBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
`;

const ActionButton = styled.button`
    border: none;
    font-family: var(--font-family-sans);
    color: var(--gray-40);
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
        margin-left: 0.15rem;
    }

    &:hover {
        text-decoration: underline;
    }
`;

function ActionBar() {
    const { clearCompletedTasks } = useTasks();

    return (
        <ActionBarContainer>
            <div>
                <ActionButton onClick={() => clearCompletedTasks()}>
                    <BiArchive />
                    <span>Clear completed</span>
                </ActionButton>
            </div>
            <div>
                <ActionButton>
                    <BiDice5 />
                    <span>Pick random</span>
                </ActionButton>
            </div>
        </ActionBarContainer>
    );
}

export default ActionBar;
