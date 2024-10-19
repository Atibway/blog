
import { IconBadge } from '@/components/icon-badge'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import {  LayoutDashboard, ListChecks } from 'lucide-react'
import { redirect } from 'next/navigation'
import { TitleForm } from './_components/TitleForm'
import { DescriptionForm } from './_components/DescriptionForm'
import { ImageForm } from './_components/ImageForm'

import { ChaptersForm } from './_components/Chapters-form'
import { Banner } from '@/components/banner'
import { Actions } from './_components/Actions'


const CourseIdPage = async({
    params
}: {
    params: {courseId: string}
}) => {

    const user = await currentUser()
if(!user){
return redirect("/")
}


      if(user?.role === "USER"){
        redirect("/")
      }


    const course = await db.course.findUnique({
        where: {
            id: params.courseId,
            userId: user.id
        },
        include: {
            chapter:{
orderBy:{
    position: "asc"
}
            }
        }
    })
    if(!course){
        return redirect("/")
            }
        

    

    const requiredFields = [
        course.title,
        course.description,
        course.imageUrl,
        course.chapter.some(chapter => chapter.isPublished)
    ]

    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(Boolean).length;
    
    const completionText = `(${completedFields}/${totalFields})`
    
    const isComplete = requiredFields.every(Boolean);
  return (
    <>
     {!course.isPublished&&(
    <Banner
    variant={"warning"}
    label='This Blog is unpublished. it will not be visible to the students.'
    />
   )} 
    <div className='p-6'>
     <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-y-2'>
<h1 className='text-2xl font-medium'>
    Blog setup
</h1>

<span className='text-sm text-slate-700 dark:text-slate-300'>
Complete all fields {completionText}
</span>
        </div>
        <Actions
        disabled={!isComplete}
        courseId={params.courseId}
        isPublished={course.isPublished}
        />
        </div>  

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-16">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge
                   
                    icon={LayoutDashboard}
                    />
                    <h2 className='text-xl'>
                        Customize your Blog
                    </h2>
                </div>
                <TitleForm
               initialData= {course}
               courseId={course.id}
                />
                <DescriptionForm
               initialData= {course}
               courseId={course.id}
              
                />
                <ImageForm
               initialData= {course}
               courseId={course.id}
                />
                
            </div>
            <div className="space-y-6">
<div>
    <div className="flex items-center gap-x-2">
<IconBadge
icon={ListChecks}
/>
<h2>
    Blog chapters
</h2>
    </div>
    <ChaptersForm
               initialData= {course}
               courseId={course.id}
              
                />
</div>

            </div>
        </div>
    </div>
    </>
  )
}

export default CourseIdPage