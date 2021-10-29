import React, { useEffect, useState } from "react"
import { Route } from "react-router-dom"
import { useSelector } from "react-redux"
import LoadingToRedirect from "./LoadingToRedirect"
import { GetAdmin } from "../../functions/UserInfo"

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [ok, setOk] = useState(false)

  useEffect(() => {
    if (user && user.token) {
      GetAdmin(user.token)
        .then(() => setOk(true))
        .catch((err) => setOk(false))
    }
  }, [user])

  return ok ? <Route {...rest} /> : <LoadingToRedirect />
}

export default AdminRoute
