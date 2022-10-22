import type { NextPage } from 'next'
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <h1> ThorType </h1>
      <Link href="/about">
        <a>
          About
        </a>
      </Link>
    </div>

  )
}

export default Home
