'use client';

import { Bars3Icon, XMarkIcon, HomeIcon, CubeIcon, UserCircleIcon } from '@heroicons/react/24/outline';

import { useState } from 'react';


export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const movileNavItems = [
        {
            name: 'Inicio',
            href: '/',
            icon: HomeIcon,
            slug: null
        },
        {
            name: 'Nuevos juegos',
            href: '/new-games',
            icon: CubeIcon,
            slug: null
        },
        {
            name: 'Categorias',
            href: '/categories',
            icon: CubeIcon,
            slug: "categories"
        },
        {
            name: 'Sobre nosotros',
            href: '/about',
            icon: CubeIcon,
            slug: "about"
        },
        {
            name: 'Contacto',
            href: '/contact',
            icon: UserCircleIcon,
            slug: "contact"
        },
    ];


    return (
        <>
            {!isOpen ? (
                <button className='lg:hidden' onClick={() => setIsOpen(true)}
                    aria-expanded="false"
                    aria-controls='mobile-menu'>
                    <Bars3Icon className='w-6 h-6' aria-label='Open menu' />
                </button>
            ) : (
                <button className='lg:hidden' onClick={() => setIsOpen(false)}
                    aria-expanded="true"
                    aria-controls='mobile-menu'>
                    <XMarkIcon className='w-6 h-6' aria-label='Close menu' />
                </button>
            )}

            {isOpen && (
                <div id='mobile-menu' className='fixed top-[57px] h-dvh left-0 right-0 z-50 bg-main p-4'>
                    <ul className='bg-muted flex flex-col mb-6' role='menu'>
                        {movileNavItems.map((item) => (
                            <li key={item.name} className='border-accent' role='none'>
                                <a href={item.href} className='text-xl font-medium hover:bg-accent rounded-md flex gap-4 items-center border-b border-accent py-4 px-7' role='menuitem'>
                                    <item.icon className='w-6 h-6 text-white' aria-hidden='true' />
                                    {item.name}
                                </a>
                            </li>
                        ))}

                    </ul>
                </div>
            )}
        </>
    );
}