import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector(state => ({ ...state }))
    const handleImage = e => {
        //resize
        let files = e.target.files
        let allUploadedFiles = values.images
        if (files) {
            setLoading(true)
            for (let file of files) {
                Resizer.imageFileResizer(
                    file, 720, 720, 'JPEG', 100, 0, uri => {
                        //send to server
                        axios.post(
                            `${process.env.REACT_APP_API}/upload-images`, { image: uri }, {
                            headers: {
                                authToken: user ? user.token : ''
                            }
                        })
                            .then(({ data }) => {
                                setLoading(false)
                                allUploadedFiles.push(data)
                                setValues({ ...values, images: allUploadedFiles })
                            })
                            .catch(err => {
                                setLoading(false)
                                console.log(err)
                            })

                    }, "base64")
            }
        }
        //set url to images[] in productCreate
    }
    const removeImage = id => {
        setLoading(true)
        axios.post(`${process.env.REACT_APP_API}/remove-image`,
            { public_id: id }, {
            headers: {
                authToken: user ? user.token : ''
            }
        }
        )
            .then(() => {
                setLoading(false)
                let filtered = values.images.filter(img => img.public_id !== id)
                setValues({ ...values, images: filtered })
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
            })
    }
    return (
        <>
            <div className="row">
                {values.images && values.images.map(image => (
                    <Badge count="X"
                        style={{ cursor: 'pointer' }}
                        key={image.public_id}
                        onClick={() => removeImage(image.public_id)}
                    >
                        <Avatar className="ml-3"
                            src={image.url}
                            size={100}
                            shape="square"
                        />
                    </Badge>
                ))}
            </div>
            <div className="row">
                <label className="btn btn-primary">Choose File
                    <input type="file"
                        multiple
                        hidden
                        accept="images/*"
                        onChange={handleImage}
                    />
                </label>
            </div>
        </>
    )
}

export default FileUpload
