import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { db } from "@/lib/db"
import { Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function AboutPage({
  params
}:{
  params: {userId: string}
}) {

  const user = await db.user.findUnique({
    where:{
      id:params.userId
    }
  })
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Card className="overflow-hidden">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/3">
                <Image
                  src={user?.image || ""}
                  alt={user?.name || "User Image"}
                  width={300}
                  height={300}
                  className="rounded-full shadow-lg"
                />
              </div>
              <div className="w-full md:w-2/3 space-y-6">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{user?.name}</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Student at Bishop Barham University | Aspiring Professional
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Hello! I&apos;m {user?.name}, a passionate student at Bishop Barham University. Welcome to my corner of the internet where I share my journey through academia and beyond.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  On this blog, you&apos;ll find a diverse range of content reflecting my interests and experiences:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Coding projects and programming insights</li>
                  <li>Research findings and academic explorations</li>
                  <li>Creative endeavors and personal reflections</li>
                  <li>Insights into student life and professional development</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300">
                  I&apos;m excited to share my work, connect with like-minded individuals, and contribute to our collective knowledge. Whether you&apos;re a fellow student, a professional, or simply curious, I hope you&apos;ll find something here that inspires or informs you.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                  href={`/blog/${user?.id}/posts`}
                  >
                  <Button>
                    Explore My Projects
                  </Button>
                  </Link>
                  <Link
                  href={`/blog/${user?.id}/posts`}
                  >
                  <Button variant="outline">
                    Read My Latest Posts
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Let&apos;s Connect</h2>
              <div className="flex gap-4">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}