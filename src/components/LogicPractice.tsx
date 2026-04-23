import { useEffect, useState } from 'react'
import useDebounce from '../hooks/useDebounce';
import SearchInput from './SearchInput';

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}
function LogicPractice() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 500)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);
                if (!response.ok) {
                    throw new Error ("Network Error")
                }
                const data = await response.json()
                setProducts(data);
            } catch (err) {
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    },[])

    const filterAndSortProducts = products
        .filter((p)=> p.title.toLowerCase().includes(debouncedSearch.toLocaleLowerCase()))
        .filter((p) => p.rating?.count > 100)
        .sort((a, b) => a.price - b.price)
    
    if (loading) return <p>Loading..........</p>
    
    if (error) return <p>Error: {error}</p>
  return (
      <div>
          
          <SearchInput value={search} onChange={setSearch} />
          
          {
          filterAndSortProducts.length === 0 ? (
              <p>No product found</p>
          ) : (
                  <ul>
                      {
                          filterAndSortProducts.map((product) => (
                              <li key={product.id}>
                                  <p>{product.title}</p>
                                  <p>{product.price}</p>
                                  <p>{product.rating.count}</p>
                              </li>
                          ))
                      }
                  </ul>
          )
      }</div>
  )
}

export default LogicPractice