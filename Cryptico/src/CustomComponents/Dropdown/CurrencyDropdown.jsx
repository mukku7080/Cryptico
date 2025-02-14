import { useState } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    VStack,
} from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";

const CurrencyDropdown = () => {


    const [searchTerm, setSearchTerm] = useState("");
    const [option, setOption] = useState(items[0])

    const filteredItems = items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <>
            <Menu placement="bottom-end">
                <MenuButton
                    bg="orange.500"
                    color="white"
                    borderRadius={0}
                    _hover={{ bg: "orange.600" }}
                    _expanded={{ bg: "orange.400" }}
                    px={4}
                >
                    {option}
                </MenuButton>

                <MenuList p={2} borderRadius={0}

                    maxHeight="300px" // Limit height
                    overflowY="auto" // Enable scrolling
                    zIndex={1000}

                >

                    <InputGroup mb={2}>
                        <InputLeftElement pointerEvents="none" pb={'6px'}>
                            <IoMdSearch color="gray.500" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            size="sm"
                        />
                    </InputGroup>



                    {/* Menu Items */}
                    <VStack align="stretch" spacing={1}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <MenuItem key={index} _hover={{ bg: "blue.100" }} onClick={() => setOption(item)}>
                                    {item}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem isDisabled>No results found</MenuItem>
                        )}
                    </VStack>
                </MenuList>
            </Menu>

        </>
    );
};
const items = ["USD", "INR", "Rial", "Phonepay", "Dirham", "Taka", "Dollar", "yuro", "pisa", "Grain", "CD"];



export default CurrencyDropdown;
