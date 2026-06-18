import React, { useState, useRef, useEffect } from 'react';
import { db } from '@/lib/dashboard-dashe/db';
import { useTheme } from 'next-themes';
import { Phone, Lock, CheckCircle, ArrowLeft, Sparkles, Moon, Sun } from 'lucide-react';

const MOCK_OTP = '482910';
const ADMIN_USERS: Record<string, { name: string; role: 'superadmin' | 'admin' | 'manager'; avatar: string }> = {
  '+966500000000': { name: 'سحر الأدمن', role: 'superadmin', avatar: '👑' },
  '+966501234567': { name: 'نورة المدير', role: 'admin', avatar: '🌸' },
  '+966509999999': { name: 'ريم المدير', role: 'manager', avatar: '💎' },
};

interface AuthProps { onLogin: () => void; }

export default function Auth({ onLogin }: AuthProps) {
  const { theme, setTheme } = useTheme();
  const [step, setStep] = useState<'phone' | 'otp' | 'success'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setInterval(() => setCountdown(c => c - 1), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!phone.match(/^05\d{8}$/) && !phone.match(/^\+9665\d{8}$/)) {
      setError('يرجى إدخال رقم جوال سعودي صحيح (مثل: 0501234567)');
      return;
    }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep('otp');
    setCountdown(60);
    setShowHint(false);
    setTimeout(() => { otpRefs.current[0]?.focus(); }, 100);
    setTimeout(() => setShowHint(true), 2000);
  };

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
    if (next.every(d => d !== '')) handleVerify(next.join(''));
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = async (code?: string) => {
    const entered = code || otp.join('');
    if (entered.length < 6) { setError('يرجى إدخال الكود كاملاً (6 أرقام)'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1000));
    if (entered === MOCK_OTP) {
      const normalized = phone.startsWith('+966') ? phone : `+966${phone.replace(/^0/, '')}`;
      const user = ADMIN_USERS[normalized] || ADMIN_USERS['+966500000000'];
      db.setAdmin({ id: 'ADM001', phone: normalized, ...user });
      setStep('success');
      setTimeout(onLogin, 1200);
    } else {
      setError('❌ رمز التحقق غير صحيح. استخدم: ' + MOCK_OTP);
      setOtp(['', '', '', '', '', '']);
      otpRefs.current[0]?.focus();
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setCountdown(60);
    otpRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-900 text-black dark:text-white" style={{ fontFamily: 'var(--font-main, \'Cairo\'), \'Tajawal\', sans-serif' }}>
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[rgba(233,30,99,0.08)] rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[rgba(233,30,99,0.05)] opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[rgba(233,30,99,0.05)] rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <img src="/images/dashboard-logo.png" alt="منصة سحر" className="flex-shrink-0 w-16 h-16 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-black dark:text-white">منصة سحر</h1>
          <p className="text-sm font-medium tracking-widest text-black dark:text-gray-400">Care & Beauty</p>
        </div>

        {/* Card */}
        <div className="rounded-[14px] border border-[#E91E63] dark:border-[#C2185B] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-8 animate-slideUp transition-all duration-300 ease bg-white dark:bg-gray-800 text-black dark:text-white">
          {step === 'phone' && (
            <>
              <h2 className="text-2xl font-bold mb-1 text-black dark:text-white">مرحباً بك 👋</h2>
              <p className="mb-8 text-black dark:text-gray-300">سجّل دخولك برقم جوالك لإدارة متجر سحر</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-black dark:text-gray-300">رقم الجوال</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-sm font-medium whitespace-nowrap transition-all duration-300 ease bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] text-black dark:text-gray-300">
                      🇸🇦 +966
                    </div>
                    <input
                      type="tel"
                      placeholder="05XXXXXXXX"
                      value={phone}
                      onChange={e => { setPhone(e.target.value); setError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                      className="flex-1 px-4 py-3 border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] text-left focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all duration-300 ease text-base bg-white dark:bg-gray-800 text-black dark:text-white placeholder:text-black/60 dark:placeholder:text-gray-500"
                      dir="ltr"
                    />
                  </div>
                </div>

                {error && <p className="text-danger text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full py-4 bg-[#E91E63] hover:bg-[#C2185B] text-white rounded-[14px] font-bold text-lg shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 ease disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin2" />جاري الإرسال...</>
                  ) : (
                    <><Phone className="w-5 h-5" />إرسال رمز التحقق</>
                  )}
                </button>

                <p className="text-center text-xs mt-4 text-black dark:text-gray-400">
                  للتجربة استخدم: <span className="font-bold text-[#E91E63] dark:text-[#C2185B]">0500000000</span>
                </p>
              </div>
            </>
          )}

          {step === 'otp' && (
            <>
              <button onClick={() => setStep('phone')} className="flex items-center gap-1 text-sm mb-6 hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors duration-300 ease text-black dark:text-gray-300">
                <ArrowLeft className="w-4 h-4" />
                تغيير الرقم
              </button>
              <h2 className="text-2xl font-bold mb-1 text-black dark:text-white">رمز التحقق 📱</h2>
              <p className="mb-2 text-black dark:text-gray-300">تم إرسال رمز مكوّن من 6 أرقام إلى</p>
              <p className="font-bold mb-6 dir-ltr text-left text-black dark:text-white">{phone}</p>

              {showHint && (
                <div className="border border-[#E91E63] dark:border-[#C2185B] rounded-[14px] p-3 mb-6 text-center animate-bounceIn transition-all duration-300 ease bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]">
                  <p className="text-sm text-black dark:text-gray-300">💬 رمز OTP التجريبي: <span className="font-black text-lg text-[#E91E63] dark:text-[#C2185B] tracking-widest">{MOCK_OTP}</span></p>
                </div>
              )}

              <div className="flex gap-2 justify-center mb-6" dir="ltr">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={el => { otpRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(i, e)}
                    className={`otp-input ${d ? 'filled' : ''}`}
                  />
                ))}
              </div>

              {error && <p className="text-danger text-sm bg-red-50 p-3 rounded-xl mb-4 text-center">{error}</p>}

              <button
                onClick={() => handleVerify()}
                disabled={loading || otp.some(d => !d)}
                className="w-full py-4 bg-[#E91E63] hover:bg-[#C2185B] text-white rounded-[14px] font-bold text-lg shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 ease disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin2" />جاري التحقق...</>
                ) : (
                  <><Lock className="w-5 h-5" />تحقق من الرمز</>
                )}
              </button>

              <div className="text-center mt-4">
                {countdown > 0 ? (
                  <p className="text-sm text-black dark:text-gray-300">إعادة الإرسال بعد <span className="font-bold text-[#E91E63] dark:text-[#C2185B]">{countdown}</span> ثانية</p>
                ) : (
                  <button onClick={handleResend} className="font-semibold text-sm hover:text-[#E91E63] dark:hover:text-[#C2185B] transition-colors duration-300 ease text-black dark:text-gray-300">
                    إعادة إرسال الرمز
                  </button>
                )}
              </div>
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-8 animate-bounceIn">
              <CheckCircle className="w-20 h-20 text-[#22C55E] mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">مرحباً! ✨</h2>
              <p className="text-black dark:text-gray-300">جاري تحميل لوحة التحكم...</p>
              <div className="mt-6 w-48 h-2 rounded-full mx-auto overflow-hidden">
                <div className="h-full rounded-full animate-pulse2 w-3/4 bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)]" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <p className="text-center text-xs text-black dark:text-gray-400">
            © 2025 سحر للعناية والجمال · لوحة تحكم متكاملة
          </p>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full transition-all duration-300 ease bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(194,24,91,0.15)] hover:bg-[rgba(233,30,99,0.15)] dark:hover:bg-[rgba(194,24,91,0.25)] text-black dark:text-white"
            title={theme === 'dark' ? 'الوضع النهاري' : 'الوضع الليلي'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
