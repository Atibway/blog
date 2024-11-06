
import { db } from "@/lib/db"

import { HelloSection } from "./_components/herro-section"

import { PostsContents } from "./_components/posts-contents"


export default async function BlogDetails({
    params
}:{
    params: {userId: string}
}) {
  const blogs = await db.course.findMany({
    where:{
      isPublished: true,
      userId: params.userId
    }
  })
  const user = await db.user.findUnique({
    where:{
      id: params.userId
    }
  })
    
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <HelloSection
        user={user!}
        />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Recent Posts</h2>
            <div className="">
              <PostsContents
             
              posts={blogs}
              />
            </div>
          </div>
        </section>
    </div>
  )
}