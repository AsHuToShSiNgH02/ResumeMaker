import Header from '@/components/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="container flex-grow px-4 py-12 mx-auto">
        <section className="mb-16 text-center">
          <h1 className="mb-4 text-6xl font-bold">Build Your Resume <span className='text-gray-600'> With AI</span></h1>
          <p className="mb-8 text-xl text-gray-600">Effortlessly Craft a Standout Resume with our AI-Powered Builder</p>
          
        </section>
        <section className="mb-8 text-center">
          <div>
            <h2 className="mb-4 text-4xl font-bold text-center">How it works?</h2>
            <p className="mb-4 text-xl text-gray-600">Give Your Interviews In Just 3 Simpler Easy Steps</p>
          </div>
        </section>
        
        <section className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-bold">AI-Powered Resume Builder</h2>
            <p className="text-gray-600">Create a professional resume in minutes with our advanced AI technology. Tailored suggestions and formatting for your industry.</p>
          </div>
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-bold">Edit your form</h2>
            <p className="text-gray-600">Easily modify and update your resume information. Our intuitive interface allows for quick edits and real-time previews.</p>
          </div>
          <div className="p-6 text-center bg-white rounded-lg shadow-md">
            <h2 className="mb-2 text-xl font-bold">Download and share your resume</h2>
            <p className="text-gray-600">Export your polished resume in various formats and easily share it with potential employers or on professional networks.</p>
          </div>
        </section>

        <section className="text-center">
          <h2 className="mb-4 text-2xl font-bold">Ready to join?</h2>
          <p className="mb-4 text-gray-600">Sign up now and start exploring!</p>

          <Link to={'/auth/sign-in'}>
              <Button>Get Started</Button>
          </Link>
          {/* <button className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600">
            Sign Up
          </button> */}
        </section>
      </main>
    </div>
  )
}
