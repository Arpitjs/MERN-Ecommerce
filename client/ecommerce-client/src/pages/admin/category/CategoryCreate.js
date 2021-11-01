import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AdminNav from "../../../components/nav/AdminNav"
import {
    createCategory,
    getCategories,
    modifyCategory
} from '../../../functions/categoryInfo'
import CategoryForm from "../../../components/Forms/CategoryForm"
import { Link } from 'react-router-dom'
import { 
    EditOutlined, 
    DeleteOutlined
} from '@ant-design/icons' 
const CategoryCreate = () => {
    let { user } = useSelector(state => ({ ...state }))
    let [name, setName] = useState("")
    let [loading, setLoading] = useState(false)
    let [categories, setCategories] = useState([])
    useEffect(() => {
        loadCategories()
    }, [])

    let loadCategories = () => getCategories()
        .then(({ data }) => setCategories(data))

    let handleCategory = e => {
        e.preventDefault()
        setLoading(true)
        createCategory(user.token, { name })
            .then(({ data }) => {
                setLoading(false)
                setName('')
                toast.success(`category ${data.name} created.`)
                loadCategories()
            })
            .catch(err => {
                let error = err.response.data.msg
                // console.log(error)
                setLoading(false)
                typeof (error) === 'string' ? toast.error(error) : toast.error(error.message)
            })
    }

    let handleDelete = async (slug, name) => {
        let areYouSure = window.confirm('are you sure?')
        if(areYouSure) {
            modifyCategory(user.token, {}, slug, 'DELETE')
            .then(() => {
                toast.warning(`category ${name} deleted.`)
                loadCategories()
            })
            .catch(err => toast.error(err.response.data.msg))
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col">
                        <h4>Create Category</h4>
                        <CategoryForm
                            name={name}
                            setName={setName}
                            handleCategory={handleCategory}
                            loading={loading}
                            categories={categories}
                        />
                        {categories.map(cat => (
                            <div className="alert alert-secondary"
                                key={cat._id}>
                                {cat.name}
                                <Link to={`/admin/category/${cat.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning"/></span>
                                </Link>
                                <span className="btn btn-sm float-right">
                                    <DeleteOutlined onClick={() => handleDelete(cat.slug, cat.name)}
                                    className="text-danger"/></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* { JSON.stringify(categories, null, 4)} */}
        </>

    )
}

export default CategoryCreate
