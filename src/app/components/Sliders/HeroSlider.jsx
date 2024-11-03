'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y  } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 

export default function HeroSlider() {
    return (
        <div>
            <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            className='h-[300px] md:h-[380px] w-full mb-6 rounded-lg border border-accent-secondary bg-main'
            style={{
            "--swiper-pagination-color": "#FFBA08",
            "--swiper-pagination-bullet-inactive-color": "#999999" ,
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-bullet-size": "0.6em",
            "--swiper-pagination-bullet-horizontal-gap": "6px",
            "--swiper-theme-color": "#FFF",
            "--swiper-navigation-size": "24px",
            "--swiper-navigation-sides-offset": "30px",
             }}
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            >
                <SwiperSlide className="bg-[url('/slide/slide-1.png')] bg-no-repeat bg-right p-20 items-center">
                    <div className='max-w-3xl'>
                        <div className='text-accent text-sm mb-2 uppercase '>
                            Juegos De Arcade Gratis
                        </div>
                        <h1 className='font-display text-4xl lg:text-6xl mb-4'>Tus juegos <br/> retro favoritos</h1>
                        <p className='mb-6 max-w-[418px]'> Revive los clasicos! Sumergete en nuestra coleccion de juegos retros y disfrutalos gratis. COMIENZA A JUGAR AHORA!</p>
                        <a href="#" className='text-sm text-black bg-accent-gradient py-3 px-7 rounded-xl border border-yellow-400 uppercase'>Juega al super Mario</a>

                    </div>

                </SwiperSlide>
                
            </Swiper>
        </div>
    );
}