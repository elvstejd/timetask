import { BiSpreadsheet, BiTrendingUp, BiStopwatch } from 'react-icons/bi';
import styled from 'styled-components';
import { CardTitle } from '../styles/shared/CardTitle';
import { Card } from '../styles/shared/Card';

const BigSquareIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    background-color: var(--brand-primary);
    border-radius: var(--border-radius-md);
`;

const InfoItemContainer = styled.div`
    display: flex;
`;

const InfoTextContainer = styled.div`
    margin-left: var(--xs);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InfoLabel = styled.p`
    font-weight: 500;
    font-size: var(--sm);
    color: var(--gray-60);
    margin-bottom: 0.2rem;
`;

const InfoText = styled.p`
    font-weight: 700;
    font-size: var(--sm);
    color: var(--text-primary);
`;

const Spacer = styled.div`
    margin-bottom: var(--md);
`;


function Overview() {
    return (
        <div>

            <CardTitle>
                <BiSpreadsheet />
                <h3>Overview</h3>
            </CardTitle>
            <Card>
                <Spacer>
                    <InfoItemContainer>
                        <BigSquareIcon>
                            <BiTrendingUp />
                        </BigSquareIcon>
                        <InfoTextContainer>
                            <InfoLabel>Completed today</InfoLabel>
                            <InfoText>00 activities</InfoText>
                        </InfoTextContainer>
                    </InfoItemContainer>
                </Spacer>

                <InfoItemContainer>
                    <BigSquareIcon>
                        <BiStopwatch />
                    </BigSquareIcon>
                    <InfoTextContainer>
                        <InfoLabel>Time left</InfoLabel>
                        <InfoText>00 hours 00 minutes</InfoText>
                    </InfoTextContainer>
                </InfoItemContainer>
            </Card>
        </div>
    );
}

export default Overview;
