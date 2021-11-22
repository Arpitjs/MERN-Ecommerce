import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

export const upload = async (req, res, next) => {
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