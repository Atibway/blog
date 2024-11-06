import React from 'react'
import { PostDetail } from './_components/post-details'
import { db } from '@/lib/db'

const PageDetails = async({
  params
}:{
  params: {userId: string, blogId: string}
}) => {
  const blog = await db.course.findFirst({
    where: {
      isPublished: true,
      userId: params.userId,
      id: params.blogId
    },
    include: {
      chapter:{
        where: {
          isPublished: true
        },
        orderBy:{
          position:"asc"
        },
       
        },
  Comment: {
    where: {
      courseId: params.blogId
   }
 }   
   },

   
   
 })

  return (
    <div>
      <PostDetail
      blog={blog!}
      comment={blog?.Comment || []}
      chapters={blog?.chapter || [] }
      />
    </div>
  )
}

export default PageDetails