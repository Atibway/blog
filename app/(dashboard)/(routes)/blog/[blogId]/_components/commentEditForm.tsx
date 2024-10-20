"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useState } from "react"
import { Pencil } from "lucide-react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { Comment } from "@prisma/client"



const formSchema = z.object({
    content: z.string().min(1, {
        message: "comment is required"
    }),
    });

interface  CommentEditFormProps {
    initialData: {
        content: string;
    };
    commentId: string;
    commentDetails: Comment
}

export const CommentEditForm = ({
    initialData,
    commentId,
    commentDetails
}: CommentEditFormProps) => {
const [isEditing, setIsEditing] = useState(false)
const router = useRouter()
const toggleEdit = ()=> setIsEditing((current)=> !current)
const user = useCurrentUser()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:initialData,
      })

      const {isSubmitting, isValid} = form.formState;

      const onSubmit = async (values: z.infer< typeof formSchema>)=> {
try {
  await axios.patch(`/api/users/comment/${commentId}`, values);
  toast.success('Comment updated');
  toggleEdit()
  router.refresh()
} catch (error) {
  toast.error("Something went wrong")
}

        }
  return (
    <div className="mt-6 border bg-slate-100 dark:bg-slate-700 rounded-md p-4">
<div className="font-medium flex items-center justify-between ">
<div>
{!isEditing && (
  <p className="text-sm mt-2">
    {initialData.content}
  </p>
)}
  </div>
  <div>
  {user?.id === commentDetails.userId && (
<Button onClick={toggleEdit} variant={"ghost"}>
  {isEditing? (
    <>
    Cancel
    </>
  ):
  (
    <>
    <Pencil className="h-4 w-4 mr-2"/>
    Edit comment
    </>
  )}
</Button>
  )}
  </div>
 
</div>
{isEditing && (
  <Form
  {...form}
  >
<form 
onSubmit={form.handleSubmit(onSubmit)}
className="space-y-4 mt-4"
>
  <FormField
  control={form.control}
  name="content"
  render={({field})=> (
    <FormItem>
<FormControl>
  <Input
  disabled={isSubmitting}
  placeholder="e.g. '....'"
  {...field}
  />
</FormControl>
<FormMessage/>
    </FormItem>
  )}

  />
  <div className="flex items-center gap-x-2">

<Button
type="submit"
disabled={!isValid || isSubmitting}
>
Save
</Button>
  </div>
</form>
  </Form>
)}
    </div>
  )
}
