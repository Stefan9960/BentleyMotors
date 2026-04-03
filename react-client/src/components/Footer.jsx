import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();
    const isCulturePage = location.pathname === '/culture';
    
    const [openSections, setOpenSections] = useState({});
    const toggleSection = (label) => setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));

    const NAV_SECTIONS = [
    {
        label: "MODELS",
        mdLabel: "Models",
        items: [
        { label: "BENTAYGA", mdLabel: "Bentayga" },
        { label: "FLYING SPUR", mdLabel: "Flying Spur" },
        { label: "SUPERSPORTS", mdLabel: "Supersports" },
        { label: "CONTINENTAL GT", mdLabel: "Continental GT" },
        { label: "CONTINENTAL GT CONVERTIBLE", mdLabel: "Continental GT Convertible" },
        { label: "MULLINER", mdLabel: "Mulliner" },
        { label: "PRE-OWNED", mdLabel: "Pre-Owned" },
        { label: "BENTLEY HYBRIDS", mdLabel: "Bentley Hybrids" },
        { label: "CONCEPT CARS", mdLabel: "Concept Cars" },
    ],
    },
    {
    label: "YOUR BENTLEY",
    mdLabel: "Your Bentley",
    items: [
        { label: "SERVICE AND MAINTENANCE", mdLabel: "Service and maintenance" },
        { label: "OWNERSHIP SUPPORT", mdLabel: "Ownership support" },
        { label: "TECHNOLOGY", mdLabel: "Technology" },
        { label: "FINANCIAL SERVICES", mdLabel: "Financial Services" },
        { label: "ACCESSORIES", mdLabel: "Accessories" },
        { label: "MY BENTLEY SERVICES", mdLabel: "My Bentley Services", external: true },
    ],
    },
    {
    label: "CULTURE & LIFESTYLE",
    mdLabel: "Culture & Lifestyle",
    items: [
        { label: "LATEST ARTICLES", mdLabel: "Latest Articles" },
        { label: "ARCHITECTURE AND DESIGN", mdLabel: "Architecture and Design" },
        { label: "AUTOMOTIVE", mdLabel: "Automotive" },
        { label: "AUDIO", mdLabel: "Audio" },
    ],
    },
    {
    label: "ABOUT",
    mdLabel: "About",
    items: [
        { label: "NEWS", mdLabel: "News", external: true },
        { label: "BENTLEY ENVIRONMENTAL FOUNDATION", mdLabel: "Bentley Environmental Foundation" },
        { label: "BEYOND100+", mdLabel: "Beyond100+" },
        { label: "HISTORY AND HERITAGE", mdLabel: "History and Heritage" },
        { label: "PEOPLE AND EXPERTISE", mdLabel: "People and Expertise" },
        { label: "FACTORY TOURS", mdLabel: "Factory Tours" },
    ],
    },
    {
    label: "CORPORATE",
    mdLabel: "Corporate",
    items: [
        { label: "BRAND MANIFESTO", mdLabel: "Brand Manifesto" },
        { label: "SOCIAL SUSTAINABILITY", mdLabel: "Social Sustainability" },
        { label: "ENVIRONMENTAL SUSTAINABILITY", mdLabel: "Environmental Sustainability" },
        { label: "SUSTAINABILITY REPORT", mdLabel: "Sustainability Report" },
        { label: "COMPLIANCE AND RISK", mdLabel: "Compliance and Risk" },
        { label: "COMMUNITY INVESTMENT", mdLabel: "Community Investment", external: true },
        { label: "ADVANCING LIFE CHANCES SMALL GRANTS PROGRAMME", mdLabel: "Advancing Life Chances Small Grants Programme", external: true },
        { label: "WHISTLEBLOWER SYSTEM", mdLabel: "Whistleblower System", external: true },
    ],
    },
];

const EXTERNAL_LINKS_ROW1 = [
    { label: "中文网站" },
    { label: "MODERN SLAVERY" },
    { label: "BENTLEY COLLECTION" },
];

const EXTERNAL_LINKS_ROW2 = [
    { label: "CODE OF CONDUCT" },
    { label: "TAX STRATEGY" },
    { label: "RECALLS" },
    { label: "CAREERS" },
];

const BOTTOM_LINKS_ROW1 = [
    "SITEMAP",
    "CONTACT US",
    "TERMS AND CONDITIONS",
    "PRIVACY POLICY",
    "COOKIE POLICY",
];

const BOTTOM_LINKS_ROW2 = ["COOKIE SETTINGS", "BATTERY PASSPORT", "EU DATA ACT"];

