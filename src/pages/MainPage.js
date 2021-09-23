import Header from '../components/Header';
import styled from 'styled-components';
import Overview from '../components/Overview';
import ActionBar from '../components/ActionBar';
import Tasks from '../components/Tasks';
import CurrentSession from '../components/CurrentSession';

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
