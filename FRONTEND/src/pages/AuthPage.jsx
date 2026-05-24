import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="bg-animated" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
            <div style={{ width: '100%', maxWidth: '440px' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }} className="animate-fadeInUp">
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        boxShadow: '0 8px 24px rgba(99,102,241,0.4)',
                    }}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </svg>
                    </div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.03em' }}>
                        <span className="gradient-text">LinkSnip</span>
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
                        {isLogin ? 'Welcome back! Sign in to your account.' : 'Create your free account today.'}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div style={{
                    display: 'flex',
                    background: 'var(--color-surface-2)',
                    borderRadius: '12px',
                    padding: '4px',
                    marginBottom: '24px',
                    border: '1px solid var(--color-border)',
                }} className="animate-fadeInUp">
                    <button
                        onClick={() => setIsLogin(true)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '9px',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.25s ease',
                            background: isLogin ? 'rgba(99,102,241,0.2)' : 'transparent',
                            color: isLogin ? '#a5b4fc' : 'var(--color-text-muted)',
                            borderColor: isLogin ? 'rgba(99,102,241,0.3)' : 'transparent',
                        }}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '9px',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.25s ease',
                            background: !isLogin ? 'rgba(99,102,241,0.2)' : 'transparent',
                            color: !isLogin ? '#a5b4fc' : 'var(--color-text-muted)',
                        }}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                <div className="glass-card animate-fadeInUp" style={{ padding: '32px' }}>
                    {isLogin
                        ? <LoginForm state={setIsLogin} />
                        : <RegisterForm state={setIsLogin} />
                    }
                </div>

                {/* Footer */}
                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    By continuing, you agree to our Terms of Service
                </p>
            </div>
        </div>
    )
}

export default AuthPage