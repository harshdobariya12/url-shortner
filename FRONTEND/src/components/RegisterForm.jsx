import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({ state }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e?.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const data = await registerUser(name, password, email);
            dispatch(login(data.user));
            navigate({ to: '/dashboard' });
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Registration failed. Please try again.');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', color: 'var(--color-text-primary)' }}>
                Create your account
            </h2>

            {error && (
                <div style={{
                    marginBottom: '20px',
                    padding: '12px 16px',
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    borderRadius: '10px',
                    color: '#fca5a5',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                </div>
            )}

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Full Name
                </label>
                <input
                    id="register-name"
                    className="input-premium"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                    autoComplete="name"
                />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Email Address
                </label>
                <input
                    id="register-email"
                    className="input-premium"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                    autoComplete="email"
                />
            </div>

            <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Password
                </label>
                <input
                    id="register-password"
                    className="input-premium"
                    type="password"
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                    minLength={6}
                    autoComplete="new-password"
                />
                {password.length > 0 && (
                    <div style={{ marginTop: '8px', display: 'flex', gap: '4px' }}>
                        {[1,2,3,4].map(i => (
                            <div key={i} style={{
                                flex: 1,
                                height: '3px',
                                borderRadius: '999px',
                                background: password.length >= i * 2
                                    ? (password.length >= 8 ? '#10b981' : password.length >= 6 ? '#f59e0b' : '#ef4444')
                                    : 'rgba(255,255,255,0.1)',
                                transition: 'background 0.3s ease',
                            }}/>
                        ))}
                    </div>
                )}
            </div>

            <button
                id="register-submit"
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '13px' }}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                        Creating account...
                    </>
                ) : (
                    <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <line x1="19" y1="8" x2="19" y2="14"/>
                            <line x1="22" y1="11" x2="16" y2="11"/>
                        </svg>
                        Create Account
                    </>
                )}
            </button>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={() => state(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#a5b4fc',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            fontFamily: "'Inter', sans-serif",
                            padding: 0,
                        }}
                    >
                        Sign in
                    </button>
                </p>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </form>
    );
};

export default RegisterForm;