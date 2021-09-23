import Header from '../components/Header';
import styled from 'styled-components';

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

                </LeftSection>

                <CenterSection>

                </CenterSection>

                <RightSection>

                </RightSection>
            </Main>
        </div>
    )
}

export default MainPage;
