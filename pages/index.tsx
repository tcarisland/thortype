import type { NextPage } from 'next'
import Link from "next/link";
import FontList from '../components/font-list';

const Home: NextPage = () => {
  return (
    <div>
      <h1> ThorType </h1>
      <Link href="/about">
        <a>
          About
        </a>
      </Link>
      <FontList></FontList>
    </div>

  )
}

export default Home
