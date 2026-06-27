import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllStudent,
  getAllFaculty,
  getAllAdmin,
  getAllDepartment,
  getNotice,
} from "../../redux/actions/adminActions";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudent());
    dispatch(getAllFaculty());
    dispatch(getAllAdmin());
    dispatch(getAllDepartment());
    dispatch(getNotice());
  }, [dispatch]);

  return (
    <div className="bg-[#020617] h-screen w-full flex items-center justify-center overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col bg-[#0f172a]/60 backdrop-blur-3xl h-[92vh] w-[96%] rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Header Section */}
        <div className="w-full border-b border-white/5 bg-white/[0.02]">
          <Header />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Fixed width with a subtle separator */}
          <div className="w-64 md:w-72 border-r border-white/5 bg-slate-900/40 backdrop-blur-md hidden md:block">
            <Sidebar />
          </div>

          {/* Body Content - Scrollable area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar bg-transparent">
            <div className="p-4 md:p-6 animate-fade-in">
              <Body />
            </div>
          </div>
        </div>

        {/* System Footer Bar (Optional but looks premium) */}
        <div className="h-8 bg-slate-900/80 border-t border-white/5 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">System Online</span>
          </div>
          <span className="text-[10px] text-slate-600 font-medium">Dashboard V.2.1.0 • Webtechfly Cloud</span>
        </div>
      </div>

      {/* Tailwind Custom Scrollbar Logic (Add this to your global CSS if needed) */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AdminHome;