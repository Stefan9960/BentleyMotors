import {Helmet} from "react-helmet";
import { useRef, useState, useEffect } from "react";
import MainSwiper from "../components/MainSwiper";
import { mainSlides } from "../js/mainSlides";
import { Popups } from "../js/mainPopups";
import SlideModal from "../components/SlideModal";

export default function Main() {

    // ─── State ───────────────────────────────────────────────────────────────
    const [slideProgress, setSlideProgress]     = useState(0);
    const [isMoving, setIsMoving]               = useState(false);
    const [selectedSlide, setSelectedSlide]     = useState(null);
    const [expandedSlide, setExpandedSlide]     = useState(null);
    const [expandedSlideId, setExpandedSlideId] = useState(null);
    const [slideExpanded, setSlideExpanded]     = useState(false);
    const [panelVisible, setPanelVisible]       = useState(false);
    const [windowWidth, setWindowWidth]         = useState(window.innerWidth);

    // ─── Refs ────────────────────────────────────────────────────────────────
    const movingTimer         = useRef(null);
    const swiperMainRef       = useRef(null);
    const lastMouseX          = useRef(0);
    const firstImageRef       = useRef(null);
    const firstImageRefDesktop = useRef(null);
    const aboutSectionRef     = useRef(null);

    const slides = mainSlides;
    const montserrat = "'Montserrat', Arial, Helvetica, sans-serif";

    // ─── Helpers ─────────────────────────────────────────────────────────────
    const getPopupContent  = (slideId) => Popups.find(popup => popup.id === slideId);
    const getSlideIndex    = (id) => slides.findIndex(s => s.id === id);

    const getBlankSpaceWidth = () => {
        if (windowWidth >= 1400) return '600px';
        else if (windowWidth >= 1200) return '500px';
        else if (windowWidth >= 1024) return '400px';
        return '0px';
    };

    const getDefaultHeight = () => {
        if (windowWidth >= 768 && windowWidth <= 1248) return '320px';
        return '537px';
    };

    const getExpandedHeight = () => {
        if (windowWidth >= 1400) return '690px';
        if (windowWidth >= 1024) return '650px';
        return '580px';
    };

    const getSlideTransform = (slideId) => {
        if (!expandedSlide || windowWidth < 1024) return 'translateX(0)';
        const expandedIndex = getSlideIndex(expandedSlide.id);
        const currentIndex  = getSlideIndex(slideId);
        const isLastTwo     = expandedIndex >= slides.length - 2;

        if (currentIndex < expandedIndex) {
            if (isLastTwo) {
                if (windowWidth >= 1400) return 'translateX(calc(-600px - 40px))';
                else if (windowWidth >= 1200) return 'translateX(calc(-500px - 30px))';
                else return 'translateX(calc(-400px - 20px))';
            }
            return 'translateX(calc(-5% - 10px))';
        }
        if (currentIndex > expandedIndex) {
            if (isLastTwo) return 'translateX(calc(5% + 10px))';
            if (windowWidth >= 1400) return 'translateX(calc(600px + 40px))';
            else if (windowWidth >= 1200) return 'translateX(calc(500px + 30px))';
            else return 'translateX(calc(400px + 20px))';
        }
        return 'translateX(0)';
    };

    const getExpandedSlidePosition = () => {
        if (!expandedSlide || windowWidth < 1024) return 0;
        const swiper = swiperMainRef.current?.swiper;
        if (!swiper) return 0;
        const expandedIndex = getSlideIndex(expandedSlide.id);
        const slideEl = swiper.slides[expandedIndex];
        if (!slideEl) return 0;
        const swiperRect  = swiper.el.getBoundingClientRect();
        const slideRect   = slideEl.getBoundingClientRect();
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
        const slideRect  = slideEl.getBoundingClientRect();
        const leftEdgePx = slideRect.left - swiperRect.left;
        return (leftEdgePx / swiperRect.width) * 100;
    };

    // ─── Handlers ────────────────────────────────────────────────────────────
    const handleSlideClick = (slide) => {
        const popupContent = getPopupContent(slide.id);

        if (windowWidth >= 1024) {
            if (expandedSlide?.id === slide.id) {
                setPanelVisible(false);
                setSlideExpanded(false);
                setExpandedSlideId(null);
                setTimeout(() => {
                    setExpandedSlide(null);
                    swiperMainRef.current?.swiper?.update();
                }, 450);
            } else {
                if (expandedSlide) { setPanelVisible(false); setSlideExpanded(false); }
                const swiper       = swiperMainRef.current?.swiper;
                const clickedIndex = getSlideIndex(slide.id);
                const isLastTwo    = clickedIndex >= slides.length - 2;

                if (swiper) {
                    const targetIndex = isLastTwo
                        ? Math.min(slides.length - 1, clickedIndex + 1)
                        : clickedIndex;
                    swiper.slideTo(targetIndex, 350, false);
                }

                setExpandedSlide(popupContent);
                setExpandedSlideId(slide.id);
                setTimeout(() => setSlideExpanded(true), 30);
                setTimeout(() => { setPanelVisible(true); swiperMainRef.current?.swiper?.update(); }, 500);
            }
        } else {
            setSelectedSlide(popupContent);
        }
    };

    const handleCloseExpanded = () => {
        setPanelVisible(false);
        setSlideExpanded(false);
        setExpandedSlideId(null);
        setTimeout(() => {
            setExpandedSlide(null);
            swiperMainRef.current?.swiper?.update();
        }, 450);
    };

    const handleMouseMove = (e) => {
        if (!swiperMainRef.current) return;
        const swiper  = swiperMainRef.current.swiper;
        const rect    = e.currentTarget.getBoundingClientRect();
        const x       = e.clientX - rect.left;
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

    // ─── Effects ─────────────────────────────────────────────────────────────
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (expandedSlide) setExpandedSlide(prev => ({ ...prev }));
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [expandedSlide]);

    useEffect(() => {
        const handleScroll = () => {
            if (!firstImageRef.current) return;
            const scrollY        = window.scrollY;
            const rect           = firstImageRef.current.getBoundingClientRect();
            const relativeScroll = scrollY - (rect.top + scrollY);
            firstImageRef.current.style.transform = `translateY(${Math.max(-90, Math.min(0, relativeScroll * -0.35))}px)`;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!firstImageRefDesktop.current) return;
            const scrollY        = window.scrollY;
            const rect           = firstImageRefDesktop.current.getBoundingClientRect();
            const relativeScroll = scrollY - (rect.top + scrollY);
            firstImageRefDesktop.current.style.transform = `translateY(${Math.max(-30, Math.min(0, relativeScroll * -0.45))}px)`;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => {
                entry.target.style.backgroundColor = entry.isIntersecting ? '#f5f3ee' : '#ffffff';
            }),
            { threshold: 0.2 }
        );
        if (aboutSectionRef.current) observer.observe(aboutSectionRef.current);
        return () => observer.disconnect();
    }, []);

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <>
            <Helmet>
                <title>Official Bentley Motors | The Art of Handcrafted Luxury and Performance</title>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
            </Helmet>

            {/* ── Intro ──────────────────────────────────────────────────────── */}
            <div className="flex flex-col mt-16 sm:mt-18 md:mt-20 lg:mt-25 justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto py-1.5 md:py-1 lg:py-12">
                <p style={{fontFamily: montserrat}} className="text-[28px] sm:text-[24px] md:text-[28px] lg:text-[35px] text-[#040404] mb-[24px] text-center">Bentley Motors</p>
                <div className="max-w-full pt-4 px-12 sm:px-16 md:px-20 lg:px-8 xl:px-0 mx-auto">
                    <p style={{fontFamily: montserrat}} className="pb-2 sm:text-[13px] lg:text-[14.9px] text-[#040404] text-center text-[14px] leading-relaxed mb-4">
                        From W.O. Bentley, who founded Bentley Motors in 1919, to the current team of over 4,000 dedicated employees,
                        the company's extraordinary cars have always been designed and built by exceptional people using only the
                        finest of materials. They have always been driven by exceptional people, too. From the passionate Bentley Boys
                        and Girls who raced the cars in the 1920s, encouraging W.O. Bentley to achieve ever greater feats of
                        engineering, to the visionary Bentley owners of today, Bentley drivers help to shape the world around them.
                    </p>
                    <p style={{fontFamily: montserrat}} className="pb-9 sm:text-[13px] lg:text-[15px] text-[#040404] text-center text-[14px] leading-relaxed">
                        In 2020 Bentley Motors launched the 'Beyond100' manifesto, which outlines our intention to become the most
                        sustainable luxury automotive brand in the world. As a brand we are constantly looking forwards, using the
                        links below you will find our technological innovations and future vision for Bentley.
                    </p>
                </div>
                <div className="flex flex-col px-12 gap-6 sm:flex-row gap-4 sm:gap-6 mt-8 mb-4 w-full sm:w-auto justify-center">
                    <button className="flex items-center cursor-pointer gap-3 justify-center text-[#ffffff] text-[13px] font-semibold bg-[#394D45] hover:bg-[#4a6a5c] transition-colors w-full sm:w-[194.13px] h-[41.6px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M8 5.078V5m0 2.5V11m6-3A6 6 0 1 1 2 8a6 6 0 0 1 12 0Z"></path></svg>
                        <span style={{fontFamily: montserrat}}>ABOUT BENTLEY</span>
                    </button>
                    <button className="flex text-[rgb(57,127,69)] items-center gap-3 justify-center text-[13px] bg-[#ffffff] border border-black hover:bg-gray-200 cursor-pointer transition-colors w-full sm:w-[273.64px] h-[41.6px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14"></path></svg>
                        <span style={{fontFamily: montserrat}} className="font-semibold text-[13px]">CREATE YOUR OWN BENTLEY</span>
                    </button>
                </div>
            </div>

            {/* ── Main Swiper ────────────────────────────────────────────────── */}
            <MainSwiper
                slides={slides}
                expandedSlide={expandedSlide}
                setExpandedSlide={setExpandedSlide}
                expandedSlideId={expandedSlideId}
                setExpandedSlideId={setExpandedSlideId}
                slideExpanded={slideExpanded}
                setSlideExpanded={setSlideExpanded}
                panelVisible={panelVisible}
                setPanelVisible={setPanelVisible}
                windowWidth={windowWidth}
                getDefaultHeight={getDefaultHeight}
                getExpandedHeight={getExpandedHeight}
                getSlideTransform={getSlideTransform}
                handleSlideClick={handleSlideClick}
                handleCloseExpanded={handleCloseExpanded}
                slideProgress={slideProgress}
                setSlideProgress={setSlideProgress}
                isMoving={isMoving}
                setIsMoving={setIsMoving}
            />

            {/* ── Mulliner ───────────────────────────────────────────────────── */}

            {/* Mulliner — Small Screens */}
            <div className="block md:hidden lg:hidden">
                <div
                    className="relative bg-cover bg-center w-[calc(100%-34px)] mx-[17px] mt-14 h-[520px]"
                    style={{ backgroundImage: "url('images/ImageSmallScreen.jpg')" }}
                >
                    <div className="absolute bottom-[30%] -right-2 w-[100px] h-[100px] backdrop-blur-[5px] bg-gray-500/95 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 backdrop-blur-[35px] bg-gray-500/20 z-20 p-6 pb-7">
                        <p className="text-[11px] font-normal text-white/75 mb-2 tracking-[0.04em]">Explore</p>
                        <h2 className="text-[28px] font-light text-white mb-3 tracking-[0.06em]">MULLINER</h2>
                        <p className="text-[11px] font-normal text-white/85 leading-relaxed mb-6">
                            This is the bespoke offering at Bentley. A place where dreams are made real and nothing is impossible.
                        </p>
                        <button className="w-full flex items-center justify-center gap-2.5 bg-[#394D45] text-white text-xs font-semibold tracking-[0.12em] h-12 border-none cursor-pointer hover:bg-[#4e6d63] transition duration-250">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
                            </svg>
                            EXPLORE
                        </button>
                    </div>
                </div>
            </div>

            {/* Mulliner — Tablet */}
            <div className="hidden md:block lg:hidden">
                <div
                    className="relative overflow-visible bg-cover bg-center w-[calc(100%-64px)] mx-[32px] mt-14 h-[550px] lg:w-[calc(100%-76px)] lg:mx-[38px] lg:h-[600px] xl:w-[calc(100%-96px)] xl:mx-[48px]"
                    style={{ backgroundImage: "url('images/LargeImageScreen.jpg')" }}
                >
                    <div className="absolute top-[20%] left-[40%] bg-gray-500/50 w-[22%] h-[25%] backdrop-blur-[19px] z-6" />
                    <div className="absolute top-[26%] left-[9%] w-[49%] backdrop-blur-[46px] p-7 pb-8 z-[9]">
                        <p className="text-[11px] font-normal text-white/65 mb-2.5 tracking-[0.06em]">Explore</p>
                        <h2 className="text-[30px] font-light text-white mb-4 tracking-[0.05em] leading-[1.1]">MULLINER</h2>
                        <p className="text-[11px] font-normal text-white/80 leading-relaxed mb-7">
                            This is the bespoke offering at Bentley. A place where dreams are made real and nothing is impossible.
                        </p>
                        <button className="w-[35%] h-[40px] flex items-center justify-center gap-2.5 bg-[#394D45] text-white text-[11px] font-semibold tracking-[0.12em] border-none cursor-pointer hover:bg-[#4e6d63] transition duration-250">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
                            </svg>
                            EXPLORE
                        </button>
                    </div>
                </div>
            </div>

            {/* Mulliner — Large Screens */}
            <div
                className="hidden lg:block relative bg-cover bg-center w-[calc(100%-76px)] mx-[38px] mt-14 xl:w-[calc(100%-96px)] xl:mx-[48px]"
                style={{ backgroundImage: "url('images/LargerImageScreen.jpg')", height: '600px' }}
            >
                <div
                        className="self-center ml-[30px] w-[240px] top-16 left-72 absolute bg-gray-300/25  h-[260px] backdrop-blur-[44px]"
                       
                    />
                <div className="absolute left-[9%] backdrop-blur-[35px] top-[17%] flex flex-col">
                    <div
                        className="flex flex-col text-left px-10 py-12 w-[400px] backdrop-blur-[29px]"
                        
                    >
                        <p className="text-white text-[11px] tracking-[0.15em] font-light mb-4">Explore</p>
                        <h2 className="text-white text-[36px] font-semibold tracking-widest leading-snug mb-6">MULLINER</h2>
                        <p className="text-white text-[13px] font-light leading-relaxed mb-10 opacity-90">
                            This is the bespoke offering at Bentley. A place where dreams are made real and nothing is impossible.
                        </p>
                        <button className="flex items-center gap-3 bg-[#2e5e52] hover:bg-[#3a7566] text-white text-[11px] tracking-[0.18em] font-semibold cursor-pointer transition-colors h-[38px] px-4 w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
                            </svg>
                            EXPLORE
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Configure ──────────────────────────────────────────────────── */}

            {/* Configure — Small Screens */}
            <div className="block md:hidden lg:hidden">
                <div
                    className="relative overflow-hidden bg-cover bg-center bg-no-repeat flex items-end justify-center w-[calc(100%-34px)] mx-[17px] mt-14 h-[520px]"
                    style={{ backgroundImage: "url('images/MainConfigure.jpg')" }}
                >
                    <p className="backdrop-blur-[5px] bg-gray-700/70 z-3 w-[110px] absolute right-[36%] bottom-[33%] h-[110px]" />
                    <div className="relative z-5 w-full py-7 backdrop-blur-[22px] px-5 pb-8 flex flex-col items-center text-center">
                        <p className="text-[11px] tracking-[0.15em] text-white/70 mb-2.5">Explore</p>
                        <h2 className="text-[26px] sm:text-[30px] font-normal text-white mb-3.5">Configure your perfect car</h2>
                        <p className="text-xs sm:text-[13px] leading-relaxed text-white/85 max-w-[310px] sm:max-w-[360px] mb-6">
                            Limited only by your imagination, here you can configure your perfect Bentley using the Official Bentley configurator.
                        </p>
                        <button className="w-full h-11 sm:h-12 flex items-center justify-center gap-2.5 bg-[#3F564F] text-white text-[11px] sm:text-xs font-semibold tracking-[0.15em] border-none cursor-pointer transition duration-250 hover:bg-[#4e6d63]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16M8 6V4m8 8v-2M6 20v-2" />
                            </svg>
                            CREATE YOUR OWN
                        </button>
                    </div>
                </div>
            </div>

            {/* Configure — Tablet */}
            <div className="hidden md:block lg:hidden">
                <div
                    className="relative bg-cover bg-center w-[calc(100%-64px)] mx-[32px] mt-14 h-[550px] lg:w-[calc(100%-76px)] lg:mx-[38px] lg:h-[600px] xl:w-[calc(100%-96px)] xl:mx-[48px]"
                    style={{ backgroundImage: "url('images/MainConfigureLarge.jpg')" }}
                >
                    <p className="backdrop-blur-[25px] bg-gray-200/20 z-3 w-[150px] absolute right-[42%] top-[17%] h-[150px]" />
                    <div className="absolute inset-0 flex items-center z-5 justify-center">
                        <div className="flex flex-col items-center backdrop-blur-[20px] text-center px-12 py-12 w-[420px]">
                            <p className="text-white text-[11px] tracking-[0.15em] font-light mb-3">Explore</p>
                            <h2 className="text-white text-[23px] font-light leading-snug mb-5">Configure your perfect car</h2>
                            <p className="text-white text-[12px] font-light leading-relaxed mb-8 opacity-90">
                                Limited only by your imagination, here you can configure your perfect Bentley using the Official Bentley configurator.
                            </p>
                            <button className="flex items-center justify-center gap-3 bg-[#2e5e52] hover:bg-[#3a7566] text-white text-[11px] tracking-[0.18em] font-semibold cursor-pointer transition-colors h-[38px] px-0 w-[70%]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h4m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h10M3 12h10m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h4M3 19h4m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h10" />
                                </svg>
                                CREATE YOUR OWN
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Configure — Large Screens */}
            <div
                className="hidden lg:block relative bg-cover bg-center w-[calc(100%-76px)] mx-[38px] mt-14 xl:w-[calc(100%-96px)] xl:mx-[48px]"
                style={{ backgroundImage: "url('images/MainConfigureLarger.jpg')", height: '600px' }}
            >
                <div className="absolute top-16 left-[40%] bg-gray-500/30 mt w-[250px] h-[250px]"/>
                <div className="absolute left-1/2 -translate-x-1/2 top-[16%] h-[150px] flex flex-col items-center">
                    <div className="flex flex-col items-center backdrop-blur-[33px] text-center px-16 py-12 w-[580px]">
                        <p className="text-white text-[11px] tracking-[0.15em] font-light mb-4">Explore</p>
                        <h2 className="text-white text-[32px] font-light leading-snug mb-5">Configure your perfect car</h2>
                        <p className="text-white text-[13px] font-light leading-relaxed mb-10 opacity-90">
                            Limited only by your imagination, here you can configure your perfect Bentley using the Official Bentley configurator.
                        </p>
                        <button className="flex items-center gap-3 bg-[#2e5e52] hover:bg-[#3a7566] text-white text-[11px] tracking-[0.18em] font-semibold cursor-pointer transition-colors h-[35px] px-5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
                            </svg>
                            CREATE YOUR OWN
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Ownership ──────────────────────────────────────────────────── */}

            {/* Ownership — Small Screens */}
            <div className="block md:hidden lg:hidden">
                <div
                    className="relative bg-cover bg-center bg-no-repeat flex items-end justify-center w-[calc(100%-34px)] mx-[17px] mt-14 h-[520px]"
                    style={{ backgroundImage: "url('images/SmallOwnerShip.jpg')" }}
                >
                    <div className="absolute backdrop-blur-[35px] bg-gray-600/14 z-3 w-[110px] -left-2 bottom-[29%] h-[110px]" />
                    <div className="relative w-full backdrop-blur-[32px] z-8 py-7 px-5 pb-8 flex flex-col items-center text-center">
                        <p className="text-[11px] tracking-[0.15em] text-white mb-2.5">Explore</p>
                        <h2 className="text-[26px] sm:text-[30px] font-normal text-white mb-3.5">Ownership</h2>
                        <p className="text-xs sm:text-[13px] leading-relaxed text-white/85 max-w-[310px] sm:max-w-[360px] mb-6">
                            Discover a connected and extraordinary ownership experience.
                        </p>
                        <button className="w-full h-11 sm:h-12 flex items-center justify-center gap-2.5 bg-[#394D45] text-white text-[11px] sm:text-xs font-semibold tracking-[0.15em] border-none cursor-pointer transition duration-250 hover:bg-[#4e6d63]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path stroke="currentColor" strokeWidth="1.5" d="M4 3h8v10H4zM6 6h4M6 9h3"/>
                            </svg>
                            EXPLORE
                        </button>
                    </div>
                </div>
            </div>

            {/* Ownership — Tablet */}
            <div className="hidden md:block lg:hidden">
                <div
                    className="relative bg-cover bg-center w-[calc(100%-64px)] mx-[32px] mt-14 h-[550px] lg:w-[calc(100%-76px)] lg:mx-[38px] lg:h-[600px]"
                    style={{ backgroundImage: "url('images/OwnerShip.jpg')" }}
                >
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-[48%]">
                        <div
                            className="absolute bg-gray-500/10 backdrop-blur-[19px] top-[-30px] -left-[24px] w-[180px] h-[180px]"/>
                        <div
                            className="relative bg-gray-500/10 backdrop-blur-[19px] flex flex-col text-left px-10 py-10 w-[90%]">
                            <p className="text-white text-[11px] tracking-[0.15em] font-light mb-4">Explore</p>
                            <h2 className="text-white text-[32px] font-light leading-snug mb-4">Ownership</h2>
                            <p className="text-white text-[12px] font-light leading-relaxed mb-8 opacity-90">
                                Discover a connected and extraordinary ownership experience.
                            </p>
                            <button className="flex items-center gap-3 bg-[#2e5e52] hover:bg-[#3a7566] h-[38px] text-white text-[11px] tracking-[0.18em] font-semibold cursor-pointer transition-colors px-4 w-fit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
                                </svg>
                                EXPLORE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ownership — Large Screens */}
            <div
                className="hidden lg:block relative bg-cover bg-center w-[calc(100%-76px)] mx-[38px] mt-14 xl:w-[calc(100%-96px)] xl:mx-[48px]"
                style={{ backgroundImage: "url('images/OwnerShipLarge.jpg')", height: '600px' }}
            >
                <div className="absolute right-[4%]  top-1/2 -translate-y-[125px] flex flex-col items-start">
                    <div
                        className="-ml-[30px] bg-gray-400/30 backdrop-blur-[58px] -mt-7 w-[220px] absolute z-4 h-[220px]"/>
                    <div
                        className="flex flex-col z-9 backdrop-blur-[29px] bg-gray-500/10 text-left px-12 py-12 w-[90%]"
                       
                    >
                        <p className="text-white text-[11px] tracking-[0.15em] font-light mb-4">Explore</p>
                        <h2 className="text-white text-[36px] font-light leading-snug mb-5">Ownership</h2>
                        <p className="text-white text-[13px] font-light leading-relaxed mb-10 opacity-90">
                            Discover a connected and extraordinary ownership experience.
                        </p>
                        <button className="flex items-center gap-3 bg-[#2e5e52] hover:bg-[#3a7566] text-white text-[11px] tracking-[0.18em] font-semibold cursor-pointer transition-colors h-[38px] px-4 w-fit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 16 16" aria-hidden="true">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
                            </svg>
                            EXPLORE
                        </button>
                    </div>
                </div>
            </div>

            {/* ── About Bentley ──────────────────────────────────────────────── */}

            {/* About — Small Screens */}
            <div className="md:hidden mt-42">
                <div className="relative" style={{ marginLeft: '14px', paddingBottom: 'calc(120% + 90px)' }}>
                    <div style={{ backgroundImage: "url('images/aboutBentley2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '90%', height: '100%', position: 'absolute', top: '0px', right: '17px', zIndex: 1 }} />
                    <div ref={firstImageRef} style={{ backgroundImage: "url('images/aboutBentley1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '90%', height: '100%', position: 'absolute', top: '90px', left: '0px', zIndex: 2, transition: 'transform 0.1s ease-out' }} />
                </div>
                <div className="px-4 sm:px-6 pt-8 sm:pt-23 pb-10 bg-white">
                    <h2 style={{fontFamily: montserrat}} className="text-[18px] sm:text-[20px] font-[500] text-black mb-6">About Bentley</h2>
                    <p style={{fontFamily: montserrat}} className="text-[10px] sm:text-[11px] text-black leading-relaxed mb-10">
                        Bentley is on an extraordinary journey into the future – a future in which sustainability will be paramount. We have made significant leaps forward, from concept cars featuring electric powertrains to launches of Bentley hybrid vehicles.
                    </p>
                    <button style={{fontFamily: montserrat}} className="w-full flex items-center justify-center gap-3 bg-[#394D45] hover:bg-[#4a6a5c] text-white text-[10px] sm:text-[12px] font-semibold cursor-pointer transition-colors h-[31.6px] sm:h-[38px] mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>
                        EXPLORE
                    </button>
                    <button style={{fontFamily: montserrat}} className="w-full flex items-center justify-center gap-3 bg-transparent border border-[#040404] hover:bg-gray-200 text-[10px] sm:text-[12px] text-[#394D45] font-medium cursor-pointer transition-colors h-[31.6px] sm:h-[38px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M4.667 6.273V3h6.666v3.273M3 5.045V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.045L8 8.727z" /></svg>
                        <span className="text-[#394D45]">KEEP ME INFORMED</span>
                    </button>
                </div>
            </div>

            {/* About — Tablet & Large Screens */}
            <div ref={aboutSectionRef} className="hidden md:flex items-center justify-center pt-30 gap-16 lg:gap-24 xl:gap-32 px-8 md:px-12 lg:px-16 xl:px-24 py-12 transition-colors duration-700" style={{ backgroundColor: '#ffffff' }}>
                <div className="relative flex-shrink-0" style={{ width: 'clamp(320px, calc(320px + (441.58 - 320) * ((100vw - 768px) / (1024 - 768))), 441.58px)', height: 'clamp(420px, calc(420px + (588.58 - 420) * ((100vw - 768px) / (1024 - 768))), 588.58px)' }}>
                    <div style={{ backgroundImage: "url('images/aboutBentley2.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '90%', height: '100%', position: 'absolute', top: '0px', right: '0px', zIndex: 1 }} />
                    <div ref={firstImageRefDesktop} style={{ backgroundImage: "url('images/aboutBentley1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', width: '90%', height: '100%', position: 'absolute', top: '30px', left: '0px', zIndex: 2, transition: 'transform 0.1s ease-out' }} />
                </div>
                <div className="flex flex-col justify-center" style={{ maxWidth: 'clamp(320px, 40%, 480px)' }}>
                    <h2 style={{fontFamily: montserrat}} className="text-[28px] md:text-[32px] lg:text-[36px] font-[400] text-black mb-6">About Bentley</h2>
                    <p style={{fontFamily: montserrat}} className="text-[13px] md:text-[14px] text-black leading-relaxed mb-10">
                        Bentley is on an extraordinary journey into the future – a future in which sustainability will be paramount. We have made significant leaps forward, from concept cars featuring electric powertrains to launches of Bentley hybrid vehicles.
                    </p>
                    <div className="flex items-center gap-4">
                        <button style={{fontFamily: montserrat}} className="flex items-center justify-center gap-3 bg-[#394D45] hover:bg-[#4a6a5c] text-white text-[13px] font-semibold cursor-pointer transition-colors h-[41.6px] px-[24px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>
                            EXPLORE
                        </button>
                        <button style={{fontFamily: montserrat}} className="flex items-center justify-center gap-3 bg-transparent border border-[#040404] hover:bg-gray-200 text-[#394D45] text-[13px] font-medium cursor-pointer transition-colors h-[41.6px] px-[24px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M4.667 6.273V3h6.666v3.273M3 5.045V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.045L8 8.727z" /></svg>
                            KEEP ME INFORMED
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Slide Modal (mobile/tablet < 1024px) ──────────────────────── */}
            <SlideModal
                slide={selectedSlide}
                onClose={() => setSelectedSlide(null)}
            />
        </>
    );
}