import { useRootLoader } from "~/utils/use-root-loader.tsx"
import { getLogo } from "./omition-logo.tsx"
import { ButtonLink } from "./ui/button.tsx"
import { Link } from "@remix-run/react"

function Navbar() {
  const { user } = useRootLoader()
  const OmitionLogo = getLogo()

  if (user) return <></>
  return (
    <div className="bg-background">
      <div className="max-w-screen-2xl mx-auto h-16 md:h-24 flex items-center use-matter">
        <nav className="flex items-center w-full px-5vw">
          <Link to="/" className="flex-1 place-content-start">
            <OmitionLogo />
          </Link>
          {/* <ul className="flex place-content-center flex-1 gap-8 text-sm font-medium">
            <li>Blog</li>
            <li>Fitur</li>
            <li>Tutorial</li>
          </ul> */}
          <div className="flex place-content-end flex-1 gap-3">
            <ButtonLink to="/login" variant="outline" className="text-lg md:text-sm">Masuk</ButtonLink>
            <ButtonLink to="/register" className="hidden md:flex">Buat akun</ButtonLink>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar