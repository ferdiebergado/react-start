import { NavLink } from 'react-router'

export default function Header() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/" end>
                        Home
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
