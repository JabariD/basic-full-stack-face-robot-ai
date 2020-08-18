import React from 'react'

/* CSS Styling for form */
import './ImageLinkForm.css';

/* 
Interaction with the user.
*/

export default function ImageLinkForm({ onInputChange, onPictureSubmit }) {
    return (
        <div>
            <p className="f3">
                {'This Magic Brain Will Detect Faces In Your Pictures. Give it a Try!'}
            </p>

            
            <div className="center">
                <div className="center form pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onPictureSubmit} >Detect!</button>
                </div>
            </div>
        </div>
    )
}