import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Controller, Thumbs } from 'swiper';
import 'swiper/swiper-bundle.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


SwiperCore.use([Navigation, Pagination, Controller, Thumbs]);

export default function Projects() {

  
  return (
    <div className='swiper container flex justify-center items-center'>
      {/* Projects */}
      <Swiper
        id="main"
        tag="section"
        wrapperTag="ul"
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full"
      >

        <SwiperSlide key="slide-1" className="swiper__slide">
          <img className='max-w-xl select-none' src="https://picsum.photos/400/300" alt="Project"/>
          <div className='description max-w-xl'>
            <h2>Project</h2>
            <p>Sit aliqua sint ullamco consectetur esse pariatur nisi qui aliqua occaecat proident. Laborum nisi est commodo dolor sunt magna excepteur qui non non. Nulla voluptate nostrud reprehenderit aute. Magna eiusmod in est amet aliquip do. Sunt ullamco esse est esse reprehenderit excepteur.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide key="slide-2" className="swiper__slide">
          <img className='max-w-xl select-none' src="https://picsum.photos/400/300" alt="Project"/>
          <div className='description max-w-xl'>
            <h2>Project</h2>
            <p>Sit aliqua sint ullamco consectetur esse pariatur nisi qui aliqua occaecat proident. Laborum nisi est commodo dolor sunt magna excepteur qui non non. Nulla voluptate nostrud reprehenderit aute. Magna eiusmod in est amet aliquip do. Sunt ullamco esse est esse reprehenderit excepteur.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide key="slide-3" className="swiper__slide">
          <img className='max-w-xl select-none' src="https://picsum.photos/400/300" alt="Project"/>
          <div className='description max-w-xl'>
            <h2>Project</h2>
            <p>Sit aliqua sint ullamco consectetur esse pariatur nisi qui aliqua occaecat proident. Laborum nisi est commodo dolor sunt magna excepteur qui non non. Nulla voluptate nostrud reprehenderit aute. Magna eiusmod in est amet aliquip do. Sunt ullamco esse est esse reprehenderit excepteur.</p>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  )
}
