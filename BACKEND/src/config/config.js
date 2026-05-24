
const isProduction = process.env.NODE_ENV === "production"

export const cookieOptions = {
    httpOnly: true,
    secure: isProduction,              // true in production (HTTPS required for SameSite=None)
    sameSite: isProduction ? "None" : "Lax", // "None" allows cross-site cookies (Vercel <-> Render)
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
}