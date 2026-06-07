import { useState, useCallback, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultMode?: 'login' | 'register';
}

type Mode = 'login' | 'register';

/**
 * AuthModal - Modal đăng nhập/đăng ký.
 * - Toggle giữa login và register
 * - Form validation cơ bản
 * - Error handling
 * - Loading state
 * - Responsive
 */
export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
    const [mode, setMode] = useState<Mode>(defaultMode);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    // Form fields
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { login, register, isLoading } = useAuth();

    const resetForm = useCallback(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
        setSuccessMsg('');
    }, []);

    const switchMode = useCallback((newMode: Mode) => {
        setMode(newMode);
        resetForm();
        setShowPassword(false);
    }, [resetForm]);

    const handleClose = useCallback(() => {
        resetForm();
        setShowPassword(false);
        onClose();
    }, [onClose, resetForm]);

    const validateForm = useCallback((): string | null => {
        if (!email.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format';
        if (!password || password.length < 6) return 'Password must be at least 6 characters';
        if (mode === 'register') {
            if (!username.trim()) return 'Username is required';
            if (username.trim().length < 2) return 'Username must be at least 2 characters';
            if (password !== confirmPassword) return 'Passwords do not match';
        }
        return null;
    }, [email, password, username, confirmPassword, mode]);

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            if (mode === 'login') {
                await login({ email, password });
                handleClose();
            } else {
                await register({ username, email, password });
                setSuccessMsg('Registration successful! Please login.');
                switchMode('login');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        }
    }, [mode, email, password, username, validateForm, login, register, handleClose, switchMode]);

    // Đóng modal khi click overlay
    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) handleClose();
    }, [handleClose]);

    // Không render nếu modal đóng
    if (!isOpen) return null;

    const isLoginMode = mode === 'login';

    const modalContent = (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={handleOverlayClick}
        >
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="relative px-8 pt-8 pb-4 border-b border-stone-100">
                    <h2 className="text-2xl font-bold text-stone-900">
                        {isLoginMode ? 'Welcome back' : 'Create account'}
                    </h2>
                    <p className="text-sm text-stone-500 mt-1">
                        {isLoginMode
                            ? 'Sign in to your account to continue'
                            : 'Fill in your details to get started'}
                    </p>
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 p-2 hover:bg-stone-100 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-stone-400" />
                    </button>
                </div>

                {/* Error / Success Messages */}
                {error && (
                    <div className="mx-8 mt-4 flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}
                {successMsg && (
                    <div className="mx-8 mt-4 flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <AlertCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-green-600">{successMsg}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 pt-6 pb-6 space-y-4">
                    {!isLoginMode && (
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-stone-700 mb-1.5">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Your username"
                                    className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                    autoComplete="username"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="At least 6 characters"
                                className="w-full pl-10 pr-10 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                autoComplete={isLoginMode ? 'current-password' : 'new-password'}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {!isLoginMode && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-stone-700 mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat your password"
                                    className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-900 transition-all"
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2.5 bg-stone-900 text-white rounded-lg font-medium text-sm hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isLoading
                            ? (isLoginMode ? 'Signing in...' : 'Creating account...')
                            : (isLoginMode ? 'Sign in' : 'Create account')}
                    </button>
                </form>

                {/* Footer */}
                <div className="px-8 pb-8 pt-2 border-t border-stone-100">
                    <p className="text-sm text-stone-500 text-center">
                        {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
                        {' '}
                        <button
                            type="button"
                            onClick={() => switchMode(isLoginMode ? 'register' : 'login')}
                            className="font-medium text-stone-900 hover:text-stone-700 underline underline-offset-2 transition-colors"
                        >
                            {isLoginMode ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
