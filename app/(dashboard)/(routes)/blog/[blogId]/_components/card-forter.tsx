"use client"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button";
import {  CardFooter } from "@/components/ui/card"

export const Footer = ({ url, title, text }:{
    url: string;
    title: string;
    text: string
}) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <CardFooter className="flex justify-between">
      {/* <Button variant="outline">
        <ThumbsUp className="mr-2 h-4 w-4" />
        Like
      </Button> */}
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </CardFooter>
  );
};

export default CardFooter;
