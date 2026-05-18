import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X, QrCode, Zap, Calendar, Shield, RefreshCw } from 'lucide-react';
import logo from '../../../assets/logo.png';

const EXPIRY_SECONDS = 60;

// ── Token Generator ───────────────────────────────────────────────────────────
const generateToken = (id, name, plan) => ({
  token: JSON.stringify({
    memberId: id,
    name,
    plan,
    gym: 'The Personality Gym',
    issued: Date.now(),
    expires: Date.now() + EXPIRY_SECONDS * 1000,
    nonce: Math.random().toString(36).slice(2, 10).toUpperCase(),
  }),
  generatedAt: Date.now(),
});

// ── Urgency helpers ───────────────────────────────────────────────────────────
const getUrgency = (seconds) => {
  if (seconds > 30) return { color: '#22c55e', cls: 'text-green-400', label: 'Active' };
  if (seconds > 15) return { color: '#f59e0b', cls: 'text-amber-400', label: 'Expiring soon' };
  return { color: '#ef4444', cls: 'text-red-400', label: 'Expiring!' };
};

// ── Thin arc countdown (small, compact, always fits) ─────────────────────────
const ArcCountdown = ({ seconds, total }) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - seconds / total);
  const { color } = getUrgency(seconds);

  return (
    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
        <circle
          cx="26" cy="26" r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
        />
      </svg>
      <span className="text-sm font-black tabular-nums leading-none" style={{ color }}>
        {seconds}
      </span>
    </div>
  );
};

// ── QR Modal ─────────────────────────────────────────────────────────────────
const QRModal = ({ id, name, plan, onClose }) => {
  const [tokenData, setTokenData] = useState(() => generateToken(id, name, plan));
  const [secondsLeft, setSecondsLeft] = useState(EXPIRY_SECONDS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const intervalRef = useRef(null);

  const startCountdown = useCallback((generatedAt) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - generatedAt) / 1000);
      const remaining = Math.max(0, EXPIRY_SECONDS - elapsed);
      setSecondsLeft(remaining);

      if (remaining === 0) {
        clearInterval(intervalRef.current);
        setIsRefreshing(true);
        setTimeout(() => {
          const next = generateToken(id, name, plan);
          setTokenData(next);
          setSecondsLeft(EXPIRY_SECONDS);
          setIsRefreshing(false);
          startCountdown(next.generatedAt);
        }, 600);
      }
    }, 1000);
  }, [id, name, plan]);

  useEffect(() => {
    startCountdown(tokenData.generatedAt);
    return () => clearInterval(intervalRef.current);
  }, []); // eslint-disable-line

  const handleManualRefresh = () => {
    clearInterval(intervalRef.current);
    setIsRefreshing(true);
    setTimeout(() => {
      const next = generateToken(id, name, plan);
      setTokenData(next);
      setSecondsLeft(EXPIRY_SECONDS);
      setIsRefreshing(false);
      startCountdown(next.generatedAt);
    }, 400);
  };

  const { color, cls, label } = getUrgency(secondsLeft);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Sheet slides up from bottom on mobile, centered on desktop */}
      <motion.div
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="bg-[#0F0F11] border border-white/10 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-xs p-5 flex flex-col items-center gap-4 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] sm:shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Drag pill — mobile only */}
        <div className="w-10 h-1 rounded-full bg-white/20 sm:hidden -mt-1 mb-1" />

        {/* ── Header ── */}
        <div className="flex items-center justify-between w-full">
          <div className="min-w-0">
            <h3 className="text-white font-black text-base uppercase tracking-tight leading-none">Gate Pass</h3>
            <p className={`text-[10px] font-bold mt-0.5 ${cls}`}>{label}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all flex-shrink-0 ml-3"
          >
            <X size={16} />
          </button>
        </div>

        {/* ── QR Code (centred, responsive) ── */}
        <AnimatePresence mode="wait">
          {isRefreshing ? (
            <motion.div
              key="spinner"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-2xl"
              style={{ width: 'min(220px, 72vw)', height: 'min(220px, 72vw)' }}
            >
              <RefreshCw size={32} className="text-gym-orange animate-spin" />
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Refreshing…</p>
            </motion.div>
          ) : (
            <motion.div
              key={tokenData.generatedAt}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-3 rounded-2xl shadow-[0_0_30px_rgba(255,87,34,0.12)]"
            >
              <QRCodeSVG
                value={tokenData.token}
                /* clamp: at least 160px, at most 220px, fits 72% of viewport */
                size={Math.min(220, Math.max(160, Math.round(window.innerWidth * 0.72) - 24))}
                level="H"
                includeMargin={false}
                fgColor="#000000"
                bgColor="#FFFFFF"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Countdown strip ── */}
        <div className="w-full flex items-center gap-3 bg-white/4 border border-white/8 rounded-2xl px-4 py-3">
          {/* Arc ring */}
          <ArcCountdown seconds={secondsLeft} total={EXPIRY_SECONDS} />

          {/* Progress bar + labels */}
          <div className="flex-grow min-w-0 space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Validity</span>
              <span className={`text-[10px] font-black uppercase tracking-wider ${cls}`}>
                {secondsLeft}s remaining
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                animate={{
                  width: `${(secondsLeft / EXPIRY_SECONDS) * 100}%`,
                  backgroundColor: color,
                }}
                transition={{ duration: 1, ease: 'linear' }}
              />
            </div>
            <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest">
              Auto-renews on expiry
            </p>
          </div>

          {/* Manual refresh button */}
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            title="Generate new QR now"
            className="flex-shrink-0 p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* ── Nonce ── */}
        <div className="w-full flex items-center justify-between bg-white/4 border border-white/8 rounded-2xl px-4 py-2.5">
          <span className="text-gray-600 text-[9px] uppercase font-black tracking-widest">Nonce</span>
          <span className="text-gym-orange font-mono font-bold text-xs tracking-wider">
            {JSON.parse(tokenData.token).nonce}
          </span>
        </div>

        <p className="text-gray-600 text-[10px] uppercase font-bold tracking-widest text-center">
          Show to desk staff for gym entry
        </p>
      </motion.div>
    </motion.div>
  );
};

