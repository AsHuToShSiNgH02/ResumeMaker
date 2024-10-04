import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {

    const [resumeInfo,setResumeInfo]=useState();
    const {resumeId}=useParams();
    // console.log('Resume ID:', resumeId);
    useEffect(()=>{
        GetResumeInfo();
    },[])
    
    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp);
            setResumeInfo(resp.data.data.attributes);
        })
    }

    const handleDownload=()=>{
        window.print();
    }
    
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div id='no-print'>
        <Header/>
        <div >
            <h2 className='mt-10 text-2xl font-medium text-center'>Congrats! Your Ultimate AI generates Resume is Ready</h2>
            <p className='text-center text-gray-500'>Now you are ready to download your resume and you can share unique url</p>
            <div className='flex justify-between py-8 px-44'>
                <Button onClick={handleDownload}>Download</Button>
                <RWebShare
                    data={{
                    text: "Hello, Everyone, This is my resume please open url to see it",
                    url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                    title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <Button>Share</Button>
                </RWebShare>
            </div>
        </div>

        </div>
        <div id="print-area" className='mx-10 my-10 md:mx-20 lg:mx-36'>
            <ResumePreview/>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume