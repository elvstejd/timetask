import styled from 'styled-components';


const HeaderContainer = styled.header`
    display: flex;
    background: var(--primary-500);
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    margin-bottom: 2.5rem;
    padding: 0 2rem;
    color: var(--gray-98);
    font-weight: 600;

    @media screen and (max-width: 600px) {
        #links {
            display: none;
        }
    }
`;

const StyledUl = styled.ul`
    list-style: none;
`;

const StyledLi = styled.ul`
    display: inline;
    margin: 0 1rem;
`;


function Header() {
    return (
        <HeaderContainer>
            <div>
                TimeTask
            </div>
            <div id="links">
                <StyledUl>
                    <StyledLi>Home</StyledLi>
                </StyledUl>
            </div>
            <div id="user">
                <p>Hi, Guest</p>
            </div>
        </HeaderContainer>
    );
}

export default Header;