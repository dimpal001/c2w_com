/* eslint-disable react/prop-types */
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { cdnPath } from '../Components/cdnPath'

const SocialLinkSection = ({ socialLinks }) => {
  console.log(socialLinks[0])
  return (
    <div className='container mx-auto'>
      <div>
        <div className='h-3 bg-black w-[50%]'></div>
        <div className='h-3 bg-pink-500 w-[40%]'></div>
        <div className='p-5 flex justify-center'>
          <DiscountCard />
        </div>
        <div className='grid grid-cols-4 max-sm:grid-cols-2 max-sm:p-3 gap-3'>
          {socialLinks?.length > 0 &&
            socialLinks?.map((image, index) => (
              <a
                rel='noreferrer'
                key={index}
                className='relative'
                href={image.hyperLink}
                target='_blank'
              >
                <img
                  className='rounded-xl cursor-pointer'
                  key={index}
                  src={cdnPath + image.imageUrl}
                  alt={image.imageUrl}
                />
                <div className='bg-black inset-0 rounded-xl absolute z-10 opacity-30'></div>
                <div className='flex justify-center items-center absolute z-20 inset-0'>
                  <img
                    className='w-16 max-sm:w-10 shadow-2xl max-sm:rounded-lg rounded-2xl shadow-black'
                    src={
                      image.hyperLink?.toLowerCase().includes('instagram')
                        ? 'https://clothes2wear.blr1.cdn.digitaloceanspaces.com/icons/instagram.png'
                        : image.hyperLink?.toLowerCase().includes('youtube')
                        ? 'https://clothes2wear.blr1.cdn.digitaloceanspaces.com/icons/youtube.png'
                        : image.hyperLink?.toLowerCase().includes('facebook')
                        ? 'https://clothes2wear.blr1.cdn.digitaloceanspaces.com/icons/facebook.png'
                        : image.hyperLink?.toLowerCase().includes('pinterest')
                        ? 'https://clothes2wear.blr1.cdn.digitaloceanspaces.com/icons/pinterest.png'
                        : 'https://clothes2wear.blr1.cdn.digitaloceanspaces.com/icons/default.png'
                    }
                    alt='h'
                  />
                </div>
              </a>
            ))}
        </div>
      </div>
    </div>
  )
}

const DiscountCard = () => {
  return (
    <div className='rounded-xl w-[95%] md:w-[60%] flex justify-between items-center bg-gradient-to-b p-3 px-6 max-sm:px-3 from-white to bg-pink-300'>
      <div className='text-2xl max-sm:text-sm md:tracking-widest md:leading-tight uppercase font-bold'>
        flash <br /> sale %
      </div>
      <div className='font-semibold max-sm:text-[10px]'>
        <p>Enjoy heavy discount on every prepaid orders</p>
      </div>
      <div>
        <ArrowRight />
      </div>
    </div>
  )
}

export default SocialLinkSection
