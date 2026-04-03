import {useState, useEffect} from "react";
import axios from "axios";
import "../css/Models.css";

export default function MediumScreenModels({ openMediumModels }) {
    const [menuModels, setMenuModels] = useState([]);
    const [visibleCount, setVisibleCount] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [lastHoveredIndex, setLastHoveredIndex] = useState(null);
    const [aboutModels, setAboutModels] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataReady, setDataReady] = useState(false);

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

    // Set data ready when both menuModels and aboutModels are loaded
    useEffect(() => {
        if (menuModels.length > 0 && aboutModels.length > 0) {
            setDataReady(true);
            // Set initial hovered index to 0 when data loads
            if (hoveredIndex === null && lastHoveredIndex === null && menuModels.length > 0) {
                setLastHoveredIndex(0);
            }
        }
    }, [menuModels, aboutModels]);

    useEffect(() => {
        if (openMediumModels && menuModels.length > 0) {
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
    }, [openMediumModels, menuModels]);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
        setLastHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    // Show loading state while data is being fetched
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
            <div className="w-full flex items-center justify-between pl-8 pr-11 mt-3 h-[60px] bg-white">

                {/* Left: MODELS + MENU */}
                <div className="flex items-center gap-5">
                    <span className="text-[11px] tracking-[0.18em] text-[#4a7c6f] font-medium cursor-pointer uppercase">
                        MODELS
                    </span>
                    <div className="group flex items-center gap-1.5 ml-5 cursor-pointer">
                        <span className="text-[14px] text-black  group-hover:text-gray-300">≡</span>
                        <span className="text-[11px] tracking-[0.18em] text-black group-hover:text-gray-300 font-medium uppercase">MENU</span>
                    </div>
                </div>

                {/* Center: Bentley logo */}
                <div className="flex flex-col items-center absolute left-1/2 pr-3 -translate-x-1/2">
                    <img src="/images/bentleyFooter.png" alt="Bentley" className="w-[110px] h-auto" />
                </div>

                {/* Right: REQUEST TEST DRIVE */}
                <div className="border border-black px-8 py-2 cursor-pointer hover:bg-gray-300 hover:text-white transition-colors duration-200">
                    <span className="text-[11.5px] tracking-[0.15em] font-medium uppercase">REQUEST TEST DRIVE</span>
                </div>
            </div>

            {/* ── REST OF COMPONENT ── */}
            <div className="absolute top-58 mr-5 left-0 right-0 h-[2px] z-10 transition-all duration-300 pointer-events-none" />
            <div className="relative flex">

                {/* ── Left: Car list ── */}
                <div
                    className="flex flex-col pl-8 pr-4 mt-15 max-h-[580px] overflow-y-auto overflow-x-hidden custom-scrollbar"
                    style={{
                        scrollbarWidth: "thick",
                        scrollbarColor: "#888 #f1f1f1",
                        width: "clamp(265px, 22vw, 320px)",
                        marginRight: "clamp(140px, 12vw, 300px)",
                        overflowX: "hidden"
                    }}>
                    <div className="pr-1">
                        {menuModels.map((menuModel, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                className="group flex flex-row w-[224px] h-[54px] items-center py-8 gap-4 cursor-pointer bg-cover bg-center bg-no-repeat"
                                style={{
                                    opacity: index < visibleCount ? 1 : 0,
                                    transform: index < visibleCount ? "translateX(0)" : "translateX(-30px)",
                                    transition: "opacity 600ms ease, transform 600ms ease",
                                    backgroundImage: hoveredIndex === index || (hoveredIndex === null && lastHoveredIndex === index)
                                        ? "url('/images/gradient_modified.jpg')"
                                        : "none",
                                    backgroundColor: "#ffffff"
                                }}
                            >
                                <img
                                    className="w-[80px] h-[40px] shrink-0 object-cover transition-transform duration-500 group-hover:translate-x-[-3px]"
                                    src={`http://localhost:1337${menuModel.image?.formats.thumbnail.url}`}
                                    alt={menuModel.title}
                                />
                                <div className="flex flex-col gap-1 items-start">
                                    <div className="text-[13px] w-[100px] max-w-full font-[440] text-black">{menuModel.title}</div>
                                    <div className="text-[9px] font-medium text-black">{menuModel.gasoline}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Right: Car detail panel - only renders when data is ready ── */}
                {dataReady && hoveredCar && (
                    <div
                        className="absolute top-12 w-[calc(100%-285px)] pb-23 custom-medium overflow-y-scroll"
                        style={{ left: "clamp(280px, 34vw, 280px)", maxHeight: "100%" }}>

                        {/* Title */}
                        <div
                            key={`title-${hoveredCar?.id}`}
                            className="text-[25px]"
                            style={{ animation: "fadeFromTop 0.6s ease 0s forwards", opacity: 0, willChange: "transform, opacity" }}
                        >
                            {hoveredCar?.titleAbout}
                        </div>

                        {/* Description + Explore Button */}
                        <div
                            key={`desc-${hoveredCar?.id}`}
                            className="flex mr-5 gap-3 mt-3"
                            style={{ animation: "fadeFromTop 0.6s ease 0.15s forwards", opacity: 0, willChange: "transform, opacity" }}
                        >
                            <div className="text-[11.5px] text-black flex-1">{hoveredCar?.descriptionAbout}</div>
                            <div className="text-[13px] hover:bg-gray-300 hover:cursor-pointer font-sans text-gray-600 font-arial font-helvetica font-[450] mr-5 py-[12px] px-[18px] border flex items-center justify-center border-1 w-[107.65px] h-[41.6px] shrink-0">
                                {hoveredCar?.exploreButton}
                            </div>
                        </div>

                        {/* ── Image collage ── */}
                        <div
                            key={`collage-${hoveredCar?.id}`}
                            className="relative w-full mt-4"
                            style={{ paddingBottom: "79%" }}
                        >
                            <img
                                key={`img3-${hoveredCar?.id}`}
                                className="absolute object-contain"
                                style={{
                                    top: "7%", left: "15.5%",
                                    width: "24.4%", height: "32.2%",
                                    zIndex: 1,
                                    animation: "slideFromRight 0.7s ease 0.2s forwards",
                                    opacity: 0, willChange: "transform, opacity"
                                }}
                                src={`http://localhost:1337${hoveredCar?.image3?.formats?.large?.url}`}
                                alt=""
                            />
                            <img
                                key={`img2-${hoveredCar?.id}`}
                                className="absolute object-contain"
                                style={{
                                    top: "10.5%", left: "18%",
                                    width: "74.1%", height: "65.1%",
                                    zIndex: 2,
                                    animation: "slideFromRight 0.7s ease 0.35s forwards",
                                    opacity: 0, willChange: "transform, opacity"
                                }}
                                src={`http://localhost:1337${hoveredCar?.image2?.formats?.large?.url}`}
                                alt=""
                            />
                            <img
                                key={`img1-${hoveredCar?.id}`}
                                className="absolute object-contain"
                                style={{
                                    bottom: "5.5%", left: "-7%",
                                    maxWidth: "100%", height: "65.9%",
                                    zIndex: 3,
                                    animation: "slideFromLeft 0.7s ease 0.1s forwards",
                                    opacity: 0, willChange: "transform, opacity"
                                }}
                                src={`http://localhost:1337${hoveredCar?.image1?.formats?.large?.url}`}
                                alt=""
                            />
                        </div>

                        {/* ── Action links ── */}
                        <div
                            key={`actions-${hoveredCar?.id}`}
                            className="flex gap-2 mr-12 mt-2"
                        >
                            {hoveredCar?.text1 && (
                                <div className="text-[12px] flex hover:text-gray-600 cursor-pointer items-center gap-2"
                                    style={{ animation: "fadeFromTop 0.5s ease 0.4s forwards", opacity: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14"></path></svg>
                                    CREATE YOUR OWN
                                </div>
                            )}
                            {hoveredCar?.text2 && (
                                <div className="text-[12px] flex hover:text-gray-600 cursor-pointer items-center gap-2"
                                    style={{ animation: "fadeFromTop 0.5s ease 0.5s forwards", opacity: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.016 6 10 6.016M13 3H8L2 9l5 5 6-6z"></path></svg>
                                    ENQUIRE TO BUY
                                </div>
                            )}
                            {hoveredCar?.text3 && (
                                <div className="text-[12px] flex hover:text-gray-600 cursor-pointer items-center gap-2"
                                    style={{ animation: "fadeFromTop 0.5s ease 0.6s forwards", opacity: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentcolor" strokeWidth="1.5" d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0 0V9M2.341 6c1.573 1.032 3.126 1.638 4.676 1.818M13.659 6c-1.573 1.032-3.126 1.638-4.676 1.818M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>
                                    REQUEST A TEST DRIVE
                                </div>
                            )}
                            {hoveredCar?.text4 && (
                                <div className="text-[12px] flex hover:text-gray-600 cursor-pointer items-center gap-2"
                                    style={{ animation: "fadeFromTop 0.5s ease 0.7s forwards", opacity: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentcolor" strokeLinejoin="round" strokeWidth="1.5" d="M8 3.91 3 3v9.09L8 13m0-9.09L13 3v9.09L8 13m0-9.09V13"></path></svg>
                                    DOWNLOAD BROCHURE
                                </div>
                            )}
                            {hoveredCar?.text5 && (
                                <div className="text-[12px] flex hover:text-gray-600 cursor-pointer items-center gap-2"
                                    style={{ animation: "fadeFromTop 0.5s ease 0.8s forwards", opacity: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z"></path></svg>
                                    ACCESSORIES
                                </div>
                            )}
                            {hoveredCar?.textAdd1 && (
                                <div className="text-[13px] flex hover:text-gray-600 cursor-pointer items-center gap-2"
                                    style={{ animation: "fadeFromTop 0.5s ease 0.9s forwards", opacity: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path stroke="currentcolor" strokeLinecap="round" strokeWidth="1.5" d="m10 10 3 3m-2-6a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path></svg>
                                    SEARCH PRE-OWNED
                                </div>
                            )}
                            {hoveredCar?.textAdd2 && (
                                <div className="text-[13px] flex hover:text-gray-600 cursor-pointer items-center gap-2"
                                    style={{ animation: "fadeFromTop 0.5s ease 1s forwards", opacity: 0 }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentcolor" fillRule="evenodd" d="M8 10c1.587 0 3.051-.377 4.226-1.014-.478 1.118-1.226 2.078-2.006 2.859A13.4 13.4 0 0 1 8 13.625a13.383 13.383 0 0 1-2.22-1.78c-.78-.78-1.528-1.741-2.006-2.858C4.95 9.622 6.413 10 8 10M1.75 6.5q0 .417.044.815c.26 2.398 1.63 4.294 2.926 5.59a15 15 0 0 0 2.653 2.097 9 9 0 0 0 .245.144l.015.008.005.003h.002v.001L8 14.5l-.36.658a.75.75 0 0 0 .72 0L8 14.5l.36.658.002-.001.005-.003.015-.008A5 5 0 0 0 8.627 15a14.873 14.873 0 0 0 2.653-2.096c1.296-1.296 2.666-3.192 2.926-5.59l.005-.048a8 8 0 0 0 .039-.767C14.25 3.086 11.414.25 8 .25S1.75 3.086 1.75 6.5m9.062-1.137.008.005v.002c.383.227 1.19.758 1.18 1.584-.017 1.375-1.753 2.087-3.967 2.044a7.03 7.03 0 0 1-3.574-.918l-.05-.034c-.151-.103-.411-.28-.409-.343.002-.069.054-.113.112-.161q.025-.02.048-.042.119-.11.21-.192.063-.057.113-.104l.01-3.284s-.214-.201-.341-.308a.34.34 0 0 1-.15-.193c-.01-.094.273-.31.396-.405l.008-.006c.76-.59 2.102-.97 3.462-1.005 2.706-.068 3.877.92 3.92 1.819.036.8-.521 1.115-.91 1.336l-.03.017c-.083.047-.114.079-.111.103.004.045.047.07.075.085m-1.103-1.55C9.74 2.51 8.565 2.454 7.983 2.458c-.648.005-1.633.204-1.582 1.379.047 1.066.708 1.34 1.677 1.359.92.017 1.605-.302 1.63-1.383M6.356 7.07c.055 1.16.76 1.457 1.803 1.478.991.02 1.726-.328 1.754-1.503.036-1.416-1.229-1.477-1.856-1.473-.696.006-1.758.274-1.7 1.498" clipRule="evenodd"></path></svg>
                                    LOCATE DEALER
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}