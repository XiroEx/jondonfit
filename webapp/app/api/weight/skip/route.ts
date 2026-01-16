import dbConnect from '../../../../lib/mongodb'
import User from '../../../../models/User'
import { getTokenFromRequest, verifyToken } from '../../../../lib/auth'

// POST - Skip weight entry
export async function POST(req: Request) {
  try {
    const token = getTokenFromRequest(req)
    if (!token) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })

    const payload = verifyToken(token)
    await dbConnect()
    
    const user = await User.findById(payload.userId)
    if (!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })

    // Increment skip counter and update last prompt time
    user.consecutiveSkips = (user.consecutiveSkips || 0) + 1
    user.lastWeightPrompt = new Date()
    
    await user.save()

    return new Response(JSON.stringify({ 
      message: 'Weight prompt skipped',
      consecutiveSkips: user.consecutiveSkips
    }), { status: 200 })
  } catch (err: any) {
    console.error('POST skip error', err)
    return new Response(JSON.stringify({ message: err.message || 'Server error' }), { status: 500 })
  }
}
