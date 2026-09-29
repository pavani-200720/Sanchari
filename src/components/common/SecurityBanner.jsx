import React from 'react';
import { AlertCircle, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function SecurityBanner({ type = "info", title, message, children }) {
  const getBannerStyles = () => {
    switch (type) {
      case 'danger':
      case 'tamper':
        return {
          bg: 'bg-red-950/40 border-red-800/60 text-red-200',
          icon: <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        };
      case 'warning':
        return {
          bg: 'bg-amber-950/40 border-amber-800/60 text-amber-200',
          icon: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        };
      case 'success':
        return {
          bg: 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200',
          icon: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        };
      default:
        return {
          bg: 'bg-cyan-950/40 border-cyan-800/60 text-cyan-200',
          icon: <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        };
    }
  };

  const style = getBannerStyles();

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${style.bg}`}>
      {style.icon}
      <div className="flex-1 space-y-1">
        {title && <h4 className="font-mono font-bold text-sm tracking-wide">{title}</h4>}
        {message && <p className="text-slate-300 font-sans">{message}</p>}
        {children}
      </div>
    </div>
  );
}
