import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import { TfiControlPlay, TfiControlPause } from "react-icons/tfi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from "swiper"; 
import "../css/HeroSlider.css";
import HeaderSwiper from "./HeaderSwiper";
import headerSlides from "../js/headerSlides";
import Models from "./Models";
import MediumScreenModels from "./MediumScreenModels";
import LargerScreenModels from "./LargerScreenModels";
import LargestScreenModels from "./LargestScreenModels";
import DesktopOverlay from './DesktopOverlay';
import ProgressBar from './ProgressBar';
import BurgerMenu from './BurgerMenu';
import CultureDesktopPopup from './CultureDesktopPopup';
import LifeStylePopup from './LifeStylePopup';
import YourBentleyPopup from './YourBentleyPopup';
import AboutBentleyPopup from './AboutBentleyPopup';

const montserrat = { fontFamily: "'Montserrat', Arial, Helvetica, sans-serif" };

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const isCulturePage = location.pathname === '/culture';
    const isLifestylePage = location.pathname === '/lifestyle';
    const isSpecialPage = isCulturePage || isLifestylePage;
    
    const [mounted, setMounted] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const isFirstLoad = useRef(true);
    const [activeVideoIndex, setActiveVideoIndex] = useState(null);
    const [bg, setBg] = useState(0);
    const [progress, setProgress] = useState(0);
    const [openBurger, setOpenBurger] = useState(false);
    const [openModels, setOpenModels] = useState(false);
    const [openCulturePopup, setOpenCulturePopup] = useState(false);
    const [openLifeStylePopup, setOpenLifeStylePopup] = useState(false);
    const [openYourBentleyPopup, setOpenYourBentleyPopup] = useState(false);
    const [openAboutBentleyPopup, setOpenAboutBentleyPopup] = useState(false);
    const [firstVideoPaused, setFirstVideoPaused] = useState(false);
    const [thirdVideoPlaying, setThirdVideoPlaying] = useState(false);
    const [thirdVideoPaused, setThirdVideoPaused] = useState(true);
    const firstVideoRef = useRef(null);
    const thirdVideoRef = useRef(null);
    const swiperRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    const [autoplayEnabled, setAutoplayEnabled] = useState(true);

    useEffect(() => {
        setMounted(true);
        
        const update = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsLargeScreen(width > 1250);
            setScreenWidth(width);
        };
        
        update();
        window.addEventListener('resize', update);
        
        return () => {
            window.removeEventListener('resize', update);
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };
    }, []);

    function toggleBurger(val) {
        setOpenBurger(val);
        const shouldLock = val || openModels || openCulturePopup || openLifeStylePopup || openYourBentleyPopup || openAboutBentleyPopup;
        document.body.style.overflow = shouldLock ? "hidden" : "auto";
        document.documentElement.style.overflow = shouldLock ? "hidden" : "auto";
    }

    function toggleModels(val) {
        setOpenModels(val);
        const shouldLock = val || openBurger || openCulturePopup || openLifeStylePopup || openYourBentleyPopup || openAboutBentleyPopup;
        document.body.style.overflow = shouldLock ? "hidden" : "auto";
        document.documentElement.style.overflow = shouldLock ? "hidden" : "auto";
    }

    function toggleCulturePopup(val) {
        setOpenCulturePopup(val);
        const shouldLock = val || openBurger || openModels || openLifeStylePopup || openYourBentleyPopup || openAboutBentleyPopup;
        document.body.style.overflow = shouldLock ? "hidden" : "auto";
        document.documentElement.style.overflow = shouldLock ? "hidden" : "auto";
    }
    
    function toggleLifeStylePopup(val) {
        setOpenLifeStylePopup(val);
        const shouldLock = val || openBurger || openModels || openCulturePopup || openYourBentleyPopup || openAboutBentleyPopup;
        document.body.style.overflow = shouldLock ? "hidden" : "auto";
        document.documentElement.style.overflow = shouldLock ? "hidden" : "auto";
    }

    function toggleYourBentleyPopup(val) {
        setOpenYourBentleyPopup(val);
        const shouldLock = val || openBurger || openModels || openCulturePopup || openLifeStylePopup || openAboutBentleyPopup;
        document.body.style.overflow = shouldLock ? "hidden" : "auto";
        document.documentElement.style.overflow = shouldLock ? "hidden" : "auto";
    }

    function toggleAboutBentleyPopup(val) {
        setOpenAboutBentleyPopup(val);
        const shouldLock = val || openBurger || openModels || openCulturePopup || openLifeStylePopup || openYourBentleyPopup;
        document.body.style.overflow = shouldLock ? "hidden" : "auto";
        document.documentElement.style.overflow = shouldLock ? "hidden" : "auto";
    }
    
    function handlePlay(index) {
        setActiveVideoIndex(index);
        if (index === 2) {
            setThirdVideoPlaying(true);
            setThirdVideoPaused(false);
            // Auto-play the third video when user clicks play
            setTimeout(() => {
                if (thirdVideoRef.current) {
                    thirdVideoRef.current.play().catch(err => console.log('Video play error:', err));
                }
            }, 100);
            if (swiperRef.current && swiperRef.current.autoplay) {
                swiperRef.current.autoplay.stop();
                setAutoplayEnabled(false);
            }
        }
    }
    
    function handleThirdVideoPlayPause() {
        if (thirdVideoRef.current) {
            if (thirdVideoPaused) {
                thirdVideoRef.current.play();
                setThirdVideoPaused(false);
            } else {
                thirdVideoRef.current.pause();
                setThirdVideoPaused(true);
            }
        }
    }
    
    function handleVideoEnded() {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
            setThirdVideoPlaying(false);
            setThirdVideoPaused(false);
            setActiveVideoIndex(null);
            if (swiperRef.current.autoplay) {
                swiperRef.current.autoplay.start();
                setAutoplayEnabled(true);
            }
        }
    }

    const getModelsComponent = () => {
        if (screenWidth < 768) {
            return <Models openModels={openModels} />;
        } else if (screenWidth >= 768 && screenWidth <= 1024) {
            return <MediumScreenModels openMediumModels={openModels} />;
        } else if (screenWidth > 1024 && screenWidth <= 1348) {
            return <LargerScreenModels openLargerModels={openModels} />;
        } else {
            return <LargestScreenModels openLargestModels={openModels} />;
        }
    };

    // FIX: fall back to slide.src for image slides that have no .poster
    const background = headerSlides.map(slide => slide.poster || slide.src || '');

    const slides = headerSlides.filter(slide => slide.type === 'img' || slide.type === 'video');

    const mediaClass = `w-full object-cover ${
        isMobile
            ? 'h-[472px] max-h-[472px]'
            : isLargeScreen
                ? 'w-full h-full max-h-[80vh] object-contain'
                : 'h-[472px]'
    }`;

    const videoClass = `w-full object-cover ${
        isMobile
            ? 'aspect-video max-h-[472px] h-auto'
            : isLargeScreen
                ? 'w-full h-full max-h-[80vh] object-contain'
                : 'h-[472px]'
    }`;

    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <>
            <header className={`relative w-full ${isSpecialPage ? 'h-auto' : isMobile ? 'h-screen min-h-[900.6px]' : 'h-auto'} ${isSpecialPage ? 'bg-black' : ''}`} style={montserrat}>
                {!isSpecialPage && (
                    <div
                        style={{ backgroundImage: `url(${background[bg]})` }}
                        className="absolute inset-0 bg-cover w-full bg-top blur-[9px] shadow-md -z-10"
                    />
                )}

                <div className="relative z-10 flex flex-col p-4 xs:p-5 sm:p-6 md:pl-8 md:pr-8 lg:px-12 lg:pt-7 md:pt-0 h-full">

                    {/* Mobile-only REQUEST TEST DRIVE */}
                    <button className={`md:hidden w-full flex justify-center items-center h-[41.6px] max-w-full text-[14px] font-normal py-3 px-4 border cursor-pointer hover:bg-gray-300 ${isSpecialPage ? 'bg-black text-white border-white' : 'bg-transparent text-white border-[#ffffff]'}`}>
                        REQUEST TEST DRIVE
                    </button>

                    {/* Nav row */}
                    <div className="relative flex justify-between items-center py-4 md:h-[60px] md:py-0 md:mt-3 lg:h-auto lg:mt-0 lg:py-4">

                        {/* LEFT — MODELS + MENU */}
                        <div className="flex items-center gap-2 md:gap-5">
                            <div
                                className={`text-[11px] md:text-[11px] md:tracking-[0.18em] lg:text-[12px] lg:tracking-normal hover:text-gray-400 font-medium cursor-pointer text-white`}
                                onClick={() => toggleModels(true)}
                            >
                                MODELS
                            </div>

                            {/* MENU burger — md only (768–1024px) */}
                            <div
                                className="hidden md:flex lg:hidden items-center gap-1.5 cursor-pointer ml-5 text-white hover:text-gray-300"
                                onClick={() => toggleBurger(true)}
                            >
                                <span className="text-[14px]">≡</span>
                                <span className="text-[11px] tracking-[0.18em] font-medium uppercase">MENU</span>
                            </div>

                            {/* MENU burger — lg only (1024px–1439px) */}
                            <div
                                className="hidden lg:flex xl:hidden items-center gap-1.5 cursor-pointer ml-5 text-white hover:text-gray-300"
                                onClick={() => toggleBurger(true)}
                            >
                                <span className="text-[14px]">≡</span>
                                <span className="text-[11px] tracking-[0.18em] font-medium uppercase">MENU</span>
                            </div>

                            {/* Only LARGE SCREEN nav links */}
                            {isLargeScreen && (
                                <div className="hidden lg:flex items-center gap-6 ml-4">
                                    <button
                                        onClick={() => toggleCulturePopup(true)}
                                        className="text-[12px] font-medium transition-colors duration-200 hover:text-gray-400 whitespace-nowrap text-white cursor-pointer"
                                    >
                                        CULTURE
                                    </button>
                                    <button
                                        onClick={() => toggleLifeStylePopup(true)}
                                        className="text-[12px] font-medium transition-colors duration-200 hover:text-gray-400 whitespace-nowrap text-white cursor-pointer"
                                    >
                                        LIFESTYLE
                                    </button>
                                    <button
                                        onClick={() => toggleYourBentleyPopup(true)}
                                        className="text-[12px] font-medium transition-colors duration-200 hover:text-gray-400 whitespace-nowrap text-white cursor-pointer"
                                    >
                                        YOUR BENTLEY
                                    </button>
                                    <button
                                        onClick={() => toggleAboutBentleyPopup(true)}
                                        className="text-[12px] font-medium transition-colors duration-200 hover:text-gray-400 whitespace-nowrap text-white cursor-pointer"
                                    >
                                        ABOUT BENTLEY
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* CENTER — Logo */}
                        <img
                            className={`
                                w-[88px] h-[44px] cursor-pointer
                                md:absolute md:left-1/2 md:-translate-x-1/2 md:pr-3 md:w-[110px] md:h-auto
                                lg:static lg:translate-x-0 lg:pr-0 lg:ml-2 lg:w-[110px] lg:h-[55px]
                                ${isSpecialPage ? 'brightness-0 invert' : ''}
                            `}
                            src="/images/BentleyIcon.png"
                            alt="Bentley Logo"
                            onClick={() => navigate('/')}
                        />

                        {/* RIGHT — mobile MENU + REQUEST TEST DRIVE + large screen buttons */}
                        <div className="flex items-center gap-4">

                            {/* MENU burger — mobile only */}
                            <div
                                className="flex md:hidden items-center gap-1.5 cursor-pointer text-white"
                                onClick={() => toggleBurger(true)}
                            >
                                <span className="text-[11px] font-medium">MENU</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 16 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 4h10M3 8h10M3 12h10" />
                                </svg>
                            </div>

                            {/* REQUEST TEST DRIVE button */}
                            <button
                                className={`
                                    hidden md:flex justify-center items-center cursor-pointer transition-all duration-200 whitespace-nowrap font-medium bg-transparent
                                    md:h-[41.6px] md:px-8 md:py-2 md:border md:border-white md:text-[11.5px] md:tracking-[0.15em] md:text-white md:hover:bg-white/10
                                    lg:px-4 lg:py-3 lg:text-[14px] lg:tracking-normal lg:font-normal lg:border-white lg:text-white lg:hover:bg-gray-300/20
                                    ${isSpecialPage ? 'border-white text-white' : 'border-white text-white'}
                                `}
                            >
                                REQUEST TEST DRIVE
                            </button>

                            {/* Large screen only buttons */}
                            {isLargeScreen && (
                                <div className="hidden lg:flex items-center gap-2">
                                    <button className="flex items-center gap-2 text-[12px] font-medium transition-all duration-200 hover:bg-gray-300/20 hover:cursor-pointer px-4 py-2 rounded-none text-white">
                                        <span>CONFIGURATOR</span>
                                    </button>
                                    <button className="flex items-center gap-2 text-[12px] font-medium transition-all duration-200 hover:bg-gray-300/20 hover:cursor-pointer px-4 py-2 rounded-none text-white">
                                        <span>LOCATE DEALER</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Only show Swiper and related components on Main page */}
                    {!isSpecialPage && (
                        <div className="swiper-outer-wrapper relative z-10 mt-0 flex-1">
                            <ProgressBar 
                                currentSlide={currentSlide}
                                slides={slides}
                                progress={progress}
                                isLargeScreen={isLargeScreen}
                            />

                            <HeaderSwiper
                                currentSlide={currentSlide}
                                setCurrentSlide={setCurrentSlide}
                                setBg={setBg}
                                setProgress={setProgress}
                                isFirstLoad={isFirstLoad}
                                setActiveVideoIndex={setActiveVideoIndex}
                                setFirstVideoPaused={setFirstVideoPaused}
                                firstVideoPaused={firstVideoPaused}
                                setThirdVideoPlaying={setThirdVideoPlaying}
                                setThirdVideoPaused={setThirdVideoPaused}
                                thirdVideoRef={thirdVideoRef}
                                handlePlay={handlePlay}
                                handleThirdVideoPlayPause={handleThirdVideoPlayPause}
                                handleVideoEnded={handleVideoEnded}
                                isMobile={isMobile}
                                isLargeScreen={isLargeScreen}
                                screenWidth={screenWidth}
                                autoplayEnabled={autoplayEnabled}
                                setAutoplayEnabled={setAutoplayEnabled}
                            />

                            {!isMobile && (
                                <DesktopOverlay 
                                    slides={slides}
                                    currentSlide={currentSlide}
                                    isLargeScreen={isLargeScreen}
                                />
                            )}
                        </div>
                    )}
                </div>

                {/* SINGLE MODELS OVERLAY */}
                <div 
                    className={`fixed inset-0 bg-white z-50 overflow-hidden transition-transform duration-500 ease-in-out ${openModels ? "translate-y-0" : "-translate-y-full"}`}
                    style={montserrat}
                >
                    {getModelsComponent()}
                    <div 
                        className="absolute top-16 right-3 md:top-21 md:right-20 md:mt-9 cursor-pointer hover:bg-gray-300 p-3 text-gray-600 flex items-center gap-2 text-[13px] font-semibold tracking-widest" 
                        onClick={() => toggleModels(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="hidden lg:inline">CLOSE</span>
                    </div>
                </div>
            </header>

            {/* Burger Menu Component */}
            <BurgerMenu openBurger={openBurger} toggleBurger={toggleBurger} />

            {/* Culture Desktop Popup */}
            <CultureDesktopPopup 
                openCulturePopup={openCulturePopup} 
                toggleCulturePopup={toggleCulturePopup} 
            />

            {/* LifeStyle Popup */}
            <LifeStylePopup 
                openLifeStylePopup={openLifeStylePopup} 
                toggleLifeStylePopup={toggleLifeStylePopup} 
            />

            {/* YourBentley Popup */}
            <YourBentleyPopup 
                openYourBentleyPopup={openYourBentleyPopup} 
                toggleYourBentleyPopup={toggleYourBentleyPopup} 
            />

            {/* AboutBentley Popup */}
            <AboutBentleyPopup 
                openAboutBentleyPopup={openAboutBentleyPopup} 
                toggleAboutBentleyPopup={toggleAboutBentleyPopup} 
            />
        </>
    );
}