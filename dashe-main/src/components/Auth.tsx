import React, { useState, useRef, useEffect } from 'react';
import { db } from '../lib/db';
import { Phone, Lock, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';

const MOCK_OTP = '482910';
const ADMIN_USERS: Record<string, { name: string; role: 'superadmin' | 'admin' | 'manager'; avatar: string }> = {
  '+966500000000': { name: 'سحر الأدمن', role: 'superadmin', avatar: '👑' },
  '+966501234567': { name: 'نورة المدير', role: 'admin', avatar: '🌸' },
  '+966509999999': { name: 'ريم المدير', role: 'manager', avatar: '💎' },
};

interface AuthProps { onLogin: () => void; }

export default function Auth({ onLogin }: AuthProps) {
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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 flex items-center justify-center p-4">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-200 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary-300 rounded-full blur-3xl opacity-15" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <img src="/images/dashboard-logo.png" alt="منصة سحر" className="flex-shrink-0 w-16 h-16 object-contain" />
          </div>
          <h1 className="text-3xl font-black text-sidebar">منصة سحر</h1>
          <p className="text-sm text-primary-600 font-medium tracking-widest">Care & Beauty</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-cardHover p-8 animate-slideUp">
          {step === 'phone' && (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">مرحباً بك 👋</h2>
              <p className="text-gray-500 mb-8">سجّل دخولك برقم جوالك لإدارة متجر سحر</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الجوال</label>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-2 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 whitespace-nowrap">
                      🇸🇦 +966
                    </div>
                    <input
                      type="tel"
                      placeholder="05XXXXXXXX"
                      value={phone}
                      onChange={e => { setPhone(e.target.value); setError(''); }}
                      onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all text-base"
                      dir="ltr"
                    />
                  </div>
                </div>

                {error && <p className="text-danger text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl font-bold text-lg shadow-glow hover:shadow-glowAccent hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin2" />جاري الإرسال...</>
                  ) : (
                    <><Phone className="w-5 h-5" />إرسال رمز التحقق</>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-4">
                  للتجربة استخدم: <span className="font-bold text-primary-600">0500000000</span>
                </p>
              </div>
            </>
          )}

          {step === 'otp' && (
            <>
              <button onClick={() => setStep('phone')} className="flex items-center gap-1 text-primary-600 text-sm mb-6 hover:text-primary-800 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                تغيير الرقم
              </button>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">رمز التحقق 📱</h2>
              <p className="text-gray-500 mb-2">تم إرسال رمز مكوّن من 6 أرقام إلى</p>
              <p className="font-bold text-primary-700 mb-6 dir-ltr text-left">{phone}</p>

              {showHint && (
                <div className="bg-primary-50 border border-primary-200 rounded-xl p-3 mb-6 text-center animate-bounceIn">
                  <p className="text-sm text-primary-700">💬 رمز OTP التجريبي: <span className="font-black text-lg text-primary-900 tracking-widest">{MOCK_OTP}</span></p>
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
                className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-xl font-bold text-lg shadow-glow hover:shadow-glowAccent hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin2" />جاري التحقق...</>
                ) : (
                  <><Lock className="w-5 h-5" />تحقق من الرمز</>
                )}
              </button>

              <div className="text-center mt-4">
                {countdown > 0 ? (
                  <p className="text-gray-400 text-sm">إعادة الإرسال بعد <span className="font-bold text-primary-600">{countdown}</span> ثانية</p>
                ) : (
                  <button onClick={handleResend} className="text-primary-600 font-semibold text-sm hover:text-primary-800 transition-colors">
                    إعادة إرسال الرمز
                  </button>
                )}
              </div>
            </>
          )}

          {step === 'success' && (
            <div className="text-center py-8 animate-bounceIn">
              <CheckCircle className="w-20 h-20 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">مرحباً! ✨</h2>
              <p className="text-gray-500">جاري تحميل لوحة التحكم...</p>
              <div className="mt-6 w-48 h-2 bg-gray-100 rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-400 to-accent rounded-full animate-pulse2 w-3/4" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 سحر للعناية والجمال · لوحة تحكم متكاملة
        </p>
      </div>
    </div>
  );
}
