import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { facultySignIn } from "../../../redux/actions/facultyActions";
import { Visibility, VisibilityOff, Shield, School, ArrowForward } from "@mui/icons-material";
import Spinner from "../../../utils/Spinner";

const FacultyLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const canvasRef = useRef(null);

  // Advanced Canvas Background with Mouse Interaction
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationFrameId;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(100, 210, 255, 0.15)";
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > canvas.width) p.x = 0;
        if (p.y > canvas.height) p.y = 0;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
    };
  }, []);

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(facultySignIn({ username, password }, navigate));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#05070a] selection:bg-cyan-500/30">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
      
      {/* Container - Split Layout */}
      <div className="relative z-10 w-full max-w-5xl h-[600px] flex overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl bg-[#0a0c14]/80 backdrop-blur-3xl m-4">
        
        {/* Left Side: Branding/Visuals */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-cyan-600/20 to-blue-900/40 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="p-2 bg-cyan-500 rounded-lg shadow-lg shadow-cyan-500/50">
                <School className="text-white" />
              </div>
              <span className="text-white font-bold text-xl tracking-tight">WEBTECHFLY</span>
            </div>
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Manage your <span className="text-cyan-400">Classroom</span> <br /> 
              with Intelligence.
            </h2>
            <p className="mt-4 text-gray-400 max-w-sm">
              The unified portal for modern educators to track attendance, grades, and schedules.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-4 text-xs text-gray-500 uppercase tracking-widest">
            <Shield fontSize="small" className="text-cyan-500" />
            End-to-End Encrypted Faculty Access
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/[0.02]">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">Faculty Login</h3>
            <p className="text-gray-500 text-sm">Please enter your credentials to proceed.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none"
                placeholder="Ex: John_Doe_99"
              />
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-xs font-semibold text-gray-400 uppercase ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 focus:bg-white/10 focus:ring-4 focus:ring-cyan-500/5 transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                </button>
              </div>
            </div>

            {error.usernameError || error.passwordError ? (
              <p className="text-red-400 text-xs bg-red-400/10 p-3 rounded-lg border border-red-400/20 animate-shake">
                {error.usernameError || error.passwordError}
              </p>
            ) : null}

            <button
              disabled={loading}
              className="w-full group relative py-4 bg-white text-black font-bold rounded-xl hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-xl shadow-white/5"
            >
              {loading ? (
                <Spinner height={20} width={20} color="#000" />
              ) : (
                <>
                  <span>SIGN IN</span>
                  <ArrowForward className="group-hover:translate-x-1 transition-transform" fontSize="small" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-600">
            System V.2.0.4 • Privacy Policy • Help Center
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;