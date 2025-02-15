import { useState } from 'react'
import './App.css'
import Navbarnew from './CustomComponents/Navbar/Navbarnew'
import Footer from './CustomComponents/Footer/Footer'
import Hero from './CustomComponents/HeroSection/Hero'
import { Container, useColorModeValue } from '@chakra-ui/react'
import { Outlet, Route, Routes } from 'react-router-dom'
import Signupnew from './CustomComponents/LoginSignup/Signupnew'
import Loginnew from './CustomComponents/LoginSignup/Loginnew'
import UserDashboard from './CustomComponents/Afterlogin/UserDashboard/UserDashboard'
import Numberwithotp from './CustomComponents/LoginSignup/Numberwithotp'
import Profile from './CustomComponents/Afterlogin/Profile'
import TradeHistory from './CustomComponents/Afterlogin/UserDashboard/TradeHistory'
import RecentTradeHistory from './CustomComponents/Afterlogin/UserDashboard/RecentTradeHistory'
import PaymentMethod from './CustomComponents/Afterlogin/UserDashboard/PaymentMethod'
import ProtectedRoute from './CustomComponents/AuthContext/ProtectedRoute'
import { AuthProvider } from './Context/AuthContext'
import Buy from './CustomComponents/Buy&Sell/Buy'
import CreateOffers from './CustomComponents/Offers/CreateOffers'
import UserProvider from './Context/userContext'
import Sell from './CustomComponents/Buy&Sell/Sell'
import Redirect from './CustomComponents/LoginSignup/Redirect'

function App() {
  const [count, setCount] = useState(0)
  const bgColor = useColorModeValue("#f5f7fa", "gray.900");

  return (
    <>



      <AuthProvider>
        <UserProvider>

          <Container maxW={'container.xxl'} margin={0} padding={0} bg={bgColor}>


            <Navbarnew />



            <Routes>
              <Route path='/' element={<Hero />}></Route>
              <Route path='/login' element={<Loginnew />}></Route>
              <Route path='/signup' element={<Signupnew />}></Route>
              <Route path="/number-verification" element={<ProtectedRoute><Numberwithotp /></ProtectedRoute>} />
              <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} >
                <Route index element={<TradeHistory />} />
                <Route path="tradehistory" element={<TradeHistory />} />
                <Route path="recentTradePartners" element={<RecentTradeHistory />} />
              </Route>
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/paymentMethod" element={<ProtectedRoute><PaymentMethod /></ProtectedRoute>} />
              <Route path='/buy' element={<ProtectedRoute><Buy /></ProtectedRoute>} />
              <Route path='/sell' element={<ProtectedRoute><Sell /></ProtectedRoute>} />
              <Route path='/createOffers' element={<ProtectedRoute><CreateOffers /></ProtectedRoute>} />
              <Route path='/redirect' element={<Redirect/>}></Route>

            </Routes>



            <Footer />




          </Container>
        </UserProvider>

      </AuthProvider>

    </>
  )
}

export default App
