
import { useEffect } from "react";

import { ConnectionBtn } from "../components/ConnectionBtn";
import { useWalletValues } from "../store";
// import styled from "styled-components";

export default function About() {

    const values = useWalletValues();

    useEffect(() => {
        console.log("the values", values);
    }, [values]);

    return (
        <div>
            <p>You are in the about page</p>
            {/* <button onClick={connectWallet}>connect wallet</button> */}
            <ConnectionBtn />

        </div>
    )
}