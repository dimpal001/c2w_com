// app/Sidebar.js
import React from 'react'
import {
  BadgePlus,
  CircleFadingPlus,
  CirclePercent,
  FileVideo2,
  Gift,
  Globe,
  Home,
  ImagePlay,
  PartyPopper,
  Quote,
  ScrollText,
  Shirt,
  ShoppingBasket,
  SquareMenu,
  SunSnow,
  TrendingUp,
  Truck,
  UserCog,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUserContext } from '@/app/context/UserContext'

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isExpanded }) => {
  const pathname = usePathname()
  const { user } = useUserContext()

  const menuItems = [
    { label: 'Home', icon: Home, path: '/admin_/home' },
    { label: 'Dashboard', icon: Home, path: '/admin_/dashboard' },
    { label: 'Manage Staff', icon: UserCog, path: '/admin_/manage-staff' },
    { label: 'Users', icon: Users, path: '/admin_/users/user-list' },
    {
      label: 'Products',
      icon: ShoppingBasket,
      path: '/admin_/products/product-list',
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
      label: 'Manage Blogs',
      icon: ScrollText,
      path: '/admin_/manage-blogs',
    },
    {
      label: 'Manage Quotes',
      icon: Quote,
      path: '/admin_/manage-quotes',
    },
    {
      label: 'Social Links',
      icon: Globe,
      path: '/admin_/social-links',
    },
    {
      label: 'Vides',
      icon: FileVideo2,
      path: '/admin_/vides',
    },
  ]

  const filteredMenuItems = menuItems.filter((item) => {
    const privilegeName = item.path.split('/admin_/')[1].split('/')[0]

    if (item.label === 'Home') {
      return user.role === 'STAFF'
    }

    if (user.role === 'ADMIN') {
      return true
    } else if (user.role === 'STAFF') {
      return user.privileges.some(
        (userPrivilege) => userPrivilege.privilege.name === privilegeName
      )
    }
    return false
  })

  return (
    <div
      className={`${
        isExpanded ? 'w-[290px]' : 'w-[80px]'
      } p-[20px] bg-blue-800 scrollbar-hide rounded-sm transition-all overflow-scroll duration-300 shadow-md`}
    >
      <nav>
        {filteredMenuItems.map((item, index) => (
          <div key={index} className='overflow-scroll scrollbar-hide'>
            <Link href={item.path || '#'} passHref>
              <div
                className={`${
                  !isExpanded && 'block'
                } flex justify-center hover:bg-white hover:text-black transition-none my-[1px] items-center px-[10px] py-[8px] cursor-pointer font-[500] rounded-[4px] ${
                  pathname === item.path ? 'bg-white' : 'bg-transparent'
                } ${pathname === item.path ? 'text-black' : 'text-white'}`}
              >
                <item.icon strokeWidth={2} size={18} />

                <span
                  className={`${
                    isExpanded ? 'w-full' : 'w-0'
                  } overflow-hidden transition-all duration-300 text-nowrap`}
                >
                  <span className='pl-2'>{item.label}</span>
                </span>
              </div>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
