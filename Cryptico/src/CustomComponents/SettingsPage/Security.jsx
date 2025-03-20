import { Card, Link, CardBody, Divider, Flex, Heading, Icon, Image, InputGroup, InputRightElement, IconButton, useColorModeValue } from '@chakra-ui/react'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox, useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer
} from "@chakra-ui/react";
import { Form, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FcGoogle } from "react-icons/fc";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FaApple, FaTelegramPlane } from "react-icons/fa";
import ChangePassword from './ChangePassword';
import { MdCheck } from 'react-icons/md';
import { useOtherDetail } from '../../Context/otherContext';

const Security = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const bgcolor = useColorModeValue('gray.100', 'gray.700');



    const [issignup, setSignup] = useState(false);

    const validationSchema = Yup.object({
        currentPassword: Yup.string().min(8, "Minimum 8 characters").required("*Password is required"),
        password: Yup.string().min(8, "Minimum 8 characters").required("*Password is required"),
        cpass: Yup
            .string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("*Confirm Password is required"),
    });


    const { handleChange, handleBlur, handleSubmit, errors, touched, values } = useFormik({
        initialValues: {
            currentPassword: "",
            password: "",
            cpass: "",
        },
        validationSchema,

    });


    const [password, setPassword] = useState("");
    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false
    });

    const validatePassword = (value) => {
        setPassword(value.password);

        setValidations({
            length: value.length >= 8,
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            number: /[0-9]/.test(value),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        });
    };
    const allValid = Object.values(validations).every(Boolean);
    const [isshow, setShow] = useState(false);
    return (
        <>

            <Flex direction={'column'} gap={10} overflowX={'auto'}>
                <ChangePassword />


                <ActiveSession />
                <AccountActivity />
            </Flex>
        </>
    )
}


const ActiveSession = () => {
    const { loginhistory } = useOtherDetail();

    const history = loginhistory || []

    return (

        <>
            <Flex direction={'column'} gap={10} p={4} border={'1px solid #dcdcdc'} borderRadius={5}>
                <Heading size={'lg'} px={4}>Active Session</Heading>

                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Only latest 10 records available here </TableCaption>
                        <Thead>
                            <Tr>
                                <Th>SIGNED IN</Th>
                                <Th>BROWSER</Th>
                                <Th  >LOCATION</Th>
                                <Th isNumeric>IP ADDRESS</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                history.length > 0 ?
                                    (

                                        history.map((data, index) => (
                                            <>
                                                <Tr key={index} bg={index % 2 === 0 ? 'white' : 'orange.50'}>
                                                    <Td>{data.loginDuration}</Td>
                                                    <Td>{data.browser}</Td>
                                                    <Td
                                                        whiteSpace="normal"   // Allows text to wrap
                                                        wordBreak="break-word" // Ensures breaking long words
                                                        overflowWrap="break-word" // Alternative way to break long words
                                                        maxW="150px" // Limits the width to ensure wrapping


                                                    >{`${data.countryName},${data.countryCity}`}</Td>
                                                    <Td
                                                        isNumeric
                                                        whiteSpace="normal"   // Allows text to wrap
                                                        wordBreak="break-word" // Ensures breaking long words
                                                        overflowWrap="break-word" // Alternative way to break long words
                                                        maxW="150px" // Limits the width to ensure wrapping


                                                    >
                                                        {data.ipAddress}
                                                    </Td>
                                                </Tr>

                                            </>
                                        ))
                                    )

                                    :
                                    (
                                        <Tr>
                                            <Td colSpan="4" textAlign="center">No active sessions found</Td>
                                        </Tr>
                                    )

                            }

                        </Tbody>

                    </Table>
                </TableContainer>
            </Flex>


        </>
    )
}


const AccountActivity = () => {
    const { loginhistory } = useOtherDetail();

    const history = loginhistory || []
    return (

        <>
            <Flex direction={'column'} gap={10} p={4} border={'1px solid #dcdcdc'} borderRadius={5}>
                <Heading size={'lg'} px={4}>Account Activity</Heading>

                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Only latest 10 records available here</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>ACTION</Th>
                                <Th>SIGNED IN</Th>

                                <Th>BROWSER</Th>
                                <Th >IP ADDRESS</Th>
                                <Th isNumeric >LOCATION</Th>
                                {/* <Th  >SIGNED IN</Th> */}

                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                history.length > 0 ?
                                    (

                                        history.map((data, index) => (
                                            <>
                                                <Tr key={index} bg={index % 2 === 0 ? 'white' : 'orange.50'}>
                                                    <Td><Box> {data.loginStatus} </Box></Td>
                                                    <Td>{data.loginDuration}</Td>

                                                    <Td>{data.browser}</Td>
                                                    <Td

                                                        whiteSpace="normal"   // Allows text to wrap
                                                        wordBreak="break-word" // Ensures breaking long words
                                                        overflowWrap="break-word" // Alternative way to break long words
                                                        maxW="150px" // Limits the width to ensure wrapping


                                                    >
                                                        {data.ipAddress}
                                                    </Td>
                                                    <Td isNumeric
                                                        whiteSpace="normal"   // Allows text to wrap
                                                        wordBreak="break-word" // Ensures breaking long words
                                                        overflowWrap="break-word" // Alternative way to break long words
                                                        maxW="150px" // Limits the width to ensure wrapping
                                                    >{`${data.countryName},${data.countryCity}`}</Td>
                                                    {/* <Td>{data.timeAgo}</Td> */}


                                                </Tr>

                                            </>
                                        ))
                                    )
                                    :
                                    (
                                        <Tr>
                                            <Td colSpan="4" textAlign="center">No active sessions found</Td>
                                        </Tr>

                                    )
                            }

                        </Tbody>

                    </Table>
                </TableContainer>
            </Flex>


        </>
    )
}
const loginRecords = Array(4).fill({
    timeAgo: "3 weeks ago",
    browser: "Chrome (Windows 10)",
    ipAddress: "2405:201:6022:f962:f408:879b:be8a:8269",
    location: "India, Lucknow"
});

export default Security