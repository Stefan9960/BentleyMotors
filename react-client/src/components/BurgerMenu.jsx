import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/BurgerMenu.css";

export default function BurgerMenu({ openBurger, toggleBurger }) {
    const navigate = useNavigate();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (openBurger) {
            setAnimate(true);
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            setTimeout(() => setAnimate(false), 400);
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
        };
    }, [openBurger]);

    // Auto-close burger menu on screens ≥ 1250px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1250 && openBurger) {
                toggleBurger(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check on initial load

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [openBurger, toggleBurger]);

    const handleNavigation = (item) => {
        toggleBurger(false);
        if (item === "CULTURE") navigate("/culture");
        else if (item === "BENTLEY LIFESTYLE") navigate("/lifestyle");
        else if (item === "CONFIGURATOR") console.log("Open configurator");
        else if (item === "LOCATE DEALER") console.log("Open locate dealer");
        else navigate("/");
    };

    if (!openBurger && !animate) return null;

    const mainItems = ["CULTURE", "BENTLEY LIFESTYLE", "YOUR BENTLEY", "ABOUT BENTLEY"];
    const bottomItems = [
        {
            label: "CONFIGURATOR",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h4m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h10M3 12h10m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h4M3 19h4m0 0a2 2 0 104 0m-4 0a2 2 0 114 0m0 0h10" />
                </svg>
            ),
        },
        {
            label: "LOCATE DEALER",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            ),
        },
    ];

    return (
        <div className={`burger-overlay ${openBurger ? "burger-overlay--open" : "burger-overlay--closed"}`}>

            {/* ── Single navbar (responsive via CSS) ── */}
            <div className="burger-navbar">
                <div className="burger-nav-left">
                    <span className="burger-models">MODELS</span>
                    <div className="burger-menu-label">
                        <span className="burger-menu-icon">≡</span>
                        <span className="burger-menu-text">MENU</span>
                    </div>
                </div>
                <div className="burger-logo">
                    <img src="/images/bentleyFooter.png" alt="Bentley" className="w-[110px] h-auto" />
                </div>
                <div className="burger-nav-right">
                    <span className="burger-request-text">REQUEST TEST DRIVE</span>
                </div>
            </div>

            {/* ── Close button row (mobile fallback + desktop overlay) ── */}
            {/*    CSS repositions this div absolutely over the image on ≥1024px  */}
            <div className={`burger-header ${openBurger ? "burger-item-animate" : ""}`}>
                <button
                    onClick={() => toggleBurger(false)}
                    aria-label="Close menu"
                    className="burger-close-btn"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* ── Body ── */}
            <div className="burger-menu-container">

                {/* Left — scrollable nav */}
                <nav
                    className="burger-nav-scroll"
                    style={{ paddingTop: "40px" }}
                >
                    {mainItems.map((item, index) => (
                        <button
                            key={item}
                            onClick={() => handleNavigation(item)}
                            className={`burger-nav-item ${openBurger ? "burger-item-animate" : ""}`}
                            style={{ animationDelay: openBurger ? `${0.05 + index * 0.07}s` : "0s" }}
                        >
                            {item}
                        </button>
                    ))}

                    <div
                        className={`burger-divider ${openBurger ? "burger-item-animate" : ""}`}
                        style={{ animationDelay: openBurger ? `${0.05 + mainItems.length * 0.07}s` : "0s" }}
                    />

                    {bottomItems.map((item, index) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.label)}
                            className={`burger-nav-item burger-nav-item--icon ${openBurger ? "burger-item-animate" : ""}`}
                            style={{
                                animationDelay: openBurger
                                    ? `${0.05 + (mainItems.length + 1 + index) * 0.07}s`
                                    : "0s",
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Right — culture image (desktop only, via CSS) */}
                <div className="burger-culture-image">
                    <img src="./images/CulturePopPicture.jpg" alt="Culture" />
                    <div className="burger-culture-gradient" />
                </div>

            </div>
        </div>
    );
}