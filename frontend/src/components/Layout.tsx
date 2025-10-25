import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"

function Layout() {
  return (
    <div className="h-screen w-screen flex">
        <SideBar />
        <div className="flex-1 bg-background-dark p-8 overflow-y-auto">
            {/* Main content goes here */}
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout