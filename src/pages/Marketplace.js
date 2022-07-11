import styled from "styled-components"
import ProductCard from "../components/Product";

export default function Marketplace() {

    //generating empty objects
    const products = new Array(5).fill("");
    console.log(products);

    const Wrapper = styled.div`
        /* display: flex; */
    `;

    const ProductsWrapper = styled.section`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    `


    return (
        <Wrapper>
            <div>
                <p>Welcome to marketplace</p>

            </div>
            <ProductsWrapper>
                {
                    products.map(() => (
                        <ProductCard />
                    ))
                }
            </ProductsWrapper>
            {/* <ProductCard /> */}
        </Wrapper>
    )
}