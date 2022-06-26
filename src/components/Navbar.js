import logo from "../img/Netflix-Brand-Logo.png";
import searchIcon from "../img/searchIcon.png";
import { Link } from "react-router-dom";

function Navbar() {
  const nav = document.querySelector(".nav");

  return (
    <nav className="fixed w-full nav transition-all duration-700 z-10">
      <div className="absolute bg-black w-full h-full blur-2xl"></div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between relative">
          {/* 왼쪽 메뉴 */}
          <div className="flex items-center">
            <Link to="/">
              <img className="w-24 h-14 my-1 mr-2" src={logo} alt="logo" />
            </Link>
            <label
              className="md:hidden py-5 px-3 text-zinc-100 transition-all duration-150 hover:text-zinc-300"
              htmlFor="menuCheckbox"
            >
              메뉴
            </label>
            <input id="menuCheckbox" type="checkbox" className="peer hidden" />
            <div className="hidden peer-checked:block peer-checked:absolute peer-checked:top-16 peer-checked:left-[136px] peer-checked:border-8 peer-checked:border-transparent peer-checked:border-b-white peer-checked:border-solid peer-checked:opacity-80"></div>
            <div className="hidden md:flex space-x-4 items-center peer-checked:block peer-checked:absolute peer-checked:top-20 peer-checked:left-4 peer-checked:text-center peer-checked:w-64 peer-checked:opacity-80 peer-checked:bg-black peer-checked:border-t-2 border-white border-solid">
              <Link to="/">
                <div className="py-5 px-3 text-zinc-100 hover:bg-neutral-900 transition-all duration-150 md:hover:text-zinc-300 md:hover:bg-inherit">
                  홈
                </div>
              </Link>
              <Link to="/movie/korea">
                <div className="py-5 px-3 text-zinc-100 hover:bg-neutral-900 transition-all duration-150 md:hover:text-zinc-300 md:hover:bg-inherit">
                  국내 영화
                </div>
              </Link>
              <Link to="/movie/other">
                <div className="py-5 px-3 text-zinc-100 hover:bg-neutral-900 transition-all duration-150 md:hover:text-zinc-300 md:hover:bg-inherit">
                  해외 영화
                </div>
              </Link>
            </div>
          </div>
          {/* 오른쪽 메뉴 */}
          <div className="flex space-x-4 items-center">
            <div className="flex">
              <input
                id="searchCheckbox"
                type="checkbox"
                className="peer hidden"
              />
              <label
                htmlFor="searchCheckbox"
                className="text-zinc-300 transition-all duration-700 rounded-l-md items-center flex pl-2 peer-checked:bg-black peer-checked:border-2 peer-checked:border-r-0 border-solid border-white pr-2"
              >
                <img src={searchIcon} alt="search-icon" className="w-6 h-6" />
              </label>
              <input
                type="text"
                className="py-1 w-0 peer-checked:w-28 md:peer-checked:w-40 bg-black transition-all duration-700 rounded-r-md peer-checked:border-2 border-solid border-white text-white peer-checked:pl-2 outline-none text-sm"
                placeholder="제목,사람,장르"
              />
            </div>
            <Link to="/login">
              <div className="hidden md:block py-1 px-3 text-yellow-700 hover:text-yellow-900 bg-yellow-400 hover:bg-yellow-300 rounded transition duration-300">
                로그인
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
