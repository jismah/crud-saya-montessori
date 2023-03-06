import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import prisma from '../../lib/prisma';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  const listStudents = await prisma.student.findMany();

  return {
    props: { listStudents },
    revalidate: 10
  }
}


// async function main() {
//   const students = await prisma.student.findMany()
//   console.log(students);
// }


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Saya Montessori | CRUD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to our CRUD
        </h1>
        
      </main>
    </div>
  )
}
