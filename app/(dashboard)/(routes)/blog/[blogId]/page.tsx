
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { CalendarDays} from "lucide-react"
import { db } from "@/lib/db"
import { Preview } from "@/components/preview"
import Image from "next/image"
import { Footer } from "./_components/card-forter"
import {BlogComments} from "./_components/comment"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default async function BlogDetails({
    params
}:{
    params: {blogId: string}
}) {
    const blog = await db.course.findFirst({
        where: {
          isPublished: true,
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      <main className="max-w-7xl mx-auto py-3 sm:px-3 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card className="mb-8 ">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {blog?.title}
              </CardTitle>
              <div className="md:flex md:items-center space-x-4 text-sm text-gray-500">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="flex items-center">

                  <span> {new Date(blog?.createdAt as Date).toLocaleDateString('en-Us',{
year: "numeric",
month: "long",
day: 'numeric'
                  }
                    
                  )}</span>
                  </div>
                  <CalendarDays className="mr-1 h-4 w-4" />

<div className="flex items-center">
<p className="ml-2 font-bold text-muted-foreground mr-1">Author: </p> 
                   <Avatar className="h-8 w-8 mr-2">
                     <AvatarImage src={blog?.userImage || ""} />
                     <AvatarFallback>{blog?.author?.[0]}</AvatarFallback>
                   </Avatar>
                   <p className="text-sm font-serif text-muted-foreground ">
                       {blog?.author}
                       </p>
                   </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                {blog?.chapter.map((chapter)=> (
                    <>
                    <h1 className="font-bold text-lg">
                        {chapter.title}
                    </h1>
                    <div>
                    </div>
                  <div className=" 
                   ">
                    <Preview
value={chapter.description as string}
      />
{chapter.imageUrl && (
<div className="flex justify-center">
                    <div className="relative aspect-video rounded-md overflow-hidden h-[25rem] w-[25rem]  ">
                        <Image
                        src={chapter?.imageUrl || ""}
                        fill
                        alt="object-cover "
                        />
                      </div>
</div>
)}
                  </div>
                    </>
                ))}
                
                
                {/* Add more content as needed */}
              </div>
            </CardContent>
            <Footer
  url={`https://fcblog-two.vercel.app/blog/${blog?.id}`}
  title="Blog Post"
  text="Check out this amazing blog post!"
/>

          </Card>

<BlogComments
comments={blog?.Comment}
blogId = {blog?.id}
/>
         
        </div>
      </main>
    </div>
  )
}