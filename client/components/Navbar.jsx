import React, { useState } from 'react';

const Navbar = () => {
    const [query, setQuery] = useState('');
    return (
         <nav>
            <div>
                <a className='navbar'>Navbar</a>
                <button className='navbar-adjuster' type='button'>
                    <span className='navbar-adjuster-icon'></span>
                </button>
                <div>
                    <ul className='navbar-nav'>
                        <li>
                            <a className='nav-link' href='#'>Logo Placeholder</a>
                        </li>
                        <li>
                            <a className='nav-link' href='#'>My Fridge</a>
                        </li>
                        <li>
                            <input id="input" value={query} placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                        </li>
                        <li>
                            <a className='nav-link' href='#'>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>       
    )
}

export default Navbar;