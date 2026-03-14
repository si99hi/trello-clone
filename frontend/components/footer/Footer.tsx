import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#172B4D] py-16 text-white text-sm mt-auto w-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-600 pb-12 mb-8">
                <div className="flex flex-col">
                    <div className="flex items-center mb-8">
                        <div className="flex flex-col items-end mr-2">
                            <span className="text-[8px] font-bold tracking-widest text-[#B6C2CF] leading-none mb-0.5">ATLASSIAN</span>
                        </div>
                        <svg className="w-6 h-6 mr-1.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM10 16C10 16.5523 9.55228 17 9 17H7C6.44772 17 6 16.5523 6 16V6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V16ZM18 11C18 11.5523 17.5523 12 17 12H15C14.4477 12 14 11.5523 14 11V6C14 5.44772 14.4477 5 15 5H17C17.5523 5 18 5.44772 18 6V11Z" />
                        </svg>
                        <span className="text-2xl font-bold tracking-tight text-white leading-none">Trello</span>
                    </div>
                    <Link href="/signup" className="text-white hover:underline text-lg font-medium">Log In</Link>
                </div>

                <div>
                    <h4 className="font-bold text-[16px] mb-4">About Trello</h4>
                    <p className="text-[#B6C2CF]">What's behind the boards.</p>
                </div>

                <div>
                    <h4 className="font-bold text-[16px] mb-4">Jobs</h4>
                    <p className="text-[#B6C2CF]">Learn about open roles on the Trello team.</p>
                </div>

                <div>
                    <h4 className="font-bold text-[16px] mb-4">Apps</h4>
                    <p className="text-[#B6C2CF]">Download the Trello App for your Desktop or Mobile devices.</p>
                </div>
                
                <div>
                    <h4 className="font-bold text-[16px] mb-4">Contact us</h4>
                    <p className="text-[#B6C2CF]">Need anything? Get in touch and we can help.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-4">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                    <div className="flex items-center cursor-pointer hover:underline text-[#B6C2CF]">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        English
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                    <a href="#" className="hover:underline text-[#B6C2CF]">Privacy Policy</a>
                    <a href="#" className="hover:underline text-[#B6C2CF]">Terms</a>
                    <span className="text-[#B6C2CF]">Copyright © 2024 Atlassian</span>
                </div>

                <div className="flex space-x-4 text-[#B6C2CF]">
                    <a href="#" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.20 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z"/></svg></a>
                    <a href="#" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
                    <a href="#" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    <a href="#" className="hover:text-white transition-colors"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg></a>
                </div>
            </div>
        </div>
    </footer>
  );
}
