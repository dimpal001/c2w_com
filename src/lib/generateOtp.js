import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export function generateOtp() {
  const otp = Math.floor(100000 + Math.random() * 900000)
  return otp.toString()
}

export async function verifyOtp(userId, otpCode) {
  const otpEntry = await prisma.otp.findFirst({
    where: {
      userId,
      code: otpCode,
      expiresAt: {
        gte: new Date(),
      },
    },
  })

  if (!otpEntry) {
    throw new Error('Invalid or expired OTP')
  }

  await prisma.user.update({
    where: { id: userId },
    data: { isVerified: true },
  })

  await prisma.otp.delete({
    where: { id: otpEntry.id },
  })

  return true
}
