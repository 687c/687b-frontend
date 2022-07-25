import styled from 'styled-components';


const Wrapper = styled.footer`
    /* bottom: 0; */
    background-color: black;
    bottom: 0;
    display: flex;
    justify-content: center;
    height: 100px;
    /* position: fixed; */
    /* width: 100vw; */
`;


const Text = styled.div`
    display: flex;
    align-items: center;
    color: white;
    /* text-align: center; */
`;

const GHLink = styled.a`
    color: white;

    &:hover{
        cursor: pointer;
    }
`;


const Footer = () => {

    return (
        <Wrapper>
            <Text>
                built by&nbsp; <GHLink href='https://github.com/jim4067' >jimii</GHLink>
            </Text>
        </Wrapper>
    )
}

export default Footer;