import React from 'react'
import loading from "./loading.gif"
export const Loading = () => {
    return (
        <div>
            <img src={loading} alt="" style={{width:"200px",display:"block",margin:"auto"}}/>
        </div>
    )
}
