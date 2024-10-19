import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { db } from "@/lib/db"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Ripple from "@/components/ui/ripple"


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
                 A space where you can share your thoughts, stories, and experiences without judgment. Whether you are seeking peace, clarity, or simply a place to express yourself, we are here to support you. Dive into our community of insights, reflections, and resources aimed at helping you navigate life ups and downs. No matter where you are on your journey, this is your safe space to post anything, connect, and grow. Let us stress less, live mindfully, and support each other along the way!
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
                    <CardDescription>
                    {new Date(blog.createdAt).toLocaleDateString('en-Us',{
year: "numeric",
month: "long",
day: 'numeric'
                  }
                    
                  )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2">
                      <div>
                   {blog.description}
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

