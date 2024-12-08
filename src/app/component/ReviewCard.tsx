import React from "react";
import { MdDelete } from "react-icons/md";

interface ReviewProps {
  username: string;
  feedback: string;
  onDelete: () => void;
}

const ReviewCard = ({ username, feedback, onDelete }: ReviewProps) => {
  return (
    <div className="bg-zinc-800 text-zinc-50 h-full  p-4 relative shadow-md w-full">
      <h4 className="text-lg font-semibold mb-2">{username}</h4>
      <p className="text-zinc-400 text-sm mb-4">{feedback}</p>
      <button
        onClick={onDelete}
        className="py-[5px] px-2 bg-zinc-600 absolute bottom-5 right-10 hover:bg-zinc-700 rounded-lg"
      >
        <MdDelete />
      </button>
    </div>
  );
};

export { ReviewCard };
