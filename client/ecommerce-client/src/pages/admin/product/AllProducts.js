import AdminNav from "../../../components/nav/AdminNav"
import { getProducts } from "../../../functions/productInfo"
import { useEffect, useState } from "react"
import AdminProductsCard from "../../../components/cards/AdminProducts"

const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadAllProducts()
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProducts()
            .then(({ data }) => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                {loading ? <h4>loading...</h4> 
                : <h4>all products</h4>}

                  <div className="row">
                  {products.map(product => (
                        <div className="col-md-4 pb-3" key={product._id}>
                            <AdminProductsCard
                                key={product._id}
                                product={product} />
                        </div>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts
