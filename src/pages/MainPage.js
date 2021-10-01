import { useEffect } from 'react';
import styled from 'styled-components';
import Overview from '../components/Overview';
import ActionBar from '../components/ActionBar';
import Tasks from '../components/Tasks';
import CurrentSession from '../components/CurrentSession';
import { useTasks } from '../contexts/TasksContext';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;


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
