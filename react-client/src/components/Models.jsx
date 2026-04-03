import {useState, useEffect, useRef} from "react";
import axios from "axios";

export default function Models({ openModels }) {
    const [menuModels, setMenuModels] = useState([]);
    const [scrolled, setScrolled] = useState(false);
    const [visibleCount, setVisibleCount] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        axios.get("http://localhost:1337/api/menu-cars?populate=*")
            .then(res => { setMenuModels(res.data.data) });
    }, []);

    useEffect(() => {
        if (openModels) {
            setVisibleCount(0);
            const interval = setInterval(() => {
                setVisibleCount(prev => {
                    if (prev >= menuModels.length) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 40);
            return () => clearInterval(interval);
        } else {
            setVisibleCount(0);
        }
    }, [openModels, menuModels]);

    const handleScroll = () => {
        setScrolled(scrollRef.current.scrollTop > 0);
    };

    return (
        <>
            <div className={`absolute top-35 mr-5 left-0 right-0 h-[2px] z-10 transition-all duration-300 pointer-events-none
                ${scrolled ? "shadow-[0px_15px_4px_0px_rgba(0,0,0,0.4)]" : "shadow-none"}`}
            />

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex flex-col gap-4 pl-4 pr-4 mt-39 w-full h-full overflow-auto scrollbar-hide"
            >
                {menuModels.map((menuModel, index) => (
                    <div
                        key={index}
                        className="group flex flex-row relative justify-between items-center hover:cursor-pointer"
                        style={{
                            opacity: index < visibleCount ? 1 : 0,
                            transform: index < visibleCount ? "translateX(0)" : "translateX(-30px)",
                            transition: "opacity 300ms ease-out, transform 200ms ease",
                        }}>
                        <div
                            className="flex z-6 items-center w-[103px] h-[100px] bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url('images/mobileGradient.jpg')` }}>
                            <img
                                className="w-[168px] z-1 h-[84px] transition-transform duration-500 group-hover:translate-x-[-3px] absolute left-0"
                                src={`http://localhost:1337${menuModel.image?.formats.thumbnail.url}`}
                                alt={menuModel.title}
                            />
                        </div>
                        <div className="flex flex-col gap-2 items-end transition-all duration-500 group-hover:translate-x-[-2px]">
                            <div className="text-[17px] font-[510] font-sans text-black transition-all duration-300 group-hover:text-gray-700">
                                {menuModel.title}
                            </div>
                            <div className="text-[10px] font-medium text-black transition-all duration-300 group-hover:text-gray-600">
                                {menuModel.gasoline}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="pb-45 shrink-0" />
            </div>
        </>
    );
}