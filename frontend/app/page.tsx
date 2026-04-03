import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/footer/Footer';

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-white text-[#091E42] font-sans">
      {/* Navbar */}
      <nav className="fixed w-full bg-white z-50 shadow-[0_1px_6px_0_rgba(9,30,66,0.08)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <svg className="w-6 h-6 mr-1.5 text-[#0052CC]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM10 16C10 16.5523 9.55228 17 9 17H7C6.44772 17 6 16.5523 6 16V6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V16ZM18 11C18 11.5523 17.5523 12 17 12H15C14.4477 12 14 11.5523 14 11V6C14 5.44772 14.4477 5 15 5H17C17.5523 5 18 5.44772 18 6V11Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-[#0052CC] leading-none mb-0.5">ATLASSIAN</span>
                  <span className="text-xl font-bold tracking-tight text-[#253858] leading-none">Trello</span>
                </div>
              </div>
              <div className="hidden md:flex space-x-6">
                <div className="relative group">
                    <button className="text-[15px] font-medium hover:text-[#0052CC] flex items-center pb-5 pt-5">
                       Features <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {/* Features Dropdown linking to Tour */}
                    <div className="absolute top-14 left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
                        <Link href="/tour" className="block px-4 py-3 hover:bg-[#E9F2FF] rounded text-[#0052CC] font-medium transition-colors">Take a tour</Link>
                    </div>
                </div>
                <a href="#" className="text-[15px] font-medium hover:text-[#0052CC] flex items-center">Solutions <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></a>
                <a href="#" className="text-[15px] font-medium hover:text-[#0052CC] flex items-center">Plans <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></a>
                <a href="#" className="text-[15px] font-medium hover:text-[#0052CC]">Pricing</a>
                <a href="#" className="text-[15px] font-medium text-[#0052CC] flex items-center">Resources <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="hidden md:block text-[15px] font-medium px-4 py-2 hover:bg-gray-100 rounded transition-colors">Log in</Link>
              <Link href="/signup" className="bg-[#0D66E4] hover:bg-[#0052CC] text-white px-6 py-2.5 rounded text-[15px] font-medium transition-colors">
                Get Trello for free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner (Top Blue Bar) */}
      <div className="bg-[#E9F2FF] pt-16 w-full text-center py-4 text-[15px] text-[#172B4D]">
          Accelerate your teams' work with AI features 🤖 now available for all Premium and Enterprise! <a href="#" className="text-[#0052CC] hover:underline underline-offset-4 pointer-events-auto">Learn more.</a>
      </div>

      {/* Main Hero Section */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-0 flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-120px)] relative">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pr-12 text-center lg:text-left z-10 pt-10">
          <h1 className="text-5xl lg:text-[4.5rem] font-bold text-[#091E42] leading-[1.1] tracking-tight mb-6">
            Capture, organize, and tackle your to-dos from anywhere.
          </h1>
          <p className="text-xl text-[#091E42] mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Escape the clutter and chaos—unleash your productivity with Trello.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start max-w-lg mx-auto lg:mx-0">
             <input 
                type="email" 
                placeholder="Email" 
                className="w-full sm:w-[280px] h-12 px-4 rounded border border-[#DFE1E6] focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] outline-none text-[15px] mb-4 sm:mb-0 sm:mr-4 placeholder:text-[#5E6C84]"
             />
             <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center bg-[#0052CC] hover:bg-[#0747A6] h-12 px-8 rounded text-white text-[15px] font-bold transition-colors shadow-sm whitespace-nowrap">
               Sign up - it's free!
             </Link>
          </div>
          
          <div className="mt-6 text-sm text-[#5E6C84]">
              By entering my email, I acknowledge the <a href="#" className="text-[#0052CC] hover:underline">Atlassian Privacy Policy</a>
          </div>

          <div className="mt-10">
              <button className="flex items-center text-[#0052CC] font-bold hover:underline mb-20 lg:mb-0">
                  <span className="mr-2">Watch video</span>
                  <svg className="w-5 h-5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
              </button>
          </div>
        </div>

        {/* Right Content - Phone Mockup & Shapes */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] mt-12 lg:mt-0 right-0 flex justify-end">
             <div className="absolute right-0 bottom-0 top-auto w-full h-[120%] pointer-events-none translate-x-[20%] translate-y-[10%]">
                 <div className="absolute bg-[#FFAB00] h-[400px] w-[400px] -rotate-45 bottom-[-100px] right-[250px] z-0"></div>
                 <div className="absolute bg-[#998DD9] h-[800px] w-[800px] -rotate-45 bottom-[-300px] right-[-100px] z-0"></div>
             </div>
             <div className="relative z-10 mr-0 lg:mr-20 top-0 h-[600px] w-[350px]">
                 <img src="https://images.ctfassets.net/rz1ooxfst11e/7pSJEyS1wA51xEMiF0bO67/f6adcf08d13b4c1aa555776d755daee7/Trello-mobile-app.png" alt="Trello mobile app" className="w-[320px] h-[650px] object-cover rounded-[2.5rem] shadow-[-20px_20px_40px_rgba(0,0,0,0.15)] absolute right-0 top-10 border-[8px] border-[#202124]" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" alt="Teams" className="absolute top-[350px] -right-12 w-16 h-16 shadow-lg bg-white rounded-2xl p-2 z-20" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" alt="Slack" className="absolute top-[450px] -right-8 w-14 h-14 shadow-lg bg-white rounded-xl p-2 z-20" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="absolute top-[520px] -right-20 w-16 h-16 shadow-lg bg-white rounded-2xl p-2 z-20" />
             </div>
        </div>
      </main>

      {/* Sub Section 1 - Trello 101 */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 relative z-20 border-b border-gray-200">
          <div className="max-w-[1000px] mx-auto">
              <div className="mb-12">
                   <div className="text-[#091E42] font-bold text-[16px] tracking-widest uppercase mb-4">TRELLO 101</div>
                   <h2 className="text-[#091E42] text-4xl lg:text-[40px] font-bold tracking-tight mb-8">Your productivity powerhouse</h2>
                   <p className="text-xl text-[#091E42] max-w-3xl leading-relaxed">
                       Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds its place, keeping you at the top of your game.
                   </p>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Tabs */}
                  <div className="w-full md:w-1/3 flex flex-col space-y-4">
                      <div className="bg-white rounded-lg shadow-[0_8px_16px_-4px_rgba(9,30,66,0.25)] p-6 border-l-8 border-[#00C7E5] cursor-pointer">
                          <h3 className="text-[#091E42] text-lg font-bold mb-2">Inbox</h3>
                          <p className="text-[#091E42] leading-relaxed">When it's on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.</p>
                      </div>
                      <div className="p-6 cursor-pointer border-l-8 border-transparent hover:bg-gray-50 rounded-lg transition-colors">
                          <h3 className="text-[#091E42] text-lg font-bold mb-2">Boards</h3>
                          <p className="text-[#091E42] leading-relaxed opacity-0 hidden">Keep tabs on everything from "to-dos to tackle" to "mission accomplished!"</p>
                      </div>
                      <div className="p-6 cursor-pointer border-l-8 border-transparent hover:bg-gray-50 rounded-lg transition-colors">
                          <h3 className="text-[#091E42] text-lg font-bold mb-2">Planner</h3>
                          <p className="text-[#091E42] leading-relaxed opacity-0 hidden">Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters.</p>
                      </div>
                  </div>
                  {/* Right Image Display */}
                  <div className="w-full md:w-2/3 bg-gray-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                           <div className="bg-[#DFE1E6] h-10 flex items-center px-4 space-x-2">
                               <div className="w-3 h-3 rounded-full bg-red-400"></div>
                               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                               <div className="w-3 h-3 rounded-full bg-green-400"></div>
                           </div>
                           <div className="p-4 bg-gray-50 flex gap-4">
                                <div className="w-1/2">
                                     <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded p-3 text-white font-bold h-32 flex items-end">
                                        Inbox
                                     </div>
                                </div>
                                <div className="w-1/2">
                                    <div className="bg-blue-600 rounded p-3 text-white font-bold h-32 flex items-start flex-col">
                                        <span>Personal Task Board</span>
                                        <div className="mt-auto bg-white/20 h-2 w-16 rounded"></div>
                                    </div>
                                </div>
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Sub Section 2 - Message to Action */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/3 mb-12 lg:mb-0">
                  <div className="flex items-center text-[#091E42] font-bold text-[14px] tracking-widest uppercase mb-6">
                      <svg className="w-6 h-6 mr-3 text-[#00C7E5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      MESSAGE APP SORCERY
                  </div>
                  <h2 className="text-[#091E42] text-2xl font-medium leading-relaxed">
                      Need to follow up on a message from Slack or Microsoft Teams? Send it directly to your Trello board! Your favorite app interface lets you save messages that appear in your Trello Inbox with AI-generated summaries and links.
                  </h2>
              </div>
              <div className="w-full lg:w-[60%] bg-[#F4F5F7] rounded-3xl p-8 lg:p-12 relative overflow-hidden min-h-[400px]">
                   <div className="absolute top-8 left-8 bg-white p-4 rounded-xl shadow-md z-10 w-64 border border-gray-100">
                       <div className="flex items-start">
                           <img src="https://i.pravatar.cc/100?img=5" className="w-10 h-10 rounded-full mr-3" alt="Avatar" />
                           <div>
                               <h4 className="font-bold text-sm">Gabrielle Bossio</h4>
                               <p className="text-xs text-gray-600 mt-1">Hey 😁 Send over your Banc.ly competitive analysis draft when it's ready - I can give you some early feedback!</p>
                           </div>
                       </div>
                   </div>
                   <div className="absolute top-4 right-1/3 bg-blue-600 text-white p-3 rounded-xl shadow-lg z-20 transform rotate-12">
                       <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                   </div>
                   <div className="absolute bottom-10 left-10 flex space-x-4 z-10">
                       <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" className="w-16 h-16 bg-white rounded-2xl p-3 shadow" />
                       <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" className="w-16 h-16 bg-white rounded-2xl p-3 shadow" />
                   </div>
                   <div className="absolute bottom-[-20px] right-10 bg-[#5AAC44] rounded-t-xl w-72 h-64 z-20 p-4 shadow-xl">
                       <div className="flex items-center text-white font-bold mb-4">
                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                           Inbox
                       </div>
                       <div className="bg-white rounded p-3 text-sm font-medium shadow-sm mb-3">
                           Send Banc.ly Competitive Analysis Draft to Gabrielle
                       </div>
                       <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" className="w-full h-24 object-cover rounded opacity-80 mix-blend-multiply" />
                   </div>
                   
                   {/* Hand drawn arrow SVG */}
                   <svg className="absolute w-32 h-32 top-10 right-10 text-[#091E42] z-30 transform scale-x-[-1]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 90 Q 50 10 90 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
                      <path d="M75 90 L 90 90 L 85 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                   </svg>
              </div>
          </div>
      </section>

      {/* Blue Banner - From message to action */}
      <section className="bg-[#0052CC] py-16 px-4 text-center">
         <h2 className="text-white text-3xl lg:text-4xl font-bold tracking-tight mt-6 mb-4">From message to action</h2>
         <p className="text-white text-lg lg:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed mb-6">
             Quickly turn communication from your favorite apps into to-dos, keeping all your discussions and tasks organized in one place.
         </p>
      </section>

      {/* Do more with Trello Section */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
             <div className="mb-16">
                 <h2 className="text-[#091E42] text-3xl font-bold mb-4">Do more with Trello</h2>
                 <p className="text-[#091E42] text-xl max-w-2xl">
                     Customize the way you organize with easy integrations, automation, and mirroring of your to-dos across multiple locations.
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Card 1 */}
                 <div className="bg-[#F4F5F7] rounded-xl p-8 flex flex-col hover:shadow-lg transition-shadow">
                     <div className="mb-6 h-16">
                         <svg className="w-16 h-16 text-[#0052CC]" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
                         </svg>
                     </div>
                     <h3 className="text-2xl font-bold text-[#091E42] mb-4">Integrations</h3>
                     <p className="text-[#091E42] flex-grow mb-8">
                         Connect the apps you are already using into your Trello workflow or add a Power-Up to fine-tune your specific needs.
                     </p>
                     <button className="border border-[#0052CC] text-[#0052CC] rounded py-2 px-4 font-medium hover:bg-[#E9F2FF] self-start transition-colors">
                         Browse Integrations
                     </button>
                 </div>
                 
                 {/* Card 2 */}
                 <div className="bg-[#F4F5F7] rounded-xl p-8 flex flex-col hover:shadow-lg transition-shadow">
                     <div className="mb-6 h-16">
                         <svg className="w-16 h-16 text-[#0052CC]" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.06-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.73,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.06,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.49-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                         </svg>
                     </div>
                     <h3 className="text-2xl font-bold text-[#091E42] mb-4">Automation</h3>
                     <p className="text-[#091E42] flex-grow mb-8">
                         No-code automation is built into every Trello board. Focus on the work that matters most and let the robots do the rest.
                     </p>
                     <button className="border border-[#0052CC] text-[#0052CC] rounded py-2 px-4 font-medium hover:bg-[#E9F2FF] self-start transition-colors">
                         Get to know Automation
                     </button>
                 </div>

                 {/* Card 3 */}
                 <div className="bg-[#F4F5F7] rounded-xl p-8 flex flex-col hover:shadow-lg transition-shadow">
                     <div className="mb-6 h-16 relative">
                         <div className="absolute w-12 h-6 bg-[#FFAB00] top-2 left-2 rounded-sm mix-blend-multiply opacity-80"></div>
                         <div className="absolute w-12 h-6 bg-[#998DD9] top-5 left-5 rounded-sm mix-blend-multiply opacity-80 flex items-center justify-end pr-1"><svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>
                     </div>
                     <h3 className="text-2xl font-bold text-[#091E42] mb-4">Card mirroring</h3>
                     <p className="text-[#091E42] flex-grow mb-8">
                         View all your to-dos from multiple boards in one place. Mirror a card to keep track of work wherever you need it!
                     </p>
                     <button className="border border-[#0052CC] text-[#0052CC] rounded py-2 px-4 font-medium hover:bg-[#E9F2FF] self-start transition-colors">
                         Compare plans
                     </button>
                 </div>
             </div>
          </div>
      </section>

      {/* Get Started Email Section */}
      <section className="bg-[#F4F5F7] py-24 px-4 text-center">
         <h2 className="text-[#091E42] text-3xl font-bold mb-8">Get started with Trello today</h2>
         <div className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto mb-6">
             <input 
                type="email" 
                placeholder="Email" 
                className="w-full sm:w-[350px] h-12 px-4 rounded border border-[#DFE1E6] focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] outline-none text-[15px] mb-4 sm:mb-0 sm:mr-4 placeholder:text-gray-400"
             />
             <Link href="/signup" className="w-full sm:w-auto flex items-center justify-center bg-[#0052CC] hover:bg-[#0747A6] h-12 px-6 rounded text-white text-[15px] font-bold transition-colors whitespace-nowrap">
               Sign up - it's free!
             </Link>
          </div>
          <div className="text-sm text-[#091E42]">
              By entering my email, I acknowledge the <a href="#" className="text-[#0052CC] hover:underline">Atlassian Privacy Policy</a>.
          </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
