import { Navigate, Outlet } from "react-router-dom"

export const Authorized = () => {
  if (localStorage.getItem("user_token")) {
    return <>
      {/* <NavBar /> */}
      <main className="p-4">
        <Outlet />
      </main>
    </>
  }
  return <Navigate to='/login/' replace />
}