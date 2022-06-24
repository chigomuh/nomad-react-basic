import logo from "../img/Netflix-Brand-Logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          {/* 왼쪽 메뉴 */}
          <div className="flex items-center">
            <img className="w-24 h-14 my-1" src={logo} alt="logo" />
            <div className="flex md:hidden space-x-4 items-center">
              <div>메뉴</div>
            </div>
            <div className="hidden md:flex space-x-4 items-center">
              <Link to="/">
                <div className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  홈
                </div>
              </Link>
              <Link to="/movie/korea">
                <div className="py-5 px-3 text-gray-700 hover:text-gray-900">
                  국내 영화
                </div>
              </Link>
              <Link to="/movie/other">
                <div className="py-5 px-3 text-gray-700 hover:text-gray-900">
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
                className="text-gray-700 hover:text-gray-900 peer-checked:bg-white transition-all duration-700 rounded-l-md items-center flex pl-2"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14.53 15.59a8.25 8.25 0 111.06-1.06l5.69 5.69a.75.75 0 11-1.06 1.06l-5.69-5.69zM2.5 9.25a6.75 6.75 0 1111.74 4.547.746.746 0 00-.443.442A6.75 6.75 0 012.5 9.25z"
                  />
                </svg>
              </label>
              <input
                type="text"
                className="py-1 w-0 bg-gray-200 peer-checked:w-40 peer-checked:bg-white transition-all duration-700 rounded-r-md"
              />
            </div>
            <Link to="/login">
              <div className="py-1 px-3 text-yellow-700 hover:text-yellow-900 bg-yellow-400 hover:bg-yellow-300 rounded transition duration-300">
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
