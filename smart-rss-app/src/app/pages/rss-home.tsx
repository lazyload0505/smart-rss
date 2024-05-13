"use client";
import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import { Check} from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

import MOCK_YOUTUBE_RSS_FEEDS from '@/app/pages/test-mock-youtube-rss';

export default function RSSHome() {
  return (
    <>
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {MOCK_YOUTUBE_RSS_FEEDS.map((feed, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/4"
            >
              <div className="p-1">
                <Card className="w-auto">
                  <CardHeader className="p-2">
                    <CardTitle className="text-base h-20">{feed.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="destructive">Youtube</Badge> <Badge variant="secondary">AI/LLM</Badge> <Badge variant="outline">{feed.author.name}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col aspect-square p-2">
                    <div className="items-center justify-center">
                    <img className="rounded-md "
                    src={feed.thumbnailUrl}
                    alt="Picture of the author"
                    />
                    </div>
                    <div className="h-28 rounded-md border p-4 text-sm text-ellipsis overflow-hidden hover:text-clip">
                        {feed.description}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Check className="mr-2 h-4 w-4" /> Find more detail
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
}
