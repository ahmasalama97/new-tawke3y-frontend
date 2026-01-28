import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const AccessRoute = (props) => {
  const navigate = useNavigate()
  const user = JSON.parse(sessionStorage.getItem("user"))
  useEffect(() => {
    if (user?.role !== props?.role) {
      navigate("/forbidden")
    }
  }, [user, navigate, props?.role])

  return <>{props?.component}</>
}

export default AccessRoute
