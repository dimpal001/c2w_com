/* eslint-disable no-undef */
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export const uploadImageToCDN = async (image, name, prefix) => {
  const s3Client = new S3Client({
    endpoint: 'https://blr1.digitaloceanspaces.com',
    forcePathStyle: false,
    region: 'blr1',
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
    },
  })

  const extension = name.split('.').pop()
  let imageName
  if (prefix) {
    imageName = `${prefix}-image-${Date.now()}.${extension}`
  } else {
    imageName = `image-${Date.now()}.${extension}`
  }

  const file = new File([image], name, { type: image.type })
  if (!file || !file) return

  // Define the S3 parameters
  const params = {
    Bucket: 'clothes2wear',
    Key: `images/${imageName}`,
    Body: image,
    ACL: 'public-read',
  }

  try {
    await s3Client.send(new PutObjectCommand(params))

    // imageName = 'https://cdn.thefashionsalad.com/clothes2wear/' + imageName

    // Construct the URL of the uploaded image
    const imageUrl = imageName

    return imageUrl
  } catch {
    throw new Error('Image upload failed')
  }
}
