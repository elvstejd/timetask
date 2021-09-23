import { BiArchive, BiDice5 } from 'react-icons/bi';
import styled from 'styled-components';
import { useTasks } from '../contexts/TasksContext';

const ActionBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

function ActionBar() {
    const { clearCompletedTasks } = useTasks();

    return (
        <ActionBarContainer>
            <div>
                <button onClick={() => clearCompletedTasks()}>
                    <BiArchive />
                    <span>Clear completed</span>
                </button>
            </div>
            <div>
                <button>
                    <BiDice5 />
                    <span>Pick random</span>
                </button>
            </div>
        </ActionBarContainer>
    );
}

export default ActionBar;
