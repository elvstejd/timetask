import { useEffect } from 'react';
import styled from 'styled-components';
import Overview from '../components/Overview';
import ActionBar from '../components/ActionBar';
import Tasks from '../components/Tasks';
import CurrentSession from '../components/CurrentSession';
import { useTasks } from '../contexts/TasksContext';
import axios from 'axios';
// axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;


const Main = styled.main`
    max-width: 80rem;
    display: grid;
    grid-template-columns: 1fr;
    margin-left: 1rem;
    margin-right: 1rem;
    row-gap: 2rem;
    margin-bottom: 3rem;
    
    @media (min-width: 1310px) {
        display: flex;
        justify-content: center;
        margin: 0 auto;
    }
    
    @media (min-width: 600px) {
        column-gap: 2rem;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto;
    }
`;

const LeftSection = styled.div`
    grid-row: 2;
    
    @media (min-width: 600px) {
        grid-row: 1;
    }
    
    @media (min-width: 1310px) {
        padding-right: 1rem;
    }
`;

const CenterSection = styled.div`
    grid-column: span 2;

    @media (min-width: 600px) and (max-width: 1310px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const RightSection = styled.div`
    grid-row: 1;
    
    @media (min-width: 600px) {
        grid-column: 2;
    }
    
    @media (min-width: 1310px) {
        padding-left: 1rem;
    }
`;

function MainPage() {
    const { setFetchedTasks } = useTasks();

    useEffect(() => {
        axios.get('/tasks').then(res => {
            console.log(res.data);
            setFetchedTasks(res.data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Main>
                <LeftSection>
                    <Overview />
                </LeftSection>

                <CenterSection>
                    <div>
                        <ActionBar />
                        <Tasks />
                    </div>
                </CenterSection>

                <RightSection>
                    <CurrentSession />
                </RightSection>
            </Main>
        </div>
    )
}

export default MainPage;
