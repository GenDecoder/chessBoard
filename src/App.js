import React from 'react'
import MyComponent from './target'

export default class extends React.Component {
    render () {
        return (
            <div>
                <header>
                    GNC COMPONENT
                </header>
                
                <MyComponent/>
            </div>
        );
    }
}