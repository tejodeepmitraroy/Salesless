
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  imageUrl?: string;
};

const TestimonialCard = ({ quote, author, role, imageUrl }: TestimonialCardProps) => {
  return (
    <Card className="border border-gray-200 transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="mb-4">
          <svg width="45" height="36" className="text-gray-300" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 18H9C9.83333 12.5 13.5 9.5 18 9L16.5 4.5C9.5 6 4 12 4.5 22.5C4.83333 28.6667 8 31.5 12 31.5C14.8333 31.5 18 29.5 18 24.5C18 20.5 16.3333 18.5 13.5 18ZM34.5 18H30C30.8333 12.5 34.5 9.5 39 9L37.5 4.5C30.5 6 25 12 25.5 22.5C25.8333 28.6667 29 31.5 33 31.5C35.8333 31.5 39 29.5 39 24.5C39 20.5 37.3333 18.5 34.5 18Z" fill="currentColor"/>
          </svg>
        </div>
        <p className="text-gray-700 mb-6">{quote}</p>
        <div className="flex items-center">
          {imageUrl ? (
            <img src={imageUrl} alt={author} className="h-10 w-10 rounded-full mr-3" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <User size={20} className="text-gray-500" />
            </div>
          )}
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
