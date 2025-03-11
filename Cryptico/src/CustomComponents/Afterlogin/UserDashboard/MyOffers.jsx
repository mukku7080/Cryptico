import { Box, Card, Flex, Heading, Image, Tag, Text } from "@chakra-ui/react";
import { useState } from "react";

const MyOffers = () => {
    const [status, setStatus] = useState(true);
    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "green.500";  // Active → Green
            case "Disputed":
                return "red.500";    // Disputed → Red
            case "Pending":
                return "yellow.500"; // Pending → Yellow
            default:
                return "gray.500";   // Default Gray
        }
    };
    return (
        <Card w={'full'}>

            <Heading size={'lg'} fontWeight={700} p={4}>Active Trades <Tag size={'lg'} bg={'green.200'}>2</Tag></Heading>
            <Flex direction={{ base: 'row', sm: 'column' }} justifyContent={{ base: 'space-between', sm: 'none' }} border="1px solid #dcdcdc" borderRadius="md" overflow="hidden" w={'full'} gap={{ base: 0, sm: 10 }} p={4}>

                {/* Table Header */}
                <Flex bg="gray.200" p={3} fontWeight="bold" w={'full'} gap={4} direction={{ base: 'column', sm: 'row' }}>
                    <Box flex=".5" textAlign="start">Trade</Box>
                    <Box flex="1.4" textAlign="start">Amount</Box>
                    <Box flex="1.3" textAlign="start">Method</Box>
                    <Box flex="1.3" textAlign="start">Partner</Box>
                    <Box flex="1" textAlign="start">Started</Box>
                    <Box flex="1" textAlign="start" display={{ base: 'none', xl: 'flex' }}>Status</Box>
                    <Box flex=".5" textAlign="start">Others</Box>
                </Flex>
                <Flex w={'full'} direction={'column'}>

                    {/* Table Rows (Example Data) */}
                    {[
                        { trade: "Sell", amount: "2541365.35 INR", method: "IMPS Transfer throught HDFC", partner: "ranchor das chanchah", started: "12 second ago", status: "Pending", others: "View" },
                    ].map((row, index) => (
                        <Flex key={index} p={3} bg={index % 2 === 0 ? "gray.50" : "white"} w={'full'} fontWeight={600} gap={4} direction={{ base: 'column', sm: 'row' }}>
                            <Box flex=".5" textAlign="start" fontWeight={600}>{row.trade}</Box>
                            <Flex flex="1.4" textAlign="start" direction={'column'} gap={2}>
                                {row.amount}
                                <Flex gap={2} flexWrap={'wrap'}>
                                    <Image boxSize={5} src="https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040"></Image>
                                    <Text fontSize={'sm'} >0.0004562BTC</Text>
                                </Flex>
                            </Flex>
                            <Box flex="1.3" textAlign="start">{row.method}</Box>
                            <Box flex="1.3" textAlign="start" >{row.partner}</Box>
                            <Box flex="1" textAlign="start">{row.started}</Box>
                            <Box flex="1" textAlign="start" color={getStatusColor(row.status)} display={{ base: 'none', xl: 'flex' }} >{row.status}</Box>
                            <Box flex=".5" textAlign="start" color="blue.500" cursor="pointer" >{row.others}</Box>
                        </Flex>
                    ))}
                </Flex>

            </Flex>
        </Card>
    );
};


const cryptoOption = [
    { shrotName: 'BTC', name: 'Bitcoin', logo: 'https://cryptologos.cc/logos/thumbs/bitcoin.png?v=040', pricePerCoin: '1 BTC = 8,448,496.2999 INR', blc: 0, INR: '0.00', table: 'true' },
    { shrotName: 'ETH', name: 'Ethereum', logo: 'https://cryptologos.cc/logos/thumbs/ethereum.png?v=040', pricePerCoin: '1 ETH = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
    { shrotName: 'USDC', name: 'USDC', logo: 'https://cryptologos.cc/logos/thumbs/usd-coin.png?v=040', pricePerCoin: '1 USDC = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
    { shrotName: 'USDT', name: 'Tether', logo: 'https://cryptologos.cc/logos/thumbs/tether.png?v=040', pricePerCoin: '1 USDT = 8,448,496.2999 INR', blc: 0, INR: '0.00' },
]
export default MyOffers;
