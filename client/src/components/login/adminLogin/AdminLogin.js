import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { adminSignIn } from "../../../redux/actions/adminActions";
import { Visibility, VisibilityOff, AdminPanelSettings, Security, ArrowForward } from "@mui/icons-material";
import Spinner from "../../../utils/Spinner";

const AdminLogin = () => {
  const [translate, setTranslate] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);

  // Trigger the sliding entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setTranslate(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Sync errors from Redux store
  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(adminSignIn({ username, password }, navigate));
  };

  return (
    <div className="bg-[#020617] h-screen w-screen flex items-center justify-center overflow-hidden font-sans">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="relative flex flex-col md:flex-row items-center justify-center z-10">
        
        {/* Left Panel: Branding & Identity */}
        <div
          className={`h-[520px] w-80 md:w-[400px] bg-white z-20 flex flex-col items-center justify-center shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[2.5rem] md:rounded-r-none border-r border-slate-100
            ${translate ? "md:translate-x-0" : "md:translate-x-[50%] opacity-0 md:opacity-100"}`}
        >
          <div className="p-5 bg-emerald-500 rounded-2xl mb-6 shadow-xl shadow-emerald-200 animate-bounce-slow">
            <AdminPanelSettings className="text-white !text-5xl" />
          </div>
          <h1 className="text-5xl font-black text-slate-900 text-center tracking-tighter leading-[0.9]">
            ADMIN <br /> <span className="text-emerald-500 font-medium text-4xl">PORTAL</span>
          </h1>
          <div className="mt-8 flex items-center gap-2 text-slate-400">
            <Security fontSize="small" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Encrypted Access</span>
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <form
          onSubmit={login}
          className={`h-[520px] w-80 md:w-[400px] bg-[#0f172a]/80 backdrop-blur-2xl z-10 flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-[2.5rem] md:rounded-l-none border border-white/10 shadow-2xl
            ${translate ? "md:translate-x-0" : "md:translate-x-[-50%]"}`}
        >
          <div className="w-full px-10 md:px-14 flex flex-col gap-6">
            <div className="space-y-1">
              <h2 className="text-white text-3xl font-bold italic tracking-tight">Login</h2>
              <p className="text-slate-500 text-xs font-medium">System Administrator Authentication</p>
              <div className="h-1 w-12 bg-emerald-500 rounded-full mt-2" />
            </div>

            {/* Username Field */}
            <div className="space-y-2 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                Admin Username
              </label>
              <input
                onChange={(e) => { setUsername(e.target.value); setError({}); }}
                value={username}
                type="text"
                required
                className="w-full bg-white/5 text-white px-4 py-4 rounded-xl border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                placeholder="Ex: root_admin"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2 group relative">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                Master Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => { setPassword(e.target.value); setError({}); }}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-white/5 text-white px-4 py-4 rounded-xl border border-white/10 focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors"
                >
                  {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                </button>
              </div>
            </div>

            {/* Error Handling */}
            {error.usernameError || error.passwordError ? (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-medium text-center animate-shake">
                {error.usernameError || error.passwordError}
              </div>
            ) : null}

            {/* Submit Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full group py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-xl shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] mt-2 overflow-hidden relative"
            >
              {loading ? (
                <Spinner height={20} width={20} color="#000" />
              ) : (
                <>
                  <span className="tracking-tight">INITIALIZE SESSION</span>
                  <ArrowForward className="group-hover:translate-x-1 transition-transform" fontSize="small" />
                </>
              )}
            </button>
          </div>
          
          <p className="absolute bottom-6 text-[10px] text-slate-600 font-bold tracking-[0.2em] uppercase">
            Webtechfly Admin v2.1
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;