import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'

const navigation = [
    { name: 'About', href: '#', current: true },
    { name: 'Contact', href: '#', current: false },
    { name: 'Help Center', href: '#', current: false },
    { name: 'Call Us +1234567890', href: '#', current: false },
]
const categorys = [
    { name: 'Shop All', href: '#', current: true },
    { name: 'Computers', href: '#', current: false },
    { name: 'Tablets', href: '#', current: false },
    { name: 'Audio', href: '#', current: false },
    { name: 'Mobile', href: '#', current: false },
    { name: 'T.V & Home Cinema', href: '#', current: false },
    { name: 'Wearable Tech', href: '#', current: false },
    { name: 'Sale', href: '#', current: false },
]



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    return (
        <>
            <Disclosure as="nav" className="fixed top-0 left-0 w-full shadow p-4 bg-gray-400 text-white z-50">
                {({ open }) => (
                    <>
                        <div className="fixed px-20.5 top-0 left-0 w-full shadow p-4 bg-black text-white z-50">
                            <div className="relative flex h-16 items-center justify-between">
                                {/* Mobile menu button */}
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                                    </Disclosure.Button>
                                </div>

                                {/* Logo + desktop nav */}
                                <div className="flex flex-1 items-center justify-between">
                                    <div className="flex shrink-0 items-center">
                                        {/* <img
                                            className="h-8 w-auto"
                                            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        /> */}
                                        <h4 className="text-white ml-2">Free Shipping for orders over $50</h4>
                                    </div>

                                    {/* Desktop nav links */}
                                    <div className="sm:ml-6 flex justify-end sm:flex sm:space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames('text-white hover:text-gray-300')}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile nav panel */}
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            {/* 2nd navbar */}

            <Disclosure as="nav" className="fixed px-12.5 top-20 left-0 w-full shadow p-4 bg-white text-black z-30">
                <div className="mx-auto max-w-full h-13.5 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            {/* Mobile menu button*/}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
{/* 
                            <div className="flex shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    className="h-8 w-auto"
                                />
                            </div> */}
                            <h4 className="text-gray-700 font-extrabold font-sans" style={{fontSize: '40px'}}>TechWear</h4>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            

                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div
                                    class="p-5 overflow-hidden w-[50px] h-[40px] hover:w-[270px] bg-[#999999] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
                                >
                                    <div class="flex items-center justify-center fill-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            id="Isolation_Mode"
                                            data-name="Isolation Mode"
                                            viewBox="0 0 24 24"
                                            width="22"
                                            height="22"
                                            className="text-black"
                                        >
                                            <path
                                                d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        class="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
                                    />
                                </div>
                            </div>

                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                                    />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                >
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        >
                                            Your profile
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        >
                                            Settings
                                        </a>
                                    </MenuItem>
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                                        >
                                            Sign out
                                        </a>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                            <button
                                type="button"
                                className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
                            >
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">View notifications</span>
                                <BellIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </Disclosure>

            {/* 3rd navbar */}

            <Disclosure as="nav" className="fixed top-37 left-0 w-full shadow p-4 bg-gray-200 text-black z-10 justify-items-center align-super items-center">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-full h-12.5 px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                {/* Mobile menu button */}
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                                    </Disclosure.Button>
                                </div>

                                {/* Logo + desktop nav */}
                                <div className="flex flex-1 items-center justify-between">
                                    {/* Desktop nav links */}
                                    <div className="sm:ml-6 flex justify-end sm:flex sm:space-x-4">
                                        {categorys.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames('text-black hover:text-blue-600 border-2 rounded-3xl px-6.5 py-0.5')}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile nav panel */}
                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {categorys.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-900 text-white'
                                                : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                            'block rounded-md px-3 py-2 text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        </>
    )
}
