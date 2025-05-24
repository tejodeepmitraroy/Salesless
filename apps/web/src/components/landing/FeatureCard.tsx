
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ExternalLink, Building, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  ctaText?: string;
  bulletPoints?: string[];
  tagText?: string;
  imageUrl?: string;
};

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  ctaText = "Learn more", 
  bulletPoints = [],
  tagText,
  imageUrl
}: FeatureCardProps) => {
  const renderIcon = () => {
    switch(icon) {
      case 'Clock':
        return <Clock className="h-6 w-6 text-[#00B86B]" />;
      case 'ExternalLink':
        return <ExternalLink className="h-6 w-6 text-[#00B86B]" />;
      case 'Building':
        return <Building className="h-6 w-6 text-[#00B86B]" />;
      case 'User':
        return <User className="h-6 w-6 text-[#00B86B]" />;
      default:
        return <Clock className="h-6 w-6 text-[#00B86B]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ 
        opacity: 0, 
        y: -20, 
        transition: { duration: 0.3, ease: "easeIn" } 
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card className={`border ${imageUrl ? 'border-0' : 'border-gray-100'} shadow-sm transition-shadow h-full overflow-hidden ${imageUrl ? 'bg-blue-50' : 'bg-white'}`}>
        <CardContent className={`p-6 ${imageUrl ? 'p-0 flex flex-col md:flex-row' : ''}`}>
          {imageUrl ? (
            <>
              <div className="p-6 flex-1">
                {tagText && (
                  <span className="inline-block px-3 py-1 bg-white text-sm font-medium rounded-full mb-4">
                    {tagText}
                  </span>
                )}
                <h3 className="font-bold text-2xl mb-4 text-gray-800">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="space-y-3 mb-6">
                  {bulletPoints.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-[#00B86B] mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <p className="text-gray-600">{point}</p>
                    </div>
                  ))}
                </div>
                <Button className="bg-[#00B86B] hover:bg-green-700 text-white">
                  {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <img 
                  src={imageUrl} 
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            </>
          ) : (
            <>
              <div className="bg-green-50 p-3 inline-block rounded-lg mb-4">
                {renderIcon()}
              </div>
              <h3 className="font-bold text-xl mb-2">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              <Button variant="link" className="p-0 h-auto text-[#00B86B] hover:text-green-700 font-medium">
                {ctaText} <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
