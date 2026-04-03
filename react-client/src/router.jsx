import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Culture from "./pages/Culture";
import LifeStyle from "./pages/LifeStyle";

const router  = createBrowserRouter([
    {
        path:"/",
        Component:Layout,
        children:[
            {path:"/",Component:Main},
            {path:"/culture",Component:Culture},
            {path:"/lifestyle",Component:LifeStyle}]
    },]);
    export default router;

