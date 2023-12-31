import { Card, Spinner, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import HotItem from './HotItem'
import { productListForHomePage } from 'components/Products/Recoil/atoms';
import { useRecoilValue } from 'recoil';
import { useFetchProductListForHomePage } from 'components/Products/hook/functions';

const Home: React.FC = () => {
    const productListRecoilState = useRecoilValue(productListForHomePage);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchProductList = useFetchProductListForHomePage();
    useEffect(() => {
        setIsLoading(true);
        (async () => {
            var status = await fetchProductList();
            setIsLoading(status)
        })() 
    }, [])
    return (
        <div>
            <Card className="mb-12 ml-12 mr-12 overflow-hidden">
                <img
                alt="nature"
                className="h-[28rem] w-full object-cover object-center"
                src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/enUS/Images/miami-messi-jersey-mh-lg-mw-d_tcm221-1039194.jpg"
                // src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
                />
            </Card>
            {
                isLoading ? (
                    <div className='flex justify-center items-center'>
                        <Spinner className='h-12 w-12'  />
                    </div>
                ) : (
                    <>
                        <Typography
                            variant="h4" color="blue-gray" className="mb-2 ml-6"
                        >
                            {productListRecoilState?.products && "Hot items"}
                        </Typography>
                        <div className='grid grid-cols-3 gap-4 place-items-center mb-4 home-product-list-view-tablet-l:grid-cols-2 home-product-list-view-mobile-m:grid-cols-1'>
                            {productListRecoilState?.products?.map(item => (
                                <div key={item.id}>
                                    <HotItem id={item.id} name={item.name} desc={item.description} price={item.price} image={item.imagePath} />
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Home