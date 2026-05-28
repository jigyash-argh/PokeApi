import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav
      className="
      flex items-center
      
      fixed top-0 left-0 w-full
      z-50
      bg-white/10
      backdrop-blur-md
      border-b border-white/10
      shadow-2xl
      "
    >

      <div className="flex items-center gap-3 flex-1">

        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="
            w-18 h-17
            object-contain
            hover:scale-125
            transition-transform
            duration-300
            ease-in-out
            "
          />
        </Link>

        <h1
          className="
          text-3xl
          font-bold
          tracking-wide
          select-none
          "
        >
          POKEaI
        </h1>

      </div>

      <div
        className="
        flex items-center
        justify-center
        gap-8
        flex-1
        "
      >

        <Link
          to="/about"
          className="
          text-xl
          px-8 py-3
          rounded-3xl
          transition-all
          duration-300
          
          
          hover:border-2
          hover:border-cyan-700
          hover:bg-cyan-400
          hover:scale-110
          "
        >
          ABOUT
        </Link>

        <Link
          to="/arena"
          className="
          text-xl
          px-8 py-3
          rounded-3xl
          transition-all
          duration-300
          hover:border-green-700
          
          hover:border-2
          hover:scale-110
          hover:bg-green-400
          "
        >
          ARENA
        </Link>

      </div>

    </nav>
  );
};