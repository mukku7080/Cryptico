import { Card, CardBody, Divider, Flex, Heading, Icon, Image, Link, useColorModeValue } from '@chakra-ui/react'
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
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
// import { useAuth } from '../AuthContext/AuthProvider';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';


const Loginnew = () => {

    const { handleLogin } = useAuth();

    const txtcolor = useColorModeValue('black', 'white');
    const bgcolor = useColorModeValue('gray.100', 'gray.700');



    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("*field is required"),
        password: Yup.string().min(6, "Minimum 6 characters").required("*Password is required"),

    });

    const { values, handleBlur, handleSubmit, errors, touched, handleChange } = useFormik({
        initialValues: {
            email: "",
            password: "",

        },
        validationSchema,
        onSubmit: async (values, action) => {

            try {
                await handleLogin(values);
                navigate("/user-dashboard");
            }
            catch (err) {
                console.log("Login Failded:", err);
            }


            console.log(values);
            action.resetForm();


        }

    });




    return (
        <Box minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>

            <Flex maxW={'container.xxl'} justifyContent={'center'}  >
                <Card borderRadius={'none'}  >

                    <Flex minW={{ base: 'container', sm: '500px', md: 'container.md', lg: 'container.lg' }} direction={{ base: 'column', sm: 'column', md: 'row' }}  >


                        <Box flex={1}
                            display={'flex'}
                            justifyContent={'center'} alignItems={'center'}
                            bgImage={'https://images.pexels.com/photos/6765368/pexels-photo-6765368.jpeg?auto=compress&cs=tinysrgb&w=600'}
                            bgSize={'cover'} bgPosition={'center'}
                            bgRepeat={'no-repeat'}
                        >

                        </Box>


                        <Box flex={1}
                        >

                            <Card borderRadius={'none'} >
                                <Flex justifyContent={'space-between'} px={3} alignItems={'center'} mt={5}>
                                    <Heading size={'lg'} fontWeight={'500'}>Login</Heading>
                                    <Button leftIcon={<CgArrowsExchange />} bg={'transparent'} color={'orange'} onClick={() => navigate('/signup')}>Sign up</Button>
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
                                                <FormLabel color={'gray'}  >Email/Number</FormLabel>
                                                <Input name="email" placeholder="Email or Number" bg={bgcolor}  // Light gray background
                                                    _focus={{ bgcolor }}
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur} />
                                                <FormErrorMessage>{errors.email}</FormErrorMessage>
                                            </FormControl>



                                            {/* password Field */}
                                            <FormControl isInvalid={errors.password && touched.password} mb={3}>
                                                <FormLabel color={'gray'}>Password</FormLabel>
                                                <Input name="password" type="password" placeholder="Passwrod" bg={bgcolor}  // Light gray background
                                                    _focus={{ bgcolor }}
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
                                            <Button
                                                type="submit"
                                                bg={'orange'}
                                                width="full" mt={5}


                                            >
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




