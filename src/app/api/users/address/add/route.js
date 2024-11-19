import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function POST(request) {
  const {
    userId,
    addressLine1,
    addressLine2,
    isDefault,
    city,
    state,
    zipCode,
    country,
    mobileNumber,
  } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorized access!' },
      { status: 401 }
    )
  }

  if (
    !userId ||
    !addressLine1 ||
    !city ||
    !state ||
    !zipCode ||
    !country ||
    !mobileNumber
  ) {
    return NextResponse.json(
      {
        message:
          'All required fields (userId, addressLine1, city, state, zipCode, country, mobileNumber) must be provided',
      },
      { status: 400 }
    )
  }

  try {
    if (addressLine1.length > 200) {
      return NextResponse.json(
        { message: 'Address Line 1 is too long.' },
        { status: 400 }
      )
    }

    if (addressLine2 && addressLine2.length > 200) {
      return NextResponse.json(
        { message: 'Address Line 2 is too long.' },
        { status: 400 }
      )
    }

    if (city.length > 25) {
      return NextResponse.json(
        { message: 'City name is too long.' },
        { status: 400 }
      )
    }

    if (state.length > 25) {
      return NextResponse.json(
        { message: 'State name is too long.' },
        { status: 400 }
      )
    }

    if (zipCode.length > 6) {
      return NextResponse.json(
        { message: 'Zip code is too long.' },
        { status: 400 }
      )
    }

    if (country.length > 15) {
      return NextResponse.json(
        { message: 'Country name is too long.' },
        { status: 400 }
      )
    }

    if (
      !/^\d+$/.test(mobileNumber) ||
      mobileNumber.length < 10 ||
      mobileNumber.length > 13
    ) {
      return NextResponse.json(
        {
          message:
            'Invalid mobile number. It should be numeric and between 10 to 13 digits.',
        },
        { status: 400 }
      )
    }

    // If the address is marked as default, ensure that only one address can be default
    if (isDefault) {
      await prisma.userAddress.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      })
    }

    const newAddress = await prisma.userAddress.create({
      data: {
        userId,
        addressLine1,
        addressLine2,
        isDefault,
        city,
        state,
        zipCode,
        country,
        mobileNumber,
      },
    })

    return NextResponse.json(newAddress, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something is wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
