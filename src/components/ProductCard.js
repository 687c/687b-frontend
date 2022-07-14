import styled from "styled-components";

const Wrapper = styled.div`
        border: 2px solid black;
        display: flex;
        flex-direction: column;
        height: 280px;
        padding: 3.9px;
        margin-top: 23px;
        width: 200px;
    `;

const ImgContainer = styled.div`
        border: 1px solid black;
        height: 180px;
    `;

const ProductInfo = styled.div`
        & > * {
            padding: 5px;
        }
    `;

const Title = styled.p`
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    `;

const Price = styled.p`
        margin: 0;
        font-weight: 450;
    `;

const Buy = styled.button`
        background: none;
        border: 1.9px solid black;
        font-weight: 550;
        height: 25px;
        outline: none;
        transition: .3s ease-in-out all;
        width: 85px;

        &:hover{
            border: 2.7px solid black;
            cursor: pointer;
        }
    `;



const ProductCard = ({ title, img, price }) => {
    //states


    //TODO 
    // ADD THE BUYER  ADDRESS TO THE BODY WHEN CREATING A PRODUCT
    // !!! MAKE SURE TO CONVERT IT TO A STRING !!!!!

    //

    return (
        <Wrapper>
            <ImgContainer>
                IMAGE
            </ImgContainer>

            <ProductInfo>
                <div>
                    <Title>
                        Product One
                    </Title>
                </div>
                <div>
                    <Price>
                        23 USDC
                    </Price>
                </div>
                <div>
                    <Buy>
                        Buy Now
                    </Buy>
                </div>
            </ProductInfo>
        </Wrapper>
    );
}

export default ProductCard;