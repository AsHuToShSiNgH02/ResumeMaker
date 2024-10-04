import React from 'react'

function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='mb-2 text-sm font-bold text-center'
        style={{
          color: resumeInfo?.themeColor || '#000000'
        }}>
        Skills
      </h2>
      <hr style={{
        borderColor: resumeInfo?.themeColor || '#000000'
      }} />

      <div className='grid grid-cols-2 gap-3 my-4'>
        {resumeInfo?.skills.map((skill, index) => (
          <div key={index} className='flex items-center justify-between'>
            {/* Skill Name */}
            <div className='flex-1 text-xs'>
              • {skill.name}
            </div>
            {/* Skill Rating (larger stars) */}
            <div className='ext-xl '>
              {'★'.repeat(skill.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsPreview;
