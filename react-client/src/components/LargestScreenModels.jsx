import { useState, useEffect } from "react";
import axios from "axios";
import "../css/Models.css";

const montserrat = { fontFamily: "'Montserrat', Arial, Helvetica, sans-serif" };

export default function LargestScreenModels({ openLargestModels }) {
    const [menuModels, setMenuModels] = useState([]);
    const [visibleCount, setVisibleCount] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [lastHoveredIndex, setLastHoveredIndex] = useState(null);
    const [aboutModels, setAboutModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataReady, setDataReady] = useState(false);
    const [activeSection, setActiveSection] = useState("models");
    
    // Animation states for each section
    const [cultureAnimate, setCultureAnimate] = useState(false);
    const [lifestyleAnimate, setLifestyleAnimate] = useState(false);
    const [yourBentleyAnimate, setYourBentleyAnimate] = useState(false);
    const [aboutBentleyAnimate, setAboutBentleyAnimate] = useState(false);

    useEffect(() => {
        Promise.all([
            axios.get("http://localhost:1337/api/menu-cars?populate=*&sort=id:asc"),
            axios.get("http://localhost:1337/api/about-cars?populate=*")
        ]).then(([menuRes, aboutRes]) => {
            setMenuModels(menuRes.data.data);
            setAboutModels(aboutRes.data.data);
            setIsLoading(false);
        }).catch(error => {
            console.error("Error fetching data:", error);
            setIsLoading(false);
        });
    }, []);

    const activeIndex = hoveredIndex ?? lastHoveredIndex;
    const hoveredCar = aboutModels.find(aboutModel => aboutModel.slug === menuModels[activeIndex]?.slug);

    useEffect(() => {
        if (menuModels.length > 0 && aboutModels.length > 0) {
            setDataReady(true);
            if (hoveredIndex === null && lastHoveredIndex === null && menuModels.length > 0) {
                setLastHoveredIndex(0);
            }
        }
    }, [menuModels, aboutModels]);

    useEffect(() => {
        if (openLargestModels && menuModels.length > 0 && activeSection === "models") {
            setVisibleCount(0);
            const interval = setInterval(() => {
                setVisibleCount(prev => {
                    if (prev >= menuModels.length) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 100);
            return () => clearInterval(interval);
        } else {
            setVisibleCount(0);
        }
    }, [openLargestModels, menuModels, activeSection]);

    // Trigger animations when sections become active
    useEffect(() => {
        if (activeSection === "culture") {
            setTimeout(() => setCultureAnimate(true), 100);
        } else {
            setCultureAnimate(false);
        }
        
        if (activeSection === "lifestyle") {
            setTimeout(() => setLifestyleAnimate(true), 100);
        } else {
            setLifestyleAnimate(false);
        }
        
        if (activeSection === "yourBentley") {
            setTimeout(() => setYourBentleyAnimate(true), 100);
        } else {
            setYourBentleyAnimate(false);
        }
        
        if (activeSection === "aboutBentley") {
            setTimeout(() => setAboutBentleyAnimate(true), 100);
        } else {
            setAboutBentleyAnimate(false);
        }
    }, [activeSection]);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
        setLastHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <div className="text-gray-500">Loading models...</div>
            </div>
        );
    }

    return (
        <>
            {/* ── NAVBAR ── */}
            <div className="w-full flex items-center justify-between pl-12 pr-16 mt-9 h-[60px] bg-white">
                <div className="flex items-center gap-10">
                    <span 
                        onClick={() => setActiveSection("models")}
                        className={`text-[11px] tracking-[0.18em] font-medium cursor-pointer uppercase transition-colors duration-200 ${
                            activeSection === "models" ? "text-gray-400" : "text-black hover:text-gray-500"
                        }`}
                    >
                        MODELS
                    </span>
                    <span 
                        onClick={() => setActiveSection("culture")}
                        className={`text-[11px] tracking-[0.18em] font-medium cursor-pointer uppercase transition-colors duration-200 ${
                            activeSection === "culture" ? "text-gray-400" : "text-black hover:text-gray-500"
                        }`}
                    >
                        CULTURE
                    </span>
                    <span 
                        onClick={() => setActiveSection("lifestyle")}
                        className={`text-[11px] tracking-[0.18em] font-medium cursor-pointer uppercase transition-colors duration-200 ${
                            activeSection === "lifestyle" ? "text-gray-400" : "text-black hover:text-gray-500"
                        }`}
                    >
                        LIFESTYLE
                    </span>
                    <span 
                        onClick={() => setActiveSection("yourBentley")}
                        className={`text-[11px] tracking-[0.18em] font-medium cursor-pointer uppercase transition-colors duration-200 ${
                            activeSection === "yourBentley" ? "text-gray-400" : "text-black hover:text-gray-500"
                        }`}
                    >
                        YOUR BENTLEY
                    </span>
                    <span 
                        onClick={() => setActiveSection("aboutBentley")}
                        className={`text-[11px] tracking-[0.18em] font-medium cursor-pointer uppercase transition-colors duration-200 ${
                            activeSection === "aboutBentley" ? "text-gray-400" : "text-black hover:text-gray-500"
                        }`}
                    >
                        ABOUT BENTLEY
                    </span>
                </div>
                <div className="flex flex-col items-center absolute left-1/2 pr-3 -translate-x-1/2">
                    <img src="/images/bentleyFooter.png" alt="Bentley" className="w-[110px] h-auto" />
                </div>
                <div className="flex items-center">
                    <div className="group border border-black px-6 py-2 cursor-pointer hover:bg-gray-300 transition-colors duration-200">
                        <span className="text-[11.5px] tracking-[0.15em] text-black font-medium uppercase">
                            REQUEST TEST DRIVE
                        </span>
                    </div>
                    <div className="group cursor-pointer hover:bg-gray-300 px-4 py-2 transition-colors duration-200">
                        <span className="text-[11px] tracking-[0.18em] text-black group-hover:text-black font-medium uppercase">
                            CONFIGURATOR
                        </span>
                    </div>
                    <div className="group cursor-pointer hover:bg-gray-300 px-5 py-2 transition-colors duration-200">
                        <span className="text-[11px] tracking-[0.18em] text-black group-hover:text-black font-medium uppercase">
                            LOCATE DEALER
                        </span>
                    </div>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="absolute top-58 mr-5 left-0 right-0 h-[2px] z-10 transition-all duration-300 pointer-events-none" />

            <div className="relative flex" style={{ height: "calc(100vh - 120px)" }}>

                {/* MODELS SECTION */}
                {activeSection === "models" && (
                    <>
                        {/* Left panel: car list */}
                        <div
                            className="flex flex-col pl-12 pr-4 pb-13 mt-15 max-h-[580px] overflow-y-auto overflow-x-hidden custom-scrollbar-medium"
                            style={{
                                scrollbarWidth: "thin",
                                scrollbarColor: "#888 #f1f1f1",
                                width: "clamp(300px, 28vw, 480px)",
                                marginRight: "clamp(40px, 5vw, 80px)",
                                overflowX: "hidden"
                            }}>
                            <div className="pr-0">
                                {menuModels.map((menuModel, index) => (
                                    <div
                                        key={index}
                                        onMouseEnter={() => handleMouseEnter(index)}
                                        onMouseLeave={handleMouseLeave}
                                        className="group flex flex-row items-center gap-4 cursor-pointer bg-cover bg-center bg-no-repeat"
                                        style={{
                                            opacity: index < visibleCount ? 1 : 0,
                                            transform: index < visibleCount ? "translateX(0)" : "translateX(-30px)",
                                            transition: "opacity 600ms ease, transform 600ms ease",
                                            backgroundImage: hoveredIndex === index || (hoveredIndex === null && lastHoveredIndex === index)
                                                ? "url('/images/gradient_modified.jpg')"
                                                : "none",
                                            backgroundColor: "#ffffff",
                                            paddingTop: "clamp(12px, 2vh, 20px)",
                                            paddingBottom: "clamp(12px, 2vh, 20px)"
                                        }}
                                    >
                                        <img
                                            className="w-[148px] h-[64px] shrink-0 object-cover transition-transform duration-500 group-hover:translate-x-[-3px]"
                                            src={`http://localhost:1337${menuModel.image?.formats.thumbnail.url}`}
                                            alt={menuModel.title}
                                        />
                                        <div className="flex flex-col gap-1 items-start flex-1">
                                            <div
                                                className="font-[440] text-black"
                                                style={{ fontSize: "clamp(12px, 1.5vw, 14px)", wordBreak: "break-word", lineHeight: "1.3" }}
                                            >
                                                {menuModel.title}
                                            </div>
                                            <div className="text-[clamp(8px,1vw,10px)] font-medium text-black">
                                                {menuModel.gasoline}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right panel: detail */}
                        {dataReady && hoveredCar && (
                            <div
                                className="absolute custom-medium overflow-y-auto"
                                style={{
                                    left: "clamp(340px, 30vw, 600px)",
                                    right: "clamp(20px, 3%, 60px)",
                                    top: "48px",
                                    bottom: "0",
                                    scrollbarWidth: "thin",
                                    scrollbarColor: "#888 #f1f1f1",
                                }}
                            >
                                <div className="pb-24">
                                    <div className="flex items-start gap-6 w-full">
                                        {/* LEFT column */}
                                        <div className="flex flex-col shrink-0" style={{ width: "clamp(260px, 25vw, 380px)" }}>
                                            <div
                                                key={`title-${hoveredCar?.id}`}
                                                className="text-[clamp(20px,3vw,32px)]"
                                                style={{ animation: "fadeFromTop 0.6s ease 0s forwards", opacity: 0, willChange: "transform, opacity" }}
                                            >
                                                {hoveredCar?.titleAbout}
                                            </div>
                                            <div
                                                key={`desc-${hoveredCar?.id}`}
                                                className="flex flex-col gap-3 mt-3"
                                                style={{ animation: "fadeFromTop 0.6s ease 0.15s forwards", opacity: 0, willChange: "transform, opacity" }}
                                            >
                                                <div className="text-[clamp(11px,1.4vw,14px)] w-[330px] mt-2 text-black">
                                                    {hoveredCar?.descriptionAbout}
                                                </div>
                                                <div className="text-[clamp(12px,1.5vw,13px)] hover:bg-gray-300 mt-8 hover:cursor-pointer font-sans text-gray-600 font-[450] py-[clamp(8px,1vh,12px)] px-[clamp(14px,2vw,18px)] border flex items-center justify-center w-[clamp(100px,12vw,120px)] h-[clamp(38px,5vh,42px)] shrink-0">
                                                    {hoveredCar?.exploreButton}
                                                </div>
                                            </div>
                                            <div key={`actions-${hoveredCar?.id}`} className="flex flex-col gap-6 mt-22">
                                                {hoveredCar?.text1 && (
                                                    <div className="flex items-center hover:text-gray-600 cursor-pointer gap-3 group"
                                                        style={{ animation: "fadeFromTop 0.5s ease 0.4s forwards", opacity: 0 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="clamp(18px, 2vw, 20px)" height="clamp(18px, 2vw, 20px)" fill="none" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                                            <path stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14"></path>
                                                        </svg>
                                                        <span className="text-[clamp(12px,1.5vw,14px)] font-medium">CREATE YOUR OWN</span>
                                                    </div>
                                                )}
                                                {hoveredCar?.text2 && (
                                                    <div className="flex items-center hover:text-gray-600 cursor-pointer gap-3 group"
                                                        style={{ animation: "fadeFromTop 0.5s ease 0.5s forwards", opacity: 0 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="clamp(18px, 2vw, 20px)" height="clamp(18px, 2vw, 20px)" fill="none" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                                            <path stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.016 6 10 6.016M13 3H8L2 9l5 5 6-6z"></path>
                                                        </svg>
                                                        <span className="text-[clamp(12px,1.5vw,14px)] font-medium">ENQUIRE TO BUY</span>
                                                    </div>
                                                )}
                                                {hoveredCar?.text3 && (
                                                    <div className="flex items-center hover:text-gray-600 cursor-pointer gap-3 group"
                                                        style={{ animation: "fadeFromTop 0.5s ease 0.6s forwards", opacity: 0 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="clamp(18px, 2vw, 20px)" height="clamp(18px, 2vw, 20px)" fill="none" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                                            <path stroke="currentcolor" strokeWidth="1.5" d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0 0V9M2.341 6c1.573 1.032 3.126 1.638 4.676 1.818M13.659 6c-1.573 1.032-3.126 1.638-4.676 1.818M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path>
                                                        </svg>
                                                        <span className="text-[clamp(12px,1.5vw,14px)] font-medium">REQUEST A TEST DRIVE</span>
                                                    </div>
                                                )}
                                                {hoveredCar?.text4 && (
                                                    <div className="flex items-center hover:text-gray-600 cursor-pointer gap-3 group"
                                                        style={{ animation: "fadeFromTop 0.5s ease 0.7s forwards", opacity: 0 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="clamp(18px, 2vw, 20px)" height="clamp(18px, 2vw, 20px)" fill="none" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                                            <path stroke="currentcolor" strokeLinejoin="round" strokeWidth="1.5" d="M8 3.91 3 3v9.09L8 13m0-9.09L13 3v9.09L8 13m0-9.09V13"></path>
                                                        </svg>
                                                        <span className="text-[clamp(12px,1.5vw,14px)] font-medium">DOWNLOAD BROCHURE</span>
                                                    </div>
                                                )}
                                                {hoveredCar?.text5 && (
                                                    <div className="flex items-center hover:text-gray-600 cursor-pointer gap-3 group"
                                                        style={{ animation: "fadeFromTop 0.5s ease 0.8s forwards", opacity: 0 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="clamp(18px, 2vw, 20px)" height="clamp(18px, 2vw, 20px)" fill="none" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                                            <path stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z"></path>
                                                        </svg>
                                                        <span className="text-[clamp(12px,1.5vw,14px)] font-medium">ACCESSORIES</span>
                                                    </div>
                                                )}
                                                {hoveredCar?.textAdd1 && (
                                                    <div className="flex items-center hover:text-gray-600 cursor-pointer gap-3 group"
                                                        style={{ animation: "fadeFromTop 0.5s ease 0.9s forwards", opacity: 0 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="clamp(18px, 2vw, 20px)" height="clamp(18px, 2vw, 20px)" fill="none" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                                            <path stroke="currentcolor" strokeLinecap="round" strokeWidth="1.5" d="m10 10 3 3m-2-6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path>
                                                        </svg>
                                                        <span className="text-[clamp(12px,1.5vw,14px)] font-medium">SEARCH PRE-OWNED</span>
                                                    </div>
                                                )}
                                                {hoveredCar?.textAdd2 && (
                                                    <div className="flex items-center hover:text-gray-600 cursor-pointer gap-3 group"
                                                        style={{ animation: "fadeFromTop 0.5s ease 1s forwards", opacity: 0 }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="clamp(18px, 2vw, 20px)" height="clamp(18px, 2vw, 20px)" fill="currentcolor" viewBox="0 0 16 16" className="group-hover:scale-110 transition-transform">
                                                            <path fill="currentcolor" fillRule="evenodd" d="M8 10c1.587 0 3.051-.377 4.226-1.014-.478 1.118-1.226 2.078-2.006 2.859A13.4 13.4 0 0 1 8 13.625a13.383 13.383 0 0 1-2.22-1.78c-.78-.78-1.528-1.741-2.006-2.858C4.95 9.622 6.413 10 8 10M1.75 6.5q0 .417.044.815c.26 2.398 1.63 4.294 2.926 5.59a15 15 0 0 0 2.653 2.097 9 9 0 0 0 .245.144l.015.008.005.003h.002v.001L8 14.5l-.36.658a.75.75 0 0 0 .72 0L8 14.5l.36.658.002-.001.005-.003.015-.008A5 5 0 0 0 8.627 15a14.873 14.873 0 0 0 2.653-2.096c1.296-1.296 2.666-3.192 2.926-5.59l.005-.048a8 8 0 0 0 .039-.767C14.25 3.086 11.414.25 8 .25S1.75 3.086 1.75 6.5m9.062-1.137.008.005v.002c.383.227 1.19.758 1.18 1.584-.017 1.375-1.753 2.087-3.967 2.044a7.03 7.03 0 0 1-3.574-.918l-.05-.034c-.151-.103-.411-.28-.409-.343.002-.069.054-.113.112-.161q.025-.02.048-.042.119-.11.21-.192.063-.057.113-.104l.01-3.284s-.214-.201-.341-.308a.34.34 0 0 1-.15-.193c-.01-.094.273-.31.396-.405l.008-.006c.76-.59 2.102-.97 3.462-1.005 2.706-.068 3.877.92 3.92 1.819.036.8-.521 1.115-.91 1.336l-.03.017c-.083.047-.114.079-.111.103.004.045.047.07.075.085m-1.103-1.55C9.74 2.51 8.565 2.454 7.983 2.458c-.648.005-1.633.204-1.582 1.379.047 1.066.708 1.34 1.677 1.359.92.017 1.605-.302 1.63-1.383M6.356 7.07c.055 1.16.76 1.457 1.803 1.478.991.02 1.726-.328 1.754-1.503.036-1.416-1.229-1.477-1.856-1.473-.696.006-1.758.274-1.7 1.498" clipRule="evenodd"></path>
                                                        </svg>
                                                        <span className="text-[clamp(12px,1.5vw,14px)] font-medium">LOCATE DEALER</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* RIGHT column */}
                                        <div
                                            key={`collage-${hoveredCar?.id}`}
                                            className="relative"
                                            style={{ height: "clamp(520px, 35vw, 880px)", width: "100%" }}
                                        >
                                            <img
                                                key={`img3-${hoveredCar?.id}`}
                                                className="absolute object-contain"
                                                style={{
                                                    top: "11%", right: "2%",
                                                    width: "clamp(160px, 14vw, 220px)",
                                                    height: "clamp(160px, 14vw, 220px)",
                                                    zIndex: 1,
                                                    animation: "slideFromRight 0.7s ease 0.2s forwards",
                                                    opacity: 0, willChange: "transform, opacity"
                                                }}
                                                src={`http://localhost:1337${hoveredCar?.image3?.formats?.large?.url}`}
                                                alt=""
                                            />
                                            <img
                                                key={`img2-${hoveredCar?.id}`}
                                                className="absolute bg-center bg-cover bg-top"
                                                style={{
                                                    top: "16%", right: "6%",
                                                    width: "clamp(760px, 56vw, 1000px)",
                                                    height: "clamp(450px, 16vw, 540px)",
                                                    zIndex: 2,
                                                    animation: "slideFromRight 0.7s ease 0.35s forwards",
                                                    opacity: 0, willChange: "transform, opacity"
                                                }}
                                                src={`http://localhost:1337${hoveredCar?.image2?.formats?.large?.url}`}
                                                alt=""
                                            />
                                            <img
                                                key={`img1-${hoveredCar?.id}`}
                                                className="absolute object-cover"
                                                style={{
                                                    top: "52%", left: "-17%",
                                                    width: "clamp(400px, 130vw, 1000px)",
                                                    height: "clamp(350px, 22vw, 520px)",
                                                    zIndex: 443,
                                                    animation: "slideFromLeft 0.7s ease 0.1s forwards",
                                                    opacity: 0, willChange: "transform, opacity"
                                                }}
                                                src={`http://localhost:1337${hoveredCar?.image1?.formats?.large?.url}`}
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* CULTURE SECTION */}
                {activeSection === "culture" && (
                    <div className="w-full h-full overflow-y-auto custom-scrollbar-content" style={montserrat}>
                        <div className="px-12 pt-8 relative">
                            <div className={`mt-4 transition-all duration-800 delay-300 ease-out ${
                                cultureAnimate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                            }`}>
                                <h1 className="text-[2rem] font-sans font-helvetica font-serif">Culture</h1>
                            </div>
                            
                            <div className="flex justify-between mt-3 pr-4">
                                <div className={`flex flex-col mt-16 w-72 transition-all duration-800 delay-500 ease-out ${
                                    cultureAnimate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
                                }`}>
                                    <div className="cursor-pointer group">
                                        <span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">LATEST ARTICLES</span>
                                    </div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group">
                                        <span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">EVENTS</span>
                                    </div>
                                </div>
                                
                                <div className={`w-[1039.79px] h-full relative transition-all duration-800 delay-700 ease-out ${
                                    cultureAnimate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                                }`}>
                                    <img src="./images/CulturePopPicture.jpg" alt="Culture" className="w-full h-auto object-cover" />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 80%, transparent 100%)" }} />
                                    <div className={`absolute inset-0 flex flex-col items-center justify-end pb-14 text-center text-white z-10 transition-all duration-800 delay-900 ease-out ${
                                        cultureAnimate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
                                    }`}>
                                        <h1 className="text-[32px] font-light tracking-[0.05em] mb-4">Culture</h1>
                                        <p className="text-[14px] font-light leading-[1.8] mb-8" style={{ maxWidth: "920px", color: "rgba(255,255,255,0.88)" }}>
                                            Explore the extraordinary world of Bentley through immersive experiences that celebrate our heritage,
                                            innovation, and design leadership. From interactive timelines and iconic past models to exclusive
                                            collaborations in fashion, design, gaming, and motorsport—every facet of the Bentley brand tells a
                                            story of performance, luxury, and craftsmanship.
                                        </p>
                                        <button className="border border-white text-white uppercase hover:bg-gray-600/40 transition-colors duration-300" style={{ fontSize: "11px", letterSpacing: "0.2em", padding: "12px 20px", fontFamily: "'Montserrat', Arial, sans-serif" }}>EXPLORE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* LIFESTYLE SECTION */}
                {activeSection === "lifestyle" && (
                    <div className="w-full h-full overflow-y-auto custom-scrollbar-content" style={montserrat}>
                        <div className="px-12 pt-8 relative">
                            <div className={`mt-4 transition-all duration-800 delay-300 ease-out ${
                                lifestyleAnimate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                            }`}>
                                <h1 className="text-[2rem] font-sans font-helvetica font-serif">Bentley LifeStyle</h1>
                            </div>
                            
                            <div className="flex justify-between mt-3 pr-4">
                                <div className={`flex flex-col mt-16 w-72 transition-all duration-800 delay-500 ease-out ${
                                    lifestyleAnimate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
                                }`}>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">ARCHITECTURE AND DESIGN</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">MUSIC AND AUDIO</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">AUTOMOTIVE</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">BENTLEY COLLECTION</span></div>
                                </div>
                                
                                <div className={`w-[1039.79px] h-full relative transition-all duration-800 delay-700 ease-out ${
                                    lifestyleAnimate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                                }`}>
                                    <img src="./images/LifeStylePopup.jpg" alt="Lifestyle" className="w-full h-auto object-cover" />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 20%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 80%, transparent 100%)" }} />
                                    <div className={`absolute inset-0 flex flex-col items-center justify-end pb-14 text-center text-white z-10 transition-all duration-800 delay-900 ease-out ${
                                        lifestyleAnimate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
                                    }`}>
                                        <h1 className="text-[32px] font-light tracking-[0.05em] mb-4">Bentley LifeStyle</h1>
                                        <p className="text-[14px] font-light leading-[1.8] mb-8" style={{ maxWidth: "920px", color: "rgba(255,255,255,0.88)" }}>
                                            Join us in sculpting a life where each moment is a masterpiece, and the pursuit of perfection knows no bounds.
                                        </p>
                                        <button className="border border-white text-white uppercase hover:bg-gray-600/40 transition-colors duration-300" style={{ fontSize: "11px", letterSpacing: "0.2em", padding: "12px 20px", fontFamily: "'Montserrat', Arial, sans-serif" }}>EXPLORE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* YOUR BENTLEY SECTION */}
                {activeSection === "yourBentley" && (
                    <div className="w-full h-full overflow-y-auto custom-scrollbar-content" style={montserrat}>
                        <div className="px-12 pt-8 relative">
                            <div className={`mt-4 transition-all duration-800 delay-300 ease-out ${
                                yourBentleyAnimate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                            }`}>
                                <h1 className="text-[2rem] font-sans font-helvetica font-serif">Your Bentley</h1>
                            </div>
                            
                            <div className="flex justify-between mt-3 pr-4">
                                <div className={`flex flex-col mt-16 w-72 transition-all duration-800 delay-500 ease-out ${
                                    yourBentleyAnimate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
                                }`}>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">SERVICE AND MAINTENANCE</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">ACCESSORIES</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">OWNERSHIP SUPPORT</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">TECHNOLOGY</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">FINANCIAL SERVICES</span></div>
                                </div>
                                
                                <div className={`w-[1039.79px] h-full relative transition-all duration-800 delay-700 ease-out ${
                                    yourBentleyAnimate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                                }`}>
                                    <img src="./images/YourBentleyPopup.jpg" alt="Your Bentley" className="w-full h-auto object-cover" />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.75) 20%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.1) 100%)" }} />
                                    <div className={`absolute inset-0 flex flex-col items-center justify-end pb-14 text-center text-white z-10 transition-all duration-800 delay-900 ease-out ${
                                        yourBentleyAnimate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
                                    }`}>
                                        <h1 className="text-[32px] font-light tracking-[0.05em] mb-4">Your Bentley</h1>
                                        <p className="text-[14px] font-light leading-[1.8] mb-8" style={{ maxWidth: "920px", color: "rgba(255,255,255,0.88)" }}>
                                            With a focus on automotive excellence and customer satisfaction, Bentley provides a wide range of services designed to enhance the ownership journey.
                                        </p>
                                        <button className="border border-white text-white uppercase hover:bg-gray-600/40 transition-colors duration-300" style={{ fontSize: "11px", letterSpacing: "0.2em", padding: "12px 20px", fontFamily: "'Montserrat', Arial, sans-serif" }}>EXPLORE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ABOUT BENTLEY SECTION */}
                {activeSection === "aboutBentley" && (
                    <div className="w-full h-full overflow-y-auto custom-scrollbar-content" style={montserrat}>
                        <div className="px-12 pt-8 relative">
                            <div className={`mt-4 transition-all duration-800 delay-300 ease-out ${
                                aboutBentleyAnimate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
                            }`}>
                                <h1 className="text-[2rem] font-sans font-helvetica font-serif">About Bentley</h1>
                            </div>
                            
                            <div className="flex justify-between mt-3 pr-4">
                                <div className={`flex flex-col mt-16 w-72 transition-all duration-800 delay-500 ease-out ${
                                    aboutBentleyAnimate ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-16"
                                }`}>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">VISION</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">HISTORY AND HERITAGE</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">PEOPLE AND EXPERTISE</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">FACTORY TOURS</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">NEWS</span></div>
                                    <div className="my-6"><div className="h-px bg-gray-300" style={{ width: "calc(9% + 280px)" }}></div></div>
                                    <div className="cursor-pointer group"><span className="text-xs font-semibold text-black hover:text-gray-500 transition-colors tracking-wide">CAREERS</span></div>
                                </div>
                                
                                <div className={`w-[1039.79px] h-full relative transition-all duration-800 delay-700 ease-out ${
                                    aboutBentleyAnimate ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                                }`}>
                                    <img src="./images/AboutBentleyPopup.jpg" alt="About Bentley" className="w-full h-auto object-cover" />
                                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.75) 22%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0.1) 100%)" }} />
                                    <div className={`absolute inset-0 flex flex-col items-center justify-end pb-14 text-center text-white z-10 transition-all duration-800 delay-900 ease-out ${
                                        aboutBentleyAnimate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
                                    }`}>
                                        <h1 className="text-[32px] font-light tracking-[0.05em] mb-4">About Bentley</h1>
                                        <p className="text-[14px] font-light leading-[1.8] mb-8" style={{ maxWidth: "920px", color: "rgba(255,255,255,0.88)" }}>
                                            Bentley Motors is the world's leading manufacturer of luxury cars. Based in the UK at Pyms Lane, Crewe, Cheshire since 1938, the luxury marque employs more than 4,000 colleagues who design, engineer, handcraft and market bespoke automobiles.
                                        </p>
                                        <button className="border border-white text-white uppercase hover:bg-gray-600/40 transition-colors duration-300" style={{ fontSize: "11px", letterSpacing: "0.2em", padding: "12px 20px", fontFamily: "'Montserrat', Arial, sans-serif" }}>EXPLORE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}