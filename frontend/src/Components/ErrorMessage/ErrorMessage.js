import React from 'react'
import { Alert } from 'react-bootstrap'

const ErrorMessage = ({ varient = 'danger', children }) => {
    return (
        <Alert varient={varient} style={{ fontSize: 20 }}>
            <strong>{children}</strong>
        </Alert>
    )
}
const Successmessage = ({ varient = 'success', children }) => {
    return (
        <Alert varient={varient} style={{ fontSize: 20 }}>
            <strong>{children}</strong>
        </Alert>
    )
}

export default ErrorMessage