import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function PersonalProjects() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [projectList, setProjectList] = useState([
    {
      title: '',
      description: '',
      techStack: '',
      projectLink: ''
    }
  ])

  useEffect(() => {
    resumeInfo && setProjectList(resumeInfo?.projects)
  }, [])

  const handleChange = (event, index) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
  }

  const AddNewProject = () => {
    setProjectList([...projectList,
      {
        title: '',
        description: '',
        techStack: '',
        projectLink: ''
      }
    ])
  }

  const RemoveProject = () => {
    setProjectList(projectList => projectList.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true);

    // Ensure data structure aligns with Strapi schema
    const data = {
        data: {
            projects: projectList.map(({ id, ...rest }) => rest)
        }
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp => {
      console.log(resp);
      setLoading(false);
      toast('Details updated !');
  }).catch(error => {
      console.log(error.response); // Log the full error response
      setLoading(false);
      toast('Server Error, Please try again!');
  });
  
};


  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      projects: projectList
    })
  }, [projectList])

  return (
    <div className='p-5 mt-10 border-t-4 rounded-lg shadow-lg border-t-primary'>
      <h2 className='text-lg font-bold'>Personal Projects</h2>
      <p>Add your personal project details</p>

      <div>
        {projectList.map((item, index) => (
          <div>
            <div className='grid grid-cols-2 gap-3 p-3 my-5 border rounded-lg'>
              <div className='col-span-2'>
                <label>Project Title</label>
                <Input name="title"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.title}
                />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Textarea name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                />
              </div>
              <div>
                <label>Tech Stack</label>
                <Input name="techStack"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.techStack}
                />
              </div>
              <div>
                <label>Project Link</label>
                <Input name="projectLink"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.projectLink}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewProject} className="text-primary"> + Add More Project</Button>
          <Button variant="outline" onClick={RemoveProject} className="text-primary"> - Remove</Button>
        </div>
        <Button disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default PersonalProjects