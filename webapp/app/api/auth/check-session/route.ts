import dbConnect from '@/lib/mongodb'
import { checkSession } from '@/models/MagicLink'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { sessionId } = body

    if (!sessionId) {
      return new Response(JSON.stringify({ message: 'Session ID is required' }), { status: 400 })
    }

    await dbConnect()

    const result = await checkSession(sessionId)

    return new Response(JSON.stringify(result), { status: 200 })

  } catch (err: unknown) {
    console.error('check-session error', err)
    const message = err instanceof Error ? err.message : 'Server error'
    return new Response(JSON.stringify({ message }), { status: 500 })
  }
}
