import React, { useState } from "react";
import { NavbarContainer, NavbarWrapper, Menu, MenuItem, MenuItemLink, IconLogoMovile, IconLogo } from "./NavBar.elements";
import { Link, NavLink } from "react-router-dom";

import { FaBars, FaTimes } from 'react-icons/fa'

import { IoGameController } from 'react-icons/io5'
import { MdDeveloperMode } from 'react-icons/md'
import { FaStoreAlt } from 'react-icons/fa'
import { GiPlatform } from 'react-icons/gi'

function NavBar() {
    const [click, setClick] = useState(false);

    const changeClick = () => {
        setClick(!click);
    }
    return (
        <>
            <NavbarContainer>
                <NavbarWrapper>
                    <IconLogo>
                        <Link to={`/`} className="link">
                            WIKI-GAMES
                        </Link>
                    </IconLogo>
                    <IconLogoMovile onClick={() => changeClick()}>
                        {click ? <FaTimes /> : <FaBars />}
                    </IconLogoMovile>
                    <Menu click={click}>
                        <MenuItem onClick={() => changeClick()}>
                            <MenuItemLink>
                                <div>
                                    <IoGameController />
                                    <NavLink to="/games">GAMES</NavLink>
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem onClick={() => changeClick()}>
                            <MenuItemLink>
                                <div>
                                    <MdDeveloperMode />
                                    <NavLink to="/developers">DEVELOPERS</NavLink>
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem onClick={() => changeClick()}>
                            <MenuItemLink>
                                <div>
                                    <GiPlatform />
                                    <NavLink to="/platforms">PLATFORMS</NavLink>
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                        <MenuItem onClick={() => changeClick()}>
                            <MenuItemLink>
                                <div>
                                    <FaStoreAlt />
                                    <NavLink to="/stores">STORES</NavLink>
                                </div>
                            </MenuItemLink>
                        </MenuItem>
                    </Menu>
                </NavbarWrapper>
            </NavbarContainer>
        </>
    );
}

export default NavBar;