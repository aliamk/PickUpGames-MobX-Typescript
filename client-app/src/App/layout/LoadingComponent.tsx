import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'


// Add the inverted and content properties directly inside the object/type loading component (instead of adding them to an Interface)
// Then destructure these props from the objects inside the parameters

const LoadingComponent: React.FC<{inverted?: boolean, content?: string}> = ({ inverted = true, content}) => {
    return (
        <Dimmer active inverted={inverted} >
            <Loader content={content} />
        </Dimmer>
    )
}

export default LoadingComponent