import { getUser } from "@/db/getters";
import Link from "next/link";

export default async function FooterOne() {
  const user = await getUser();

  return (
    <footer className="py-6 border bg-white/10 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">© 2024 Next-Blog All rights reserved.</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          {JSON.parse(user?.footerlinks).map((link: any) => (
            <div className={`flex gap-2`} key={link.name}>
              <span
                dangerouslySetInnerHTML={{
                  __html: link.icon,
                }}></span>
              <Link
                href={link.href}
                className={`block font-semibold rounded uppercase transition-all duration-150 ${link.css}`}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}