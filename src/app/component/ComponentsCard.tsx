"use client";

import Link from "next/link";
import React from "react";

interface ComponentCardProps {
  title: string;
  description: string;
  image?: string;
  video?: string;
  id: string;
}

const ComponentsCard: React.FC<ComponentCardProps> = ({
  title,
  description,
  image,
  video,
  id,
}) => {
  return (
    <Link
      href={`/components/${id}`}
      className="w-full md:w-[30%] min-h-[15rem] md:min-h-[13rem] p-5 rounded-md border-[1px] border-zinc-600"
    >
      {
        <div className="h-[80%]">
          {(image && (
            <img
              src={image}
              alt={title}
              className="w-full rounded-sm h-full object-center"
            />
          )) ||
            (video && (
              <video
                src={video}
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              />
            ))}
        </div>
      }
      <div className="my-2 text-white">
        <h3 className="md:text-lg font-semibold">{title}</h3>
        <p className="text-zinc-600">{description}</p>
      </div>
    </Link>
  );
};

export default ComponentsCard;