// ── Membership Card ──────────────────────────────────────────────────────────
const MembershipCard = ({ userData }) => {
  const [showQR, setShowQR] = useState(false);

  const id        = userData?.id        || 'PG-2026-X89';
  const name      = userData?.name      || 'Sagar';
  const plan      = userData?.plan      || 'Premium Annual';
  const status    = userData?.status    || 'Active';
  const expiresIn = userData?.expiresIn ?? 12;
  const expiryDate= userData?.expiryDate|| 'Jun 12, 2026';
  const joinDate  = userData?.joinDate  || 'Jan 12, 2026';

  const isUrgent = expiresIn <= 15;
  const accentClass = isUrgent ? 'text-gym-orange' : 'text-[#00FFCC]';

  return (
    <>
      <div className="relative w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A00] via-[#0F0F0F] to-[#0A1A0A]" />
        {/* Diagonal streak */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-1/2 -left-1/4 w-3/4 h-[200%] opacity-20"
            style={{ background: 'linear-gradient(105deg, transparent 40%, #FF5722 40%, #FF5722 42%, transparent 42%)' }}
          />
        </div>
        {/* Dot texture */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
        />
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 w-full h-1"
          style={{ background: `linear-gradient(90deg, #FF5722, ${isUrgent ? '#FF5722' : '#00FFCC'})` }}
        />

        <div className="relative z-10 p-5 md:p-6">
          {/* Row 1: Brand + Status */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Gym" className="w-9 h-9 object-contain" />
              <div>
                <div className="text-white font-black text-sm md:text-base uppercase tracking-tight leading-none">
                  The <span className="text-gym-orange">Personality</span> Gym
                </div>
                <div className="text-gray-400 text-[9px] uppercase tracking-[0.2em] mt-0.5 font-bold">Fitness Club</div>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
              status === 'Active'
                ? 'bg-green-500/10 border-green-500/25 text-green-400'
                : 'bg-red-500/10 border-red-500/25 text-red-400'
            }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {status}
            </div>
          </div>

          {/* Row 2: Member Info + Tap QR */}
          <div className="flex items-end justify-between gap-4 mb-5">
            <div className="min-w-0 flex-grow space-y-3">
              <div>
                <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest mb-0.5">Member</p>
                <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight truncate">{name}</h2>
              </div>
              <div>
                <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest mb-0.5">Member ID</p>
                <p className="text-white/90 font-mono font-bold text-sm tracking-[0.15em]">{id}</p>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setShowQR(true)}
              className="flex-shrink-0 flex flex-col items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gym-orange/30 rounded-2xl p-4 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-gym-orange/10 border border-white/10 group-hover:border-gym-orange/30 transition-all">
                <QrCode size={28} className="text-gray-400 group-hover:text-gym-orange transition-colors" />
              </div>
              <span className="text-[9px] font-black text-gray-500 group-hover:text-gym-orange uppercase tracking-widest transition-colors text-center leading-tight max-w-[60px]">
                Tap to Scan
              </span>
            </motion.button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />

          {/* Row 3: Footer */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1">
                <Zap size={8} className="text-gym-orange" /> Plan
              </p>
              <p className="text-white font-bold text-xs leading-tight">{plan}</p>
            </div>
            <div>
              <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1">
                <Calendar size={8} className="text-gray-400" /> Joined
              </p>
              <p className="text-white font-bold text-xs">{joinDate}</p>
            </div>
            <div>
              <p className="text-gray-600 text-[9px] uppercase font-bold tracking-widest mb-0.5 flex items-center gap-1">
                <Shield size={8} className={accentClass} /> Expires
              </p>
              <p className={`font-bold text-xs ${isUrgent ? 'text-gym-orange' : 'text-white'}`}>
                {expiryDate}
                {isUrgent && <span className="text-[9px] ml-1 opacity-70">({expiresIn}d)</span>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <QRModal id={id} name={name} plan={plan} onClose={() => setShowQR(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default MembershipCard;