const ExternalIcon = ({ size = 10 }) => (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <rect x="0.5" y="2.5" width="9" height="9" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 2H12V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 2L6.5 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
);

const ChevronIcon = ({ open }) => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }} className="shrink-0">
        <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const InstagramIcon = ({ isCulturePage }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C9.284 2 8.944 2.012 7.877 2.06C6.813 2.108 6.086 2.278 5.45 2.525C4.792 2.78 4.234 3.123 3.678 3.678C3.123 4.234 2.78 4.792 2.525 5.45C2.277 6.086 2.108 6.813 2.06 7.877C2.012 8.944 2 9.284 2 12C2 14.716 2.012 15.056 2.06 16.123C2.108 17.187 2.278 17.914 2.525 18.55C2.78 19.208 3.123 19.766 3.678 20.322C4.234 20.877 4.792 21.22 5.45 21.475C6.086 21.722 6.813 21.892 7.877 21.94C8.944 21.988 9.284 22 12 22C14.716 22 15.056 21.988 16.123 21.94C17.187 21.892 17.914 21.722 18.55 21.475C19.208 21.22 19.766 20.877 20.322 20.322C20.877 19.766 21.22 19.208 21.475 18.55C21.722 17.914 21.892 17.187 21.94 16.123C21.988 15.056 22 14.716 22 12C22 9.284 21.988 8.944 21.94 7.877C21.892 6.813 21.722 6.086 21.475 5.45C21.22 4.792 20.877 4.234 20.322 3.678C19.766 3.123 19.208 2.78 18.55 2.525C17.914 2.278 17.187 2.108 16.123 2.06C15.056 2.012 14.716 2 12 2ZM12 3.802C14.67 3.802 14.987 3.813 16.042 3.86C17.018 3.904 17.548 4.068 17.904 4.206C18.376 4.389 18.712 4.608 19.064 4.96C19.416 5.312 19.635 5.648 19.818 6.12C19.956 6.476 20.12 7.006 20.164 7.982C20.211 9.037 20.222 9.354 20.222 12.024C20.222 14.694 20.211 15.011 20.164 16.066C20.12 17.042 19.956 17.572 19.818 17.928C19.635 18.4 19.416 18.736 19.064 19.088C18.712 19.44 18.376 19.659 17.904 19.842C17.548 19.98 17.018 20.144 16.042 20.188C14.987 20.235 14.67 20.246 12 20.246C9.33 20.246 9.013 20.235 7.958 20.188C6.982 20.144 6.452 19.98 6.096 19.842C5.624 19.659 5.288 19.44 4.936 19.088C4.584 18.736 4.365 18.4 4.182 17.928C4.044 17.572 3.88 17.042 3.836 16.066C3.789 15.011 3.778 14.694 3.778 12.024C3.778 9.354 3.789 9.037 3.836 7.982C3.88 7.006 4.044 6.476 4.182 6.12C4.365 5.648 4.584 5.312 4.936 4.96C5.288 4.608 5.624 4.389 6.096 4.206C6.452 4.068 6.982 3.904 7.958 3.86C9.013 3.813 9.33 3.802 12 3.802ZM12 6.865C9.163 6.865 6.865 9.163 6.865 12C6.865 14.837 9.163 17.135 12 17.135C14.837 17.135 17.135 14.837 17.135 12C17.135 9.163 14.837 6.865 12 6.865ZM12 15.333C10.159 15.333 8.667 13.841 8.667 12C8.667 10.159 10.159 8.667 12 8.667C13.841 8.667 15.333 10.159 15.333 12C15.333 13.841 13.841 15.333 12 15.333ZM18.538 6.661C18.538 7.323 18.001 7.86 17.339 7.86C16.677 7.86 16.14 7.323 16.14 6.661C16.14 5.999 16.677 5.462 17.339 5.462C18.001 5.462 18.538 5.999 18.538 6.661Z" fill="currentColor" />
    </svg>
);

const FacebookIcon = ({ isCulturePage }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.41c0-3.02 1.791-4.688 4.533-4.688 1.313 0 2.686.235 2.686.235v2.963H15.83c-1.491 0-1.956.93-1.956 1.884v2.28h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" fill="currentColor" />
    </svg>
);

const YoutubeIcon = ({ isCulturePage }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor" />
    </svg>
);

