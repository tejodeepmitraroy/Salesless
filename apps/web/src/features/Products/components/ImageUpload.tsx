import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, Trash2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { ProductImage } from '@/features/Products/schema';

interface ImageUploadProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  maxImages?: number;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images = [],
  onChange,
  maxImages = 10
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  // Mock S3 upload - in a real implementation, this would use AWS SDK
  const uploadToS3 = async (file: File): Promise<ProductImage> => {
    // Create a temporary ID
    const id = Math.random().toString(36).substring(2, 15);
    
    return new Promise((resolve) => {
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [id]: progress }));
        
        if (progress >= 100) {
          clearInterval(interval);
          
          // Create a local object URL for the file (this would be an S3 URL in production)
          const url = URL.createObjectURL(file);
          
          // Small delay to simulate network latency
          setTimeout(() => {
            // Return the mock S3 object
            resolve({
              id,
              url,
              name: file.name,
              isFeatured: false
            });
            
            // Clear progress
            setUploadProgress(prev => {
              const newState = { ...prev };
              delete newState[id];
              return newState;
            });
          }, 500);
        }
      }, 200);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Filter out non-image files
    const imageFiles = acceptedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length === 0) {
      toast.error("Please upload image files only");
      return;
    }
    
    // Check if adding these would exceed max images
    if (images.length + imageFiles.length > maxImages) {
      toast.error(`You can upload a maximum of ${maxImages} images`);
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Upload all images in parallel
      const uploadPromises = imageFiles.map(file => uploadToS3(file));
      const uploadedImages = await Promise.all(uploadPromises);
      
      // Set the first image as featured if there are no images yet
      if (images.length === 0 && uploadedImages.length > 0) {
        uploadedImages[0].isFeatured = true;
      }
      
      // Add new images to the existing array
      onChange([...images, ...uploadedImages]);
      
      toast.success(`${uploadedImages.length} image${uploadedImages.length > 1 ? 's' : ''} uploaded successfully`);
    } catch (error) {
      toast.error("Failed to upload images. Please try again.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  }, [images, onChange, maxImages]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    disabled: isUploading || images.length >= maxImages
  });

  const removeImage = (id: string) => {
    onChange(images.filter(image => image.id !== id));
  };

  const setFeaturedImage = (id: string) => {
    onChange(images.map(image => ({
      ...image,
      isFeatured: image.id === id
    })));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return;
    
    const newImages = [...images];
    const [movedImage] = newImages.splice(from, 1);
    newImages.splice(to, 0, movedImage);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive 
            ? "border-primary bg-primary/5" 
            : "border-gray-300 hover:border-primary",
          isUploading || images.length >= maxImages ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-8 w-8 text-gray-500" />
          <p className="text-sm font-medium">
            {isDragActive
              ? "Drop the files here..."
              : isUploading
              ? "Uploading..."
              : images.length >= maxImages
              ? `Maximum ${maxImages} images reached`
              : "Drag & drop images, or click to select"}
          </p>
          <p className="text-xs text-gray-500">
            {isUploading 
              ? "Please wait while we upload your images" 
              : "PNG, JPG, and JPEG up to 5MB"}
          </p>
        </div>
      </div>

      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([id, progress]) => (
            <div key={id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Uploading...
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium flex justify-between items-center">
            <span>Product Images</span>
            <span className="text-xs text-gray-500">{images.length} of {maxImages}</span>
          </div>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            layout
          >
            <AnimatePresence>
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                  className="relative group border rounded-md overflow-hidden aspect-square"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Badge for featured image */}
                  {image.isFeatured && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  
                  {/* Overlay with controls */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                    <div className="flex space-x-2">
                      {!image.isFeatured && (
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => setFeaturedImage(image.id)}
                          className="text-xs"
                        >
                          Set as Featured
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => removeImage(image.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 flex justify-between w-full px-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        onClick={() => moveImage(index, index - 1)}
                        disabled={index === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                        onClick={() => moveImage(index, index + 1)}
                        disabled={index === images.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
