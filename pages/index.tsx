import type { NextPage } from 'next';
import Head from 'next/head';
import FontList from '../components/font-list';
import ThorTypeMeta from '../components/thor-type-meta';

const Home: NextPage = () => {
  return (
    <div>    
      <Head>
        <ThorTypeMeta></ThorTypeMeta>
      </Head>
      <FontList></FontList>
    </div>

  )
}

export default Home
