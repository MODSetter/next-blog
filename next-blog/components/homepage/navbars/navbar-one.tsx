import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { ThemeToggle } from "@/components/next-toggle/theme-toggle"
import { getUser } from "@/db/getters"

export default async function NavOne() {
    const user = await getUser();

    if(user){
        return (
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 bg-white/10 backdrop-blur-lg shadow-md">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <MenuIcon className="h-6 w-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <Link href="#" prefetch={false}>
                            {user?.navbarlogo ? <img src={user.navbarlogo} alt="logo" className="w-25 h-12" /> : <span className="text-red-600 font-semibold text-[30px] text-nowrap">{process.env.NEXT_PUBLIC_WEBSITE_NAME}</span>}
                        </Link>
                        <div className="grid gap-2 py-6">
                            {JSON.parse(user.navbarlinks).map((link: any) => (
                                <Link href={link.href} className="flex w-full items-center py-2 text-lg font-semibold" prefetch={false}>
                                    <span
                                        className="mr-1"
                                        dangerouslySetInnerHTML={{
                                            __html: link.icon,
                                        }}></span>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
                <Link href="/" prefetch={false} className="mx-2">
                    {user?.navbarlogo ? <img src={user.navbarlogo} alt="logo" className="w-25 h-12" /> : <span className="text-red-600 font-semibold text-[30px] text-nowrap">{process.env.NEXT_PUBLIC_WEBSITE_NAME}</span>}
                </Link>
                <div className="hidden lg:flex w-full justify-center gap-2">
                    {JSON.parse(user.navbarlinks).map((link: any) => (
                        <Link
                            href={link.href}
                            className="group inline-flex h-9 w-max items-center justify-center rounded-md backdrop-blur-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                            prefetch={false}
                        >
                            <span
                                className="mr-1"
                                dangerouslySetInnerHTML={{
                                    __html: link.icon,
                                }}></span>
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="ml-auto">
                    <ThemeToggle />
                </div>
            </header>
        )
    }
    
}
