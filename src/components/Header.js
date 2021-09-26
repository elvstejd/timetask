import styled from 'styled-components';

const app = {
    // navigation: ['Home', 'Stats', 'Settings'],
    navigation: ['Home', 'Settings'],
}

const HeaderContainer = styled.header`
    display: flex;
    background: var(--brand-primary-dark);
    justify-content: space-between;
    align-items: center;
    height: 4rem;
    margin-bottom: 2.5rem;
    padding: 0 2rem;
    color: var(--gray-98);
    font-weight: 600;
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
                BRAND
            </div>
            <div id="links">
                <StyledUl>
                    {app.navigation.map(link => <StyledLi key={link}>{link}</StyledLi>)}
                </StyledUl>
            </div>
            <div id="user">
                <p>Elvis Tejeda</p>
            </div>
        </HeaderContainer>
    );
}

export default Header;