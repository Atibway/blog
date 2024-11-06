
import { db } from '@/lib/db'
import { UserCard } from '@/app/blog/[userId]/_components/user-card'

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

      const users = await db.user.findMany({
        where: {
          role: "ADMIN",
          Course: {
            some: {
              isPublished: true,
            },
          },
        }
      });
      
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">All Blogs</h1>
        <p className="text-xl text-muted-foreground">Explore our latest articles and insights</p>
      </header>

      <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            
            <UserCard
  users={users}
  />
           
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