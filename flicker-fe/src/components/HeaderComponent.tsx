import logo from "../assets/flicker-logo.svg";
export function HeaderComponent() {
  return (
    <div className="flex rounded w-full h-[8vh] p-2 items-center justify-center text-3xl font-title shadow-2xl">
      <img className="h-[7vh]" src={logo} alt="logo" />
    </div>
  );
}
