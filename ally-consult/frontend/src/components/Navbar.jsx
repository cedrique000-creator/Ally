import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav>
      <h2>Ally Consult</h2>
      <ul>
        <li><NavLink to="/services">Services</NavLink></li>
        <li><NavLink to="/how-it-works">How It Works</NavLink></li>
        <li><NavLink to="/team">Team</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        <li><NavLink to="/book-session" className="cta">Book Session</NavLink></li>
        <li><ThemeToggle /></li>
      </ul>
    </nav>
  )
}
