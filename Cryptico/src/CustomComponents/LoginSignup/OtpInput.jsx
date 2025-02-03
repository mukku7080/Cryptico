import { useState, useEffect } from "react";
import { HStack, PinInput, PinInputField, Button, Text, VStack, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function OTPInput({ verification }) {
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes (120 seconds)
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    // Timer Effect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsResendDisabled(false); // Enable the resend button
        }
    }, [timeLeft]);
    const navigate = useNavigate("");

    const handleSubmit = () => {
        if (verification == 'Email') {
            navigate('/number-verification');
        }

    }

    // Handle Resend OTP
    const handleResendOTP = () => {
        setTimeLeft(120); // Reset timer to 2 minutes
        setIsResendDisabled(true);
        setOtp(""); // Clear OTP input
        console.log("OTP Resent!");
    };

    // Format timer display (MM:SS)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    return (
        <VStack spacing={4} p={6} >

            <Text fontSize="lg" fontWeight="bold" color={'orange'}>{`Enter ${verification} OTP`} </Text>

            <HStack>
                <PinInput otp onComplete={(value) => setOtp(value)} >
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                </PinInput>
            </HStack>

            <Text color="gray.600">Time Left: {formatTime(timeLeft)}</Text>

            <Button
                colorScheme="orange"
                isDisabled={otp.length !== 4}
                onClick={ handleSubmit}
            >
                Submit OTP
            </Button>

            <Button
                colorScheme="red"
                variant="ghost"
                onClick={handleResendOTP}
                isDisabled={isResendDisabled}
            >
                Resend OTP
            </Button>
        </VStack>
    );
}

export default OTPInput;
