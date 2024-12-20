import React from 'react'

const BestSellerSection = () => {
  return (
    <div className='py-12 p-1'>
      <div className='border-3 max-sm:flex max-sm:flex-col max-sm:gap-5 border-dashed border-zinc-700 p-7 max-sm:p-4 flex md:gap-7'>
        <div className='md:w-[50%]'>
          <h3 className='font-semibold text-xl'>
            Clothes2Wear&apos;s Bestseller Ethnic Wear Online in India
          </h3>
          <p className='text-xs'>
            India officially the Republic of India is a country in South Asia.
            India is a country with diverse cultures. The incredible part of
            India is that it has 9 different religions within the country to
            name a few like Hinduism, Islam, Christianity, Sikhism, Jainism etc.
            India’s languages, religion, dance, music, architecture, food and
            customs differ from place to place within the country. <br />
            <br />
            Salwar Kameez, Sarees, Lehengas Choli, Dhoti suit, Lehenga Suit are
            some of the traditional/ethnic Indian Outfits popular in India
            amongst women. But one outfit that is very common in all states of
            India is a Saree. Saree is considered to be one of India’s most
            elegant outfits. From an ordinary Casual day to auspicious holy
            occasions sarees are always on top of the chart. Well in different
            parts on India sarees are worn in different ways. Married women’s in
            Gujrat prefer to wear a Bandhej saree with draping the pallu from
            back to the front with loose ends of saree placed across the torso.
            Women in Bengal too wear saree with a unique style that has a cowl
            drape at the back and the leftover portion of the saree in front.
            Maharashtrian women too wear saree but with a totally unique style
            which is called kastha saree. <br />
            <br />
            Some popular Indian Styles that are leading are: <br />
            <br />
            Salwar Kameez - <br />
            <br />
            Salwar Kameez is a three-piece suit having a suit/ Kurti to be worn
            on the upper body a salwar (pant) and a dupatta. Salwar Kameez is
            worn by everyone from youngsters to married women’s. But it’s the
            most common style seen in the northern part of India in Punjab. In
            Salwar Kameez one has a variety of style options. Like Patiya Suit,
            Anarkali Suit, Dhoti Suit, Palazzo Suit, Sharara Suit, Cape Suit
            etc. It’s an apt choice to be worn for Traditional ceremonies at
            home poojas, festivals and wedding occasions. They are available in
            market in heavy embellished embroideries as well as in elegant
            prints. It can be even worn as office wear, a casual style for
            outings and brunch parties.
          </p>
        </div>
        <div className='md:w-[50%]'>
          <div>
            <div className='flex justify-between'>
              <h3 className='text-3xl font-semibold'>
                Bestsellers in India List
              </h3>
              <p className='text-3xl font-semibold'>Price</p>
            </div>
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className='flex justify-between py-[4px]'>
                <h4>
                  Black Saree With Kashmiri Thread Work And Unstitched Blouse
                  Piece
                </h4>
                <p>₹49,000</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BestSellerSection
