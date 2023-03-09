import { Container, Heading, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react';
import { NextPage } from 'next'
import Navbar from '../../components/Navbar';
import Parent from './parent';

const Home: NextPage = () => {

  return (
    <>
      <Container>
        <Heading className='welcome-heading'>
          Welcome to the CRUD
        </Heading>
      </Container>
    </>
  )
}

export default Home
