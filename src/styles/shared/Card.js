import styled from 'styled-components';

export const Card = styled.div`
    width: var(--card-size);
    height: fit-content;
    background: var(--gray-96);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-sm);
    padding: 2rem;

    @media (max-width: 1310px) {
        width: auto;
        height: 88.5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`;
