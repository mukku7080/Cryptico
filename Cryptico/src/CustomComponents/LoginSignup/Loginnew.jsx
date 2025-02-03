import { Card, CardBody, Divider, Flex, Heading, Icon, Image, Link, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CgArrowsExchange } from "react-icons/cg";
import { useFormik } from "formik";
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


const Loginnew = () => {

    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("*email is required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("*Password is required"),

    });

    const { values, handleBlur, handleSubmit, errors, touched, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema,
        onSubmit: (values, action) => {

            console.log(values);
            action.resetForm();

        }

    });




    return (
        <Box minH={'90vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

            <Flex maxW={'container.xxl'} justifyContent={'center'} my={10} >
                <Card borderRadius={'none'} >

                    <Flex minW={{ base: 'container', sm: 'container.sm', md: 'container.md', lg: 'container.lg' }} direction={{ base: 'column', sm: 'column', md: 'row' }}  >


                        <Box flex={1}
                            display={'flex'}
                            justifyContent={'center'} alignItems={'center'}
                            bgImage={'https://bitrader-next.thetork.com/images/account/1.png'}
                            bgSize={'cover'} bgPosition={'center'}
                            bgRepeat={'no-repeat'}
                        >

                        </Box>


                        <Box flex={1} >

                            <Card borderRadius={'none'}>
                                <Flex justifyContent={'space-between'} px={3} alignItems={'center'} mt={5}>
                                    <Heading size={'lg'} fontWeight={'500'}>Login</Heading>
                                    <Button leftIcon={<CgArrowsExchange />} bg={'transparent'} color={'orange'}>Sign up</Button>
                                </Flex>

                                <Box as='p' color={'gray'} maxW={'400px'} px={3} mt={5}  >Ready to Make Waves in Crypto? Let’s revolutionize your trading journey.</Box>
                                <Divider color={'gray'} opacity={0.5} />

                                <CardBody display={'flex'} justifyContent={'center'}>
                                    <Box maxW="md" borderRadius="md" w={'90%'}  >

                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit();
                                        }} >
                                            {/* user Field */}

                                            <FormControl isInvalid={errors.email && touched.email} mb={3}>
                                                <FormLabel color={'gray'}  >Email</FormLabel>
                                                <Input name="email" placeholder="Email" bg="gray.100"  // Light gray background
                                                    _focus={{ bg: "white" }}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                                            </FormControl>



                                            {/* password Field */}
                                            <FormControl isInvalid={errors.password && touched.password} mb={3}>
                                                <FormLabel color={'gray'}>Password</FormLabel>
                                                <Input name="password" type="password" placeholder="Passwrod" bg="gray.100"  // Light gray background
                                                    _focus={{ bg: "white" }}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                <FormErrorMessage>{errors.password}</FormErrorMessage>
                                            </FormControl>







                                            {/* CheckBox */}
                                            <Flex justifyContent={'space-between'}>

                                                <Checkbox mt={3}  ><Box color={'gray'} display={'flex'} justifyContent={'space-between'}  >
                                                    <Box>

                                                        Remember me
                                                    </Box>
                                                </Box>

                                                </Checkbox>
                                                <Link mt={3} color={'orange'} display={'flex'} justifyContent={'flex-end'}> Forgot Password ?</Link>
                                            </Flex>
                                            {/* Submit Button */}
                                            <Button type="submit" bg={'orange'} width="full" mt={5}  >
                                                Login
                                            </Button>
                                        </form>

                                    </Box>

                                </CardBody>

                                <Flex>
                                    <Divider color={'orange'} ml={3} flex={1} opacity={0.9} />
                                    <Box fontSize={'14px'} textAlign={'center'} flex={1}>Or login with</Box>
                                    <Divider mr={3} flex={1} opacity={0.9} color={'orange'} />
                                </Flex>

                                <Flex my={5} justifyContent={'center'} gap={10}>
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





                    </Flex>
                </Card>
            </Flex>
        </Box>


    )
}

export default Loginnew




