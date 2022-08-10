import { Keypair, Connection, clusterApiUrl, Transaction } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components"

import { getAllProducts, testProductFail } from "../services/productService";
import { buyProduct, confirmPurchase } from "../services/transactionService";
import { useWalletValues } from "../store";

import ProductCard from "../components/ProductCard";

const Wrapper = styled.div`
        /* display: flex; */
    `;

const ProductsWrapper = styled.section`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    `


export default function Marketplace() {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [paid, setPaid] = useState(false);

    const { state } = useWalletValues();

    const orderId = useMemo(() => Keypair.generate().publicKey, []);

    useEffect(() => {
        getAllProducts().then(res => {
            if (res.error) {
                // alert("error fetching all products -> ");
                return;
            }

            setProducts(res.data);

            //check for an error and use it to change the loading state
            setIsLoading(false);
        });

    }, [paid]);

    //purchase of items
    const handleBuy = async (id) => {
        // let product = products.find(prod => prod.id === id);
        // console.log("this is the product found", product);

        const publicKey = state.walletAddress.toString();

        let connection = new Connection(clusterApiUrl('devnet'));

        try {
            const resp = await buyProduct(id, publicKey, orderId.toString());
            if (resp.error) {
                alert("error buying the product");
                return;
            }

            const transaction = Transaction.from(Buffer.from(resp.data.transaction, "base64"));

            const provider = window.solana;
            const { signature } = await provider.signAndSendTransaction(transaction);
            let res = await connection.getSignatureStatus(signature);

            //setPaid on product if signature returns with value
            if (res.context) {
                await confirmPurchase(id);
                setPaid(!paid); //Un-list purchased product
                return;
            }
        } catch (err) {
            console.error('error sending the transaction', err);
        }
    }

    //generating empty Products
    const prods = new Array(5).fill("");

    //if wallet not connected
    if (!state.walletConnected) {
        return <>Connect Your Wallet to view and buy product</>
    }

    if (isLoading) {
        return <>Loading....</>
    }

    return (
        <Wrapper>
            <div>
                <p>Welcome to marketplace</p>

            </div>
            <ProductsWrapper>
                {
                    products.map(prod => (
                        /* 
                        * Currently this is wasteful as we are getting all products from the backend
                        * and filtering by paid on the frontend to see which ones haven't been purchased
                        * 
                        * As data grows it would be more efficient to have two API's
                        * One which returns all items whether purchased or not
                        * Two which returns all non-purchased items and we could use that in the marketplace
                        */
                        !prod.paid && (
                            < ProductCard key={prod.id}
                                ipfsHash={prod.ipfsHash}
                                price={prod.price}
                                title={prod.title}
                                handleBuy={() => handleBuy(prod.id)}
                            />)
                    ))
                }
            </ProductsWrapper>
            {/* <ProductCard /> */}
        </Wrapper>
    )
}