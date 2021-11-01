import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import AdminNav from "../../../components/nav/AdminNav"
import {
    modifyCategory,
    getCategory
} from '../../../functions/categoryInfo'
import CategoryForm from "../../../components/Forms/CategoryForm"

const CategoryUpdate = ({ history, match }) => {
    let { user } = useSelector(state => ({ ...state }))
    let [name, setName] = useState("")
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        loadCategory()
    }, [])

    let loadCategory = () => {
        getCategory(match.params.slug)
        .then(({ data }) => setName(data.name))
    }

    let handleCategory = e => {
        e.preventDefault()
        setLoading(true)
        modifyCategory(user.token, { name }, match.params.slug, 'PATCH')
            .then(({ data }) => {
                setLoading(false)
                setName('')
                toast.success(`category ${data.name} edited.`)
                history.push('/admin/category')
            })
            .catch(err => {
                // console.log(err)
                let error = err.response.data.msg
                setLoading(false)
                typeof (error) === 'string' ? toast.error(error) : toast.error(error.message)
            })
    }
 
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdminNav />
                    </div>
                    <div className="col">
                        <h4>Update Category</h4>
                        <CategoryForm
                            name={name}
                            setName={setName}
                            handleCategory={handleCategory}
                            loading={loading}
                        />
                       
                    </div>
                </div>
            </div>
        </>

    )
}

export default CategoryUpdate