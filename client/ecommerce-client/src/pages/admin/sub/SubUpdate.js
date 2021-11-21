import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AdminNav from "../../../components/nav/AdminNav"
import {
    modifySub,
    getSub,
    getCategories
} from '../../../functions/categoryInfo'
import CategoryForm from "../../../components/Forms/CategoryForm"

const SubUpdate = ({ history, match }) => {
    let { user } = useSelector(state => ({ ...state }))
    let [name, setName] = useState("")
    let [categories, setCategories] = useState([])
    let [parent, setParent] = useState({})
    let [loading, setLoading] = useState(false)

    useEffect(() => {
        loadCategories()
        loadSub()
    }, [])

    let loadCategories = () => getCategories()
    .then(({ data }) => setCategories(data))

    let loadSub = () => {
        getSub(match.params.slug)
        .then(({ data }) => {
            setName(data.name)
            setParent(data.parent)
        })
    }

    let handleCategory = e => {
        e.preventDefault()
        setLoading(true)
        modifySub(user.token, { name, parent }, match.params.slug, 'PATCH')
            .then(({ data }) => {
                setLoading(false)
                setName('')
                toast.success(`sub category ${data.name} edited.`)
                history.push('/admin/sub')
            })
            .catch(err => {
                // console.log(err)
                let error = err.response.data.msg
                setLoading(false)
                typeof (error) === 'string' ? toast.error(error) : toast.error(error.message)
            })
    }
 
    return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col">
                        <h4>Update Sub Category</h4>
                        <select name="category" 
                        className="form-control"
                        onChange={e => setParent(e.target.value)}
                        >
                                  <option>please select</option>
                            { categories.length && categories.map(cat => (
                                <option key={cat._id} 
                                value={cat._id}
                                selected={cat._id === parent}
                                >{cat.name}</option>
                            ))}
                        </select>
                        <CategoryForm
                            name={name}
                            setName={setName}
                            handleCategory={handleCategory}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
    )
}

export default SubUpdate