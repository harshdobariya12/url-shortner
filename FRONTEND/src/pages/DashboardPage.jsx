import React from 'react'
import UrlForm from '../components/UrlForm'
import UserUrl from '../components/UserUrl'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

const getThisWeekCount = (urls) => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return urls.filter(u => u.createdAt && new Date(u.createdAt) > oneWeekAgo).length
}

const DashboardPage = () => {
    const { user } = useSelector((state) => state.auth)

    const { data } = useQuery({
        queryKey: ['userUrls'],
        queryFn: getAllUserUrls,
        staleTime: 0,
    })

    const urls = data?.urls || []
    const totalClicks = urls.reduce((sum, u) => sum + (u.clicks || 0), 0)
    const thisWeek = getThisWeekCount(urls)

    const STATS = [
        {
            label: 'Total Links',
            value: urls.length,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
            ),
            color: '#6366f1',
            bg: 'rgba(99,102,241,0.12)',
        },
        {
            label: 'Total Clicks',
            value: totalClicks,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
            ),
            color: '#06b6d4',
            bg: 'rgba(6,182,212,0.12)',
        },
        {
            label: 'Links This Week',
            value: thisWeek,
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
            ),
            color: '#8b5cf6',
            bg: 'rgba(139,92,246,0.12)',
        },
    ]

    return (
        <div className="bg-animated" style={{ minHeight: 'calc(100vh - 64px)', padding: '40px 24px' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Welcome Header */}
                <div
                    className="animate-fadeInUp"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        marginBottom: '36px',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* Avatar */}
                    <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: '#fff',
                        letterSpacing: '0.02em',
                        flexShrink: 0,
                        boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
                    }}>
                        {getInitials(user?.name)}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '4px' }}>
                            Welcome back,{' '}
                            <span className="gradient-text">{user?.name?.split(' ')[0] || 'there'}!</span>
                        </h1>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                            {user?.email} · Here's your link dashboard
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div
                    className="stagger-children"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '16px',
                        marginBottom: '32px',
                    }}
                >
                    {STATS.map((s, i) => (
                        <div key={i} className="stat-card animate-fadeInUp">
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: s.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: s.color,
                                }}>
                                    {s.icon}
                                </div>
                            </div>
                            <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--color-text-primary)', lineHeight: 1 }}>
                                {s.value.toLocaleString()}
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', fontWeight: 500, marginTop: '6px' }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Shorten URL Section */}
                <div className="glass-card animate-fadeInUp" style={{ padding: '28px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '9px',
                            background: 'rgba(99,102,241,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#a5b4fc',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                        </div>
                        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            Shorten a New URL
                        </h2>
                    </div>
                    <UrlForm />
                </div>

                {/* Links History */}
                <div className="glass-card animate-fadeInUp" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '9px',
                            background: 'rgba(6,182,212,0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#67e8f9',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6"/>
                                <line x1="8" y1="12" x2="21" y2="12"/>
                                <line x1="8" y1="18" x2="21" y2="18"/>
                                <line x1="3" y1="6" x2="3.01" y2="6"/>
                                <line x1="3" y1="12" x2="3.01" y2="12"/>
                                <line x1="3" y1="18" x2="3.01" y2="18"/>
                            </svg>
                        </div>
                        <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            Your Link History
                        </h2>
                    </div>
                    <UserUrl />
                </div>

            </div>
        </div>
    )
}

export default DashboardPage