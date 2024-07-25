import type { NextPage } from 'next';
//import TaskList from '../views/TaskList';
import TaskList from '../components/Task/TaskList';
import LogoutButton from '../components/LogoutButton';
import Login from './login';
import Register from './register';

const Home: NextPage = () => {
  return (
    <div>
      <Register />
    </div>
  );
};

export default Home;