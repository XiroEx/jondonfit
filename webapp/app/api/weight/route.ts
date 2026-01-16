import dbConnect from '../../../lib/mongodb'
import User from '../../../models/User'
import { getTokenFromRequest, verifyToken } from '../../../lib/auth'

// GET - Get weight history
export async function GET(req: Request) {
  try {
    const token = getTokenFromRequest(req)
    if (!token) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })

    const payload = verifyToken(token)
    await dbConnect()
    
    const user = await User.findById(payload.userId).select('weightEntries')
    if (!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })

    return new Response(JSON.stringify({ weightEntries: user.weightEntries || [] }), { status: 200 })
  } catch (err: any) {
    console.error('GET weight error', err)
    return new Response(JSON.stringify({ message: err.message || 'Server error' }), { status: 500 })
  }
}

// POST - Submit weight entry
export async function POST(req: Request) {
  try {
    const token = getTokenFromRequest(req)
    if (!token) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })

    const payload = verifyToken(token)
    const body = await req.json()
    const { weight, unit = 'lbs' } = body

    if (!weight || typeof weight !== 'number' || weight <= 0) {
      return new Response(JSON.stringify({ message: 'Valid weight is required' }), { status: 400 })
    }

    await dbConnect()
    
    const user = await User.findById(payload.userId)
    if (!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 })

    // Add weight entry
    const newEntry = {
      date: new Date(),
      weight,
      unit
    }
    
    if (!user.weightEntries) {
      user.weightEntries = []
    }
    user.weightEntries.push(newEntry)
    
    // Reset skip counter and update last prompt time
    user.consecutiveSkips = 0
    user.lastWeightPrompt = new Date()
    
    await user.save()

    return new Response(JSON.stringify({ 
      message: 'Weight recorded successfully',
      entry: newEntry 
    }), { status: 200 })
  } catch (err: any) {
    console.error('POST weight error', err)
    return new Response(JSON.stringify({ message: err.message || 'Server error' }), { status: 500 })
  }
}
