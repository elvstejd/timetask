import styled, { keyframes } from 'styled-components';
import { TaskContainer } from '../styles/shared/TaskContainer';

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.9rem;
    padding-bottom: 1rem;
`;

const SpinAnimation = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

const SpinnerItem = styled.div` 
    content: "";
    width: 40px;
    height: 40px;
    border: 4px solid var(--gray-70);
    border-top-color: var(--secondary-500);
    border-radius: 50%;
    animation: ${SpinAnimation} 1s linear infinite;
`;


function Spinner() {
    return (
        <TaskContainer>
            <SpinnerContainer>
                <div>
                    <SpinnerItem />
                </div>
            </SpinnerContainer>
        </TaskContainer>
    )
}

export default Spinner;
