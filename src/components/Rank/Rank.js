import React from 'react'

export default function Rank({name, entries}) {
    return (
        <div>
            {`${name}, your current entry count is...`}
            <div className='white f1 '>
                {entries}
            </div>
        </div>
    )
}