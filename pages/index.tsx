import type { NextPage } from 'next';
import FontList from '../components/font-list';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>
          ThorType
        </title>
      </Head>
      <FontList></FontList>
    </div>

  )
}

export default Home
