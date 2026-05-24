import React from 'react'
import UrlForm from '../components/UrlForm'
import { Link } from '@tanstack/react-router'
import { useSelector } from 'react-redux'

const FEATURES = [
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
            </svg>
        ),
        title: 'Custom Slugs',
        desc: 'Create memorable short URLs with your own custom slug.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
        ),
        title: 'Click Analytics',
        desc: 'Track how many times your links have been clicked.',
    },
    {
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
        ),
        title: 'Secure Links',
        desc: 'JWT-secured accounts keep your data private and safe.',
    },
]

const HomePage = () => {
    const { isAuthenticated } = useSelector((state) => state.auth)

    return (
        <div className="bg-animated" style={{ minHeight: 'calc(100vh - 64px)' }}>

            {/* Hero Section */}
            <section style={{ padding: '80px 24px 48px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                
                {/* Badge */}
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', marginBottom: '24px' }} className="animate-fadeInUp">
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulse 2s infinite' }}/>
                    <span style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 500 }}>Fast, Free & Reliable</span>
                </div>

                {/* Headline */}
                <h1
                    className="animate-fadeInUp"
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        letterSpacing: '-0.04em',
                        marginBottom: '20px',
                    }}
                >
                    Shorten Links.{' '}
                    <span className="gradient-text">Amplify Reach.</span>
                </h1>

                <p
                    className="animate-fadeInUp"
                    style={{
                        fontSize: '1.1rem',
                        color: 'var(--color-text-secondary)',
                        maxWidth: '500px',
                        margin: '0 auto 40px',
                        lineHeight: 1.6,
                    }}
                >
                    Transform long, ugly URLs into clean short links instantly. Track clicks and manage your links from one powerful dashboard.
                </p>

                {/* URL Form Card */}
                <div className="glass-card animate-fadeInUp" style={{ padding: '32px', marginBottom: '48px' }}>
                    <UrlForm />
                </div>

                {/* CTA for non-authenticated */}
                {!isAuthenticated && (
                    <p className="animate-fadeInUp" style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        Want custom slugs & analytics?{' '}
                        <Link to="/auth" style={{ color: '#a5b4fc', fontWeight: 600, textDecoration: 'none' }}>
                            Create a free account →
                        </Link>
                    </p>
                )}
            </section>

            {/* Features Section */}
            <section style={{ padding: '0 24px 80px', maxWidth: '900px', margin: '0 auto' }}>
                <div
                    className="stagger-children"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '16px',
                    }}
                >
                    {FEATURES.map((f, i) => (
                        <div key={i} className="stat-card animate-fadeInUp" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{
                                width: '42px',
                                height: '42px',
                                borderRadius: '12px',
                                background: 'rgba(99,102,241,0.15)',
                                border: '1px solid rgba(99,102,241,0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#a5b4fc',
                            }}>
                                {f.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                                    {f.title}
                                </h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                                    {f.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    )
}

export default HomePage