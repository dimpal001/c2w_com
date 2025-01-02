import { NextResponse } from 'next/server'
import CryptoJS from 'crypto-js'

export async function POST(request) {
  const { data, key } = await request.json()

  try {
    if (!data || !key) {
      return NextResponse.json(
        { message: 'Data and Key are required' },
        { status: 400 }
      )
    }

    const bytes = CryptoJS.AES.decrypt(data, key)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)

    if (decryptedData === '') {
      return NextResponse.json({ message: 'Key missmatched' }, { status: 400 })
    }

    console.log('Decrypted Data:', decryptedData)

    return NextResponse.json({ message: decryptedData }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
