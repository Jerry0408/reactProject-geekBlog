import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken } from '../utils'

export default function AuthComponent ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to='/login' replace></Navigate>
  }
}
