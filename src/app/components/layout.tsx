import Navbar from "@/app/component/Navbar";
import Sidebar from "@/app/component/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex ">
        <div className="w-[20%] p-3 h-[90vh] overflow-auto scrollbar">
          <Sidebar />
          
        </div>
        <div className="p-3 h-[90vh] w-[80%] overflow-auto scrollbar">{children}</div>
      </div>
    </>
  );
};

export default layout;
