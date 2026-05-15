import { NavLink } from "react-router";


export default function AddButton() {
  return (
    <NavLink to="/create-post">
           <div className="fab">
  <div role="button" className="btn btn-lg btn-circle bg-[#FFCE1F] border-none shadow-none">
    <svg
      aria-label="New"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  </div>

</div>
    </NavLink>
  )
}
