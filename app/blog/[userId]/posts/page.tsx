import { Card } from "@/components/ui/card";
import { BookOpen, Coffee, Lightbulb } from "lucide-react";
import { PostsContents } from "../_components/posts-contents";
import { db } from "@/lib/db";


export default async function EnhancedPostsPage({
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
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Welcome to My Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Explore my journey through university, coding adventures, and personal growth
          </p>
          <div className="flex justify-center space-x-4 mb-8">
            <Card className="w-32 h-32 flex flex-col items-center justify-center">
              <BookOpen className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Insightful Articles</p>
            </Card>
            <Card className="w-32 h-32 flex flex-col items-center justify-center">
              <Coffee className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Student Life</p>
            </Card>
            <Card className="w-32 h-32 flex flex-col items-center justify-center">
              <Lightbulb className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Tech Insights</p>
            </Card>
          </div>
        </header>

        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">Latest Posts</h2>
        <PostsContents
       
        posts={blogs}
        />
      </div>
    </div>
  )
}