import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: 'arpit7xx',
    api_key: '797233148615947',
    api_secret: 'lsXgwHBZbYvwOaZZssmrBCrKh0o'
  })
  
export const upload = async (req, res, next) => {
    // console.log('IMAGE', req.body.image)
    try {
        let result = await cloudinary.uploader.upload(req.body.image, {
            public_id: `${Date.now()}`,
            resource_type: 'auto'
        })
        res.json({
            public_id: result.public_id,
            url: result.secure_url
        })
    } catch (e) {
        next({ msg: e })
    }

}

export const remove = (req, res, next) => {
    let image_id = req.body.public_id
    try {
        cloudinary.uploader.destroy(image_id, () => res.send('OK.'))
    } catch (e) {
        next({ msg: e })
    }
}