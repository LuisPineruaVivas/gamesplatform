'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper/modules';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export default function CategorySlider({ categories }) {

    const breakpoints = {
        320: {
            slidesPerView: 3
        },
        640: {
            slidesPerView: 4
        },
        768: {
            slidesPerView: 6
        }
    }

    return (
        <div className='mb-6'>
            <div className='flex justify-between gap-4'>
                <h2 className='font-display mb-4 items-center'>Categorias</h2>
                <a href='/category' className='text-sm font-medium hover:underline underline-offset-4'>Ver todas <ChevronRightIcon className='h-4 w-4 inline-block text-accent' /></a>
            </div>

            <Swiper
                spaceBetween={20}
                slidesPerView={6}
                breakpoints={breakpoints}
                navigation={true}
                scrollbar={{ draggable: true }}
                style={{
                    "--swiper-pagination-color": "#FFBA08",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-size": "0.6em",
                    "--swiper-pagination-bullet-horizontal-gap": "6px",
                    "--swiper-theme-color": "#FFF",
                    "--swiper-navigation-size": "24px",
                    "--swiper-navigation-sides-offset": "30px",
                }}
                modules={[Navigation, Scrollbar, A11y]}
            >

                {categories.map((item, i) => (
                    <SwiperSlide key={i} className='group'>
                        <a href={`/category/${item.slug}`} className='group'>
                            <div className='overflow-hidden rounded-lg border border-accent-secondary mb-2'>
                                <Image src={`/category/${item.image}`} alt={item.title} width={220} height={293}
                                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' />
                            </div>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </a>
                    </SwiperSlide>
                ))}


            </Swiper>

        </div>
    )
}