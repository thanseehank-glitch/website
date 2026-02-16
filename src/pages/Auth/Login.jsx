import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./Login.css"
import { useAuth } from '../../Context/AuthContext'

function Login() {
  const {Login}=useAuth()
  const[Navigate]=useNavigate()

  return (
    <div>
      
    </div>
  )
}

export default Login
