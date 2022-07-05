import logo from "../img/Netflix-Brand-Logo.png";
import searchIcon from "../img/searchIcon.png";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import avatar from "../img/netflixAvatar.png";
import mobileLogo from "../img/mobileLogo.png";

function Navbar() {
  const inputRef = useRef("");
  const navigate = useNavigate();

  const onSubmitSearch = () => {
    navigate(`/search/${inputRef.current.value.replace(/(\s*)/g, "")}`);
    inputRef.current.value = "";
  };
  let logoImage = logo;
  if (window.innerWidth < 600) {
    logoImage = mobileLogo;
  }

  return (
    <nav className="fixed w-full nav transition-all duration-700 z-10">
      <div className="absolute bg-[#141414] w-full h-full blur-2xl"></div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between relative">
          {/* 왼쪽 메뉴 */}
          <div className="flex items-center">
            <Link to="/">
              <img
                className="w-8 h-8 md:w-24 md:h-14 my-1 mr-2"
                src={logoImage}
                alt="logo"
              />
            </Link>
            <label
              className="md:hidden py-5 px-3 text-zinc-100 transition-all duration-150 hover:text-zinc-300"
              htmlFor="menuCheckbox"
            >
              메뉴
            </label>
            <input id="menuCheckbox" type="checkbox" className="peer hidden" />
            <div className="hidden peer-checked:block peer-checked:absolute peer-checked:top-16 peer-checked:left-[136px] peer-checked:border-8 peer-checked:border-transparent peer-checked:border-b-white peer-checked:border-solid peer-checked:opacity-80"></div>
            <div className="hidden md:flex space-x-4 items-center peer-checked:block peer-checked:absolute peer-checked:top-20 peer-checked:left-4 peer-checked:text-center peer-checked:w-64 peer-checked:opacity-80 peer-checked:bg-[#141414] peer-checked:border-t-2 border-white border-solid">
              <Link to="/">
                <div className="py-5 px-3 text-zinc-100 hover:bg-neutral-900 transition-all duration-150 md:hover:text-zinc-300 md:hover:bg-inherit">
                  홈
                </div>
              </Link>
              <Link to="/tv">
                <div className="py-5 px-3 text-zinc-100 hover:bg-neutral-900 transition-all duration-150 md:hover:text-zinc-300 md:hover:bg-inherit">
                  TV
                </div>
              </Link>
            </div>
          </div>
          {/* 오른쪽 메뉴 */}
          <div className="flex items-center space-x-4 md:pr-4">
            <form onSubmit={onSubmitSearch} className="flex">
              <input
                id="searchCheckbox"
                type="checkbox"
                className="peer hidden"
              />
              <label
                htmlFor="searchCheckbox"
                className="text-zinc-300 transition-all duration-700 rounded-l-md items-center flex pl-2 peer-checked:bg-[#141414] peer-checked:border-2 peer-checked:border-r-0 border-solid border-white pr-2 hover:cursor-pointer"
              >
                <img src={searchIcon} alt="search-icon" className="w-6 h-6" />
              </label>
              <input
                type="text"
                ref={inputRef}
                className="py-1 w-0 peer-checked:w-24 md:peer-checked:w-40 bg-[#141414] transition-all duration-700 rounded-r-md peer-checked:border-2 border-solid border-white text-white peer-checked:pl-2 outline-none text-xs hover:cursor-text"
                placeholder="제목"
              />
            </form>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 hidden md:block hover:cursor-pointer"
              fill="white"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <img
              className="w-8 h-8 hover:cursor-pointer"
              src={avatar}
              alt="avatar"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
