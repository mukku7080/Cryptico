import { Box, Button, Flex, Heading, Select, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Textarea, FormLabel, FormControl } from '@chakra-ui/react'
import React from 'react'

const ReportBehaviour = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen} alignSelf={'end'} onClose={onClose} w={'200px'}>Report Bad Behaviour</Button>

            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={5} bg={'gray.50'}>
                        Report Behaviour
                    </ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody alignItems={'center'} justifyContent={'center'} flexDirection={'column'} display={'flex'} gap={4} mb={5}>
                        <Flex direction={'column'} alignItems={'center'} gap={5} >

                            <Image boxSize={200} src='/imagelogo/argue.png'></Image>
                            <Heading size={'md'}>
                                Report Bad Behaviour!
                            </Heading>

                        </Flex>
                        <Flex direction={'column'} gap={2}>

                            <Box fontWeight={500}>
                                Trade partners must follow rules stated in&nbsp;<span style={{ color: 'orange' }}>Cryptico.</span>
                            </Box>
                            <Box fontWeight={470}>
                                Please notify us of any bad begaviour by your trade partner. If payment or transaction issues occur,
                                initiate a dispute rather than filing a report.
                            </Box>
                        </Flex>
                        <FormControl>

                            <FormLabel>I want to report </FormLabel>
                            <Select placeholder='Select option'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormLabel>I would like to add</FormLabel>
                            <Textarea placeholder='Please add detail of bad behaviour, if necessary...'>
                            </Textarea>
                        </FormControl>

                        <Flex direction={'column'} gap={2}>

                            <Box fontWeight={500} color={'red.500'} alignSelf={'self-start'}><em>Warning</em>: Do not use the Report button for disputes</Box>

                            <Box color={'red.400'} fontSize={'16px'} fontWeight={500}>Submitting fake or incorrect reports may result in warnings or account restrictions.</Box>
                        </Flex>

                    </ModalBody>
                    <ModalFooter bg={'gray.50'} borderBottomRadius={5} justifyContent={'space-between'}>
                        <Button variant={'outline'} onClick={onClose}>Close</Button>
                        {/* <Button variant={'outline'}>Report</Button> */}
                        <Button colorScheme='blue' >Acknowledge and Report</Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ReportBehaviour