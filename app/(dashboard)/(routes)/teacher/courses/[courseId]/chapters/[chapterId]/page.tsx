
import { IconBadge } from '@/components/icon-badge';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ChapterTitleForm } from './_components/ChapterTitleForm';
import { ChapterDescriptionForm } from './_components/Chapter-DescriptionForm';
import { ImageForm } from './_components/ImageForm';
import { Banner } from '@/components/banner';
import { ChapterActions } from './_components/ChapterActions';



const ChapterIdPage = async({
  params
}: {
  params: {courseId: string; chapterId: string}
}) => {
  const user = await currentUser();
    
    if(!user?.id) {
        return  redirect("/")
    }
    
        if(user?.role === "USER"){
          redirect("/")
        }

    const chapter = await db.chapter.findUnique({
      where: {
        id:params.chapterId,
        courseId: params.courseId
      }
    });
   


    if(!chapter) {
      return  redirect("/")
  }


  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.imageUrl
  ]
  const mustFields = [
    chapter.title,
    chapter.description,
  ]
const totalFields = requiredFields.length;
const completedFields = requiredFields.filter(Boolean).length;

const completionText = `(${completedFields}/${totalFields})`;
const isComplete = mustFields.every(Boolean)
  return (
    <>
    {!chapter.isPublished && (
      <Banner
      variant={"warning"}
      label='This chapter is unpublished. It will not be visible in the Blog'
      />
    )}
    <div className='p-6 '>
    <div className='flex items-center justify-between'>
<div className="w-full">
  <Link
  href={`/teacher/courses/${params.courseId}`}
  className='flex items-center text-sm hover:opacity-75 transition mb-6'
  >
  <ArrowLeft className='h-4 w-4 mr-2'/>
  Back to Blog setup
  </Link>
  <div className="flex items-center justify-between w-full">
    <div className='flex flex-col gap-y-2'>
<h1 className='text-2xl font-medium'>
  Chapter Creation
</h1>
<span className='text-sm text-slate-700'>
  Complete all fields {completionText}
</span>
    </div>
    <ChapterActions
        disabled={!isComplete}
        courseId={params.courseId}
        chapterId={params.chapterId}
        isPublished={chapter.isPublished}
        />
  </div>
</div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
      <div className="space-y-4">
        <div>
          <div className='flex items-center gap-x-2'>
<IconBadge icon={LayoutDashboard}/>
<h2 className='text-xl'>
  Customize your chapter
</h2>
          </div>
          <ChapterTitleForm
          initialData={chapter}
          courseId={params.courseId}
          chapterId={params.chapterId}
          />
           <ChapterDescriptionForm
          initialData={chapter}
          courseId={params.courseId}
          chapterId={params.chapterId}
          />
        </div>
      </div>
          <ImageForm
               initialData= {chapter}
               courseId={params.courseId}
                />
    </div>
    </div>
    </>
  )
}

export default ChapterIdPage