import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AdminNav from "../../../components/nav/AdminNav"
import { getProduct, modifyProduct } from '../../../functions/productInfo'
import { getCategories, getCategorySub } from '../../../functions/categoryInfo'
import ProductForm from "../../../components/Forms/ProductForm"
import FileUpload from "../../../components/Forms/FileUpload"
import { LoadingOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom';

const ProductUpdate = () => {
    let { user } = useSelector(state => ({ ...state }))
    let [loading, setLoading] = useState(false)
    let [subOptions, setSubOptions] = useState([])
    let [subsActive, setSubsActive] = useState(false)
    const [subsIds, setSubsIds] = useState([]);
    const { slug } = useParams();

    let [values, setValues] = useState({
        title: '',
        description: '',
        price: '',
        subs: [],
        shipping: '',
        quantity: '',
        images: [],
        colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
        brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
        color: '',
        brand: ''
    })
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
        loadProduct();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then(({ data }) => {
            setValues({...values, ...data})
        })
    }

    let loadCategories = () => getCategories()
        .then(({ data }) => setCategories(data));
 
    let handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
            modifyProduct(user.token, values, slug, "put")
            .then(({ data }) => {
                setLoading(false)
                toast.success(`product ${data.title} updated!!.`)
                window.location.reload()
            })
            .catch(err => {
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
        getCategorySub(e.target.value)
        .then(({ data }) => setSubOptions(data))
        if(values.category._id === e.target.value) {
            loadProduct();
        }
        setSubsIds([]);
        setSubsActive(true);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    { loading ? <LoadingOutlined /> : <h3>Product update</h3>}
                    <hr />
                    <div className="p-3">
                        <FileUpload
                        values={values}
                        setValues={setValues}
                        setLoading={setLoading}
                        />
                    </div>
                    <ProductForm
                        values={values}
                        handleChange={handleChange}
                        handleCategoryChange={handleCategoryChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                        setValues={setValues}
                        subOptions={subOptions}
                        edit={true}
                        categories={categories}
                        subsIds={subsIds}
                        setSubsIds={setSubsIds}
                        subsActive={subsActive}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate;