"use client"
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-full md:flex flex-col gap-2 hidden border-r-[1px] border-zinc-700 '>
      <h3 className='font-bold pb-2'>Components</h3>
      {/* Components list */}
      <ul className='pl-4 text-sm'>
        <li className='py-1'><Link href={"/components/alert"}>Alert</Link></li>
        <li className='py-1'><Link href={""}>Input</Link></li>
        <li className='py-1'><Link href={""}>ChackBox</Link></li>
        <li className='py-1'><Link href={""}>Badge</Link></li>
        <li className='py-1'><Link href={""}>Button</Link></li>
        <li className='py-1'><Link href={""}>Dialog</Link></li>
        <li className='py-1'><Link href={""}>Dropdown Menu</Link></li>
        <li className='py-1'><Link href={""}>Hover Card</Link></li>
        <li className='py-1'><Link href={""}>Menubar</Link></li>
        <li className='py-1'><Link href={""}>Popover</Link></li>
        <li className='py-1'><Link href={""}>Radio Group</Link></li>
        <li className='py-1'><Link href={""}>Select</Link></li>
        <li className='py-1'><Link href={""}>Slider</Link></li>
        <li className='py-1'><Link href={""}>Tabs</Link></li>
        <li className='py-1'><Link href={""}>Toggle</Link></li>
        <li className='py-1'><Link href={""}>Tooltip</Link></li>
      </ul>
    </div>
  )
}

export default Sidebar
