import React from 'react'
import NotificationBell from '../Afterlogin/Notificationbell'
import { Button, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

const BuySellWithNotification = () => {
  const navigate= useNavigate();
  return (
    <>
      <Flex w={'100%'} bgColor={'#f68206'} justifyContent={'center'} alignItems={'center'} py={2} display={{ base: 'flex' , lg: 'none' }} position={'fixed'} top={14} left={0} zIndex={100}  >

        <Flex
          maxW={{ base: "90%", lg: '90%', xl: "90%" }}
          minW={{ base: "90%", sm: '90%', lg: '90%', xl: "90%" }}
          gap={{ base: 2, sm: 5, lg: 10 }}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Flex gap={{ base: 2, sm: 5, lg: 10 }} >

            <Button bg={'transparent'} variant={'outline'} size={'sm'} px={{ base: 10, sm: 20 }} onClick={()=>navigate('/buy')} >Buy</Button>
            <Button bg={'transparent'} variant={'outline'} size={'sm'} px={{ base: 10, sm: 20 }} onClick={()=>navigate('/sell')}>sell</Button>
          </Flex>
          <NotificationBell />

        </Flex>
      </Flex>
    </>
  )
}

export default BuySellWithNotification