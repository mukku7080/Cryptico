import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbarnew from './CustomComponents/Navbar/Navbarnew'
import Footer from './CustomComponents/Footer/Footer'
import CardComponent from './CustomComponents/Cards/CardComponent'
import Hero from './CustomComponents/HeroSection/Hero'
import ProductsCard from './CustomComponents/Cards/ProductsCard'
import ProductsCard1 from './CustomComponents/Cards/ProductsCard1'
import Section3 from './CustomComponents/HeroSection/Section3'
import { Container, Flex, Box } from '@chakra-ui/react'
import SMDashboard from './CustomComponents/SMDashborad/SMDashboard'
import Section4 from './CustomComponents/HeroSection/Section4'
import CryptoAccordion from './CustomComponents/Accordian/CryptoAccordion'
import ChakraMarquee from './CustomComponents/HeroSection/Marque'
import FastCounterChakra from './CustomComponents/HeroSection/FastCounterChakra'
import Dashborad1 from './CustomComponents/SMDashborad/Dashborad1'
import Signup from './CustomComponents/LoginSignup/Signup'
import Login from './CustomComponents/LoginSignup/Login'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>



      <Container minW={'100%'} margin={0} padding={0} bg={'#f5f7fa'}>



        <Navbarnew />


        <Routes>
          <Route path='/' element={<Hero />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
        </Routes>


        <Footer />




      </Container>

    </>
  )
}

export default App
