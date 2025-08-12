import { useLocation } from "react-router-dom"
import uiImg from "../../assets/images/auth-img.png"
import { pageMeta } from "../../data/pageMeta"
import MetaManager from "../MetaManager"

const AuthLayout = ({ children }) => {
  const location = useLocation()
  const pathKey = location.pathname.replace("/", "") || "home"
  const meta = pageMeta[pathKey] || pageMeta.notfound

  return (
    <>
      <MetaManager {...meta} />
      <div className="flex">
        <div className="h-screen w-screen px-12 pt-8 pb-12 md:w-[60vw]">
          <h2 className="text-lg font-medium text-black">Opsly</h2>
          {children}
        </div>
        <div className="hidden h-screen w-[40vw] items-center justify-center overflow-hidden bg-blue-50 bg-[url('/bg-img.png')] bg-cover bg-center bg-no-repeat p-8 md:flex">
          <img src={uiImg} alt="" className="w-64 lg:w-[90%]" />
        </div>
      </div>
    </>
  )
}

export default AuthLayout
