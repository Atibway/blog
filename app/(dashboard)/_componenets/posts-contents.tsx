"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from 'next/link'
import { Course } from '@prisma/client'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'



interface PostsContentsProps {
  
    posts: Course[]
}
export const PostsContentsHome = ({
posts
}: PostsContentsProps) => {
    const [visiblePosts, setVisiblePosts] = useState(3)

  const loadMore = () => {
    setVisiblePosts(prevVisible => Math.min(prevVisible + 3, posts.length))
  }
  return (
    <>
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, visiblePosts).map(post => (
            <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
        
                <div className="text-sm  prose prose-sm dark:prose-invert">
              
              <Image
                src={post?.imageUrl || ""}
                alt="post thumbnail"
                height="200"
                width="200"
                className="rounded-lg mb-10 object-cover"
              />
            
            {post?.description?.length as number > 200?(
                 <>
                 {post.description?.substring(0, 200)}...
                 </>
                 ):(
                  post.description
                 )}
          </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center mt-auto">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={post?.userImage || ""} />
                      <AvatarFallback>{post?.author?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-semibold">
                        {post.author}
                        </CardTitle>
                      <p className="text-xs text-gray-500"><span> {new Date(post?.createdAt as Date).toLocaleDateString('en-Us',{
year: "numeric",
month: "long",
day: 'numeric'
                  }
                    
                  )}</span></p>
                    </div>
                  </div>
                </div>
                <Link href={`/blog/${post.userId}/${post.id}`} passHref>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                    Read More <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        {visiblePosts < posts.length && (
          <div className="mt-12 text-center">
            <Button onClick={loadMore} className="bg-blue-600 hover:bg-blue-700 text-white">
              Load More Posts
            </Button>
          </div>
        )}

    </>
  )
}
