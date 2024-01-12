import React from "react";

export function Footer() {
  return (
    <>
      <footer className="w-full text-center relative h-20 px-4">
        <div className="absolute w-full left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <h1 className="text-xl font-semibold">Footer</h1>
          <p className="font-semibold">Bluebird Frontend Test © 2024</p>
        </div>
      </footer>
    </>
  );
}
