import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function NavBar() {

    const Wrapper = styled.div`
        padding: 3vh 0;
    `;

    const NavContainer = styled.div`
	    border: 2px solid black;
        display: flex;
        font-weight: 900;
        height: 10vh;
        justify-content: space-between;
	`;

    const NavLeftSide = styled.div`
        margin: auto 2px;
    `

    const NavLogo = styled.h1`
        padding-left: 23px;

        & > a {
            text-decoration: none;
            transition: .9s ease-in-out;  
            color: black;

            &:hover {
                color: grey;
                cursor: pointer;
                text-decoration: underline;
                text-decoration-thickness: 3px;
                text-underline-offset: 4px;
            }
        }
    `;

    const NavRightSide = styled.div`
        margin: auto 0;
    `

    const NavListContainer = styled.div`
        display: flex;
    `;

    const NavItem = styled.li`
        list-style-type: none;
        padding-right: 23px;

        & > a {
            text-decoration: none;
            color: black;
            transition: .9s ease-in-out;

            &:hover{
                cursor: pointer;
                text-decoration: underline;
                text-underline-position: above;
                text-underline-offset: 3px;
            }
        }
    `;

    const pathContainer = styled.div`
        /* display: flex; */
    `;

    return (
        <Wrapper>
            <NavContainer>

                <NavLeftSide>
                    <NavLogo>
                        <Link to="/">
                            687B
                        </Link>
                    </NavLogo>
                </NavLeftSide>
                <NavRightSide>
                    <NavListContainer>
                        <NavItem>
                            <Link to="/about">
                                About
                            </Link>
                        </NavItem>

                        <NavItem>
                            <Link to='/marketplace'>
                                Marketplace
                            </Link>
                        </NavItem>

                        <NavItem>
                            <Link to='/create'>
                                Create
                            </Link>
                        </NavItem>

                        <NavItem>
                            <Link to='/profile'>
                                Profile
                            </Link>
                        </NavItem>
                    </NavListContainer>
                </NavRightSide>
            </NavContainer>

            <pathContainer>
                {/* show window locations here */}
            </pathContainer>
        </Wrapper>
    )
}