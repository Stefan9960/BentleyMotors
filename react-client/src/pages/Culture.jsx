import { useState, useEffect, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import BentleyWorldMap from "../components/BentleyWorldMap";
import 'swiper/css';
import 'swiper/css/pagination';
import { Helmet } from 'react-helmet';
import HeritageSwiper from '../components/HeritageSwiper';
import ProductsSwiper from '../components/ProductsSwiper';
import DesignSwiper from '../components/DesignSwiper';
import SlideModal from '../components/SlideModal';
import heritageSlides from '../js/heritageSlides';
import productSlides from '../js/productSlides';
import designSlides from '../js/designSlides';

import '../css/Culture.css';

export default function Culture() {
    const [activeIndexHeritage, setActiveIndexHeritage] = useState(0);
    const [activeIndexProducts, setActiveIndexProducts] = useState(0);
    const [activeIndexDesign, setActiveIndexDesign] = useState(0);
    const [hoveredIndexProducts, setHoveredIndexProducts] = useState(null);
    const [activeSection, setActiveSection] = useState('latest-articles');
    const [isSticky, setIsSticky] = useState(false);
    const [designReached, setDesignReached] = useState(false);
    const [slidesPerViewHeritage, setSlidesPerViewHeritage] = useState(1.2);
    const [slidesPerViewDesign, setSlidesPerViewDesign] = useState(1.2);

    // Heritage popup state
    const [expandedHeritageSlide, setExpandedHeritageSlide] = useState(null);
    const [heritageModalSlide, setHeritageModalSlide] = useState(null);
    const [expandedDesignSlide, setExpandedDesignSlide] = useState(null);
    const [designModalSlide, setDesignModalSlide] = useState(null);
    const [expandedProductsSlide, setExpandedProductsSlide] = useState(null);
    const [productsModalSlide, setProductsModalSlide] = useState(null);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

    const totalSlidesHeritage = 4;
    const totalSlidesProducts = 3;
    const totalSlidesDesign = 4;

    const swiperHeritageRef = useRef(null);
    const swiperProductsRef = useRef(null);
    const swiperDesignRef = useRef(null);

    const stickyTriggerRef = useRef(null);
    const latestArticlesRef = useRef(null);
    const heritageRef = useRef(null);
    const productsRef = useRef(null);
    const communityRef = useRef(null);
    const designRef = useRef(null);

    const sections = [
        { id: 'latest-articles', label: 'Latest Articles', ref: latestArticlesRef },
        { id: 'heritage', label: 'Heritage', ref: heritageRef },
        { id: 'products', label: 'Products', ref: productsRef },
        { id: 'community', label: 'Community', ref: communityRef },
        { id: 'design', label: 'Design', ref: designRef }
    ];

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleHeritageSlideClick = useCallback((index) => {
        if (windowWidth >= 1024) {
            if (expandedHeritageSlide?.id === heritageSlides[index].id) {
                setExpandedHeritageSlide(null);
            } else {
                const isLastTwo = index >= heritageSlides.length - 2;
                const targetIndex = isLastTwo
                    ? Math.min(heritageSlides.length - 1, index + 1)
                    : index;

                setExpandedHeritageSlide(heritageSlides[index]);
                swiperHeritageRef.current?.slideTo(targetIndex);
            }
        } else {
            setHeritageModalSlide(heritageSlides[index]);
        }
    }, [windowWidth, expandedHeritageSlide]);

    const handleProductsSlideClick = useCallback((index) => {
        if (windowWidth >= 1024) {
            if (expandedProductsSlide?.id === productSlides[index].id) {
                setExpandedProductsSlide(null);
            } else {
                const isLastTwo = index >= productSlides.length - 2;
                const targetIndex = isLastTwo
                    ? Math.min(productSlides.length - 1, index + 1)
                    : index;

                setExpandedProductsSlide(productSlides[index]);
                swiperProductsRef.current?.slideTo(targetIndex);
            }
        } else {
            setProductsModalSlide(productSlides[index]);
        }
    }, [windowWidth, expandedProductsSlide]);

    const handleDesignSlideClick = (index) => {
        if (windowWidth >= 1024) {
            if (expandedDesignSlide?.id === designSlides[index].id) {
                setExpandedDesignSlide(null);
            } else {
                setExpandedDesignSlide(designSlides[index]);
                // swiperDesignRef.current?.slideTo(index);
            }
        } else {
            setDesignModalSlide(designSlides[index]);
        }
    };

    const handleProductsSlideHover = (index) => setHoveredIndexProducts(index);
    const handleProductsSlideLeave = () => setHoveredIndexProducts(null);

    const displayIndexProducts = hoveredIndexProducts !== null ? hoveredIndexProducts : activeIndexProducts;

    useEffect(() => {
        const updateSlidesPerView = () => {
            const w = window.innerWidth;
            const slidesPerView = w >= 1439 ? 4 : w >= 768 ? 3.1 : 1.2;
            setSlidesPerViewHeritage(slidesPerView);
            setSlidesPerViewDesign(slidesPerView);
        };
        updateSlidesPerView();
        window.addEventListener('resize', updateSlidesPerView);
        return () => window.removeEventListener('resize', updateSlidesPerView);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (stickyTriggerRef.current) {
                const triggerBottom = stickyTriggerRef.current.getBoundingClientRect().bottom;
                setIsSticky(triggerBottom <= 0);
            }
            if (designRef.current) {
                const designTop = designRef.current.getBoundingClientRect().top;
                if (designTop <= window.innerHeight - 100) setDesignReached(true);
            }
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                const sectionTop = section.ref.current?.offsetTop || 0;
                const scrollPosition = window.scrollY + 120;
                if (scrollPosition >= sectionTop - 100) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (designReached) document.body.classList.add('design-section-reached');
        else document.body.classList.remove('design-section-reached');
    }, [designReached]);

    useEffect(() => {
        if (isSticky && window.innerWidth <= 767) {
            setTimeout(() => {
                const activeElement = document.querySelector('.sticky-nav-item.active');
                const container = document.querySelector('.sticky-nav-container');
                if (activeElement && container) {
                    const containerRect = container.getBoundingClientRect();
                    const activeRect = activeElement.getBoundingClientRect();
                    const allItems = document.querySelectorAll('.sticky-nav-item');
                    const activeIndex = Array.from(allItems).findIndex(item => item.classList.contains('active'));
                    const totalItems = allItems.length;
                    let scrollLeft;
                    if (activeIndex === 0) scrollLeft = 0;
                    else if (activeIndex === totalItems - 1) scrollLeft = container.scrollWidth - container.clientWidth;
                    else if (activeIndex === 3) scrollLeft = container.scrollLeft + (activeRect.left - containerRect.left) - 20;
                    else if (activeIndex === 4) scrollLeft = container.scrollWidth - container.clientWidth;
                    else scrollLeft = container.scrollLeft + (activeRect.left - containerRect.left) - (containerRect.width / 2) + (activeRect.width / 2);
                    container.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
                }
            }, 100);
        }
    }, [activeSection, isSticky]);

    const scrollToSection = (sectionId, ref) => {
        if (ref.current) {
            const offset = 90;
            const elementPosition = ref.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            setActiveSection(sectionId);
        }
    };

    const heritageBarWidth =
        slidesPerViewHeritage >= totalSlidesHeritage
            ? 100
            : (slidesPerViewHeritage / totalSlidesHeritage) * 100;

    const heritageBarLeft =
        slidesPerViewHeritage >= totalSlidesHeritage
            ? 0
            : Math.min(
                (activeIndexHeritage / totalSlidesHeritage) * 100,
                100 - heritageBarWidth
            );

    const designBarWidth =
        slidesPerViewDesign >= totalSlidesDesign
            ? 100
            : (slidesPerViewDesign / totalSlidesDesign) * 100;

    const designBarLeft =
        slidesPerViewDesign >= totalSlidesDesign
            ? 0
            : Math.min(
                (activeIndexDesign / totalSlidesDesign) * 100,
                100 - designBarWidth
            );

    const productsBarWidth =
        windowWidth >= 768
            ? 100 // Occupy all space on screens 768px and higher
            : (slidesPerViewDesign / totalSlidesProducts) * 100; // Mobile behavior

    const productsBarLeft =
        windowWidth >= 768
            ? 0 // Start from left on screens 768px and higher
            : Math.min(
                (activeIndexProducts / totalSlidesProducts) * 100,
                100 - productsBarWidth
            );

    const exploreSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
    </svg>
    );
    
    return (
        <div className="culture-background" style={{ margin: 0, padding: 0 }}>
            <Helmet>
                <title>Bentley Culture</title>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
            </Helmet>

            <div className="text-[clamp(44px,8vw,50px)] pt-20 pb-10 md:text-[clamp(36px,3vw,40px)] lg:text-[clamp(52px,6vw,77px)] lg:mt-5 lg:mb-16 flex justify-center items-center font-arial font-helvetica font-sans text-white">
                Bentley Culture
            </div>

            <div ref={stickyTriggerRef} className="h-0"></div>

            <div className={`sticky-nav ${isSticky ? 'sticky-active' : ''}`}>
                <div className="sticky-nav-container">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            className={`sticky-nav-item ${activeSection === section.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(section.id, section.ref)}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                {/* Andrea Jensen Article */}
                <div ref={latestArticlesRef} className="px-4 mt-20 mb-10 relative md:px-8 lg:px-12 xl:px-40">
                    <div className="flex flex-col md:flex-row-reverse md:items-center lg:items-center md:gap-18 lg:gap-30">
                        <div className="relative">
                            <img className="min-w-[220px] h-auto pr-8 relative z-10 md:pr-5 md:bottom-3 lg:pr-7 lg:top-[0.2px]" src="/images/AndreaJensen.jpg" alt="Andrea Jensen" />
                            <img className="w-full h-auto object-cover object-right absolute -top-8 left-8 pr-8 z-0 md:left-5 md:pr-5" src="/images/WoodenFloor.jpg" alt="" />
                        </div>
                        <div className="mt-10 md:w-[1289px]">
                            <span className="text-[11px] font-sans font-helvetica font-arial text-white">Paint</span>
                            <div className="mt-2">
                                <div className="text-[25px] lg:text-[32px] font-arial font-sans font-helvetica text-white">Andrea Jensen</div>
                                <div className="text-[12.5px] lg:text-[14px] lg:leading-6 md:max-w-full mt-3 font-sans font-arial font-helvetica text-white">Andrea heads a hand-picked team of experts in colour, materials and finish. Their mission? To make your Bentley as individual as you are. She guides us through the painstaking process behind each unique Bentley paint finish.</div>
                                <button className="bg-[#394D45] mt-9 w-full flex gap-3 justify-center hover:bg-[#394D45]/75 hover:cursor-pointer items-center text-[13px] text-[#ffffff] font-sans font-arial font-helvetica py-[11px] px-[18px] md:justify-start md:w-auto">
                                    {exploreSvg}<span>EXPLORE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Darren Day Article */}
                <div className="px-4 mt-37 mb-10 relative md:px-8 lg:px-12 xl:px-40">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-18 lg:gap-30 xl:gap-0">
                        <div className="relative md:flex-1">
                            <img className="min-w-[220px] w-full h-auto pr-8 relative z-10 md:pr-5 md:bottom-3 lg:pr-7 lg:top-[0.2px] xl:w-[455px] xl:h-[495px]" src="/images/DarrenDay.jpg" alt="Darren Day" />
                            <img className="w-full h-auto object-cover object-right absolute -top-8 left-8 pr-8 z-0 md:left-5 md:pr-5 xl:w-[455px] xl:h-[495px]" src="/images/shadeBackground.jpg" alt="" />
                        </div>
                        <div className="mt-10 md:flex-1 xl:max-w-full">
                            <span className="text-[12px] font-sans font-helvetica font-arial text-white">Mission Incredible</span>
                            <div className="mt-2">
                                <div className="text-[26px] lg:text-[32px] font-arial font-sans font-helvetica text-white">Darren Day</div>
                                <div className="text-[12.5px] lg:text-[13.5px] lg:leading-6 mt-3 font-sans font-arial font-helvetica text-white">You're a young car designer. It's your first major project. And your boss tells you to let your imagination run wild. Up for it? Darren Day was.</div>
                                <button className="bg-[#394D45] mt-9 w-full flex gap-3 justify-center hover:bg-[#394D45]/75 hover:cursor-pointer items-center text-[13px] text-[#ffffff] font-sans font-arial font-helvetica py-[11px] px-[18px] md:justify-start md:w-auto">
                                    {exploreSvg}<span>EXPLORE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Creative Directors Article */}
                <div className="px-4 mt-37 mb-10 relative lg:px-12">
                    <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:gap-30 xl:gap-16">
                        <div className="relative lg:flex-1">
                            <img className="min-w-[220px] w-full h-auto pr-8 relative z-10 lg:pr-7 lg:top-[0.2px]" src="/images/newCreativeDirectors.jpg" alt="New Creative Directors" />
                            <img className="w-full h-auto object-cover object-right absolute -top-8 left-8 pr-8 z-0 lg:pr-7" src="/images/stackedCircles.jpg" alt="" />
                        </div>
                        <div className="mt-10 lg:flex-1 lg:mt-0">
                            <div className="mt-2">
                                <div className="text-[26px] lg:text-[32px] font-arial font-sans font-helvetica text-white">New Creative Directors</div>
                                <div className="text-[12.5px] lg:text-[13.5px] xl:text-[14px] xl:max-w-full lg:leading-6 mt-3 font-sans font-arial font-helvetica text-white">All brands evolve. The strongest adapt. It's how they grow. That's why Bentley has appointed two External Creative Directors. Brand advisor and designer Mai Ikuzawa and photographer Greg Williams will together bring a new kind of story-telling firepower, focused on the direction of Bentley's advertising and the curation of its lifestyle offering.</div>
                                <button className="bg-[#394D45] mt-9 w-full flex gap-3 justify-center hover:bg-[#394D45]/75 hover:cursor-pointer items-center text-[13px] text-[#ffffff] font-sans font-arial font-helvetica py-[11px] px-[18px] lg:justify-start lg:w-auto">
                                    {exploreSvg}<span>EXPLORE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Interactive heritage Timelines Article */}
                <div className="px-4 mt-37 mb-10 relative md:px-8 lg:px-12 xl:px-40">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-18 lg:gap-30 xl:gap-16">
                        <div className="relative md:flex-1">
                            <img className="min-w-[220px] w-full h-auto pr-8 relative z-10 md:pr-5 md:bottom-3 lg:pr-7 lg:top-[0.2px] xl:w-[455px] xl:h-[495px]" src="/images/BentleyFounder.jpg" alt="Bentley Founder" />
                            <img className="w-full h-auto object-cover object-right absolute -top-8 left-8 pr-8 z-0 md:left-5 md:pr-5 xl:w-[455px] xl:h-[495px]" src="/images/gridBackground.jpg" alt="" />
                        </div>
                        <div className="mt-10 md:flex-1 md:mt-0">
                            <div className="mt-2">
                                <div className="text-[26px] lg:text-[32px] xl:text-[36px] font-arial font-sans font-helvetica text-white">New Interactive heritage Timelines</div>
                                <div className="text-[12.5px] lg:text-[13.5px] lg:leading-6 mt-3 font-sans font-arial font-helvetica text-white">Explore the rich heritage of Bentley Motors through our interactive timelines—charting our legendary motorsport achievements, extraordinary vehicles, and the pioneering individuals who shaped our journey of innovation and performance.</div>
                                <button className="bg-[#394D45] mt-9 w-full flex gap-3 justify-center hover:bg-[#394D45]/75 hover:cursor-pointer items-center text-[13px] text-[#ffffff] font-sans font-arial font-helvetica py-[11px] px-[18px] md:justify-start md:w-auto">
                                    {exploreSvg}<span>EXPLORE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== HERITAGE SECTION ========== */}
                <div ref={heritageRef} className="text-[30px] text-white mt-4 md:pb-23 md:text-[38px] px-4 md:px-8">Heritage</div>

                <div className="relative">
                    <HeritageSwiper
                        slides={heritageSlides}
                        swiperRef={swiperHeritageRef}
                        activeIndex={activeIndexHeritage}
                        setActiveIndex={setActiveIndexHeritage}
                        handleSlideClick={handleHeritageSlideClick}
                        totalSlides={totalSlidesHeritage}
                        heritageBarWidth={heritageBarWidth}
                        heritageBarLeft={heritageBarLeft}
                        expandedSlide={expandedHeritageSlide}
                        setExpandedSlide={setExpandedHeritageSlide}
                        windowWidth={windowWidth}
                    />
                {/* ========== PRODUCTS SECTION ========== */}
                <div ref={productsRef} className="text-[30px] mt-32 px-4 md:px-8 text-white">Products</div>

                <ProductsSwiper
                    slides={productSlides}
                    swiperRef={swiperProductsRef}
                    activeIndex={activeIndexProducts}
                    setActiveIndex={setActiveIndexProducts}
                    handleSlideClick={handleProductsSlideClick}
                    totalSlides={totalSlidesProducts}
                    progressBarWidth={productsBarWidth}
                    progressBarLeft={productsBarLeft}
                    expandedSlide={expandedProductsSlide}
                    setExpandedSlide={setExpandedProductsSlide}
                    windowWidth={windowWidth}
                />

                {/* ========== COMMUNITY SECTION ========== */}
                <div ref={communityRef} className="text-[30px] mt-18 px-4 md:px-8 text-white">Community</div>

                <div className="px-4 md:px-8 lg:px-12 xl:px-40 mt-29 mb-10 relative">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center md:gap-10 lg:gap-20">
                    {/* Image Section - on left for desktop */}
                       <div className="relative flex-1">
                           <img className="w-full h-auto pr-8 relative z-10 lg:pr-7" src="/images/AndreaJensen.jpg" alt="Andrea Jensen" />
                               <img className="w-full h-auto object-cover object-right absolute -top-8 left-8 pr-8 z-0 lg:pr-7" src="/images/WoodenFloor.jpg" alt="" />
                        </div>

                        {/* Text Section - on right for desktop */}
                        <div className="mt-10 flex-1 md:mt-0 md:flex md:flex-col md:justify-center">
                            <span className="text-[12px] font-sans font-helvetica font-arial text-white">Stories</span>
                                <div className="mt-2">
                                    <div className="text-[28px] lg:text-[32px] font-arial font-sans font-helvetica text-white">Andrea Jensen</div>
                                        <div className="text-[12.5px] lg:text-[13.5px] lg:leading-6 mt-3 font-sans font-arial font-helvetica text-white">Andrea heads a hand-picked team of experts in colour, materials and finish. Their mission? To make your Bentley as individual as you are. She guides us through the painstaking process behind each unique Bentley paint finish.</div>
                                            <button className="bg-[#394D45] mt-9 w-full flex gap-3 justify-center hover:bg-[#394D45]/75 hover:cursor-pointer items-center text-[13px] text-[#ffffff] font-sans font-arial font-helvetica py-[11px] px-[18px] md:w-auto md:justify-start">
                                                {exploreSvg}<span>EXPLORE</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                <div className="px-4 md:px-8 lg:px-12 xl:px-40 mt-20 xl:mt-45 mb-10 relative">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:gap-10 lg:gap-20">
                        <div className="relative flex-1 md:order-2">
                            <img className="w-full h-auto pr-8 relative z-10 lg:pr-7" src="/images/DarrenDay.jpg" alt="Darren Day" />
                            <img className="w-full h-auto object-cover object-right absolute -top-8 left-8 pr-8 z-0 lg:pr-7" src="/images/shadeBackground.jpg" alt="" />
                        </div>
                        <div className="mt-10 flex-1 md:mt-0 md:order-1 md:flex md:flex-col md:justify-center">
                            <span className="text-[12px] font-sans font-helvetica font-arial text-white">Stories</span>
                            <div className="mt-2">
                                <div className="text-[26px] lg:text-[32px] font-arial font-sans font-helvetica text-white">Darren Day</div>
                                <div className="text-[12.5px] lg:text-[13.5px] lg:leading-6 mt-3 font-sans font-arial font-helvetica text-white">You're a young car designer. It's your first major project. And your boss tells you to let your imagination run wild. Up for it? Darren Day was.</div>
                                <button className="bg-[#394D45] mt-9 w-full flex gap-3 justify-center hover:bg-[#394D45]/75 hover:cursor-pointer items-center text-[13px] text-[#ffffff] font-sans font-arial font-helvetica py-[11px] px-[18px] md:w-auto md:justify-start">
                                    {exploreSvg}<span>EXPLORE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 md:px-8 lg:px-12 xl:px-40 mt-20 xl:mt-45 mb-10 relative">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:gap-10 lg:gap-20">
                        <div className="relative flex-1">
                            <img className="w-full h-auto pr-8 relative z-10 lg:pr-7" src="/images/RiccardoPozzoli.jpg" alt="Riccardo Pozzoli" />
                            <img className="w-full h-auto object-cover object-right absolute -top-8 left-8 pr-8 z-0 lg:pr-7" src="/images/cementBackground.jpg" alt="" />
                        </div>
                        <div className="mt-10 flex-1 md:mt-0 md:flex md:flex-col md:justify-center">
                            <span className="text-[12px] font-sans font-helvetica font-arial text-white">Stories</span>
                            <div className="mt-2">
                                <div className="text-[26px] lg:text-[32px] font-arial font-sans font-helvetica text-white">Riccardo Pozzoli</div>
                                <div className="text-[12.5px] lg:text-[13.5px] lg:leading-6 mt-3 font-sans font-arial font-helvetica text-white">A safari-rally makeover gives Riccardo Pozzoli's 1985 Mulsanne Turbo a bit more attitude - and altitude.</div>
                                <button className="bg-[#394D45] mt-9 w-full flex gap-3 justify-center hover:bg-[#394D45]/75 hover:cursor-pointer items-center text-[13px] text-[#ffffff] font-sans font-arial font-helvetica py-[11px] px-[18px] md:w-auto md:justify-start">
                                    {exploreSvg}<span>EXPLORE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 md:px-8 lg:px-12 xl:px-40 mt-20 xl:mt-45 mb-10 relative">
                    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row md:gap-10 lg:gap-20">
                        <div className="relative flex-1 md:order-2">
                            <img className="w-full h-auto pr-8 relative z-10 lg:pr-7" src="/images/AndreasWest.jpg" alt="Andreas Wüest" />
                            <img className="w-full h-auto object-cover object-right absolute -top-8 left-8 pr-8 z-0 lg:pr-7" src="/images/shadeBackgound.jpg" alt="" />
                        </div>
                        <div className="mt-10 flex-1 md:mt-0 md:order-1 md:flex md:flex-col md:justify-center">
                            <span className="text-[12px] font-sans font-helvetica font-arial text-white">Stories</span>
                            <div className="mt-2">
                                <div className="text-[26px] lg:text-[32px] font-arial font-sans font-helvetica text-white">Andreas Wüest</div>
                                <div className="text-[12.5px] lg:text-[13.5px] lg:leading-6 mt-3 font-sans font-arial font-helvetica text-white">Andy Wüest has a distinctive style. Call it cool if you will, even if looking this effortless must take some effort. It's certainly unconventional. His taste in cars runs well outside conventional tramlines too. "I like to go under the radar, or completely over the top."</div>
                                <button className="bg-[#394D45] mt-9 w-full flex gap-3 justify-center hover:bg-[#394D45]/75 hover:cursor-pointer items-center text-[13px] text-[#ffffff] font-sans font-arial font-helvetica py-[11px] px-[18px] md:w-auto md:justify-start">
                                    {exploreSvg}<span>EXPLORE</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========== EVENTS SECTION ========== */}
                <div className="w-full px-4 md:px-8 lg:px-20 xl:px-40 mt-20 xl:mt-45 mb-16">
                    <div className="relative overflow-hidden">
                        <div className="py-10 md:py-14 lg:py-16">
                            <h2 className="text-[24px] lg:text-[28px] font-medium mb-4 font-sans font-arial font-helvetica text-white">Events</h2>
                            <p className="text-[12.5px] lg:text-[14px] pt-5 leading-relaxed font-sans font-arial font-helvetica text-white/80">
                                Every year, Bentley runs a variety of events for Bentley drivers, enthusiasts and anyone looking for a closer acquaintance with the Bentley brand. From the excitement of Pebble Beach Concours to a visit of the Home of Bentley at CW1 House, whatever your interest our range of events offer something for every intrepid Bentley explorer.
                            </p>
                        </div>
                    </div>
                </div>

                <BentleyWorldMap />

                {/* ========== DESIGN SECTION ========== */}
                <div ref={designRef} className="text-[30px] mt-30 px-4 md:px-8 text-white">Design</div>

                <div className="relative mt-20">
                    <DesignSwiper
                        slides={designSlides}
                        swiperRef={swiperDesignRef}
                        activeIndex={activeIndexDesign}
                        setActiveIndex={setActiveIndexDesign}
                        handleSlideClick={handleDesignSlideClick}
                        totalSlides={totalSlidesDesign}
                        progressBarWidth={designBarWidth}
                        progressBarLeft={designBarLeft}
                        expandedSlide={expandedDesignSlide}
                        setExpandedSlide={setExpandedDesignSlide}
                        windowWidth={windowWidth}
                    />
                </div>
            </div>

            {/* SlideModal — mobile/tablet only (< 1024px) */}
            <SlideModal
                slide={heritageModalSlide}
                onClose={() => setHeritageModalSlide(null)}
            />
            <SlideModal
                slide={designModalSlide}
                onClose={() => setDesignModalSlide(null)}
            />
            <SlideModal
                slide={productsModalSlide}
                onClose={() => setProductsModalSlide(null)}
            />
        </div>
    );
}