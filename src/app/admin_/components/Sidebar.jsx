// app/Sidebar.js
import React from 'react'
import {
  BadgePlus,
  CircleFadingPlus,
  CirclePercent,
  Component,
  Gift,
  Globe,
  Home,
  ImagePlay,
  PartyPopper,
  ScrollText,
  Shirt,
  ShoppingBasket,
  SquareMenu,
  SunSnow,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isExpanded }) => {
  const pathname = usePathname()

  const menuItems = [
    { label: 'Dashboard', icon: Home, path: '/admin_/dashboard' },
    { label: 'Users', icon: Users, path: '/admin_/users/user-list' },
    {
      label: 'Products',
      icon: ShoppingBasket,
      path: '/admin_/products/product-list',
    },
    // {
    //   label: 'Product Reviews',
    //   icon: Star,
    //   path: '/admin_/products/reviews',
    // },
    {
      label: 'Discounts',
      icon: CirclePercent,
      path: '/admin_/discounts',
    },
    { label: 'Orders', icon: Truck, path: '/admin_/orders/order-list' },
    { label: 'Menus', icon: SquareMenu, path: '/admin_/menu' },
    { label: 'Showcases', icon: CircleFadingPlus, path: '/admin_/showcases' },
    { label: 'Hero Slider', icon: ImagePlay, path: '/admin_/hero-sliders' },
    { label: 'Trending', icon: TrendingUp, path: '/admin_/trending' },
    { label: 'New Arrivals', icon: BadgePlus, path: '/admin_/new-arrivals' },
    {
      label: 'Exclusive Collections',
      icon: Gift,
      path: '/admin_/exclusive-collections',
    },
    {
      label: 'Shop By Occasion',
      icon: PartyPopper,
      path: '/admin_/shop-by-occasion',
    },
    {
      label: 'Shop By Season',
      icon: SunSnow,
      path: '/admin_/shop-by-season',
    },
    {
      label: 'Fashion Week',
      icon: Shirt,
      path: '/admin_/fashion-week',
    },
    {
      label: 'Design Configuration',
      icon: Component,
      path: '/admin_/designs',
    },
    {
      label: 'Manage Blogs',
      icon: ScrollText,
      path: '/admin_/manage-blogs',
    },
    {
      label: 'Social Links',
      icon: Globe,
      path: '/admin_/social-links',
    },
  ]

  return (
    <div
      className={`${
        isExpanded ? 'w-[250px]' : 'w-[80px]'
      } p-[20px] bg-blue-800 rounded-sm transition-all overflow-scroll duration-300 shadow-md`}
    >
      <nav>
        {menuItems.map((item, index) => (
          <div key={index} className='overflow-scroll'>
            <Link href={item.path || '#'} passHref>
              <div
                className={`flex items-center px-[10px] py-[8px] cursor-pointer font-semibold rounded-[4px] ${
                  pathname === item.path ? 'bg-white' : 'bg-transparent'
                } ${pathname === item.path ? 'text-blue-800' : 'text-white'}`}
              >
                <item.icon size={18} />
                {isExpanded && (
                  <span style={{ marginLeft: '10px' }}>{item.label}</span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
