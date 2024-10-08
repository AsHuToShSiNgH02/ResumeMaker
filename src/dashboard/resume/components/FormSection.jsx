import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import PersonalProjects from './forms/PersonalProjects';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex]=useState(1);
  const [enableNext,setEnableNext]=useState(false);
  const {resumeId}=useParams();
  return (
    <div>
        <div className='flex items-center justify-between'>
          <div className='flex gap-5'>
            <Link to={"/dashboard"}>
              <Button><Home/></Button>
            </Link>
            <ThemeColor/>
          </div>
          
          <div className='flex gap-2'>
            {activeFormIndex>1
            &&<Button size="sm" 
            onClick={()=>setActiveFormIndex(activeFormIndex-1)}> <ArrowLeft/> </Button> }
            <Button 
            // disabled={!enableNext}
            className="flex gap-2" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
            > Next 
            <ArrowRight/> </Button>
          </div>
        </div>
        {/* Personal Detail  */}
        {activeFormIndex==1?  
        <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==2?
              <Summery  enabledNext={(v)=>setEnableNext(v)} />
        :activeFormIndex==3?
          <PersonalProjects />
          :activeFormIndex==4?
          <Experience />  
          :activeFormIndex==5?
          <Education/>
          :activeFormIndex==6?
          <Skills/>
          :activeFormIndex==7?
          <Navigate to={'/my-resume/'+resumeId+"/view"}/>
              
        :null
          }

    </div>
  )
}

export default FormSection;