import React from 'react'

/* Using React Tilt for our logo */
import Tilt from 'react-tilt';

import brain from './brain.png';

/* Styles for our component */
import './Logo.css';



/* Simple Function (Dumb) Component

Is the logo for our page.

*/

export default function Logo() {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img style={{paddingTop: '5px'}} src={brain} alt="brain" /> 
                </div>
            </Tilt>
        </div>
    )
}
