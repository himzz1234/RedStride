import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="w-full h-20">
      <nav className="nav">
        <Link href="/" className="flex items-center gap-1">
          <div className="nav-logo">
            <p className="text-[21px]">Red</p>
            <p className="text-[21px]">Stride</p>
          </div>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
