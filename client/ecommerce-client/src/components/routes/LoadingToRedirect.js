import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const LoadingToRedirect = () => {
    let [count, setCount] = useState(5)
    let history = useHistory()
    useEffect(() => {
        let  interval = setInterval(() => {
            setCount(currentCount  => currentCount -1)
        }, 1000)
        //redirect once count is 0
        count === 0 && history.push('/')
        //cleanup
        return () => clearInterval(interval)
    }, [count, history])
    return (
        <div className="container p-5 text-center">
            <p>Redriecting you in {count} seconds</p>
        </div>
    )
}

export default LoadingToRedirect