const WechatIcon = ({ isCulturePage }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.539c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.328.328 0 0 0 .166-.054l1.91-1.107a.865.865 0 0 1 .437-.12c.07 0 .141.014.213.028a9.78 9.78 0 0 0 2.893.435c.28 0 .556-.014.83-.04-.28-.75-.433-1.55-.433-2.38 0-3.776 3.541-6.834 7.906-6.834.28 0 .555.014.828.04C16.725 4.948 13.07 2.188 8.691 2.188zm-2.25 4.734a1.03 1.03 0 1 1 0 2.06 1.03 1.03 0 0 1 0-2.06zm4.5 0a1.03 1.03 0 1 1 0 2.06 1.03 1.03 0 0 1 0-2.06zM24 14.794c0-3.395-3.195-6.15-7.133-6.15-3.939 0-7.134 2.755-7.134 6.15 0 3.394 3.195 6.15 7.134 6.15.842 0 1.648-.13 2.395-.364a.693.693 0 0 1 .176-.024c.117 0 .23.032.33.091l1.564.906a.27.27 0 0 0 .137.044.243.243 0 0 0 .243-.243c0-.059-.023-.112-.038-.174l-.32-1.215a.485.485 0 0 1 .175-.548C23.088 18.423 24 16.694 24 14.794zm-9.5-1.031a.848.848 0 1 1 0-1.697.848.848 0 0 1 0 1.697zm4.734 0a.848.848 0 1 1 0-1.697.848.848 0 0 1 0 1.697z" fill="currentColor" />
    </svg>
);

