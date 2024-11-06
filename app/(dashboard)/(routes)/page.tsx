
import { db } from "@/lib/db"
import Ripple from "@/components/ui/ripple"

import { PostsContentsHome } from "../_componenets/posts-contents"
import { UserCard } from "@/app/blog/[userId]/_components/user-card"



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
        <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Blog Community</h1>
        <p className="text-xl text-muted-foreground">Discover insightful articles from our talented writers</p>
      </header>
      <div>



  <UserCard
  users={users}
  />



      </div>
    </div>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Recent Posts</h2>
            <div className="">
             <PostsContentsHome
           posts={blogs}
             />
            </div>
          </div>
        </section>
      </main>
     
    </div>
  )
}

