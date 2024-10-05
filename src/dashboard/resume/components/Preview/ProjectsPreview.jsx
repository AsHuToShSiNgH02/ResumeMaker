import React from 'react'

function ProjectsPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='mb-2 text-sm font-bold text-center'
        style={{
          color: resumeInfo?.themeColor || '#000000'
        }}
      >Personal Projects</h2>
      <hr style={{
        borderColor: resumeInfo?.themeColor || '#000000'
      }} />

      {resumeInfo?.projects.map((project, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold'
            style={{
              color: resumeInfo?.themeColor || '#000000'
            }}
          >{project.title}</h2>
          <p className='my-2 text-xs'>
            {project?.description}
          </p>
          <p className='text-xs'>
            <strong>Tech Stack:</strong> {project?.techStack}
          </p>
          <p className='text-xs'>
            <strong>Project Link:</strong> <a href={project?.projectLink} target="_blank" rel="noopener noreferrer">{project?.projectLink}</a>
          </p>
        </div>
      ))}
    </div>
  )
}

export default ProjectsPreview