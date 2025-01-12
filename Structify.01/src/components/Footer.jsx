import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-2xl">🚀</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">himanshxu</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Structify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

