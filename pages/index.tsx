import type { NextPage } from 'next'
import FontList from '../components/font-list';
import NavBar from '../components/navbar';
import 'bootstrap/dist/css/bootstrap.css';

const Home: NextPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <FontList></FontList>
    </div>

  )
}

export default Home
