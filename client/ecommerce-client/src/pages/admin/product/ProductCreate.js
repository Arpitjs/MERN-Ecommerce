import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AdminNav from "../../../components/nav/AdminNav"
import { createProduct } from '../../../functions/productInfo'
import { getCategories, getCategorySub } from '../../../functions/categoryInfo'
import ProductForm from "../../../components/Forms/ProductForm"

const ProductCreate = () => {
    let { user } = useSelector(state => ({ ...state }))
    let [loading, setLoading] = useState(false)
    let [subsActive, setSubsActive] = useState(false)
    let [subOptions, setSubOptions] = useState("")

    let [values, setValues] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        categories: [],
        subs: [],
        shipping: '',
        quantity: '',
        images: [],
        colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
        brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
        color: '',
        brand: ''
    })

    useEffect(() => {
        loadCategories()
    }, [])

    let loadCategories = () => getCategories()
        .then(({ data }) => setValues({...values, categories: data }))
 
    let handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        createProduct(user.token, values)
            .then(({ data }) => {
                setLoading(false)
                toast.success(`product ${data.title} created.`)
                window.location.reload()
            })
            .catch(err => {
                // console.log('ERR', err)
                let error = err.response.data.msg
                console.log(error)
                setLoading(false)
                typeof (error) === 'string' ? toast.error(error) : toast.error(error.message)
            })
    }

    let handleChange = e => {
        e.preventDefault()
        //spreading the existing object then updating the rest of the fields.
        setValues({ ...values, [e.target.name]: e.target.value }) 
    }

    let handleCategoryChange = (e) => {
        e.preventDefault()
        setValues({...values, category: e.target.value, subs: [] })
        getCategorySub(e.target.value).then(({ data }) => setSubOptions(data))
        setSubsActive(true)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Product create</h4>
                    <hr />
                    <ProductForm
                        values={values}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        setValues={setValues}
                        subsActive={subsActive}
                        subOptions={subOptions}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductCreate