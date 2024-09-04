import React, { useEffect, useState } from 'react'
import { useShop } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
function Collection() {

    const { products,search,showSearch } = useShop();
    //console.log(products);
    
    const [showFilter, setShowFilter] = useState(false);
    const[filterProducts,setFilterProducts]=useState([]);
    const[category,setCategory]=useState([]);
    const[subCategory,setSubCategory]=useState([]);
    const[sortType,setSortType]=useState('relevant');

    function toggleCategory(e){

        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter(item=>item!=e.target.value))
        }else{
            setCategory(prev=>[...prev,e.target.value])
        }

    }

    function toggleSubCategory(e){
        if(subCategory.includes(e.target.value)){
            setSubCategory(prev=>prev.filter(item=>item!=e.target.value))
        }else{
            setSubCategory(prev=>[...prev,e.target.value])
        }
    }

    useEffect(function(){

        let pro=products;

        if(showSearch && search)
        {
            pro=pro.filter(product=>product.name.toLowerCase().includes(search.toLowerCase()));
            console.log(pro);
            
            
        }
        if(category.length>0)
        {
            pro=pro.filter(product=>category.includes(product.category)
            )
        }

        if(subCategory.length>0)
        {
            pro=pro.filter(product=>subCategory.includes(product.subCategory)
            )
        }

        setFilterProducts(pro);
        
    },[category,subCategory,search,showSearch])

    // useEffect(function(){
    //     if(subCategory.length>0)
    //     {
    //         const pro=products.filter(product=>subCategory.includes(product.subCategory));
    //     setFilterProducts(pro);
    //     console.log(pro);
    //     }
        
        
    // },[subCategory])


    // useEffect(function(){
    //     setFilterProducts(products);
    // },[])

    function sortProduct(){
        let fpCopy=filterProducts.slice();

        
        switch(sortType){
            case 'low-high':
                setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)));
                break;

            case 'high-low':
                setFilterProducts(fpCopy.sort((a,b)=>(b.price-a.price)));
            break;

            default:
                setFilterProducts(products);
        }

    }

    useEffect(function(){
        sortProduct();
    },[sortType])
    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap- pt-10 border-t'>

            {/* Filter Section*/}
            <div className='min-w-60'>
                <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={() => setShowFilter(!showFilter)} >FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} />
                </p>

                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700' >
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory} />
                            Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory} />
                            Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Kids'} onChange={toggleCategory}/>
                            Kids
                        </p>
                    </div>

                </div>

                {/*Type Filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>Type</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700' >
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Topwear'} onChange={toggleSubCategory} />
                            Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Bottomwear'} onChange={toggleSubCategory}/>
                            Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type='checkbox' value={'Winterwear'} onChange={toggleSubCategory} />
                            Winterwear
                        </p>
                    </div>

                </div>


            </div>

            {/*Right side*/}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'All'} text2={'Collections'} />
                    {/* Product Sort */}
                    <select className='border-e border-gray-300 text-sm px-2' onChange={(e)=>setSortType(e.target.value)}>
                        <option value="relavent" >Sort by: Relavant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                
            {/*Map Products*/}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filterProducts.map((product, index) => {
                        return <ProductItem key={index} name={product.name} id={product._id} price={product.price} image={product.image} />
                    })
                }
            </div>
            </div>


            


        </div>
    )
}

export default Collection
