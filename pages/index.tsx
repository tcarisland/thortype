import type { NextPage } from 'next'
import Link from "next/link";
import FontListItem from '../components/font-list-item';
import '../styles/globals.css';

const Home: NextPage = () => {
  return (
    <div>
      <h1> ThorType </h1>
      <Link href="/about">
        <a>
          About
        </a>
      </Link>
      <FontListItem name='hello'>

      </FontListItem>
    </div>

  )
}

export default Home
