import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Badge,
  Flex,
  Image,
  Menu,
  MenuList,
  MenuButton,
  MenuItem
} from '@chakra-ui/react'
import { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";

function CryptoAccordion({ title, btn1, btn2, isOptionButton }) {

  const [option, setOption] = useState(cryptoOption[0].name);
  return (
    <Accordion defaultIndex={[0]} allowMultiple gap={10} width={'100%'}  >


      <AccordionItem  >
        <h2>
          <AccordionButton>
            <Box as='span' flex='1' fontSize={'lg'} fontWeight={600} textAlign='left' p={5}>
              {title}
            </Box>
            <AccordionIcon />
          </AccordionButton>

        </h2>
        <AccordionPanel mt={5}>
          <Box width={'full'} borderBottom={'1px solid #dcdcdc'} display={'flex'} justifyContent={'space-between'} >
            <Flex>
              <Button
                bg={'transparent'}
                borderRadius={0}
                rightIcon={<Mybadge />}
                _hover={{ bg: 'orange' }}
              >
                {btn1}
              </Button>
              <Button
                bg={'transparent'}
                borderRadius={0}
                rightIcon={<Mybadge />}
                _hover={{ bg: 'orange' }}
              >
                {btn2}
              </Button>
            </Flex>
            {
              isOptionButton &&
              <Menu>
              {/* <MenuButton as={Button} colorScheme='orange' display={{base:'flex',md:'none'}}>
              <MdKeyboardArrowDown />
              </MenuButton> */}
                <MenuButton as={Button} variant={'outline'} borderRadius={0}  border={'1px solid #dcdcdc'} rightIcon={<MdKeyboardArrowDown />} >
                  {option}

                </MenuButton>
                <MenuList borderRadius={0}>
                  {cryptoOption.map((data, index) => (
                    <>
                      <MenuItem key={index} onClick={() => setOption(data.name)} color={'gray'}>{data.name}</MenuItem>
                    </>
                  ))}

                </MenuList>
              </Menu>
            }

          </Box>
          <Box display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}



          >
            <Image p={5} src='imagelogo/cryptico.png' w={'200px'} h={'160px'}></Image>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

const Mybadge = () => {
  return (

    <Badge

      borderRadius="full"
      bg="orange"
      color="white"
      px={2}
    >
      1
    </Badge>
  )
}

const cryptoOption = [
  { name: 'All CryptoCurrencies' },
  { name: 'Bitcoin' },
  { name: 'Ethereum' },
  { name: 'USDC' },
  { name: 'Tether' },
]

export default CryptoAccordion;