/* eslint-disable no-undef */
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'

export const deleteImageFromCDN = async (imageUrl) => {
  const s3Client = new S3Client({
    endpoint: 'https://blr1.digitaloceanspaces.com',
    forcePathStyle: false,
    region: 'blr1',
    credentials: {
      accessKeyId: 'DO00TK892YLJBW7MV82Y',
      secretAccessKey: '9a1ueUXe6X+ngKZoZEyvnfjQw5PI7t3bzbquBCWc2bY',
    },
  })

  const deleteParams = {
    Bucket: 'the-fashion-salad',
    Key: `clothes2wear/${imageUrl}`,
    ACL: 'public-read',
  }
  try {
    const data = await s3Client.send(new DeleteObjectCommand(deleteParams))
    console.log(data)

    return data
  } catch (error) {
    console.error('Error deleting image from CDN', error)
    throw new Error('Image deletion failed')
  }
}
