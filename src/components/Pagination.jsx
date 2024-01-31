import React, { useEffect, useState } from 'react'


const Pagination = () => {

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalpages] = useState(0)

  const fetchProducts = async() =>{
    const data = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10 - 10}`)
    const json = await data.json();
    setProducts(json.products);
    setTotalpages(json.total/10);
  }

  useEffect(()=>{
    fetchProducts();
  },[page])


  return (
    <>
    {products.length>0 && <div className="w-full h-fit flex justify-center px-2 py-10 flex-wrap gap-5">
      {
        products.map((product)=> <ProductCard key={product.id} productData={product}/>)
      }
    </div>}
      <Pager page={page} setPage={setPage} totalPages={totalPages}/>
    </>
  )
}

export default Pagination



export const ProductCard = ({ productData }) => {

  return (
    <div className='flex flex-col justify-between space-y-2 items-center w-56 h-72 rounded-md p-3 cursor-pointer shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
      <img className='w-full h-[80%] rounded-md' src={productData.images[2]} alt="" />
      <span className='font-semibold text-lg'>{productData.title}</span>
    </div>
  )
}

export const Pager = ({page, setPage, totalPages }) => {

  return (
    <div className='w-fit flex flex-wrap gap-2 h-fit mx-auto px-2'>
      <button onClick={()=>setPage(page -1)} disabled={page === 1? true: false} className={`${page===1? "bg-gray-300":"bg-red-600"} font-semibold text-white py-2 px-4 rounded-md cursor-pointer`}>Previous</button>

      {Array(totalPages).fill("")?.map((pageNo,index)=> <div key={index} onClick={()=>setPage(index+1)} className={`${page === index + 1? "bg-green-700 text-white" : ""} border rounded-md py-2 px-4 w-fit cursor-pointer`}>{index+1}</div>)}

      <button onClick={()=>setPage(page +1)} disabled={page === totalPages? true: false} className={`${page === totalPages? "bg-gray-300":"bg-red-600"} font-semibold text-white py-2 px-4 rounded-md cursor-pointer`}>Next</button>
    </div>
  )
}


