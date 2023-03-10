import Head from 'next/head';
import {
  Box,
  Divider,
  Grid,
  Heading,
  Text,
  Stack,
  Container,
  Link,
  Button,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { Product, Dependency, WalletSection } from '../components';
import { useWallet } from "@cosmos-kit/react";
import { useEffect,useState } from "react";
import { dependencies, products } from '../config';

import { HelloCosmwasmQueryClient } from "../ts/HelloCosmwasm.client"

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [hello,setHello] = useState<String | null>(null);
  const { getSigningCosmWasmClient, address } = useWallet();


  useEffect(() => {
    if(address){
      getSigningCosmWasmClient().then(async (cosmwasmClient) => {
        if (!cosmwasmClient || !address) {
          console.error("cosmwasmClient undefined or address undefined.");
          return;
        }

        let contract = new HelloCosmwasmQueryClient(cosmwasmClient, "juno1sc9jk03atg2urgedenc5h4363804cwaqqt2qk7mervp5qgf99zhsxw9dt0")
        let response = await contract.getHelloWorld()
        setHello(response.msg)
      });
    }
  },[address,getSigningCosmWasmClient])

  return (
    <Container maxW="5xl" py={10}>
      <Head>
        <title>Create Cosmos App</title>
        <meta name="description" content="Generated by create cosmos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="end" mb={4}>
        <Button variant="outline" px={0} onClick={toggleColorMode}>
          <Icon
            as={colorMode === 'light' ? BsFillMoonStarsFill : BsFillSunFill}
          />
        </Button>
      </Flex>



      <Box textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          fontWeight="extrabold"
          mb={3}
        >
          Create Cosmos App
        </Heading>
        <Heading
          as="h1"
          fontWeight="bold"
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          <Text as="span">Welcome to&nbsp;</Text>
          <Text
            as="span"
            color={useColorModeValue('primary.500', 'primary.200')}
          >
            CosmosKit + Next.js
          </Text>
        </Heading>
      </Box>

      <WalletSection />

      { hello != null && (
        <Box textAlign="center">
          <Heading
            as="h5"
            fontSize={{ base: 'xl', sm: '3xl', md: '2xl' }}
            mb={14}
          >
            Contract get_hello query response = {hello}
          </Heading>
        </Box>
      ) }

      <Box mb={3}>
        <Divider />
      </Box>
      <Stack
        isInline={true}
        spacing={1}
        justifyContent="center"
        opacity={0.5}
        fontSize="sm"
      >
        <Text>Built with</Text>
        <Link
          href="https://cosmology.tech/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cosmology
        </Link>
      </Stack>
    </Container>
  );
}
