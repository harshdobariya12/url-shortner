import React, { useState } from 'react'
import { createShortUrl } from '../api/shortUrl.api'
import { useSelector } from 'react-redux'
import { queryClient } from '../main'

const UrlForm = () => {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState(null)
    const [customSlug, setCustomSlug] = useState('')
    const [loading, setLoading] = useState(false)
    const { isAuthenticated } = useSelector((state) => state.auth)

    const handleSubmit = async (e) => {
        e?.preventDefault()
        if (!url) { setError('Please enter a URL.'); return; }
        setLoading(true)
        setError(null)
        setShortUrl('')
        setCopied(false)
        try {
            const result = await createShortUrl(url, customSlug || undefined)
            setShortUrl(result)
            queryClient.invalidateQueries({ queryKey: ['userUrls'] })
        } catch (err) {
            setError(err.message || 'Failed to shorten URL.')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div>
            {/* URL Input Row */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: isAuthenticated ? '12px' : '0' }}>
                <input
                    id="url-input"
                    type="url"
                    className="input-premium"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="Paste your long URL here..."
                    style={{ flex: 1 }}
                />
                <button
                    id="shorten-btn"
                    onClick={handleSubmit}
                    className="btn-primary"
                    disabled={loading}
                    style={{ flexShrink: 0, padding: '12px 24px', whiteSpace: 'nowrap' }}
                >
                    {loading ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                        </svg>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                            </svg>
                            Shorten
                        </>
                    )}
                </button>
            </div>

            {/* Custom Slug (authenticated only) */}
            {isAuthenticated && (
                <div style={{ marginBottom: '0' }}>
                    <input
                        id="custom-slug-input"
                        type="text"
                        className="input-premium"
                        value={customSlug}
                        onChange={(e) => setCustomSlug(e.target.value)}
                        placeholder="Custom slug (optional) — e.g. my-link"
                        style={{ fontSize: '0.85rem' }}
                    />
                </div>
            )}

            {/* Error */}
            {error && (
                <div style={{
                    marginTop: '16px',
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
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                </div>
            )}

            {/* Result */}
            {shortUrl && (
                <div
                    className="animate-fadeInUp"
                    style={{
                        marginTop: '20px',
                        padding: '16px',
                        background: 'rgba(99,102,241,0.08)',
                        border: '1px solid rgba(99,102,241,0.25)',
                        borderRadius: '12px',
                    }}
                >
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#a5b4fc', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        ✓ Your Short Link
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input
                            readOnly
                            value={shortUrl}
                            id="short-url-result"
                            style={{
                                flex: 1,
                                padding: '10px 14px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(99,102,241,0.3)',
                                borderRadius: '8px',
                                color: '#c4b5fd',
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={handleCopy}
                            className={`copy-btn ${copied ? 'copied' : ''}`}
                            style={{ flexShrink: 0 }}
                        >
                            {copied ? (
                                <>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                    </svg>
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )
}

export default UrlForm