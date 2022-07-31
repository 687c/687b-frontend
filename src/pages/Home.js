import styled from "styled-components";
import { useWalletValues } from "../store";

const Wrapper = styled.div`
    //
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
`;

const WelcomeText = styled.p`
    font-size: 60px;
    font-weight: 600;
    text-align: center;
    text-decoration: underline;
    text-underline-offset: 9px;
`;

const SubText = styled.p`
    font-size: 26px;
    font-weight: 400;
    margin: 53px 60px;
`;

const Main = styled.main`
    margin: 20px 0;
`;

const CTASection = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const CTAText = styled.p`
    font-size: 23px;
    text-align: center;
`

const CTABtn = styled.button`
    background: none;
    border: 1.9px solid black;
    font-weight: 550;
    height: 50px;
    margin: 23px 40vw;
    outline: none;
    transition: .3s ease-in-out all;
    /* width: 110px; */

        &:hover{
            background-color: black;
            border: 5.7px solid black;
            color: white;
            cursor: pointer;
        }
`;




export default function Home() {
    console.log('this is the window location', window.location);

    /* Welcome to 687b. The first African E-commerce platform where folks can post and buy 
    product from each other build on the blockchain

    */

    const { state, dispatch } = useWalletValues();
    const connectWallet = async () => {
        //check if phantom wallet extension is installed
        try {
            const { solana } = window;
            if (solana) {
                if (solana.isPhantom) {
                    const resp = await solana.connect()
                    console.log("connected to phantom wallet solana");

                    dispatch({ type: 'setWalletAddress', data: resp.publicKey.toString() });
                    dispatch({ type: 'setWalletConnected', data: true });

                    return;
                }
            }
            alert("please install Phantom wallet extension");
            console.log("provider not found");
        } catch (err) {
            console.error("error: ->", err);
        }
    }

    const disconnectWallet = async () => {
        try {
            //
            const { solana } = window;
            const resp = await solana.disconnect();
            dispatch({ type: 'default' });
            console.log("disconnecting response", resp);
        } catch (err) {
            console.error("error disconnecting from solana");
        }
    }

    console.log("state", state);


    return (
        <Wrapper>
            <Header>
                {/* <div> */}
                <WelcomeText>
                    Welcome to 687b
                </WelcomeText>
                {/* </div> */}
                {/* <div> */}
                <SubText>
                    The first African E-commerce platform where folks can post and buy
                    product from each other build on the blockchain.
                </SubText>
                {/* </div> */}
            </Header>

            <Main>
                <CTASection>
                    {/* <CTAText>
                        To get started connect your wallet below.
                    </CTAText> */}

                    <CTABtn onClick={state.walletConnected ? disconnectWallet : connectWallet}>
                        {state.walletConnected ? "Disconnect Wallet" : "Connect Wallet"}
                    </CTABtn>
                </CTASection>
            </Main>
        </Wrapper>
    )
}