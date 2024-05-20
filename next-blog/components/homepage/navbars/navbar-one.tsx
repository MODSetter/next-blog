"use client"
import { AlignLeft, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/next-toggle/theme-toggle";
import { useEffect, useState } from "react";

function NavbarOne() {
  const [user, setUser] = useState<string>("[]");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`)
      .then(response => response.json())
      .then(data => {
        setUser(data.navbarlinks);
      })
  }, []);

  const toggleMenu = () => {
    const menu = document.getElementById("menu");
    menu?.classList.toggle("hidden");
  };

  const closeMenu = () => {
    const menu = document.getElementById("menu");
    menu?.classList.add("hidden");
  };

  let links = [
    { id: 1, name: "Nba", href: "/" },
    { id: 2, name: "Nfl", href: "/" },
    { id: 3, name: "Nhl", href: "/" },
    { id: 4, name: "Mlb", href: "/" },
    { id: 5, name: "Soccer", href: "/" },
    { id: 6, name: "Fantasy", href: "/" },
    { id: 7, name: "Nascar", href: "/" },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-lg shadow-md">
      <div className="container mx-auto px-4 flex items-center  justify-between py-[15px] xl:px-[22px]">
        <div className="logo flex items-center gap-2 xl:ml-0 ml-[6px]">
          <div onClick={toggleMenu} className="block lg:hidden">
            <AlignLeft />
          </div>
          Next-Blog
          {/* Logo */}
          {/* <img src={logo} alt="" /> */}
        </div>
        <nav className="hidden sm:flex sm:items-center sm:space-x-4">
          <ul className="hidden lg:flex sm:items-center sm:space-x-4 gap-8">
          {JSON.parse(user).map((link: any) => (
              <li className={`flex gap-2`} key={link.name}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: link.icon,
                  }}></span>
                <a
                  href={link.href}
                  className={`block font-semibold rounded uppercase transition-all duration-150 ${link.css}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center xl:gap-4 gap-1 cursor-pointer">
          <Search />
          <ThemeToggle />
        </div>
      </div>
      {/* mobile items */}
      <div className="lg:hidden">
        <nav
          id="menu"
          className="hidden absolute top-0 left-0 w-64 h-screen z-10 bg-white/50 shadow-md py-5 border  "
        >
          <ul className="flex flex-col gap-6 mt-5 pl-3">
            {JSON.parse(user).map((link: any) => (
              <li className={`flex gap-2`} key={link.name}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: link.icon,
                  }}></span>
                <a
                  href={link.href}
                  className={`block font-semibold rounded uppercase transition-all duration-150 ${link.css}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="absolute top-0 right-0 text-black p-3"
            onClick={closeMenu}
          >
            <X />
          </button>
        </nav>
      </div>
    </header>
  );
}

export default NavbarOne;
