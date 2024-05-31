import { getUser } from "@/db/getters";
import Link from "next/link";

export default async function FooterOne() {
  const user = await getUser();

  return (
    <footer className="py-6 border bg-white/10 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">{`© 2024 ${process.env.NEXT_PUBLIC_WEBSITE_NAME} | All rights reserved.`}</p>
        </div>
        <div className="flex items-center gap-2">
          {JSON.parse(user?.footerlinks).map((link: any) => (
            <Link href={link.href}>
              <div className={`flex gap-1 place-items-start ${link.css}`} key={link.name}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: link.icon,
                  }}></span>
                <p
                  className={`block font-semibold rounded uppercase transition-all duration-150`}
                >
                  {link.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}