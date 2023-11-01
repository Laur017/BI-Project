/* eslint-disable no-unused-vars */
import Logo from '../../assets/note_d.png'
import {Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
        <Link className="left-nav" to="/">
            <h1>Music Store</h1>
            <img src={Logo} />
        </Link>

        <div className="right-nav">
            <Link to="/associations"><button>Associations</button></Link>
            <Link to="/sales"><button>Sales Evolution</button></Link>
            <Link to="/supply"><button>Supply</button></Link>
            <Link to="/predicting"><button>Predicting</button></Link>
            <Link to="/future"><button>Future Evolution</button></Link>
        </div>
    </nav>
  )
}
