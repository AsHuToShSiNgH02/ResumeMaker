import { Brain, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { AIChatSession } from './../../../../service/AIModel';
import { toast } from 'sonner';

const PROMPT='position titile: {positionTitle} , Depends on position title give me 5-7 bullet points(dot bullet points) of 1-2 lines for my experience in resume , give me result in HTML format'

function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
  const [value, setValue] = useState(defaultValue);
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  
  const GenerateSummeryFromAI=async()=>{
    if(!resumeInfo.experience[index].title){
      toast('Please add position title first');
      return;
    }
    setLoading(true);
    const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
    const result=await AIChatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp=result.response.text()
    // setValue(resp);
    setValue(resp.replace('[','').replace(']',''));
    setLoading(false);
    
  }
  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-sm'>Summery</label>
        <Button variant="outline" size="sm" 
        onClick={()=>GenerateSummeryFromAI()}
        className="flex gap-2 border-primary text-primary">
          {loading?
          <LoaderCircle className='animate-spin'/>:
          <>
            <Brain className='w-4 h-4'/>"Generate form AI"
          </>
          }
          </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e);
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>

        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor