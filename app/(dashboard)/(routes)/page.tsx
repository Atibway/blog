import Link from "next/link"
import {
  Card,
  CardContent,

  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { db } from "@/lib/db"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Ripple from "@/components/ui/ripple"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default async function Component() {
const blogs = await db.course.findMany({
  where: {
    isPublished: true
  },
  include: {
    chapter:{
      where: {
        isPublished: true
      }
    }
  }
})
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section 
        >
           <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background ">
           <div className="container px-4 md:px-">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to FcBlog
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                A platform dedicated to showcasing student projects, ideas, and experiences. Explore a diverse range of blogs featuring insights, creative work, and educational journeys. Whether you are looking for inspiration, resources, or simply want to see what students are working on, this is the place to find it. Connect with a community of learners and creators sharing their progress, challenges, and achievements
                </p>
              </div>
            
            </div>
          </div>
      <Ripple/>
    </div>
          
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Recent Posts</h2>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {blogs.map((blog) => (
                
                <Card key={blog.id}>
                  <CardHeader>
                    <CardTitle>
                      {blog.title}
                    </CardTitle>
                 </CardHeader>

                 <CardHeader>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={blog?.userImage || ""} />
                      <AvatarFallback>{blog?.author?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-semibold">
                        {blog.author}
                        </CardTitle>
                      <p className="text-xs text-gray-500"><span> {new Date(blog?.createdAt as Date).toLocaleDateString('en-Us',{
year: "numeric",
month: "long",
day: 'numeric'
                  }
                    
                  )}</span></p>
                    </div>
                  </div>
                </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2 ">
                      <div>
                   {blog?.description?.length as number > 500?(
                   <>
                   {blog.description?.substring(0, 500)}...
                   </>
                   ):(
                    blog.description
                   )}
                      </div>
                      <div className="relative aspect-video rounded-md overflow-hidden">
                        <Image
                        src={blog?.imageUrl || ""}
                        fill
                        alt="object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/blog/${blog.id}`}
                    >
                      <Button>
                      Read More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
     
    </div>
  )
}

