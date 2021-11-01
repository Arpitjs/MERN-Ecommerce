import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AdminNav from "../../../components/nav/AdminNav"
import {
    createSub,
    getSub,
    modifySub,
    getCategories
} from '../../../functions/categoryInfo'
import CategoryForm from "../../../components/Forms/CategoryForm"
import { Link } from 'react-router-dom'
import { 
    EditOutlined, 
    DeleteOutlined
} from '@ant-design/icons' 

const SubCreate = () => {
    let { user } = useSelector(state => ({ ...state }))
    let [name, setName] = useState("")
    let [loading, setLoading] = useState(false)
    let [categories, setCategories] = useState([])
    let [category, setCategory] = useState([])
    let [keyword, setKeyword] = useState("")

    useEffect(() => {
        loadCategories()
    }, [])

        let loadCategories = () => getCategories()
        .then(({ data }) => setCategories(data))

    let handleCategory = e => {
        e.preventDefault()
        setLoading(true)
        createSub(user.token, { name, parent: category })
            .then(({ data }) => {
                setLoading(false)
                setName('')
                toast.success(`sub ${data.name} created.`)
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
            modifySub(user.token, {}, slug, 'DELETE')
            .then(() => {
                toast.warning(`sub ${name} deleted.`)
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
                        <h4>Create sub</h4>
                        <label>Parent Category</label>

                        <select name="category" 
                        className="form-control"
                        onChange={e => setCategory(e.target.value)}
                        >
                                  <option>please select</option>
                            { categories.length && categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>

                        <CategoryForm
                            name={name}
                            setName={setName}
                            handleCategory={handleCategory}
                            loading={loading}
                        />
                        <input type="search" value={keyword} onChange={e => setKeyword(e.target.value.toLowerCase())}
                        placeholder="filter" className="form-control mb-4"
                        />
{/* 
                        {sub.filter(cat => cat.name.toLowerCase().includes(keyword))
                        .map(cat => (
                            <div className="alert alert-secondary"
                                key={cat._id}>
                                {cat.name}
                                <Link to={`/admin/sub/${cat.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning"/></span>
                                </Link>
                                <span className="btn btn-sm float-right">
                                    <DeleteOutlined onClick={() => handleDelete(cat.slug, cat.name)}
                                    className="text-danger"/></span>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </>

    )
}

export default SubCreate