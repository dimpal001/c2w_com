import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { isAuth } from '@/app/api/middleware/auth'

const prisma = new PrismaClient()

export async function PATCH(request) {
  const {
    userId,
    fullName,
    addressId,
    addressLine1,
    addressLine2,
    isDefault = true,
    city,
    state,
    zipCode,
    country,
    mobileNumber,
  } = await request.json()

  if (!isAuth(request)) {
    return NextResponse.json(
      { message: 'Unauthorised access!' },
      { status: 401 }
    )
  }

  if (
    !fullName ||
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
    if (addressLine1.fullName > 50) {
      return NextResponse.json(
        { message: 'Name is too long.' },
        { status: 400 }
      )
    }
    if (addressLine1.length > 100) {
      return NextResponse.json(
        { message: 'Address Line 1 is too long.' },
        { status: 400 }
      )
    }

    if (addressLine2 && addressLine2.length > 100) {
      return NextResponse.json(
        { message: 'Address Line 2 is too long.' },
        { status: 400 }
      )
    }

    if (city.length > 50) {
      return NextResponse.json(
        { message: 'City name is too long.' },
        { status: 400 }
      )
    }

    if (state.length > 50) {
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

    if (country.length > 20) {
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
        where: { userId: userId, isDefault: true },
        data: { isDefault: false },
      })
    }

    await prisma.userAddress.update({
      where: { id: addressId },
      data: {
        fullName,
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

    return NextResponse.json(
      { message: 'Address has been updated.' },
      { status: 200 }
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: 'Something went wrong, try again!' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
