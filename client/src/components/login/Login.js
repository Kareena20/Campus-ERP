import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserTie, FaUserGraduate } from "react-icons/fa";

const Login = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random(),
      speed: Math.random() * 0.02 + 0.01,
    }));

    const animate = () => {
      ctx.fillStyle = "#02040a";
      ctx.fillRect(0, 0, width, height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(Math.sin(s.opacity))})`;
        ctx.fill();
        s.opacity += s.speed;
        s.y -= 0.1;
        if (s.y < 0) s.y = height;
      });
      requestAnimationFrame(animate);
    };

    animate();
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-screen relative overflow-hidden flex flex-col justify-center items-center bg-[#02040a]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl px-6 animate-fadeInCustom">
        <header className="mb-16 text-center">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em]">
            Official Academic Portal
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            WEBTECHFLY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">OFFICIAL</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto font-light">
            Select your portal to continue.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Faculty Card */}
          <Link to="/login/facultylogin" className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-[2.5rem] opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
            <div className="relative flex flex-col items-center p-12 bg-[#0a0c14]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 transition-all duration-500 hover:-translate-y-2">
              <div className="p-6 rounded-3xl bg-blue-500/10 text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                <FaUserTie size={60} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Faculty</h2>
              <div className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all">
                Enter Suite
              </div>
            </div>
          </Link>

          {/* Student Card */}
          <Link to="/login/studentlogin" className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-[2.5rem] opacity-20 group-hover:opacity-100 transition duration-500 blur"></div>
            <div className="relative flex flex-col items-center p-12 bg-[#0a0c14]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 transition-all duration-500 hover:-translate-y-2">
              <div className="p-6 rounded-3xl bg-emerald-500/10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform duration-500">
                <FaUserGraduate size={60} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Student</h2>
              <div className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-center group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all">
                Access Portal
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInCustom {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInCustom { animation: fadeInCustom 1s ease-out forwards; }
        `}
      </style>
    </div>
  );
};

export default Login;