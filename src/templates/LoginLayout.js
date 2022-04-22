import React from 'react'
import { Route } from 'react-router-dom'

export default function LoginLayout(props) {
    let { Component, ...rest } = props
    return ( <
        Route {...rest }
        render = {
            (propsRoute) => {
                return <Component {...propsRoute }
                />
            }
        }
        />
    )
}