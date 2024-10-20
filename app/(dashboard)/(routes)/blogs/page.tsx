import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from '@/lib/db'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'



export default async function BlogList() {
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
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">All Blogs</h1>
        <p className="text-xl text-muted-foreground">Explore our latest articles and insights</p>
      </header>

      <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
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
     

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No blogs found. Check back later for new content!</p>
        </div>
      )}
   
    </div>
  )
}