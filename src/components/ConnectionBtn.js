import { useWalletValues } from "../store";

export const ConnectionBtn = () => {
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
        <div>
            <button onClick={state.walletConnected ? disconnectWallet : connectWallet}>
                {state.walletConnected ? "Disconnect Wallet" : "Connect Wallet"}
            </button>
        </div>
    )
}