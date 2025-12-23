const Footer = () => {
  return (
    <footer className='w-full border-t border-gray-200 bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500'>
        <span>© {new Date().getFullYear()} PNV Team</span>

        <div className='mt-2 sm:mt-0 flex gap-4'>
          <a href='/' className='hover:text-gray-900'>
            Privacy
          </a>
          <a href='/' className='hover:text-gray-900'>
            Terms
          </a>
          <a href='/' className='hover:text-gray-900'>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
