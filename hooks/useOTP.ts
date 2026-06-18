import { useState, useEffect, useCallback } from 'react';

interface UseOTPProps {
  length?: number;
  onComplete?: (code: string) => void;
  autoSubmit?: boolean;
}

export function useOTP({ length = 6, onComplete, autoSubmit = false }: UseOTPProps = {}) {
  const [code, setCode] = useState<string[]>(new Array(length).fill(''));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleInputChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }

    // Check if complete
    if (newCode.every((digit) => digit !== '')) {
      const fullCode = newCode.join('');
      if (autoSubmit && onComplete) {
        onComplete(fullCode);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, length);
    const newCode = [...code];
    
    for (let i = 0; i < pastedData.length; i++) {
      if (i < length) {
        newCode[i] = pastedData[i];
      }
    }
    
    setCode(newCode);
    
    if (newCode.every((digit) => digit !== '') && onComplete) {
      onComplete(newCode.join(''));
    }
  };

  const resendOTP = useCallback(() => {
    setTimer(60);
    setCanResend(false);
    setCode(new Array(length).fill(''));
  }, [length]);

  const reset = useCallback(() => {
    setCode(new Array(length).fill(''));
    setTimer(60);
    setCanResend(false);
  }, [length]);

  const getFullCode = useCallback(() => code.join(''), [code]);

  return {
    code,
    timer,
    canResend,
    handleInputChange,
    handleKeyDown,
    handlePaste,
    resendOTP,
    reset,
    getFullCode,
    isComplete: code.every((digit) => digit !== ''),
  };
}
