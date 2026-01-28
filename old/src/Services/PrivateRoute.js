import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const PrivateRoute = (props) => {
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem("user"))
  useEffect(() => {
    if (!user) {
      navigate("/not-authorized")
    }
  }, [user, navigate])

  return <>{props?.component}</>
}

export default PrivateRoute
