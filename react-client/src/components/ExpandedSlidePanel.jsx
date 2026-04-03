import { useEffect, useRef } from 'react';

const ExpandedSlidePanel = ({ slide, onClose, isVisible }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        if (isVisible && panelRef.current) {
            panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [isVisible]);

    if (!slide) return null;

    return (
        <div
            ref={panelRef}
            className={`expanded-slide-panel transition-all duration-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
            style={{
                maxHeight: isVisible ? '1000px' : '0px',
                overflow: 'hidden',
            }}
        >
            <div className="relative bg-white shadow-2xl mx-[90px] my-8">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 text-sm tracking-widest uppercase text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors"
                >
                    ✕ Close
                </button>

                <div className="flex flex-col lg:flex-row">
                    {/* Left side - Image */}
                    <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-[500px]">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-6 left-6">
                            <h3 className="text-white text-2xl lg:text-3xl font-light">{slide.title}</h3>
                        </div>
                    </div>

                    {/* Right side - Content */}
                    <div className="lg:w-1/2 bg-white p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl lg:text-3xl font-light text-gray-900 mb-6">
                                {slide.title}
                            </h2>
                            <p className="text-gray-700 text-sm lg:text-base leading-relaxed mb-8">
                                {slide.description}
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <a
                                href={slide.link || "#"}
                                className="flex items-center justify-center gap-3 bg-[#394D45] hover:bg-[#4a6a5c] text-white text-sm font-semibold py-4 px-6 transition-colors w-full sm:w-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" />
                                </svg>
                                EXPLORE {slide.title.toUpperCase()}
                            </a>
                            
                            <button className="flex items-center justify-center gap-3 bg-transparent border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-4 px-6 transition-colors w-full sm:w-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                    <path stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" d="M4.667 6.273V3h6.666v3.273M3 5.045V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5.045L8 8.727z" />
                                </svg>
                                LEARN MORE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandedSlidePanel;