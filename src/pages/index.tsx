import { Container, Heading, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import { NextPage } from 'next'
import Navbar from '../../components/Navbar';
import Parent from './parent';

const Home: NextPage = () => {

  return (
    <>
      <Container>
        <Heading>
          Welcome to the CRUD
        </Heading>
        <StatGroup mt={3}>
          <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type='increase' />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type='decrease' />
              9.05%
            </StatHelpText>
          </Stat>
        </StatGroup>
      </Container>
    </>
  )
}

export default Home
