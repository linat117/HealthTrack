import React from "react";

const Footer = () => {
  return (
    <footer className="text-center py-4" style={{ backgroundColor: "#F5F5F5" }}>
      <div className="container">
        <p className="mb-0 text-black">
          &copy; {new Date().getFullYear()} TenaLink. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
