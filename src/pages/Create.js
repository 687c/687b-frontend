import { useRef, useState } from "react"
import { Navigate, NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import toast, { Toaster } from 'react-hot-toast';

import { useWalletValues } from "../store";

import { createProduct } from "../services/productService";

//styles
const Wrapper = styled.div`
        //
    `

const NavWrapper = styled.section`
        display: flex;
        justify-content: center;
    `

const MiniNav = styled.ul`
        border: 1.5px solid black;
        display: flex;
        font-weight: 500;
        justify-content: space-between;
        padding: 7px 20px;
        width: 43vw;
    `;

const NavItem = styled.li`
        list-style-type: none;

        & > a {
            color: black;
            text-decoration: none;
        }

        & > a.active {
            text-underline-offset: 3px;
            text-decoration: underline;
            text-decoration-thickness: 3px;
        }
    `;

const ProductWrapper = styled.section`
        margin-top: 34px;
        
        
        & > * {
            /* border: 1px solid black; */
        }
    `

const InnerWrapper = styled.div`
        margin: 0 10vw;
    `

const InputWrapper = styled.div`
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    `;

const ImgContainer = styled.div`
        align-items: center ;
        border: 2px solid black;
        display: flex;
        justify-content: center;
        height: 200px;
        margin: 0;
        overflow: hidden;
        padding: 50px 0;    
        width: 300px;

        @media (max-width: 910px) {
            width: 40vw;
        }
    `;

const ImagePreview = styled.img`
        height: 200px;
        position: relative;
        width: 300px;

        @media (max-width: 400px) {
            width: 40vw;
        }
    `;

const InputText = styled.div`      
        margin: 20px 0;

        & > * {
            background: none;
            border: 2px solid black;
        }

        & > input {
            height: 35px;
            width: 40vw;
        }

        & > input:focus {
            border-radius: 0;
        }

        & > textarea {
            height: 170px;
            width: 40vw;
        }
    `;

const SubmitContainer = styled.div`
        align-items: center;
        display: flex;
        justify-content: center;
    `;

const Button = styled.button`
        background: none;
        border: 1.9px solid black;
        font-weight: 550;
        height: 25px;
        outline: none;
        transition: .3s ease-in-out all;
        width: 110px;

        &:hover{
            border: 2.7px solid black;
            cursor: pointer;
        }
    `;

const SubmitButton = styled(Button)`
        margin-bottom: 23px; 
`

export default function Create() {
    const location = useLocation().pathname.split('/')[2];

    //global state for the wallet values
    const { state } = useWalletValues();

    //form management form
    const [selectedImage, setSelectedImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");


    //input click function
    const inputRef = useRef();
    const handleImageUpload = () => {
        inputRef.current.click();
    };

    //show loading
    const notifyLoading = () => {
        toast.loading("saving product...");
    }


    //submitting the form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //title, image cannot be empty
        if (title === "") {
            toast.error("please enter product title");
            return;
        }

        //this also wont sent if the sellerAddress is not defined
        const sellerAddress = state.walletAddress;
        const numPrice = Number(price);

        if (isNaN(numPrice)) {
            toast.error("price must be a number");
            return;
        }

        const productFormData = new FormData();
        productFormData.append("imageFile", selectedImage);
        productFormData.append("title", title);
        productFormData.append("description", description);
        productFormData.append("price", numPrice);
        productFormData.append("sellerAddress", sellerAddress);

        let res = await createProduct(productFormData);
        toast.dismiss();
        console.log('calling this');
        res.error ? toast.error("error creating the product") : toast.success("Product Saved");
        console.log("the res", res);

        //clear the state
        setSelectedImage(null);
        setTitle("");
        setDescription("");
        setPrice("");
        return;
    }

    // if wallet not connected
    if (!state.walletConnected) {
        return <>Connect Your Wallet to create Products or an NFT</>
    }


    return (
        <Wrapper>
            <Toaster />
            <NavWrapper>
                <MiniNav>
                    <NavItem>
                        <NavLink to='product'>
                            Product
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to='nft'>
                            NFT
                        </NavLink>
                    </NavItem>
                </MiniNav>
            </NavWrapper>

            {location === undefined && (
                <Navigate to='product' />
            )}

            <main>
                {
                    location === "product" && (
                        <ProductWrapper>

                            <InnerWrapper>
                                <InputWrapper>
                                    <ImgContainer>

                                        {
                                            //if null show the upload button else show the selected image
                                            selectedImage === null ?
                                                (
                                                    <div>
                                                        <Button onClick={handleImageUpload}>Upload Image</Button>
                                                        <input ref={inputRef} type='file'
                                                            accept="image/*" style={{ display: "none" }}
                                                            value={selectedImage} name="imageFile"
                                                            onChange={event => setSelectedImage(event.target.files[0])}
                                                        />
                                                    </div>
                                                ) :
                                                (
                                                    <div>
                                                        <ImagePreview alt={selectedImage.name}
                                                            src={URL.createObjectURL(selectedImage)}
                                                        />
                                                    </div>
                                                )
                                        }

                                    </ImgContainer>

                                    <div>
                                        <InputText>
                                            <input placeholder="title"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                            />
                                        </InputText>
                                        <InputText>
                                            <textarea placeholder="description"
                                                type='textarea'
                                                onChange={e => setDescription(e.target.value)}
                                                value={description}
                                            />
                                        </InputText>
                                        <InputText>
                                            <input placeholder="price in USDC"
                                                onChange={e => setPrice(e.target.value)}
                                                value={price}
                                            />
                                        </InputText>
                                    </div>
                                </InputWrapper>

                                <SubmitContainer>
                                    <SubmitButton onClick={(event) => { notifyLoading(); handleFormSubmit(event) }} >
                                        submit
                                    </SubmitButton>
                                </SubmitContainer>

                            </InnerWrapper>
                        </ProductWrapper>
                    )
                }

                {/* NFT SECTION */}
                {
                    location === "nft" && (
                        <section>
                            <div>
                                COMING SOON!
                            </div>


                            <div>
                                {/* the submit section */}
                                {/* if its an nft also include the option to save to wallet */}
                            </div>

                        </section>
                    )
                }
            </main>
        </Wrapper >
    )
}