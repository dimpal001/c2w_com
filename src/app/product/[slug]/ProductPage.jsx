'use client'

import React, { useEffect, useRef } from 'react'
import CouponSecion from './component/CouponSecion'
import DisplayPorductSection from './component/DisplayPorductSection'
import ReviewSection from './component/ReviewSection'
import SimilarProducts from './component/SimilarProducts'
import TagSection from './component/TagSection'

const product = {
  id: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
  title: 'Sample T-ShirtLorem Ipsum is simply dummy text of the printing',
  slug: 'sample-t-shirt',
  styleId: 'sample-style-001',
  isReturnable: true,
  isActive: true,
  returnPolicy: '30-day return policy',
  longTailKeyword: 'cotton t-shirt for men',
  description: 'A comfortable cotton t-shirt for casual wear.',
  summary:
    'Lorem Ipsum is simply dummy text of has been the industrys standard dummy text ever since the 1500s, when an unknown printer took',
  createdAt: new Date(),
  updatedAt: new Date(),
  thumbnailUrl: 'https://picsum.photos/527/304',
  views: 100,
  displayPrice: 299.99,
  customerTypeId: null,
  userId: 'a23f557d-2b39-4b70-9f15-bff2bcb9be32',
  estimatedDeliveryDay: 5,
  categories: [
    {
      id: 'e8f8e77d-d9fd-4f01-96b5-c1fa5dbf65da',
      name: "Men's Wear",
      slug: 'mens-wear',
    },
  ],
  subcategories: [
    {
      id: 'b4c073d2-b3a6-46d4-88f2-f6fbc3b57713',
      name: 'T-Shirts',
      slug: 't-shirts',
      categoryId: 'e8f8e77d-d9fd-4f01-96b5-c1fa5dbf65da',
    },
  ],
  similarProducts: [],
  user: {
    id: 'a23f557d-2b39-4b70-9f15-bff2bcb9be32',
    name: 'John Doe',
  },
  inventory: [
    {
      id: '7f0d80b0-b38d-4931-8e48-3d97fdfe387a',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      sizeId: '4c6f3c7d-4a72-4874-970b-67c53b5ff1a6',
      mrp: 47000,
      price: 38999,
      discount: 25.0,
      stock: 50,
      minQuantity: 1,
      size: [
        {
          id: '4c6f3c7d-4a72-4874-970b-67c53b5ff1a6',
          name: 'M',
          slug: 'm',
        },
        {
          id: '4c6f3c7d-4a72-4874-970b-67c53b5ff1a6',
          name: 'S',
          slug: 's',
        },
        {
          id: '4c6f3c7d-4a72-4874-970b-67c53b5ff1a6',
          name: 'XL',
          slug: 'xl',
        },
      ],
    },
  ],
  images: [
    {
      id: '1fe93a7b-4ac9-477b-bec6-d79ef72d3094',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      imageUrl: 'https://picsum.photos/452/715?random=1',
      colorId: '4e8d6bba-bf3a-4fc0-a0c3-073b015556e1',
      altText: 'Red T-Shirt',
    },
    {
      id: '1fe93a7b-4ac9-477b-bec6-d79ef72d3094',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      imageUrl: 'https://picsum.photos/141/958?random=1',
      colorId: '4e8d6bba-bf3a-4fc0-a0c3-073b015556e1',
      altText: 'Red T-Shirt',
    },
    {
      id: '1fe93a7b-4ac9-477b-bec6-d79ef72d3094',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      imageUrl: 'https://picsum.photos/748/587?random=1',
      colorId: '4e8d6bba-bf3a-4fc0-a0c3-073b015556e1',
      altText: 'Red T-Shirt',
    },
    {
      id: '1fe93a7b-4ac9-477b-bec6-d79ef72d3094',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      imageUrl: 'https://picsum.photos/120/148?random=1',
      colorId: '4e8d6bba-bf3a-4fc0-a0c3-073b015556e1',
      altText: 'Red T-Shirt',
    },
    {
      id: '1fe93a7b-4ac9-477b-bec6-d79ef72d3094',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      imageUrl: 'https://picsum.photos/857/300?random=1',
      colorId: '4e8d6bba-bf3a-4fc0-a0c3-073b015556e1',
      altText: 'Red T-Shirt',
    },
  ],
  productReview: [
    {
      id: 'f33d21d0-4705-49d1-8697-b973295a2b06',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      rating: 4,
      review:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      id: 'f33d21d0-4705-49d1-8697-b973295a2b06',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      rating: 3,
      review: 'Great quality, perfect for casual outings.',
    },
    {
      id: 'f33d21d0-4705-49d1-8697-b973295a2b06',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      rating: 5,
      review: 'Great quality, perfect for casual outings.',
    },
    {
      id: 'f33d21d0-4705-49d1-8697-b973295a2b06',
      productId: '3fc56389-b6d1-4cde-89b5-7a4f5106b1cd',
      rating: 3,
      review: 'Great quality, perfect for casual outings.',
    },
  ],
  tags: [
    'stylish',
    'summer wear',
    'organic cotton',
    'eco-friendly',
    'trendy fashion',
    'soft fabric',
    'premium quality',
    'classic look',
    'lightweight',
    'durable material',
    'comfortable fit',
    'chic and modern',
    'handmade',
    'vintage vibes',
    'everyday wear',
    'formal attire',
    'versatile design',
    'bold colors',
    'sleek and simple',
    'luxury feel',
    'easy to wash',
    'outdoor essentials',
    'travel-friendly',
    'minimalist style',
    'boho chic',
    'warm and cozy',
    'machine washable',
    'stretchable fabric',
    'perfect for layering',
    'all-season wear',
  ],
  similarTo: [
    {
      thumbnailUrl: 'https://picsum.photos/452/715?random=1',
    },
    {
      thumbnailUrl: 'https://picsum.photos/748/582?random=1',
    },
    {
      thumbnailUrl: 'https://picsum.photos/147/582?random=1',
    },
    {
      thumbnailUrl: 'https://picsum.photos/257/650?random=1',
    },
    {
      thumbnailUrl: 'https://picsum.photos/523/715?random=1',
    },
    {
      thumbnailUrl: 'https://picsum.photos/354/257?random=1',
    },
  ],
  productSize: {
    id: '4c6f3c7d-4a72-4874-970b-67c53b5ff1a6',
    name: 'M',
    slug: 'm',
  },
}

const ProductPage = () => {
  const displayProductRef = useRef(null)

  useEffect(() => {
    if (displayProductRef.current) {
      window.scrollTo({
        top: displayProductRef.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [])
  return (
    <div className='container mx-auto p-5 flex flex-col'>
      <div>
        <CouponSecion />
      </div>
      <div ref={displayProductRef} className='py-1'></div>
      <div>
        <DisplayPorductSection product={product} />
      </div>
      <div className='flex gap-10 lg:mt-7 lg:mb-3'>
        <div className='lg:w-[50%]'>
          <ReviewSection reviews={product?.productReview} />
        </div>
        <div className='lg:w-[50%]'>
          <SimilarProducts products={product?.similarTo} />
        </div>
      </div>
      <div className='my-5'>
        <TagSection tags={product?.tags} />
      </div>
    </div>
  )
}

export default ProductPage
