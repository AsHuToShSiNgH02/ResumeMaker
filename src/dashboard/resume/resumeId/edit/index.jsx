import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection'
import ResumePreview from '../../components/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import dummy from '@/data/dummy'
import GlobalApi from './../../../../../service/GlobalApi'

function EditResume() {
  const {resumeId}=useParams();
  const [resumeInfo,setResumeInfo]=useState();
  useEffect(()=>{
      GetResumeInfo();
  },[])

  const GetResumeInfo=()=>{
      GlobalApi.GetResumeById(resumeId).then(resp=>{
        const resumeData = resp.data.data.attributes;
        console.log(resumeData);
        setResumeInfo(resumeData);
      })
  }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
    <div className='grid grid-cols-1 gap-10 p-10 md:grid-cols-2'>
        {/* Form Section  */}
        <FormSection/>
        {/* Preview Section  */}
        <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}                             

export default EditResume