import type { NextPage } from 'next'
import Link from "next/link";
import FontList from '../components/font-list';

const Home: NextPage = () => {
  return (
    <div>
      <h1> ThorType </h1>
      <FontList></FontList>
      <Link href="/about">
        <a>
          About
        </a>
      </Link>
    </div>

  )
}

export default Home
