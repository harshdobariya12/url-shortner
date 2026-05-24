import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

// Format date helpers
const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatTime = (dateStr) => {
    if (!dateStr) return '—'
    const d = new Date(dateStr)
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

const formatDay = (dateStr) => {
    if (!dateStr) return '—'
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { weekday: 'long' })
}

const truncateUrl = (url, max = 40) => {
    try {
        const { hostname, pathname } = new URL(url)
        const display = hostname + pathname
        return display.length > max ? display.slice(0, max) + '…' : display
    } catch {
        return url.length > max ? url.slice(0, max) + '…' : url
    }
}

const UserUrl = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['userUrls'],
        queryFn: getAllUserUrls,
        refetchInterval: 30000,
        staleTime: 0,
    })
    const [copiedId, setCopiedId] = useState(null)
    const [sortBy, setSortBy] = useState('newest') // newest | oldest | clicks

    const handleCopy = (url, id) => {
        navigator.clipboard.writeText(url)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    if (isLoading) {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 0', gap: '16px' }}>
                <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: '3px solid rgba(99,102,241,0.2)',
                    borderTopColor: '#6366f1',
                    animation: 'spin 0.8s linear infinite',
                }}/>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Loading your links...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div style={{
                padding: '20px',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '12px',
                color: '#fca5a5',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                Error loading URLs: {error.message}
            </div>
        )
    }

    const urls = data?.urls || []

    if (urls.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{
                    width: '56px', height: '56px', borderRadius: '16px',
                    background: 'rgba(99,102,241,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                </div>
                <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>No links yet</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    Use the form above to shorten your first URL.
                </p>
            </div>
        )
    }

    // Sort
    const sorted = [...urls].sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        if (sortBy === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0)
        if (sortBy === 'clicks') return (b.clicks || 0) - (a.clicks || 0)
        return 0
    })

    return (
        <div>
            {/* Table Header + Sort */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                        {urls.length} link{urls.length !== 1 ? 's' : ''} total
                    </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Sort by:</span>
                    {['newest', 'oldest', 'clicks'].map(opt => (
                        <button
                            key={opt}
                            onClick={() => setSortBy(opt)}
                            style={{
                                padding: '5px 12px',
                                borderRadius: '8px',
                                border: `1px solid ${sortBy === opt ? 'rgba(99,102,241,0.4)' : 'var(--color-border)'}`,
                                background: sortBy === opt ? 'rgba(99,102,241,0.15)' : 'transparent',
                                color: sortBy === opt ? '#a5b4fc' : 'var(--color-text-muted)',
                                fontSize: '0.78rem',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Short Link</th>
                            <th>Day</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Clicks</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((url) => {
                            const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"
                            const shortLink = `${baseUrl}/${url.short_url}`
                            return (
                                <tr key={url._id}>
                                    {/* Original URL */}
                                    <td style={{ maxWidth: '200px' }}>
                                        <span style={{
                                            display: 'block',
                                            color: 'var(--color-text-secondary)',
                                            fontSize: '0.82rem',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                            maxWidth: '200px',
                                        }} title={url.full_url}>
                                            {truncateUrl(url.full_url)}
                                        </span>
                                    </td>

                                    {/* Short URL */}
                                    <td>
                                        <a
                                            href={shortLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#a5b4fc',
                                                textDecoration: 'none',
                                                fontSize: '0.85rem',
                                                fontWeight: 500,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                            }}
                                            onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                                            onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                                        >
                                            {`lnk.to/${url.short_url}`}
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                                <polyline points="15 3 21 3 21 9"/>
                                                <line x1="10" y1="14" x2="21" y2="3"/>
                                            </svg>
                                        </a>
                                    </td>

                                    {/* Day */}
                                    <td>
                                        <span style={{
                                            fontSize: '0.82rem',
                                            color: url.createdAt ? '#c4b5fd' : 'var(--color-text-muted)',
                                            fontWeight: url.createdAt ? 500 : 400,
                                        }}>
                                            {formatDay(url.createdAt)}
                                        </span>
                                    </td>

                                    {/* Date */}
                                    <td>
                                        <span style={{
                                            fontSize: '0.82rem',
                                            color: url.createdAt ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {formatDate(url.createdAt)}
                                        </span>
                                    </td>

                                    {/* Time */}
                                    <td>
                                        <span style={{
                                            fontSize: '0.82rem',
                                            color: url.createdAt ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                                            whiteSpace: 'nowrap',
                                            fontVariantNumeric: 'tabular-nums',
                                        }}>
                                            {formatTime(url.createdAt)}
                                        </span>
                                    </td>

                                    {/* Clicks */}
                                    <td>
                                        <span className="badge badge-blue">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                                            </svg>
                                            {url.clicks}
                                        </span>
                                    </td>

                                    {/* Copy Action */}
                                    <td>
                                        <button
                                            onClick={() => handleCopy(shortLink, url._id)}
                                            className={`copy-btn ${copiedId === url._id ? 'copied' : ''}`}
                                        >
                                            {copiedId === url._id ? (
                                                <>
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"/>
                                                    </svg>
                                                    Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                                    </svg>
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default UserUrl