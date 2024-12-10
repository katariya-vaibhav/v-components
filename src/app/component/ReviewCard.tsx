import React from "react";
import { MdDelete } from "react-icons/md";

interface ReviewProps {
  username: string;
  feedback: string;
  onDelete: () => void;
  feedbackId: string;
  userId: string;
}

const ReviewCard: React.FC<ReviewProps> = ({
  username,
  feedback,
  onDelete,
  feedbackId,
  userId,
}) => {
  return (
    <div className="bg-zinc-800 flex flex-col items-center justify-center text-zinc-50 h-full  p-4 relative shadow-md w-full">
      <h4 className="text-lg md:text-xl font-semibold mb-2">
        {username} says ,{" "}
      </h4>
      <p className="text-zinc-400 text-sm mb-4 break-words w-full min-h-[15vh] scrollbar overflow-y-auto">
        {feedback}
      </p>
      {userId === feedbackId && (
        <button
          onClick={onDelete}
          className="py-[5px] px-2 bg-zinc-600 absolute top-5 right-10 hover:bg-zinc-700 rounded-lg"
        >
          <MdDelete />
        </button>
      )}
    </div>
  );
};

export { ReviewCard };
