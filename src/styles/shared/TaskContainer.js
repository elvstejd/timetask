import styled from 'styled-components';

export const TaskContainer = styled.div`
    min-width: 40rem;
    background-color: var(--gray-90);
    padding: 1rem 1rem 0 .1rem;
    overflow: auto;
    border-radius: var(--border-radius-lg);

    @media (max-width: 675px) {
        min-width: 92vw;
    }
`;
