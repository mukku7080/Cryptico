import React, { useEffect, useState } from 'react'
import {
    Box, Button, Card, Flex,
    Menu, MenuButton, MenuItem, MenuList,
    Image,


} from '@chakra-ui/react';


import { MdKeyboardArrowDown } from "react-icons/md";


const TokenDropdown = ({ index }) => {
    const safeIndex = index !== undefined ? index : 0;
    const [option, setOption] = useState(cryptoOption[safeIndex]?.name);
    const [logo, setLogo] = useState(cryptoOption[safeIndex]?.logo);

    useEffect(() => {
        // Update option and logo whenever index changes
        if (cryptoOption[safeIndex]) {
            setOption(cryptoOption[safeIndex].name);
            setLogo(cryptoOption[safeIndex].logo);
        }
    }, [safeIndex]);

    return (
        <>
            <Menu matchWidth >

                <MenuButton as={Button} w={'full'} variant={'outline'} borderRadius={5} border={'1px solid #dcdcdc'} rightIcon={<MdKeyboardArrowDown />} _hover={{ bg: 'transparent' }}  >
                    <Flex gap={2}>
                        <Image boxSize={5} src={logo}></Image>
                        {option}
                    </Flex>

                </MenuButton>
                <MenuList borderRadius={0} p={2}  >
                    {cryptoOption.map((data, index) => (
                        <React.Fragment key={index}>
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    setOption(data.name);
                                    setLogo(data.logo);
                                }} gap={3} _hover={{ bg: "blue.100" }}><Image boxSize={5} src={data.logo}></Image>{data.name}
                            </MenuItem>
                        </React.Fragment>
                    ))}

                </MenuList>
            </Menu>
        </>
    )
}
const cryptoOption = [
    { name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040' },
    { name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040' },
    { name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040' },
    { name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040' },
]
export default TokenDropdown