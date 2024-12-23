import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdmin } from '../../middleware/adminAuth'

const prisma = new PrismaClient()

// Update Staff route
export async function PUT(request) {
  if (!isAdmin(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  const { id, firstName, lastName, mobileNumber } = await request.json()

  if (!id || !firstName || !lastName) {
    return NextResponse.json(
      { message: 'First name and last name is required!' },
      { status: 400 }
    )
  }

  if (firstName.length > 50) {
    return NextResponse.json(
      { message: 'First name is too long' },
      { status: 400 }
    )
  }

  if (lastName.length > 40) {
    return NextResponse.json(
      { message: 'Last name is too long' },
      { status: 400 }
    )
  }

  if (mobileNumber.length !== 10 || !/^\d{10}$/.test(mobileNumber)) {
    return NextResponse.json(
      { message: 'Mobile number must be exactly 10 digits' },
      { status: 400 }
    )
  }

  try {
    const updatedStaff = await prisma.user.update({
      where: { id },
      data: {
        firstName,
        lastName,
        mobileNumber,
      },
      include: {
        UserPrivilege: {
          select: {
            privilege: true,
          },
        },
      },
    })

    return NextResponse.json(
      {
        message: 'Staff updated successfully.',
        updatedStaff: {
          id: updatedStaff.id,
          email: updatedStaff.email,
          firstName: updatedStaff.firstName,
          mobileNumber: updatedStaff.mobileNumber,
          lastName: updatedStaff.lastName,
          role: updatedStaff.role,
          privileges: updatedStaff.UserPrivilege,
        },
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { message: 'Something went wrong, please try again.' },
      { status: 500 }
    )
  }
}
