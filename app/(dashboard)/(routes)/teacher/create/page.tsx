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

import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { useCurrentUser } from "@/hooks/use-current-user"

export const CreateCourseSchema = z.object({
  title: z.string().min(1, {
      message: "Title is required"
  }),
  })

const CreateCoursePage = () => {

  const router = useRouter()
  const user = useCurrentUser()

  if(!user){
router.push("/")
  }
  if(user?.role === "USER"){
    router.push("/")
  }

    const form = useForm<z.infer<typeof CreateCourseSchema>>({
        resolver: zodResolver(CreateCourseSchema),
        defaultValues:{
          title: ""
        }
          })

          const {isSubmitting, isValid} = form.formState;

         const onSubmit = async (values: z.infer< typeof CreateCourseSchema>)=> {
try {
  const response = await axios.post("/api/courses", values)

  router.push(`/teacher/courses/${response.data.id}`)
  toast.success("Blog Created")
} catch (error) {
  toast.error("Something Went wrong")
  
}

         }
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6 ">
<div>
  <h1 className="text-2xl">Name your Blog</h1>

  <p>
    What would you like to name your Blog? Don't worry, you change this later
  </p>

  <Form
  {...form}
  >
<form 
onSubmit={form.handleSubmit(onSubmit)}
className="space-y-8 mt-8"
>
  <FormField
  control={form.control}
  name="title"
  render={({field})=> (
    <FormItem>
<FormLabel>
  Blog title
</FormLabel>
<FormControl>
  <Input
  disabled={isSubmitting}
  placeholder="e.g. '......'"
  {...field}
  />
</FormControl>
<FormDescription>
  What will you teach us  in this Blog?
</FormDescription>
<FormMessage/>
    </FormItem>
  )}

  />
  <div className="flex items-center gap-x-2">
<Link href={"/"}>
<Button
type="button"
variant={"destructive"}
>
  Cancel
</Button>
</Link>
<Button
type="submit"
disabled={!isValid || isSubmitting}
>
Continue
</Button>
  </div>
</form>
  </Form>
</div>
    </div>
  )
}

export default CreateCoursePage