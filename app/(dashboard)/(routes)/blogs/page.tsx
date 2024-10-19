import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { db } from '@/lib/db'
import Image from 'next/image'



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
     

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No blogs found. Check back later for new content!</p>
        </div>
      )}
   
    </div>
  )
}