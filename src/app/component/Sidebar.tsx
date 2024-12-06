"use client";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="w-full h-full md:flex flex-col gap-2 hidden border-r-[1px] border-zinc-800">
      <h3 className="font-bold pb-2">Components</h3>
      <ul className="pl-4 text-lg">
        <li className="py-1">
          <Link href={"/components/alert"}>Alert</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/input"}>Input</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/checkbox"}>Checkbox</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/badge"}>Badge</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/button"}>Button</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/dialog"}>Dialog</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/dropdown-menu"}>Dropdown Menu</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/hover-card"}>Hover Card</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/menubar"}>Menubar</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/popover"}>Popover</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/radio-group"}>Radio Group</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/select"}>Select</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/slider"}>Slider</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/tabs"}>Tabs</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/toggle"}>Toggle</Link>
        </li>
        <li className="py-1">
          <Link href={"/components/tooltip"}>Tooltip</Link>
        </li>
      </ul>
    </div>
  );
}; 

export default Sidebar;
