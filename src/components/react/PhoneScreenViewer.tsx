import { cn } from "@/lib/utils";
import type { ImageMetadata } from "astro";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface PhoneScreenViewerProps {
  screens: {
    src: string | ImageMetadata;
    alt: string;
    caption?: string;
    type?: "image" | "video";
  }[];
  className?: string;
  variant?: "ios" | "android" | "minimal";
}

interface CarouselDotsProps {
  count: number;
  current: number;
  onDotClick: (index: number) => void;
}

function CarouselDots({ count, current, onDotClick }: CarouselDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            index === current
              ? "bg-gray-800 dark:bg-gray-200 w-6"
              : "bg-gray-400 dark:bg-gray-600"
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default function PhoneScreenViewer({ 
  screens, 
  className,
  variant = "minimal" 
}: PhoneScreenViewerProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState<{
    src: string | ImageMetadata;
    alt: string;
    caption?: string;
  } | null>(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  const isVideo = (screen: typeof screens[0]) => {
    if (screen.type === "video") return true;
    if (screen.type === "image") return false;
    const src = typeof screen.src === 'string' ? screen.src : screen.src.src;
    return src.endsWith('.mp4') || src.endsWith('.webm') || src.endsWith('.mov');
  };

  const getFrameStyles = () => {
    switch (variant) {
      case "ios":
        return "rounded-[2.5rem] border-[8px] border-gray-800 dark:border-gray-700 bg-black md:shadow-2xl";
      case "android":
        return "rounded-[2rem] border-[6px] border-gray-900 dark:border-gray-600 bg-black md:shadow-2xl";
      case "minimal":
      default:
        return "rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 md:shadow-xl";
    }
  };

  const getImageStyles = () => {
    switch (variant) {
      case "ios":
        return "rounded-[2rem]";
      case "android":
        return "rounded-[1.5rem]";
      case "minimal":
      default:
        return "rounded-xl";
    }
  };

  return (
    <>
      {/* Mobile Carousel (shown on small screens) */}
      <div className={cn("block md:hidden my-8 not-prose", className)}>
        <Carousel
          setApi={setApi}
          className="w-full max-w-xs mx-auto"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {screens.map((screen, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center gap-3">
                  <div
                    className={cn(
                      "relative overflow-hidden inline-block w-full max-w-[320px] cursor-pointer",
                      getFrameStyles()
                    )}
                    onClick={() => setSelectedImage(screen)}
                  >
                    {isVideo(screen) ? (
                      <video
                        src={typeof screen.src === 'string' ? screen.src : screen.src.src}
                        className={cn(
                          "w-full h-auto object-contain",
                          getImageStyles()
                        )}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={typeof screen.src === 'string' ? screen.src : screen.src.src}
                        alt={screen.alt}
                        className={cn(
                          "w-full h-auto object-contain",
                          getImageStyles()
                        )}
                      />
                    )}
                  </div>
                  {screen.caption && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-[280px]">
                      {screen.caption}
                    </p>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
  
        </Carousel>
        {screens.length > 1 ? <CarouselDots
          count={screens.length}
          current={current}
          onDotClick={scrollToSlide}
        /> : null}
      </div>

      {/* Desktop Grid (shown on medium screens and up) */}
      <div
        className={cn(
          "hidden md:flex flex-wrap gap-6 justify-center items-start my-8 not-prose",
          className
        )}
      >
        {screens.map((screen, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "relative overflow-hidden inline-block max-w-[320px] cursor-pointer",
                "transition-transform duration-300 hover:scale-105",
                getFrameStyles()
              )}
              onClick={() => setSelectedImage(screen)}
            >
              {isVideo(screen) ? (
                <video
                  src={typeof screen.src === 'string' ? screen.src : screen.src.src}
                  className={cn(
                    "w-full h-auto object-contain max-w-[250px]",
                    getImageStyles()
                  )}
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={typeof screen.src === 'string' ? screen.src : screen.src.src}
                  alt={screen.alt}
                  className={cn(
                    "w-full h-auto object-contain max-w-[250px]",
                    getImageStyles()
                  )}
                />
              )}
            </div>
            {screen.caption && (
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-[280px]">
                {screen.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="w-auto max-w-[90vw] max-h-[90vh] p-0 overflow-hidden">
          {selectedImage && (
            <>
              <DialogTitle className="sr-only">{selectedImage.alt}</DialogTitle>
              <DialogDescription className="sr-only">
                Preview of {selectedImage.alt}
              </DialogDescription>
              <div className="relative flex flex-col items-center">
                {isVideo(selectedImage) ? (
                  <video
                    src={typeof selectedImage.src === 'string' ? selectedImage.src : selectedImage.src.src}
                    className="max-w-full max-h-[85vh] object-contain"
                    controls
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    src={typeof selectedImage.src === 'string' ? selectedImage.src : selectedImage.src.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                )}
                {selectedImage.caption && (
                  <p className="px-6 py-3 text-sm text-gray-600 dark:text-gray-400 text-center">
                    {selectedImage.caption}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}