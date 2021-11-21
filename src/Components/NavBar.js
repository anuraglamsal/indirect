import './NavBar.css';

import {
  Link
} from 'react-router-dom';

function NavBar() {
  return (
    <ul>
      <li> <Link to = "/home"> Home </Link> </li>
      <li> <Link to = "/about"> About </Link> </li>
      <li> <Link to = "/"> Page3 </Link> </li>
      <li> <Link to = "/"> Page4 </Link> </li>
    </ul>
  );
}

export default NavBar;
