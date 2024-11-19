import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json(
      {
        message: 'Logout successful',
      },
      { status: 200 }
    )

    response.cookies.set('token', '', {
      httpOnly: true,
      // eslint-disable-next-line no-undef
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ message: 'Error logging out' }, { status: 500 })
  }
}
