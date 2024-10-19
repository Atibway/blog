"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

import {  Comment} from "@prisma/client"

interface BlogCommentsProps {
  comments:  Comment[] | undefined
  blogId: string | undefined
}

export const CreateCourseSchema = z.object({
  content: z.string().min(1, {
      message: "Title is required"
  }),
  })

export  function BlogComments({
comments,
blogId
}:BlogCommentsProps) {
  
  const [newComment, setNewComment] = useState("")

  const router = useRouter()

    const form = useForm<z.infer<typeof CreateCourseSchema>>({
        resolver: zodResolver(CreateCourseSchema),
        defaultValues:{
          content: ""
        }
          })

          const {isSubmitting, isValid} = form.formState;

         const onSubmit = async (values: z.infer< typeof CreateCourseSchema>)=> {
try {
  const response = await axios.post(`/api/courses/${blogId}`, values)
  router.refresh()
  toast.success("Comment sent")
} catch (error) {
  toast.error("You cannot comment twice")
  router.refresh()
}

         }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
     
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          <div className="mb-8">
            {comments?.length as any > 0 && (

            <h2 className="text-2xl font-bold mb-4">
              Comments
            </h2>
            )}
            {comments?.map((comment) => (
              <Card key={comment.id} className="mb-4">
                <CardHeader>
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={comment?.userImage || ""} />
                      <AvatarFallback>{comment?.userName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-sm font-semibold">
                        {comment.userName}
                        </CardTitle>
                      <p className="text-xs text-gray-500"><span> {new Date(comment?.createdAt as Date).toLocaleDateString('en-Us',{
year: "numeric",
month: "long",
day: 'numeric'
                  }
                    
                  )}</span></p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Leave a Comment</CardTitle>
            </CardHeader>
            <CardContent>
          
               <Form
  {...form}
  >
<form 
onSubmit={form.handleSubmit(onSubmit)}
className="space-y-8 mt-8"
>
  <FormField
  control={form.control}
  name="content"
  render={({field})=> (
    <FormItem>
<FormControl>
<Textarea
  disabled={isSubmitting}
  placeholder="write your comment here..."
  {...field}
  />
</FormControl>
<FormDescription>
  What would you like to advice us  in this Blog?
</FormDescription>
<FormMessage/>
    </FormItem>
  )}

  />
  <div className="flex items-center gap-x-2">

<Button
type="submit"
disabled={!isValid || isSubmitting}
>
Comment
</Button>
  </div>
</form>
  </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}