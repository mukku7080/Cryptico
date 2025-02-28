import { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    Heading,
    SimpleGrid,
    Divider,
    Box
} from "@chakra-ui/react";
import { Search } from "lucide-react";
import { PaymentCard } from "./PaymentCard";
import { bankOptions, popularPayments } from "./paymentOptions";

export function PaymentOptionsModal({ isOpen, onClose }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBanks = bankOptions.filter(bank =>
        bank.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredPopular = popularPayments.filter(payment =>
        payment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="2xl" fontWeight="bold">Select Payment Method</ModalHeader>
                <ModalBody pb={6}>
                    <InputGroup mb={6}>
                        <InputLeftElement pointerEvents="none">
                            <Box as={Search} color="gray.500" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search payment methods..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </InputGroup>

                    <VStack spacing={6} align="stretch">
                        <Box>
                            <Heading size="md" mb={3}>Bank Payments</Heading>
                            <SimpleGrid columns={[1, 2]} spacing={3}>
                                {filteredBanks.map((bank) => (
                                    <PaymentCard
                                        key={bank.id}
                                        name={bank.name}
                                        icon={bank.icon}
                                        imgSrc={bank.imgSrc}
                                        onClick={() => {
                                            console.log(`Selected bank: ${bank.name}`);
                                            onClose();
                                        }}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>

                        <Divider />

                        <Box>
                            <Heading size="md" mb={3}>Popular Payment Methods</Heading>
                            <SimpleGrid columns={[1, 2]} spacing={3}>
                                {filteredPopular.map((payment) => (
                                    <PaymentCard
                                        key={payment.id}
                                        name={payment.name}
                                        icon={payment.icon}
                                        imgSrc={payment.imgSrc}
                                        onClick={() => {
                                            console.log(`Selected payment: ${payment.name}`);
                                            onClose();
                                        }}
                                    />
                                ))}
                            </SimpleGrid>
                        </Box>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
