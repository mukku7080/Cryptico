import { border, Card, CardBody, Divider, Flex, Heading, Icon, Image, Link } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CgArrowsExchange } from "react-icons/cg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaTelegramPlane } from "react-icons/fa";


const Login = () => {

    const [ismobile, setMobile] = useState(false);
    const validationSchema = Yup.object({
        email: Yup.string().required("email is required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
        mobile: Yup.string().min(10, "Minimum 10 characters").required("Number is required"),
    });
    return (
        <Box minH={'95vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

            <Flex maxW={'container.xxl'} justifyContent={'center'} my={10} >
                <Flex maxW={{ base: 'container', sm: 'container.sm', md: 'container.md', lg: 'container.lg' }} direction={{ base: 'column', sm: 'column', md: 'row' }} gap={5}>

                    <Box flex={1} >

                        <Card mt={{ base: 0, md: 7, lg: 5 }}>
                            <Flex justifyContent={'space-between'} px={3} alignItems={'center'}>
                                <Heading size={'md'} fontWeight={'500'}>Welcome to Cryptico</Heading>
                                <Button as={Link} leftIcon={<CgArrowsExchange />} bg={'transparent'} color={'orange'}>Signup</Button>
                            </Flex>
                            <Divider opacity={0.1} />
                            <Flex pr={3}>
                                <Button bg={'transparent'} _hover={{ borderBottom: '1px solid orange', textDecoration: 'none' }} as={Link} onClick={() => setMobile(false)}>Email</Button>
                                <Button bg={'transparent'} _hover={{ borderBottom: '1px solid orange', textDecoration: 'none' }} as={Link} onClick={() => setMobile(true)}>Mobile Number</Button>
                            </Flex>
                            <CardBody>
                                <Box maxW="md" borderRadius="md">
                                    <Formik
                                        initialValues={{ email: "", password: "", referalcode: "", mobile: "" }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values, actions) => {
                                            console.log(values);
                                            actions.setSubmitting(false);
                                        }}
                                    >
                                        {({ handleSubmit, errors, touched }) => (
                                            <Form onSubmit={handleSubmit}>
                                                {/* user Field */}
                                                {
                                                    ismobile ?

                                                        <FormControl isInvalid={errors.mobile && touched.mobile} mb={3}>
                                                            <FormLabel color={'gray'}  >Mobile</FormLabel>
                                                            <Field as={Input} name="mobile" placeholder="+91" bg="gray.100" border="none"  // Light gray background
                                                                _focus={{ bg: "white" }} />
                                                            <FormErrorMessage>{errors.mobile}</FormErrorMessage>
                                                        </FormControl>
                                                        :

                                                        <FormControl isInvalid={errors.email && touched.email} mb={3}>
                                                            <FormLabel color={'gray'}  >Email</FormLabel>
                                                            <Field as={Input} name="email" placeholder="Email" bg="gray.100" border="none"  // Light gray background
                                                                _focus={{ bg: "white" }} />
                                                            <FormErrorMessage>{errors.email}</FormErrorMessage>
                                                        </FormControl>

                                                }

                                                {/* password Field */}
                                                <FormControl isInvalid={errors.password && touched.password} mb={3}>
                                                    <FormLabel color={'gray'}>Password</FormLabel>
                                                    <Field as={Input} name="password" type="password" placeholder="Passwrod" bg="gray.100"  // Light gray background
                                                        _focus={{ bg: "white" }} />
                                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                                </FormControl>


                                                <Link color={'orange'} display={'flex'} justifyContent={'flex-end'}> Forgot Password ?</Link>
                                                {/* Submit Button */}
                                                <Button type="submit" bg={'orange'} width="full" mt={5} >
                                                    Log in
                                                </Button>
                                            </Form>
                                        )}
                                    </Formik>
                                </Box>

                            </CardBody>

                            <Flex>
                                <Divider ml={3} flex={1} opacity={0.9} />
                                <Box fontSize={'14px'} textAlign={'center'} flex={1}>Or Log in with</Box>
                                <Divider mr={3} flex={1} opacity={0.9} />
                            </Flex>

                            <Flex my={10} justifyContent={'center'} gap={10}>
                                <Button variant={'outline'} boxSize={10}>
                                    <Icon as={FcGoogle} boxSize={6}></Icon>
                                </Button>
                                <Button variant={'outline'} boxSize={10}>
                                    <Icon as={FaApple} boxSize={6}></Icon>
                                </Button>
                                <Button variant={'outline'} boxSize={10}>
                                    <Icon as={FaTelegramPlane} color={'skyblue'} boxSize={6}></Icon>
                                </Button>
                            </Flex>

                        </Card>
                    </Box>

                    <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>

                        <Card>
                            <CardBody>
                                <Flex direction={'column'} gap={10}>

                                    <Heading color={'orange'} fontWeight={'500'} size={'xl'}>Crypto Dawn: Inaugurate Your Crypto Journey</Heading>
                                    <Heading fontWeight={'500'} size={'md'}>Deposit, Trade, Collect. Will Your Cards Unlock 1 BTC?</Heading>
                                    <Image src='https://s1.bycsi.com/bybit/deadpool/2f9f92c4d72911ef8249beb5484ff7a7.png' maxH={'350px'} maxW={'350px'} ></Image>

                                </Flex>
                            </CardBody>
                        </Card>

                    </Box>


                </Flex>
            </Flex>
        </Box>


    )
}

export default Login




