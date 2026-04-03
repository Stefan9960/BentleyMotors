export default function DesktopOverlay({ slides, currentSlide, isLargeScreen }) {
    // Guard against undefined values
    if (!slides || slides.length === 0 || currentSlide === undefined || !slides[currentSlide]) {
        return null;
    }
    
    const currentSlideData = slides[currentSlide];
    
    return (
        <div
            className={`
                hidden md:flex
                absolute bottom-0 left-0 right-0 z-20
                items-end justify-between
                px-6 pb-8
                ${isLargeScreen ? 'px-12 pb-12' : ''}
            `}
            style={{ pointerEvents: 'none' }}
        >
            <div
                className={`${isLargeScreen ? 'flex items-center gap-8' : 'text-left'} ${isLargeScreen ? 'max-w-4xl' : 'max-w-xl'}`}
                style={{ pointerEvents: 'auto' }}
            >
                <div className={`text-white font-light ${isLargeScreen ? 'text-5xl' : 'text-3xl mb-2'} ${isLargeScreen ? '' : 'mb-2'}`}>
                    {currentSlideData?.title}
                </div>
                <div className={`text-white ${isLargeScreen ? 'text-[18px]' : 'text-[14px]'}`}>
                    {currentSlideData?.description}
                </div>
            </div>

            <div className="flex flex-col gap-3 shrink-0" style={{ pointerEvents: 'auto' }}>
                <button className={`flex justify-center items-center gap-4 text-white bg-[#394D45] ${
                    isLargeScreen ? 'text-[16px] py-[14px] px-[24px]' : 'text-[14px] py-[12px] px-[22px]'
                } font-semibold hover:bg-[#4a6a5c] transition-all cursor-pointer whitespace-nowrap`}>
                    <span dangerouslySetInnerHTML={{ __html: currentSlideData?.svg1 }} />
                    {currentSlideData?.button1}
                </button>
                {currentSlideData?.button2 && (
                    <button 
                        onClick={() => {
                            // Check if this is the third slide (index 2) with "WATCH FULL SEND"
                            if (currentSlide === 2 && currentSlideData?.button2 === 'WATCH FULL SEND') {
                                window.open('https://www.youtube.com/watch?v=n2RqEakMWJ0&feature=youtu.be', '_blank');
                            }
                        }}
                        className={`flex justify-center items-center gap-4 text-white ${
                            isLargeScreen ? 'text-[16px] py-[16px] px-[24px]' : 'text-[14px] py-[14px] px-[22px]'
                        } border-2 border-white hover:bg-gray-500 transition-all cursor-pointer whitespace-nowrap`}>
                        <span dangerouslySetInnerHTML={{ __html: currentSlideData?.svg2 }} />
                        {currentSlideData?.button2}
                    </button>
                )}
            </div>
        </div>
    );
}