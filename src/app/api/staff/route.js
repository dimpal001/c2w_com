import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../middleware/adminAuth'
import { hash } from 'bcryptjs'
import { staffRegistrationEmail } from '@/utils/email/staffregistrationEmail'

const prisma = new PrismaClient()

// Create Staff route
export async function POST(request) {
  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  const { firstName, lastName, email, password, privileges } =
    await request.json()

  if (!firstName || !lastName || !email || !password || !privileges) {
    return NextResponse.json(
      { message: 'All fields are required.' },
      { status: 400 }
    )
  }

  const user = await prisma.user.findUnique({ where: { email } })

  if (user) {
    return NextResponse.json(
      { message: 'Email address already exist!' },
      { status: 400 }
    )
  }

  const hashedPassword = await hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'STAFF',
        isVerified: true,
        isLoggedIn: false,
        UserPrivilege: {
          create: privileges.map((privilegeId) => ({
            privilegeId: privilegeId,
          })),
        },
      },
    })

    await staffRegistrationEmail(email, firstName, password)

    return NextResponse.json(
      { message: 'Staff created successfully.' },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}

// Fetch Staff
export async function GET(request) {
  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  try {
    const staffs = await prisma.user.findMany({
      where: { role: 'STAFF' },
      include: {
        UserPrivilege: {
          select: {
            privilege: true,
          },
        },
      },
    })
    return NextResponse.json({ staffs })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Unable to fetch privileges.' },
      { status: 500 }
    )
  }
}

// Update Staff route
export async function PUT(request) {
  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  const { id, firstName, lastName, email, privileges } = await request.json()

  if (!id || !firstName || !lastName || !email || !privileges) {
    return NextResponse.json(
      { message: 'All fields are required.' },
      { status: 400 }
    )
  }

  try {
    const updatedStaff = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        email,
        UserPrivilege: {
          deleteMany: {},
          create: privileges.map((privilegeId) => ({
            privilegeId: privilegeId,
          })),
        },
      },
      include: {
        UserPrivilege: true,
      },
    })

    return NextResponse.json(
      { message: 'Staff updated successfully.', updatedStaff },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