const LinkedinIcon = ({ isCulturePage }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" />
    </svg>
);

    return (
    <footer 
        className={`w-full md:pt-15 ${isCulturePage ? 'bg-[#183319] text-white' : 'bg-[#f5f2eb] text-[#1a1a1a]'}`}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
    >

        {/* ── MOBILE layout (< 768px) ── */}
        <div className="md:hidden px-4 xs:p-5 sm:p-6">
           {/* Logo + nav links */}
            <div className="flex flex-col items-center gap-4 pt-5 pb-4">
                <img 
                    src={isCulturePage ? "/images/bentleyWhiteFooter.png" : "/images/bentleyFooter.png"} 
                    alt="Bentley Motors" 
                    className="w-11 h-auto"
                />
                    <nav className="flex flex-col items-center gap-[10px] w-full">
                        <div className="flex justify-center gap-8 flex-wrap">
                            <a className="text-[9px] font-semibold tracking-[0.16em] no-underline cursor-pointer hover:opacity-60">NEWSLETTER</a>
                            <a className="text-[9px] font-semibold tracking-[0.16em] no-underline cursor-pointer hover:opacity-60">CONFIGURATOR</a>
                        </div>
                        <div className="flex justify-center gap-8 flex-wrap">
                            <a className="text-[9px] font-semibold tracking-[0.16em] no-underline cursor-pointer hover:opacity-60">LOCATE DEALER</a>
                            <a className="text-[9px] font-semibold tracking-[0.16em] no-underline cursor-pointer hover:opacity-60">DOWNLOAD BROCHURE</a>
                        </div>
                    </nav>
            </div>

            {/* Social icons */}
            <div className="flex justify-between items-center py-3 border-b border-current">
                <a className="flex items-center cursor-pointer hover:opacity-50" aria-label="Instagram"><InstagramIcon isCulturePage={isCulturePage} /></a>
                <a className="flex items-center cursor-pointer hover:opacity-50" aria-label="Facebook"><FacebookIcon isCulturePage={isCulturePage} /></a>
                <a className="flex items-center cursor-pointer hover:opacity-50" aria-label="YouTube"><YoutubeIcon isCulturePage={isCulturePage} /></a>
                <a className="flex items-center cursor-pointer hover:opacity-50" aria-label="WeChat"><WechatIcon isCulturePage={isCulturePage} /></a>
                <a className="flex items-center cursor-pointer hover:opacity-50" aria-label="LinkedIn"><LinkedinIcon isCulturePage={isCulturePage} /></a>
            </div>

            {/* Accordion sections */}
            <div className="w-full border-b border-current border-opacity-30">
                {NAV_SECTIONS.map(({ label, items }) => (
                <div key={label} className="border-t border-current border-opacity-30">
                    <button
                        className="w-full bg-transparent border-none flex justify-between items-center py-[13px] px-4 xs:px-5 sm:px-6 cursor-pointer text-[9px] font-semibold tracking-[0.16em] text-left hover:opacity-70"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                        onClick={() => toggleSection(label)}
                        aria-expanded={!!openSections[label]}>
                        {label}
                        <ChevronIcon open={!!openSections[label]} />
                    </button>
                    {openSections[label] && (
                    <div className="pb-1 border-b border-current">
                        {items.map(({ label: itemLabel, external }) => (
                        <a key={itemLabel} className="flex items-center gap-[6px] text-[9px] font-semibold tracking-[0.14em] no-underline py-[7px] cursor-pointer hover:opacity-50">
                            {external && <ExternalIcon size={10} />}
                            {itemLabel}
                        </a>
                        ))}
                    </div>
                    )}
                </div>
                ))}
            </div>

            {/* External links */}
            <div className="flex flex-col gap-[14px] py-[18px] border-b border-current">
                <div className="flex justify-center flex-wrap gap-x-[18px] gap-y-[6px]">
                    {EXTERNAL_LINKS_ROW1.map(({ label }) => (
                    <a key={label} className="flex items-center gap-[5px] text-[8px] font-semibold tracking-[0.13em] no-underline cursor-pointer hover:opacity-50">
                        <ExternalIcon size={11} />{label}
                    </a>
                    ))}
                </div>
                <div className="flex justify-center flex-wrap gap-x-[18px] gap-y-[6px]">
                    {EXTERNAL_LINKS_ROW2.map(({ label }) => (
                        <a key={label} className="flex items-center gap-[5px] text-[8px] font-semibold tracking-[0.13em] no-underline cursor-pointer hover:opacity-50">
                            <ExternalIcon size={11} />{label}
                        </a>
                    ))}
                </div>
            </div>

                {/* Legal bottom */}
                <div className="pt-[14px]">
                    <p className="text-center text-[8px] tracking-[0.07em] mb-3">© Copyright Bentley Motors 2026</p>
                    <div className="flex flex-wrap justify-center gap-x-[10px] gap-y-[6px] mb-2">
                        {["SITEMAP","CONTACT US","TERMS AND CONDITIONS","PRIVACY POLICY","COOKIE POLICY","COOKIE SETTINGS"].map((label) => (
                        <a key={label} className="text-[7.5px] font-semibold tracking-[0.11em] no-underline cursor-pointer hover:opacity-50">{label}
                        </a>
                        ))}
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-[10px] gap-y-[6px] mb-2">
                        {["BATTERY PASSPORT","EU DATA ACT"].map((label) => (
                        <a key={label} className="text-[7.5px] font-semibold tracking-[0.11em] no-underline cursor-pointer hover:opacity-50">{label}</a>
                        ))}
                    </div>
                    <hr className="border-t border-current my-[10px]" />
                    <p className="text-center text-[7px] tracking-[0.04em] pb-5 leading-[1.7] mt-2">
                        Registered Office: Pyms Lane, Crewe, Cheshire, CW1 3PL, England. Registered in England: Number 992897
                    </p>
                </div>
        </div>

        {/* ── MD+ layout (≥ 768px) ── */}
        <div className="hidden md:block">
            {/* Container with responsive padding */}
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-12 2xl:px-12">
                
                {/* Top nav bar: links | logo | links - Adjusted grid for better proximity to logo */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center py-3 pt-4">
                    {/* Left links - reduced gap to bring closer to logo */}
                    <div className="flex justify-start gap-2 md:gap-2 lg:gap-3">
                        <a className="text-[8px] lg:text-[9px] font-semibold tracking-[0.16em] no-underline cursor-pointer hover:opacity-60 whitespace-nowrap">NEWSLETTER</a>
                        <a className="text-[8px] lg:text-[9px] font-semibold tracking-[0.16em] no-underline cursor-pointer hover:opacity-60 whitespace-nowrap">CONFIGURATOR</a>
                    </div>

                    {/* Center logo - kept same */}
                    <div className="flex justify-center">
                        <img 
                            src={isCulturePage ? "/images/bentleyWhiteFooter.png" : "/images/bentleyFooter.png"} 
                            alt="Bentley Motors" 
                            className="w-12 lg:w-14 h-auto" 
                        />
                    </div>

                    {/* Right links - reduced gap to bring closer to logo */}
                    <div className="flex justify-end gap-2 md:gap-2 lg:gap-3">
                        <a className="text-[8px] lg:text-[9px] font-semibold tracking-[0.16em] no-underline cursor-pointer hover:opacity-60 whitespace-nowrap">LOCATE DEALER</a>
                        <a className="text-[8px] lg:text-[9px] font-semibold tracking-[0.16em] no-underline cursor-pointer hover:opacity-60 whitespace-nowrap">DOWNLOAD BROCHURE</a>
                    </div>
                </div>

                {/* Social icons row */}
                <div className="flex justify-center items-center gap-6 md:gap-8 lg:gap-10 py-6 border-b border-current">
                    <a className="flex items-center cursor-pointer hover:opacity-50 transition-opacity duration-200" aria-label="Instagram">
                        <InstagramIcon isCulturePage={isCulturePage} />
                    </a>
                    <a className="flex items-center cursor-pointer hover:opacity-50 transition-opacity duration-200" aria-label="Facebook">
                        <FacebookIcon isCulturePage={isCulturePage} />
                    </a>
                    <a className="flex items-center cursor-pointer hover:opacity-50 transition-opacity duration-200" aria-label="YouTube">
                        <YoutubeIcon isCulturePage={isCulturePage} />
                    </a>
                    <a className="flex items-center cursor-pointer hover:opacity-50 transition-opacity duration-200" aria-label="WeChat">
                        <WechatIcon isCulturePage={isCulturePage} />
                    </a>
                    <a className="flex items-center cursor-pointer hover:opacity-50 transition-opacity duration-200" aria-label="LinkedIn">
                        <LinkedinIcon isCulturePage={isCulturePage} />
                    </a>
                </div>

                {/* 5-column expanded nav grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 lg:gap-10 py-8">
                    {NAV_SECTIONS.map(({ mdLabel, items }) => (
                        <div key={mdLabel}>
                            <p className="text-[9px] md:text-[10px] font-medium tracking-[0.09em] mb-3">{mdLabel}</p>
                            <div className="flex flex-col gap-2 md:gap-3">
                                {items.map(({ mdLabel: itemLabel, external }) => (
                                    <a key={itemLabel} className="flex items-start gap-[3px] text-[7px] md:text-[7.5px] lg:text-[8px] font-medium tracking-[0.01em] no-underline cursor-pointer hover:opacity-50 leading-snug">
                                        {external && <span className="mt-[1px] shrink-0"><ExternalIcon size={7} /></span>}
                                        {itemLabel}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* External links */}
                <div className="py-6 border-b border-current">
                    <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-6 lg:gap-8">
                        {EXTERNAL_LINKS_ROW1.map(({ label }) => (
                            <a key={label} className="flex items-center gap-[5px] text-[8px] md:text-[9px] font-semibold tracking-[0.12em] no-underline cursor-pointer hover:opacity-50 whitespace-nowrap transition-opacity duration-200">
                                <ExternalIcon size={9} />{label}
                            </a>
                        ))}
                        {EXTERNAL_LINKS_ROW2.map(({ label }) => (
                            <a key={label} className="flex items-center gap-[5px] text-[8px] md:text-[9px] font-semibold tracking-[0.12em] no-underline cursor-pointer hover:opacity-50 whitespace-nowrap transition-opacity duration-200">
                                <ExternalIcon size={9} />{label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Legal bottom */}
                <div className="py-6">
                    {/* Tablet layout (768px to 1023px) */}
                    <div className="md:block lg:hidden">
                        <div className="flex flex-col items-center gap-3 mb-4">
                            <p className="text-[7px] md:text-[8px] tracking-[0.07em]">
                                © Copyright Bentley Motors 2026
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                                {BOTTOM_LINKS_ROW1.map((label) => (
                                    <a key={label} className="text-[6px] md:text-[7px] font-semibold tracking-[0.1em] no-underline cursor-pointer hover:opacity-50 whitespace-nowrap transition-opacity duration-200">
                                        {label}
                                    </a>
                                ))}
                                {BOTTOM_LINKS_ROW2.map((label) => (
                                    <a key={label} className="text-[6px] md:text-[7px] font-semibold tracking-[0.1em] no-underline cursor-pointer hover:opacity-50 whitespace-nowrap transition-opacity duration-200">
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop layout (1024px and above) */}
                    <div className="hidden lg:block">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-4">
                            <p className="text-[7px] lg:text-[8px] tracking-[0.07em] order-2 md:order-1">
                                © Copyright Bentley Motors 2026
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-x-5 lg:gap-x-6 xl:gap-x-8 gap-y-2 order-1 md:order-2">
                                {BOTTOM_LINKS_ROW1.map((label) => (
                                    <a key={label} className="text-[6px] lg:text-[7px] font-semibold tracking-[0.1em] no-underline cursor-pointer hover:opacity-50 whitespace-nowrap transition-opacity duration-200">
                                        {label}
                                    </a>
                                ))}
                                {BOTTOM_LINKS_ROW2.map((label) => (
                                    <a key={label} className="text-[6px] lg:text-[7px] font-semibold tracking-[0.1em] no-underline cursor-pointer hover:opacity-50 whitespace-nowrap transition-opacity duration-200">
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <p className="text-center text-[6px] md:text-[7px] lg:text-[8px] pt-4 tracking-[0.04em] leading-[1.5] md:leading-[1.7]">
                        Registered Office: Pyms Lane, Crewe, Cheshire, CW1 3PL, England. Registered in England: Number 992897
                    </p>
                </div>
            </div>
        </div>
    </footer>
    );
}