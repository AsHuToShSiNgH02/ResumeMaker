import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

export default function Header() {
    const {user, isSignedIn,isLoaded} = useUser();
    return (
        <div className='p-3 px-5 flex justify-between shadow-md'>
            <div className='flex'>
                <img src='/logo.svg' width={40} height={40}/>
                <span className='content-center ml-2 font-bold text-lg'>ResumeMaker</span>
            </div>
            
            {isSignedIn? 
                <div className='flex gap-2 items-center'>
                    <Link to={'/dashboard'}>
                        <Button variant='outline'>Dashboard</Button>
                    </Link>
                    <UserButton className='size-3'/>
                </div>:
                <Link to={'/auth/sign-in'}>
                    <Button>Get Started</Button>
                </Link>
            }
            
        </div>
    )
}
