const headerSlides = [
    {
        type: "video",
        video: "/videos/hero_video1.mp4",
        poster: "/images/hero_slide1.jpg",
        title: "New Continental GT S",
        description: "Whether you're turning heads in the city or leaving it far behind, this is a grand tourer with a bold, uncompromising edge.",
        button1: "EXPLORE",
        button2: "CREATE YOUR OWN",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide2.jpg",
        title: "Continental GTC S",
        description: "The Continental GTC S offers an unforgettable experience, whether you drive it with the top up or down.",
        button1: "EXPLORE",
        button2: "CREATE YOUR OWN",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14" /></svg>'
    },
    {
        type: "video",
        video: "/videos/hero_video3.mp4",
        poster: "/images/hero_slide3.jpg",
        title: "SuperSports",
        description: "Responsive, raw and incredibly exhilarating, this is a car that looks, sounds and feels like nothing else on the road.",
        button1: "EXPLORE",
        button2: "WATCH FULL SEND",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" fill="none" viewBox="0 0 32 33"><path fill="currentColor" fillRule="evenodd" d="m11.75 23.266 9.898-6.598-9.898-6.6zm-1.5 1.402v-16a.75.75 0 0 1 1.166-.625l12 8a.75.75 0 0 1 0 1.249l-12 8a.75.75 0 0 1-1.166-.625" clipRule="evenodd" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide4.jpg",
        title: "New Bentayga Speed",
        description: "The most powerful and best sounding Bentayga ever built.",
        button1: "EXPLORE",
        button2: "CREATE YOUR OWN",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide5.jpg",
        title: "Flying Spur Azure",
        description: "The Flying Spur Azure is an extraordinary four-door luxury sedan, offering a unique combination of passenger space, comfort and comfort-enhancing technology.",
        button1: "EXPLORE",
        button2: "CREATE YOUR OWN",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.714 13V8.833M2 8.833h3.429M3.714 6.75V3M8 13V7.583M6.286 5.5H8m0 0h1.714M8 5.5V3m4.286 5.417V3m0 10v-2.5m0 0H10.57m1.715 0H14" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide6.jpg",
        title: "Accessories",
        description: "Every Bentley owner is different. That's why we offer an extensive range of Bentley car accessories, designed to enhance the way your car looks, sounds and feels. You can dial up your expression with the Carbon Fibre Styling Specification.",
        button1: "EXPLORE",
        button2: "",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide7.jpg",
        title: "Bentley Home",
        description: "Bentley design knows no limits - and with the Bentley Home range of furnishings, you can experience the brand's exquisite craftsmanship, both inside and outside your home.",
        button1: "EXPLORE",
        button2: "SHOP NOW",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 2h2.5l1.826 8.217a1 1 0 0 0 .976.783h5.85a1 1 0 0 0 .987-.836L14 5H4.5m2.167 8.333A.667.667 0 0 1 6 14m.667-.667A.667.667 0 0 1 6 12.667m.667.666H5.333M6 14a.667.667 0 0 1-.667-.667M6 14v-1.333m-.667.666c0-.368.299-.666.667-.666m6.667.666A.667.667 0 0 1 12 14m.667-.667A.667.667 0 0 1 12 12.667m.667.666H5.333M12 14a.667.667 0 0 1-.667-.667M12 14v-1.333m.667.666c0-.368.299-.666.667-.666" /></svg>'
    },
    {
        type: "img",
        src: "/images/hero_slide8.jpg",
        title: "Become Zenith",
        description: "Unfold your story",
        button1: "SHOP NOW",
        button2: "EXPLORE BENTLEY LIFESTYLE",
        svg1: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 2h2.5l1.826 8.217a1 1 0 0 0 .976.783h5.85a1 1 0 0 0 .987-.836L14 5H4.5m2.167 8.333A.667.667 0 0 1 6 14m.667-.667A.667.667 0 0 1 6 12.667m.667.666H5.333M6 14a.667.667 0 0 1-.667-.667M6 14v-1.333m-.667.666c0-.368.299-.666.667-.666m6.667.666A.667.667 0 0 1 12 14m.667-.667A.667.667 0 0 1 12 12.667m.667.666H5.333M12 14a.667.667 0 0 1-.667-.667M12 14v-1.333m.667.666c0-.368.299-.666.667-.666" /></svg>',
        svg2: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 5h-5m5 3h-5M8 11H5.5M3 2v12h10V2z" /></svg>'
    }
];

export default headerSlides;