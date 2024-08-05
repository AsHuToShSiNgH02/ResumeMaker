import Header from '@/components/custom/Header'
import { SignIn } from '@clerk/clerk-react'
import React from 'react'

export default function SignInPage() {
  return (
    <div className='flex justify-center mt-36 items-center'>
        <SignIn/>
    </div>
  )
}
