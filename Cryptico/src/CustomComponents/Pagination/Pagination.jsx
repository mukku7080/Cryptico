import { useState } from "react";
import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        onPageChange(page);
    };

    return (
        <Flex justify="center" align="center" gap={2} mt={4}>
            <IconButton
                icon={<MdKeyboardArrowLeft />}
                isDisabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
            />

            {[...Array(totalPages)].map((_, index) => (
                <Button
                    key={index}
                    colorScheme={currentPage === index + 1 ? "orange" : "gray"}
                    onClick={() => goToPage(index + 1)}
                >
                    {index + 1}
                </Button>
            ))}

            <IconButton
                icon={<MdKeyboardArrowRight />}
                isDisabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
            />
        </Flex>
    );
};

// Example Usage
const PaginatedList = () => {
    const itemsPerPage = 5;
    const totalItems = 25;

    const handlePageChange = (page) => {
        console.log("Current Page:", page);
    };

    return (
        <Box>
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </Box>
    );
};

export default PaginatedList;
