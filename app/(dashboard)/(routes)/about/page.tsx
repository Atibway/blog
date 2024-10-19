import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Twitter, Instagram, Github } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">About Us</h1>
        <p className="text-xl text-muted-foreground">Get to know the team behind the blog</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome to our blog! We're passionate about sharing knowledge and insights on technology, design, and innovation. Our journey began in 2023 with a simple goal: to create a space where curious minds can learn, grow, and connect.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We strive to demystify complex topics, spark creativity, and foster a community of lifelong learners. Through our articles, we aim to inspire and empower our readers to embrace new technologies and ideas.</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Meet the Author</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6">
            <img 
              src="https://utfs.io/f/DsLOkL63obGsflQZSdgb1vXWZzao4BU6ANuVEsPwhM5rFSmn" 
              alt="Author" 
              className="rounded-full w-48 h-48 object-cover mx-auto md:mx-0"
            />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Ainebyoona Atidu</h3>
              <p className="text-muted-foreground">
                Atidu is a tech enthusiast with over a decade of experience in software development and design. 
                When he's not writing or coding, you can find him exploring At Bishop Barham Uiversity.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Textarea placeholder="Your Message" />
              <Button type="submit">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Facebook</span>
          </Button>
          <Button variant="outline" size="icon">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Twitter</span>
          </Button>
          <Button variant="outline" size="icon">
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Button>
          <Button variant="outline" size="icon">
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Button>
        </div>
      </footer>
    </div>
  )
}