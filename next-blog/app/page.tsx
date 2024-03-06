import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Navbar />
    <Link href={'/testpost'} />
    </>
  );
}
