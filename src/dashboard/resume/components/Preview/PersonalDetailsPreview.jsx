import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div>
        <h2 className='text-xl font-bold text-center'
        style={{
            color:resumeInfo?.themeColor || '#000000'
        }}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
        </h2>
        
        <h2 className='text-sm font-medium text-center'>
            {resumeInfo?.jobTitle}
        </h2>
        
       <h2 className='text-xs font-normal text-center'
        style={{
            color:resumeInfo?.themeColor || '#000000'
        }}>
            {resumeInfo?.address}
        </h2>

        <div className='flex justify-between'>
            <h2 className='text-xs font-normal'
             style={{
                color:resumeInfo?.themeColor || '#000000'
            }}>{resumeInfo?.phone}</h2>
            
            <h2 className='text-xs font-normal'
             style={{
                color:resumeInfo?.themeColor || '#000000'
            }}>{resumeInfo?.email}</h2>

        </div>
        <hr className='border-[1.5px] my-2'
        style={{
            borderColor:resumeInfo?.themeColor || '#000000'
        }}
        />
    </div>
  )
}

export default PersonalDetailPreview