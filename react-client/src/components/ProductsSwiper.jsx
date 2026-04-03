import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductsSwiper({
    slides,
    swiperRef,
    activeIndex,
    setActiveIndex,
    handleSlideClick,
    totalSlides,
    heritageBarWidth,
    heritageBarLeft,
    expandedSlide,
    setExpandedSlide,
    windowWidth,
}) {
    const getBlankSpaceWidth = () => {
        if (windowWidth >= 1439) return '600px';
        if (windowWidth >= 1200) return '500px';
        return '400px';
    };

    const getDefaultHeight = () => {
        if (windowWidth >= 1439) return '460px';
        if (windowWidth >= 1200) return '440px';
        return '420px';
    };

    const getExpandedHeight = () => {
        if (windowWidth >= 1439) return '600px';
        if (windowWidth >= 1200) return '560px';
        return '520px';
    };

    const [panelReady, setPanelReady] = useState(false);

    const parseMarkdown = (text) => {
        if (!text) return null;
        const lines = text.split('\n');
        return lines.map((line, idx) => {
            const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
            if (linkMatch) {
                return (
                    <a
                        key={idx}
                        href={linkMatch[2]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-[#394D45] hover:text-[#4a6a5c] block my-2"
                    >
                        {linkMatch[1]}
                    </a>
                );
            }
            if (line.startsWith('**') && line.endsWith('**')) {
                return (
                    <strong key={idx} className="font-bold text-gray-900 block mt-4 mb-2">
                        {line.slice(2, -2)}
                    </strong>
                );
            }
            if (line.includes('**') && !line.startsWith('**')) {
                const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return (
                    <p key={idx} className="mb-2" dangerouslySetInnerHTML={{ __html: boldText }} />
                );
            }
            if (line.trim()) {
                return <p key={idx} className="mb-2">{line}</p>;
            }
            return <br key={idx} />;
        });
    };

    const getExpandedSlideIndex = () => slides.findIndex((slide) => slide.id === expandedSlide?.id);

    const getExpandedSlideMetrics = () => {
        if (!expandedSlide || windowWidth < 1024) return null;
        const swiper = swiperRef.current;
        if (!swiper) return null;
        const expandedIndex = getExpandedSlideIndex();
        const slideEl = swiper.slides[expandedIndex];
        if (!slideEl) return null;
        const swiperRect = swiper.el.getBoundingClientRect();
        const slideRect = slideEl.getBoundingClientRect();
        return { swiperRect, slideRect };
    };

    useEffect(() => {
        if (windowWidth < 1024 || !expandedSlide) {
            setPanelReady(false);
            return;
        }
        setPanelReady(false);
        const timer = setTimeout(() => setPanelReady(true), 460);
        return () => clearTimeout(timer);
    }, [expandedSlide, windowWidth]);

    const getSlideTransform = (slideIndex) => {
        if (!expandedSlide || windowWidth < 1024) return 'translateX(0)';
        const expandedIndex = getExpandedSlideIndex();
        if (expandedIndex === -1) return 'translateX(0)';
        const isLastTwo = expandedIndex >= slides.length - 2;

        if (slideIndex < expandedIndex) {
            if (isLastTwo) {
                if (windowWidth >= 1439) return 'translateX(calc(-600px - 40px))';
                if (windowWidth >= 1200) return 'translateX(calc(-500px - 30px))';
                return 'translateX(calc(-400px - 20px))';
            }
            return 'translateX(calc(-5% - 10px))';
        }
        if (slideIndex > expandedIndex) {
            if (isLastTwo) return 'translateX(calc(5% + 10px))';
            if (windowWidth >= 1439) return 'translateX(calc(600px + 40px))';
            if (windowWidth >= 1200) return 'translateX(calc(500px + 30px))';
            return 'translateX(calc(400px + 20px))';
        }
        return 'translateX(0)';
    };

    const exploreSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true" className="inline-block">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
        </svg>
    );

    const playSvg = (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true" className="inline-block">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3l14 9-14 9V3z" />
        </svg>
    );

    const getButtonIcon = (label) => {
        if (!label) return exploreSvg;
        if (label.toUpperCase() === 'WATCH THE FILM') return playSvg;
        return exploreSvg;
    };

    return (
        <div className="relative">
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1.2}
                spaceBetween={8}
                pagination={{ clickable: true }}
                className="ProductsSwiper"
                style={{ overflow: 'visible' }}
                breakpoints={{
                    768: { slidesPerView: 3, spaceBetween: 16 },
                    1024: { slidesPerView: 3, spaceBetween: 16 },
                    1439: { slidesPerView: 3, spaceBetween: 26 }
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                onInit={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide
                        key={slide.id}
                        onClick={() => handleSlideClick(index)}
                        className={`products-slide-${slide.id} cursor-pointer`}
                        style={{
                            cursor: 'pointer',
                            transform: getSlideTransform(index),
                            transition: 'transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
                            zIndex: expandedSlide?.id === slide.id ? 10 : 1,
                            ...(windowWidth >= 1024 ? {
                                height: expandedSlide?.id === slide.id ? getExpandedHeight() : getDefaultHeight(),
                                minHeight: expandedSlide?.id === slide.id ? getExpandedHeight() : getDefaultHeight(),
                                display: 'flex',
                                alignItems: 'center',
                            } : {}),
                        }}
                    >
                        {/* ── Slide face text — bottom-left, matches Heritage layout ── */}
                        <div className="absolute bottom-7 left-5 z-20 text-white flex flex-col items-start">
                            <h3 className="text-lg font-medium">{slide.title}</h3>
                            <p className="text-[13px] mt-[10px]">
                                Find out more
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {expandedSlide && windowWidth >= 1024 && (() => {
                const expandedIndex = getExpandedSlideIndex();
                const isLastTwo = expandedIndex >= slides.length - 2;
                const metrics = getExpandedSlideMetrics();
                const rightEdgePx = metrics ? metrics.slideRect.left - metrics.swiperRect.left + metrics.slideRect.width : 0;
                const leftEdgePx = metrics ? metrics.slideRect.left - metrics.swiperRect.left : 0;
                const slideHeightPx = metrics ? metrics.slideRect.height : parseInt(getExpandedHeight(), 10);
                return (
                    <div
                        className="hidden lg:block absolute"
                        style={{
                            top: `${metrics ? metrics.slideRect.top - metrics.swiperRect.top : 0}px`,
                            width: getBlankSpaceWidth(),
                            height: `${slideHeightPx}px`,
                            zIndex: 15,
                            pointerEvents: 'auto',
                            opacity: panelReady ? 1 : 0,
                            animation: panelReady
                                ? (isLastTwo
                                    ? 'heritageSlideInLeft 0.45s cubic-bezier(0.32, 0.72, 0, 1)'
                                    : 'heritageSlideInRight 0.45s cubic-bezier(0.32, 0.72, 0, 1)')
                                : 'none',
                            ...(isLastTwo
                                ? { right: `${metrics ? metrics.swiperRect.width - leftEdgePx : 0}px` }
                                : { left: `${rightEdgePx}px` }
                            ),
                        }}
                    >
                        <div className="flex flex-col justify-between h-full overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
                            <div className="flex justify-end p-4">
                                <button
                                    onClick={() => setExpandedSlide(null)}
                                    className="flex items-center gap-2 px-4 py-2 text-sm tracking-widest uppercase text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                                >
                                    ✕ Close
                                </button>
                            </div>
                            <div className="px-8 py-6 overflow-y-auto flex-1">
                                <h2 className="text-2xl font-light text-gray-900 mb-6">{expandedSlide.title}</h2>
                                <div className="text-gray-700 text-sm leading-relaxed">
                                    {parseMarkdown(expandedSlide.description)}
                                </div>
                            </div>
                            {expandedSlide.buttonLabel && (
                                <div className="px-8 pb-8 pt-4 bg-white/95 backdrop-blur-sm rounded-t-[18px]">
                                    <a
                                        href={expandedSlide.link || '#'}
                                        target={expandedSlide.link?.startsWith('http') ? '_blank' : '_self'}
                                        rel={expandedSlide.link?.startsWith('http') ? 'noopener noreferrer' : ''}
                                        className="inline-flex items-center gap-2 py-3 px-6 bg-[#394D45] hover:bg-[#4a6a5c] text-white text-[13px] tracking-widest uppercase font-semibold transition-colors"
                                    >
                                        {getButtonIcon(expandedSlide.buttonLabel)}
                                        {expandedSlide.buttonLabel}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })()}

            <div
                className="relative px-4 md:px-8"
                style={{
                    marginTop: expandedSlide && windowWidth >= 1439 ? '8rem' : expandedSlide && windowWidth >= 1024 ? '6rem' : '2rem',
                    transition: 'margin-top 0.35s ease'
                }}
            >
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-[250px]">
                        <div className="w-full h-[3px] bg-white/30 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-full h-[8px] -mt-[2.5px] flex cursor-pointer">
                            {[...Array(totalSlides)].map((_, index) => (
                                <div
                                    key={index}
                                    className="h-full flex-1"
                                    onClick={() => swiperRef.current?.slideTo(index)}
                                ></div>
                            ))}
                        </div>
                        <div
                            className="absolute top-0 h-[3px] rounded-full transition-all duration-300 ease-in-out bg-white"
                            style={{
                                width: `${heritageBarWidth}%`,
                                left: `${heritageBarLeft}%`,
                                transformOrigin: 'top'
                            }}
                        ></div>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className={`heritage-arrow rounded-full p-2 transition-none hover:bg-white/10 ${
                                activeIndex === 0 ? 'opacity-30' : 'opacity-100'
                            }`}
                            aria-label="Previous slide"
                            disabled={activeIndex === 0}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 12H5M5 12l6-6M5 12l6 6" />
                            </svg>
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className={`heritage-arrow rounded-full p-2 transition-none hover:bg-white/10 ${
                                activeIndex === totalSlides - 1 ? 'opacity-30' : 'opacity-100'
                            }`}
                            aria-label="Next slide"
                            disabled={activeIndex === totalSlides - 1}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                                <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M19 12l-6-6M19 12l-6 6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}