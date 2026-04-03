import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from "swiper";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { TfiControlPlay, TfiControlPause } from "react-icons/tfi";
import "../css/HeroSlider.css";
import headerSlides from "../js/headerSlides";

const montserrat = { fontFamily: "'Montserrat', Arial, Helvetica, sans-serif" };

export default function HeaderSwiper({ 
    currentSlide, 
    setCurrentSlide, 
    setBg, 
    setProgress, 
    isFirstLoad, 
    activeVideoIndex,
    setActiveVideoIndex, 
    setFirstVideoPaused, 
    firstVideoPaused,
    setThirdVideoPlaying, 
    thirdVideoPlaying,
    thirdVideoPaused,
    setThirdVideoPaused, 
    thirdVideoRef,
    handlePlay, 
    handleThirdVideoPlayPause, 
    handleVideoEnded, 
    isMobile, 
    isLargeScreen,
    screenWidth,
    autoplayEnabled,
    setAutoplayEnabled
}) {
    const swiperRef = useRef(null);

    const mediaClass = `w-full object-cover ${
        screenWidth <= 640
            ? 'h-[500px] max-h-[500px]'
            : isMobile
                ? 'h-[600px] max-h-[600px]'
                : isLargeScreen
                    ? 'w-full h-full max-h-[80vh] object-contain'
                    : 'h-[472px] max-h-[472px]'
    }`;
    const headerSlides = [
    {
        type: "video",
        video: "/videos/hero_video1.mp4",
        poster: "/images/hero_slide1.jpg",
        title: "New Continental GT S",
        description: "Whether you're turning heads in the city or leaving it far behind, this is a grand tourer with a bold, uncompromising edge.",
        button1: "EXPLORE",
        button2: "CREATE YOUR OWN",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide2.jpg",
        title: "Continental GTC S",
        description: "The Continental GTC S offers an unforgettable experience, whether you drive it with the top up or down.",
        button1: "EXPLORE",
        button2: "CREATE YOUR OWN",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14" /></svg>'
    },
    {
        type: "video",
        video: "/videos/hero_video3.mp4",
        poster: "/images/hero_slide3.jpg",
        title: "SuperSports",
        description: "Responsive, raw and incredibly exhilarating, this is a car that looks, sounds and feels like nothing else on the road.",
        button1: "EXPLORE",
        button2: "WATCH FULL SEND",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" fill="none" viewBox="0 0 32 33"><path fill="currentColor" fillRule="evenodd" d="m11.75 23.266 9.898-6.598-9.898-6.6zm-1.5 1.402v-16a.75.75 0 0 1 1.166-.625l12 8a.75.75 0 0 1 0 1.249l-12 8a.75.75 0 0 1-1.166-.625" clipRule="evenodd" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide4.jpg",
        title: "New Bentayga Speed",
        description: "The most powerful and best sounding Bentayga ever built.",
        button1: "EXPLORE",
        button2: "CREATE YOUR OWN",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide5.jpg",
        title: "Flying Spur Azure",
        description: "The Flying Spur Azure is an extraordinary four-door luxury sedan, offering a unique combination of passenger space, comfort and comfort-enhancing technology.",
        button1: "EXPLORE",
        button2: "CREATE YOUR OWN",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide6.jpg",
        title: "Accessories",
        description: "Every Bentley owner is different. That's why we offer an extensive range of Bentley car accessories, designed to enhance the way your car looks, sounds and feels. You can dial up your expression with the Carbon Fibre Styling Specification.",
        button1: "EXPLORE",
        button2: "",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide7.jpg",
        title: "Bentley Home",
        description: "Bentley design knows no limits - and with the Bentley Home range of furnishings, you can experience the brand's exquisite craftsmanship, both inside and outside your home.",
        button1: "EXPLORE",
        button2: "SHOP NOW",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 2h2.5l1.826 8.217a1 1 0 0 0 .976.783h5.85a1 1 0 0 0 .987-.836L14 5H4.5m2.167 8.333A.667.667 0 0 1 6 14m.667-.667A.667.667 0 0 1 6 12.667m.667.666H5.333M6 14a.667.667 0 0 1-.667-.667M6 14v-1.333m-.667.666c0-.368.299-.666.667-.666m6.667.666A.667.667 0 0 1 12 14m.667-.667A.667.667 0 0 1 12 12.667m.667.666H5.333M12 14a.667.667 0 0 1-.667-.667M12 14v-1.333m.667.666c0-.368.299-.666.667-.666" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide8.jpg",
        title: "Become Zenith",
        description: "Unfold your story",
        button1: "SHOP NOW",
        button2: "EXPLORE BENTLEY LIFESTYLE",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 2h2.5l1.826 8.217a1 1 0 0 0 .976.783h5.85a1 1 0 0 0 .987-.836L14 5H4.5m2.167 8.333A.667.667 0 0 1 6 14m.667-.667A.667.667 0 0 1 6 12.667m.667.666H5.333M6 14a.667.667 0 0 1-.667-.667M6 14v-1.333m-.667.666c0-.368.299-.666.667-.666m6.667.666A.667.667 0 0 1 12 14m.667-.667A.667.667 0 0 1 12 12.667m.667.666H5.333M12 14a.667.667 0 0 1-.667-.667M12 14v-1.333m.667.666c0-.368.299-.666.667-.666" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>'
    }
];
    const videoClass = `w-full object-cover ${
        screenWidth <= 640
            ? 'h-[500px] max-h-[500px]'
            : isMobile
                ? 'h-[600px] max-h-[600px]'
                : isLargeScreen
                    ? 'w-full h-full max-h-[80vh] object-contain'
                    : 'h-[472px] max-h-[472px]'
    }`;

    return (
        <div className="swiper-outer-wrapper relative z-10 mt-0 flex-1">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
                pagination={{ el: ".custom-fraction", type: "fraction" }}
                direction="horizontal"
                spaceBetween={30}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{ 
                    delay: 4500, 
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: false
                }}
                onSlideChange={(swiper) => {
                    setBg(swiper.realIndex);
                    setCurrentSlide(swiper.realIndex);
                    setActiveVideoIndex(null);
                    
                    const totalSlides = headerSlides.length;
                    const currentSlideIndex = swiper.realIndex;
                    let newProgress = currentSlideIndex / totalSlides;
                    
                    if (currentSlideIndex === totalSlides - 1 && swiper.isEnd) {
                        newProgress = 1;
                    }
                    
                    setProgress(newProgress);
                    isFirstLoad.current = false;
                }}
                onAutoplayTimeLeft={(swiper, time, progressVal) => {
                    const totalSlides = headerSlides.length;
                    const currentSlideIndex = swiper.realIndex;
                    const currentSlideProgress = 1 - progressVal;
                    
                    let totalProgress = (currentSlideIndex + currentSlideProgress) / totalSlides;
                    
                    if (currentSlideIndex === totalSlides - 1) {
                        if (currentSlideProgress >= 0.99 || progressVal <= 0.01) {
                            totalProgress = 1;
                        }
                    }
                    
                    if (swiper.isEnd && currentSlideProgress >= 0.99) {
                        totalProgress = 1;
                    }
                    
                    totalProgress = Math.min(Math.max(totalProgress, 0), 1);
                    setProgress(totalProgress);
                }}
                onReachEnd={() => {
                    setProgress(1);
                }}
                className={`mySwiper h-full ${isMobile ? 'mobile-swiper' : 'large-screen-adjust'}`}
                style={isMobile ? { height: 'auto', minHeight: '650px' } : (!isMobile && isLargeScreen ? { height: 'calc(100% - 40px)' } : { height: '100%' })}
                watchSlidesProgress={true}
                slideToClickedSlide={false}
            >
                {headerSlides.map((slide, index) => (
                    <SwiperSlide
                        key={index}
                        className={`${!isMobile && isLargeScreen ? 'flex justify-center' : ''}`}
                    >
                        <div className="relative w-full h-full">
                            {slide.type === "video" ? (
                                index === 0 ? (
                                    <div
                                        className={`relative cursor-pointer w-full h-full ${!isMobile && isLargeScreen ? 'flex items-center justify-center' : ''}`}
                                        onClick={() => setFirstVideoPaused(prev => !prev)}
                                    >
                                        {firstVideoPaused ? (
                                            <img className={mediaClass} src={slide.poster} alt={slide.title} />
                                        ) : (
                                            <video className={videoClass} playsInline autoPlay muted={true} loop>
                                                <source src={slide.video} type="video/mp4" />
                                            </video>
                                        )}
                                    </div>
                                ) : index === 2 ? (
                                    <div
                                        className={`relative w-full h-full ${!isMobile && isLargeScreen ? 'flex items-center justify-center' : ''}`}
                                    >
                                        {!thirdVideoPlaying ? (
                                            <div
                                                className="relative object-cover cursor-pointer w-full h-full"
                                                onClick={() => handlePlay(index)}
                                            >
                                                <img className={mediaClass} src={slide.poster} alt={`Slide ${index + 1}`} />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className={`bg-black text-white opacity-40 rounded-full hover:opacity-60 scale-100 hover:scale-110 transition-all ${isLargeScreen ? 'p-5' : 'p-3.5'}`}>
                                                        <TfiControlPlay size={isLargeScreen ? 32 : 20} />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <video 
                                                    ref={thirdVideoRef}
                                                    className={videoClass}
                                                    playsInline
                                                    autoPlay
                                                    muted
                                                    loop
                                                    onEnded={handleVideoEnded}
                                                >
                                                    <source src={slide.video} type="video/mp4" />
                                                </video>
                                                <button
                                                    onClick={handleThirdVideoPlayPause}
                                                    className="absolute bottom-6 left-4 bg-black/0 cursor-pointer text-white p-2 rounded-full transition-all z-10"
                                                    aria-label={thirdVideoPaused ? "Play" : "Pause"}
                                                >
                                                    {thirdVideoPaused ? (
                                                        <TfiControlPlay size={isLargeScreen ? 24 : 16} />
                                                    ) : (
                                                        <TfiControlPause size={isLargeScreen ? 24 : 16} />
                                                    )}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : activeVideoIndex === index ? (
                                    <div className={`relative w-full h-full ${!isMobile && isLargeScreen ? 'flex items-center justify-center' : ''}`}>
                                        <video className={videoClass} playsInline autoPlay loop>
                                            <source src={slide.video} type="video/mp4" />
                                        </video>
                                    </div>
                                ) : (
                                    <div
                                        className={`relative object-cover cursor-pointer w-full h-full ${!isMobile && isLargeScreen ? 'flex items-center justify-center' : ''}`}
                                        onClick={() => handlePlay(index)}
                                    >
                                        <img className={mediaClass} src={slide.poster} alt={`Slide ${index + 1}`} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className={`bg-black text-white opacity-40 rounded-full hover:opacity-60 scale-100 hover:scale-110 transition-all ${isLargeScreen ? 'p-5' : 'p-3.5'}`}>
                                                <TfiControlPlay size={isLargeScreen ? 32 : 20} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div className={`relative w-full h-full ${!isMobile && isLargeScreen ? 'flex items-center justify-center' : ''}`}>
                                    <img className={mediaClass} src={slide.src} alt={`Slide ${index + 1}`} />
                                </div>
                            )}
                        </div>

                        {/* Mobile text block */}
{screenWidth <= 639 ? (
    <div className="md:hidden relative z-20 px-4 py-4">
        <div className="text-white text-xl mb-1">{slide.title}</div>
        <div className="text-white text-[12px] mb-3">{slide.description}</div>
        <div className="flex flex-col gap-2 w-full">
            <button className="flex items-center justify-center gap-4 text-white bg-[#394D45] text-[11px] py-[8px] px-[12px] font-semibold hover:bg-green-400 hover:opacity-70 cursor-pointer transition-colors rounded w-full">
                <span 
                    className="inline-flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: slide.svg1 }} 
                />
                <span>{slide.button1}</span>
            </button>
            {slide.button2 && (
                <button 
                    onClick={() => window.open('https://www.youtube.com/watch?v=n2RqEakMWJ0&feature=youtu.be', '_blank')}
                    className="flex items-center justify-center gap-4 text-white text-[11px] py-[8px] px-[12px] border-2 border-white hover:bg-gray-500 cursor-pointer transition-colors rounded w-full leading-[1.2]"
                >
                    <span 
                        className="inline-flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: slide.svg2 }} 
                    />
                    <span>{slide.button2}</span>
                </button>
            )}
        </div>
    </div>
) : (
    <div className={`md:hidden absolute bottom-4 left-4 right-4 z-20 ${screenWidth > 640 && screenWidth <= 768 ? 'flex flex-col items-center' : ''}`}>
        <div className={`text-white text-xl mb-1 ${screenWidth > 640 && screenWidth <= 768 ? 'text-center' : ''}`}>{slide.title}</div>
        <div className={`text-white text-[12px] mb-3 ${screenWidth > 640 && screenWidth <= 768 ? 'text-center' : ''}`}>{slide.description}</div>
        <div className={`${screenWidth > 640 && screenWidth <= 768 ? 'flex flex-row justify-center gap-4' : 'flex flex-row flex-wrap gap-2'}`}>
            <button className={`flex items-center justify-center gap-4 text-white bg-[#394D45] ${
                screenWidth > 640 && screenWidth <= 768 
                    ? 'text-[14px] py-[10px] px-[22px]'
                    : 'text-[11px] py-[8px] px-[12px]'
            } font-semibold hover:bg-green-400 hover:opacity-70 cursor-pointer transition-colors ${
                screenWidth > 640 && screenWidth <= 768 ? '' : 'rounded'
            }`}>
                <span 
                    className="inline-flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: slide.svg1 }} 
                />
                <span>{slide.button1}</span>
            </button>
            {slide.button2 && (
                <button 
                    onClick={() => window.open('https://www.youtube.com/watch?v=n2RqEakMWJ0&feature=youtu.be', '_blank')}
                    className={`flex items-center justify-center gap-4 text-white ${
                        screenWidth > 640 && screenWidth <= 768 
                            ? 'text-[14px] py-[10px] px-[22px]'
                            : 'text-[11px] py-[8px] px-[12px]'
                    } border-2 border-white hover:bg-gray-500 cursor-pointer transition-colors ${
                        screenWidth > 640 && screenWidth <= 768 ? '' : 'rounded'
                    } leading-[1.2]`}
                >
                    <span 
                        className="inline-flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: slide.svg2 }} 
                    />
                    <span>{slide.button2}</span>
                </button>
            )}
        </div>
    </div>
)}
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Arrows - Hidden on mobile */}
            <div className="hidden md:flex gap-4 absolute top-8 z-10 right-5">
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="text-white bg-[#04040466] opacity-70 p-3 cursor-pointer hover:bg-[#04040499] transition-colors border-0 focus:outline-none"
                    aria-label="Previous slide"
                >
                    <FaLongArrowAltLeft size={isLargeScreen ? 24 : 16} />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="text-white bg-[#04040466] opacity-70 p-3 cursor-pointer hover:bg-[#04040499] transition-colors border-0 focus:outline-none"
                    aria-label="Next slide"
                >
                    <FaLongArrowAltRight size={isLargeScreen ? 24 : 16} />
                </button>
            </div>
        </div>
    );
}