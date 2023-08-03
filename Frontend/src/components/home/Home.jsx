import { useEffect } from "react";


//components
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";

import { getProducts } from "../../redux/actions/productAction";

import {styled,Box} from '@mui/material';
import { useDispatch,useSelector } from "react-redux";

const Component = styled(Box)`
    padding:10px 10px;
    background:#F2F2F2;
`

const Home = () => {

    const { products }= useSelector(state => state.getProducts)
    

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return(
        <>
            <NavBar/>
            <Component>
                <Banner/>
                <MidSlide products={products} title ="Deal of the Day" timer={true} />
                <MidSection/>
                <Slide products={products} title ="Discounts for You" timer={false} />
                <Slide products={products} title ="Suggested Items" timer={false} />
                <Slide products={products} title ="Recomended Items" timer={false} />
                <Slide products={products} title ="Trending Offers" timer={false} />
                <Slide products={products} title ="Seasons's top picks" timer={false} />
                <Slide products={products} title ="Top deals on Accessories" timer={false} />
                <Slide products={products} title ="Top Selections" timer={false} />
                
            </Component>
            
        </>
    );
}
export default Home;