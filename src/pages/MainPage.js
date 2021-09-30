import Header from '../components/Header';
import styled from 'styled-components';
import Overview from '../components/Overview';
import ActionBar from '../components/ActionBar';
import Tasks from '../components/Tasks';
import CurrentSession from '../components/CurrentSession';
import { useTasks } from '../contexts/TasksContext';
import { useEffect } from 'react';
import axios from 'axios';

const Main = styled.main`
    max-width: 80rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`;

const LeftSection = styled.div`
    padding-right: 1rem;
`;

const CenterSection = styled.div`
    
`;

const RightSection = styled.div`
    padding-left: 1rem;
`;

function MainPage() {
    const { setFetchedTasks } = useTasks();

    useEffect(() => {
        axios.get('http://localhost:5000/tasks').then(res => {
            console.log(res.data);
            setFetchedTasks(res.data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Header />
            <Main>
                <LeftSection>
                    <Overview />
                </LeftSection>

                <CenterSection>
                    <ActionBar />
                    <Tasks />
                </CenterSection>

                <RightSection>
                    <CurrentSession />
                </RightSection>
            </Main>
        </div>
    )
}

export default MainPage;
