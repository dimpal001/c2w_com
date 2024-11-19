// app/Sidebar.js
import React from 'react'
import {
  BadgePlus,
  CircleFadingPlus,
  CirclePercent,
  Gift,
  Home,
  ImagePlay,
  PartyPopper,
  ShoppingBasket,
  SquareMenu,
  Star,
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
    { label: 'Home', icon: Home, path: '/admin_/dashboard' },
    { label: 'Users', icon: Users, path: '/admin_/users/user-list' },
    {
      label: 'Products',
      icon: ShoppingBasket,
      path: '/admin_/products/product-list',
    },
    {
      label: 'Product Reviews',
      icon: Star,
      path: '/admin_/products/reviews',
    },
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
  ]

  return (
    <div
      className={`${
        isExpanded ? 'w-[250px]' : 'w-[80px]'
      } p-[20px] bg-blue-800 rounded-sm transition-all duration-300 overflow-hidden shadow-md`}
    >
      <nav>
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link href={item.path || '#'} passHref>
              <div
                className={`flex items-center p-[10px] cursor-pointer font-semibold rounded-[4px] ${
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
