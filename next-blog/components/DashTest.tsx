// import Link from "next/link";
// import {
//   Bell,
//   CircleUser,
//   Home,
//   LineChart,
//   Menu,
//   Settings,
//   CircleFadingPlus,
//   Rss
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// export function Dashboard() {
//   return (
//     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//       <div className="hidden border-r bg-muted/40 md:block">
//         <div className="flex h-full max-h-screen flex-col gap-2">
//           <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//             <Link href="/" className="flex items-center gap-2 font-semibold">
//               <Rss className="h-6 w-6" />
//               <span className="">Next-Blog</span>
//             </Link>
//             <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
//               <Bell className="h-4 w-4" />
//               <span className="sr-only">Toggle notifications</span>
//             </Button>
//           </div>
//           <div className="flex-1">
//             <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//               <Link
//                 href="#"
//                 className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <Home className="h-4 w-4" />
//                 Dashboard
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
//               >
//                 <CircleFadingPlus className="h-4 w-4" />
//                 Posts
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <LineChart className="h-4 w-4" />
//                 Analytics
//               </Link>
//               <Link
//                 href="#"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <Settings className="h-4 w-4" />
//                 Settings
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="shrink-0 md:hidden"
//               >
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle navigation menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="flex flex-col">
//               <nav className="grid gap-2 text-lg font-medium">
//                 <Link
//                   href="#"
//                   className="flex items-center gap-2 text-lg font-semibold"
//                 >
//                   <Rss className="h-6 w-6" />
//                   <span className="sr-only">Acme Inc</span>
//                 </Link>
//                 <Link
//                   href="#"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <Home className="h-5 w-5" />
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="#"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <CircleFadingPlus className="h-5 w-5" />
//                   Posts
//                 </Link>
//                 <Link
//                   href="#"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <LineChart className="h-5 w-5" />
//                   Analytics
//                 </Link>
//                 <Link
//                   href="#"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <Settings className="h-5 w-5" />
//                   Settings
//                 </Link>
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <div className="w-full flex-1">
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="secondary" size="icon" className="rounded-full">
//                 <CircleUser className="h-5 w-5" />
//                 <span className="sr-only">Toggle user menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Logout</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </header>
//         <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
//             POST COMPONENT HERE
//           {/* <div className="flex items-center">
//             <h1 className="text-lg font-semibold md:text-2xl">Posts</h1>
//           </div>
//           <div
//             className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
//             x-chunk="dashboard-02-chunk-1"
//           >
//             <div className="flex flex-col items-center gap-1 text-center">
//               <h3 className="text-2xl font-bold tracking-tight">
//                 You have no products
//               </h3>
//               <p className="text-sm text-muted-foreground">
//                 You can start selling as soon as you add a product.
//               </p>
//               <Button className="mt-4">Add Product</Button>
//             </div>
//           </div> */}
//         </main>
//       </div>
//     </div>
//   );
// }
