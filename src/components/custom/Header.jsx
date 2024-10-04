import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'

export default function Header() {
    const {user, isSignedIn,isLoaded} = useUser();
    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className='flex justify-between p-3 px-5 shadow-md'>
            <div className='flex'>
                <img src='/logo.svg' width={40} height={40}/>
                <span className='content-center ml-2 text-lg font-bold'>ResumeMaker</span>
            </div>
            
            {isSignedIn? 
                <div className='flex items-center gap-2'>
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
        </header>
    )
}
