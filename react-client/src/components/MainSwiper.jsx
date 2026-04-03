import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import "../css/MainSlider.css";
import { useRef, useState, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function MainSwiper({ 
    slides, 
    expandedSlide, 
    setExpandedSlide, 
    expandedSlideId, 
    setExpandedSlideId, 
    slideExpanded, 
    setSlideExpanded, 
    panelVisible, 
    setPanelVisible, 
    windowWidth,
    getDefaultHeight,
    getExpandedHeight,
    getSlideTransform,
    handleSlideClick,
    handleCloseExpanded,
    slideProgress,
    setSlideProgress,
    isMoving,
    setIsMoving
}) {
    const swiperMainRef = useRef(null);
    const movingTimer = useRef(null);
    const lastMouseX = useRef(0);

    const getSlideIndex = (id) => slides.findIndex(s => s.id === id);

    const getBlankSpaceWidth = () => {
        if (windowWidth >= 1400) return '600px';
        else if (windowWidth >= 1200) return '500px';
        else if (windowWidth >= 1024) return '400px';
        return '0px';
    };

    const getExpandedSlidePosition = () => {
        if (!expandedSlide || windowWidth < 1024) return 0;
        const swiper = swiperMainRef.current?.swiper;
        if (!swiper) return 0;
        const expandedIndex = getSlideIndex(expandedSlide.id);
        const slideEl = swiper.slides[expandedIndex];
        if (!slideEl) return 0;
        const swiperRect = swiper.el.getBoundingClientRect();
        const slideRect = slideEl.getBoundingClientRect();
        const rightEdgePx = slideRect.left - swiperRect.left + slideRect.width;
        return (rightEdgePx / swiperRect.width) * 100;
    };

    const getExpandedSlideLeftPosition = () => {
        if (!expandedSlide || windowWidth < 1024) return 0;
        const swiper = swiperMainRef.current?.swiper;
        if (!swiper) return 0;
        const expandedIndex = getSlideIndex(expandedSlide.id);
        const slideEl = swiper.slides[expandedIndex];
        if (!slideEl) return 0;
        const swiperRect = swiper.el.getBoundingClientRect();
        const slideRect = slideEl.getBoundingClientRect();
        const leftEdgePx = slideRect.left - swiperRect.left;
        return (leftEdgePx / swiperRect.width) * 100;
    };

    const handleMouseMove = (e) => {
        if (!swiperMainRef.current) return;
        const swiper = swiperMainRef.current.swiper;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percent = x / rect.width;
        const translate = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * percent;
        swiper.setTranslate(translate);
        const deltaX = Math.abs(e.clientX - lastMouseX.current);
        lastMouseX.current = e.clientX;
        if (deltaX > 0) {
            setIsMoving(true);
            clearTimeout(movingTimer.current);
            movingTimer.current = setTimeout(() => setIsMoving(false), 300);
        }
    };

    const handleMouseLeave = () => {
        if (!swiperMainRef.current || expandedSlide) return;
        const swiper = swiperMainRef.current.swiper;
        swiper.setTranslate(swiper.translate);
        clearTimeout(movingTimer.current);
        setIsMoving(false);
    };

    const montserrat = "'Montserrat', Arial, Helvetica, sans-serif";

    const getTextBottom = () => {
        if (windowWidth <= 768) return '20px';
        return '20px';
    };

    const getTextLeft = () => {
        if (windowWidth <= 768) return '16px';
        return '14px';
    };

    const getTextRight = () => {
        if (windowWidth <= 768) return '16px';
        return 'auto';
    };

    const getTextMaxWidth = () => {
        if (windowWidth <= 768) return 'calc(100% - 32px)';
        return 'calc(100% - 28px)';
    };

    const getTitleClass = () => {
        if (windowWidth <= 768) return 'text-base';
        return 'text-[15px]';
    };

    const getDescriptionClass = () => {
        if (windowWidth <= 768) return 'text-[11px]';
        return 'text-[11px]';
    };

    const getGapClass = () => {
        if (windowWidth <= 768) return 'mt-2';
        return 'mt-2';
    };

    return (
        <div className="swiper-overflow-wrapper">
            <div
                className="w-full cursor-pointer"
                style={{ marginTop: windowWidth >= 1400 ? '60px' : windowWidth >= 1024 ? '30px' : '' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="relative overflow-visible"
                    style={{
                        height: slideExpanded || panelVisible ? getExpandedHeight() : getDefaultHeight(),
                        minHeight: slideExpanded || panelVisible ? getExpandedHeight() : getDefaultHeight(),
                        transition: 'height 0.45s cubic-bezier(0.32, 0.72, 0, 1), min-height 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
                        ...(windowWidth >= 1024 ? { display: 'flex', alignItems: 'center' } : {}),
                    }}
                >
                    <Swiper
                        ref={swiperMainRef}
                        slidesPerView={1.2}
                        spaceBetween={6}
                        observer={true}
                        observeParents={true}
                        pagination={{ clickable: false }}
                        className="mainSwiper"
                        style={{ overflow: 'visible', width: '100%' }}
                        initialSlide={0}
                        breakpoints={{
                            768:  { slidesPerView: 3.02, spaceBetween: 13 },
                            1024: { slidesPerView: 3.1,  spaceBetween: 13 },
                            1249: { slidesPerView: 4.01, spaceBetween: 25 },
                        }}
                        onProgress={(swiper, progress) => setSlideProgress(progress)}
                        onSlideChange={(swiper) => setSlideProgress(swiper.progress)}
                    >
                        {slides.map((slide) => (
                            <SwiperSlide
                                key={slide.id}
                                style={{
                                    overflow: 'visible',
                                    height: slideExpanded || panelVisible ? getExpandedHeight() : getDefaultHeight(),
                                    minHeight: slideExpanded || panelVisible ? getExpandedHeight() : getDefaultHeight(),
                                    transition: 'height 0.45s cubic-bezier(0.32, 0.72, 0, 1), min-height 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
                                    ...(windowWidth >= 1024 ? { display: 'flex', alignItems: 'center' } : {}),
                                }}
                            >
                                <div
                                    className="relative w-full overflow-hidden cursor-pointer slide-img-wrapper"
                                    style={{
                                        height: expandedSlideId === slide.id && slideExpanded ? getExpandedHeight() : getDefaultHeight(),
                                        minHeight: expandedSlideId === slide.id && slideExpanded ? getExpandedHeight() : getDefaultHeight(),
                                        transform: expandedSlide ? getSlideTransform(slide.id) : 'translateX(0)',
                                        opacity: 1,
                                        transition: 'height 0.45s cubic-bezier(0.32, 0.72, 0, 1), min-height 0.45s cubic-bezier(0.32, 0.72, 0, 1), transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
                                        pointerEvents: 'auto',
                                        zIndex: expandedSlide?.id === slide.id ? 10 : 1,
                                        boxShadow: 'none',
                                    }}
                                    onClick={() => handleSlideClick(slide)}
                                >
                                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />

                                    {/* Top gradient */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0, left: 0, right: 0,
                                        height: '80px',
                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)',
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                    }} />
                                    
                                    {/* Bottom gradient */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0, left: 0, right: 0,
                                        height: '160px',
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                    }} />

                                    {/* Close button — only below 1024px on the active slide */}
                                    {expandedSlideId === slide.id && windowWidth < 1024 && (
                                        <button
                                            className="absolute top-3 right-3 z-20 flex items-center gap-1 px-3 py-1.5 text-white text-[11px] tracking-widest uppercase bg-black/50 hover:bg-black/70 backdrop-blur-sm transition-colors"
                                            style={{ fontFamily: montserrat }}
                                            onClick={(e) => { e.stopPropagation(); handleCloseExpanded(); }}
                                        >
                                            ✕ Close
                                        </button>
                                    )}

                                    {/* Title and description */}
                                    <div 
                                        className="absolute z-20 text-white flex flex-col items-start"
                                        style={{
                                            bottom: getTextBottom(),
                                            left: getTextLeft(),
                                            right: getTextRight(),
                                            maxWidth: getTextMaxWidth(),
                                        }}
                                    >
                                        {expandedSlideId === slide.id && slideExpanded ? (
                                            <>
                                                <h2
                                                    className={`${getTitleClass()} font-medium leading-snug mb-1`}
                                                    style={{ fontFamily: montserrat, animation: 'fadeIn 0.4s ease forwards' }}
                                                >
                                                    {slide.title}
                                                </h2>
                                                <p
                                                    className={`${getDescriptionClass()} leading-relaxed`}
                                                    style={{ fontFamily: montserrat }}
                                                >
                                                    {slide.description}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h3
                                                    className={`${getTitleClass()} font-medium leading-snug mb-1`}
                                                    style={{ fontFamily: montserrat }}
                                                >
                                                    {slide.title}
                                                </h3>
                                                <p
                                                    className={`${getDescriptionClass()} leading-relaxed`}
                                                    style={{ fontFamily: montserrat }}
                                                >
                                                    {slide.description}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Content panel — lg+ only */}
                    {expandedSlide && panelVisible && (() => {
                        const expandedIndex = getSlideIndex(expandedSlide.id);
                        const isLastTwo = expandedIndex >= slides.length - 2;
                        const leftEdgePct = getExpandedSlideLeftPosition();
                        const rightEdgePct = getExpandedSlidePosition();

                        return (
                            <div
                                className="hidden lg:block absolute"
                                style={{
                                    top: '70%',
                                    transform: 'translateY(-50%)',
                                    ...(isLastTwo
                                        ? { right: `calc(${100 - leftEdgePct}% + 13px)` }
                                        : { left: `calc(${rightEdgePct}% + 13px)` }
                                    ),
                                    width: getBlankSpaceWidth(),
                                    height: getExpandedHeight(),
                                    zIndex: 15,
                                    background: 'transparent',
                                    pointerEvents: 'auto',
                                }}
                            >
                                <div
                                    className="flex flex-col justify-between h-full overflow-hidden"
                                    style={{ animation: isLastTwo
                                        ? 'slideInLeft 0.45s cubic-bezier(0.32, 0.72, 0, 1)'
                                        : 'slideInRight 0.45s cubic-bezier(0.32, 0.72, 0, 1)'
                                    }}
                                >
                                    <div className="flex justify-end p-4">
                                        <button 
                                            onClick={handleCloseExpanded} 
                                            className="flex items-center gap-2 px-4 py-2 text-sm tracking-widest uppercase text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors" 
                                            style={{fontFamily: montserrat}}
                                        >
                                            ✕ Close
                                        </button>
                                    </div>
                                    <div className="px-8 md:px-10 py-6 overflow-y-auto flex-1">
                                        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-6" style={{fontFamily: montserrat}}>{expandedSlide.title}</h2>
                                        <p className="text-gray-700 text-sm md:text-base leading-relaxed" style={{fontFamily: montserrat}}>{expandedSlide.description}</p>
                                    </div>
                                    <div className="px-8 md:px-10 pb-10 pt-4 flex flex-row gap-3">
                                        <a href={expandedSlide.link || "#"} className="inline-flex items-center gap-2 py-3 px-6 bg-[#394D45] hover:bg-[#4a6a5c] text-white text-[13px] tracking-widest uppercase font-semibold transition-colors" style={{fontFamily: montserrat}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>
                                            Explore
                                        </a>
                                        {windowWidth >= 1400 && (
                                            <a href={`${expandedSlide.link || "#"}/shop`} className="inline-flex items-center gap-2 py-3 px-6 bg-transparent border border-gray-400 hover:bg-gray-100 text-gray-700 text-[13px] tracking-widest uppercase font-semibold transition-colors" style={{fontFamily: montserrat}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1.5 1.5h1.8l1.2 7h7.5l1.5-5H4.5M5.5 13a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm6 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" /></svg>
                                                Shop Now
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>

                {/* Progress bar + nav arrows */}
                <div
                    className="px-[14px] sm:px-[25px] md:px-[50px] lg:px-[90px] flex justify-between items-center"
                    style={{
                        paddingTop: windowWidth >= 1024 ? (expandedSlide ? '160px' : '55px') : '55px',
                        transition: windowWidth >= 1024 ? 'padding-top 0.45s cubic-bezier(0.32, 0.72, 0, 1)' : 'none',
                    }}
                >
                    <div className="w-full sm:w-[200px] h-[2px] bg-gray-300 relative overflow-hidden">
                        <div className="h-full bg-black absolute" style={{ left: isMoving ? '0%' : `${slideProgress * 25}%`, right: isMoving ? '0%' : `${(1 - slideProgress) * 25}%`, transition: isMoving ? 'left 0.02s ease, right 0.02s ease' : 'left 0.05s ease, right 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }} />
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <button 
                            className={`w-[40px] h-[40px] flex items-center justify-center bg-transparent transition-colors ${slideProgress <= 0 ? 'opacity-30 cursor-default' : 'cursor-pointer hover:bg-gray-200'}`} 
                            onClick={() => slideProgress > 0 && swiperMainRef.current?.swiper.slidePrev()} 
                            style={{ transition: 'opacity 0.3s ease' }}
                        >
                            <IoIosArrowRoundBack size={19} />
                        </button>
                        <button 
                            className={`w-[40px] h-[40px] flex items-center justify-center bg-transparent transition-colors ${slideProgress >= 1 ? 'opacity-30 cursor-default' : 'cursor-pointer hover:bg-gray-200'}`} 
                            onClick={() => slideProgress < 1 && swiperMainRef.current?.swiper.slideNext()} 
                            style={{ transition: 'opacity 0.3s ease' }}
                        >
                            <IoIosArrowRoundForward size={19} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}