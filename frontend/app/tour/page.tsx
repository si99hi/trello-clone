'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '../../components/footer/Footer';

export default function TourPage() {
  const [activeTab1, setActiveTab1] = useState('Inbox');
  const [activeTab2, setActiveTab2] = useState('Due dates');

  return (
    <div className="min-h-screen bg-white text-[#091E42] font-sans">
      {/* Navbar (Copied from Marketing Page for consistency) */}
      <nav className="fixed w-full bg-white z-50 shadow-[0_1px_6px_0_rgba(9,30,66,0.08)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex-shrink-0 flex items-center cursor-pointer">
                <svg className="w-6 h-6 mr-1.5 text-[#0052CC]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM10 16C10 16.5523 9.55228 17 9 17H7C6.44772 17 6 16.5523 6 16V6C6 5.44772 6.44772 5 7 5H9C9.55228 5 10 5.44772 10 6V16ZM18 11C18 11.5523 17.5523 12 17 12H15C14.4477 12 14 11.5523 14 11V6C14 5.44772 14.4477 5 15 5H17C17.5523 5 18 5.44772 18 6V11Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-widest text-[#0052CC] leading-none mb-0.5">ATLASSIAN</span>
                  <span className="text-xl font-bold tracking-tight text-[#253858] leading-none">Trello</span>
                </div>
              </Link>
              <div className="hidden md:flex space-x-6">
                <div className="relative group">
                    <button className="text-[15px] font-medium text-[#0052CC] flex items-center pb-5 pt-5">
                       Features <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className="absolute top-14 left-0 w-64 bg-white border border-gray-100 shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
                        <Link href="/tour" className="block px-4 py-3 hover:bg-[#E9F2FF] rounded text-[#0052CC] font-medium">Take a tour</Link>
                    </div>
                </div>
                <button className="text-[15px] font-medium hover:text-[#0052CC] flex items-center">Solutions <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                <button className="text-[15px] font-medium hover:text-[#0052CC] flex items-center">Plans <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
                <button className="text-[15px] font-medium hover:text-[#0052CC]">Pricing</button>
                <button className="text-[15px] font-medium hover:text-[#0052CC] flex items-center">Resources <svg className="w-4 h-4 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signup" className="hidden md:block text-[15px] font-medium px-4 py-2 hover:bg-gray-100 rounded transition-colors">Log in</Link>
              <Link href="/signup" className="bg-[#0D66E4] hover:bg-[#0052CC] text-white px-6 py-2.5 rounded text-[15px] font-medium transition-colors">
                Get Trello for free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Blue Hero Video Section */}
      <main className="bg-[#0052CC] pt-32 pb-24 px-4 text-center">
          <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                A productivity powerhouse
              </h1>
              <p className="text-xl text-white mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
                Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's doing what and what needs to get done. Learn more in our guide for getting started.
              </p>
              
              {/* Actual Embedded Video Player */}
              <div className="relative w-full aspect-video bg-black rounded-xl shadow-2xl overflow-hidden mb-12 border-4 border-[#0747a6]">
                  <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/gB3nCssFsC0" 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen>
                  </iframe>
              </div>

              <Link href="/signup" className="inline-block bg-white text-[#0052CC] font-bold px-6 py-3 rounded text-[15px] hover:bg-gray-100 transition-colors shadow-sm">
                 Sign up—it's free!
              </Link>
          </div>
      </main>

      {/* Explore Features Section with Sidebar */}
      <section className="bg-white py-16 px-4">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-8 text-[#091E42]">Explore the features that help your team succeed</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-6">
                      <TourFeatureCard 
                         icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>}
                         title="Inbox" 
                         desc="Capture every vital detail from emails, Slack, and more directly into your Trello Inbox."
                         isActive={true}
                      />
                      <TourFeatureCard 
                         icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                         title="Planner" 
                         desc="Sync your calendar and allocate focused time slots to boost productivity."
                      />
                      <TourFeatureCard 
                         icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                         title="Automation" 
                         desc="Automate tasks and workflows with Trello."
                      />
                      <TourFeatureCard 
                         icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                         title="Power-Ups" 
                         desc="Power up your teams by linking their favorite tools with Trello plugins."
                      />
                      <TourFeatureCard 
                         icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>}
                         title="Templates" 
                         desc="Give your team a blueprint for success with easy-to-use templates from industry leaders and the Trello community."
                      />
                      <TourFeatureCard 
                         icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>}
                         title="Integrations" 
                         desc="Find the apps your team is already using or discover new ways to get work done in Trello."
                      />
                  </div>
              </div>

              {/* Right Sidebar (Meet Trello) */}
              <div className="w-full md:w-[350px] bg-[#F4F5F7] p-8 rounded relative overflow-hidden flex-shrink-0">
                  <div className="absolute top-0 left-0 w-full h-1 bg-[#DFE1E6]"></div>
                  <h3 className="text-xl font-bold mb-4 text-[#091E42]">Meet Trello</h3>
                  <hr className="border-[#DFE1E6] mb-6"/>
                  <p className="text-[#5E6C84] mb-8 text-[15px] leading-relaxed">
                      Trello makes it easy for your team to get work done. No matter the project, workflow, or type of team, Trello can help keep things organized. It's simple — sign-up, create a board, and you're off! Productivity awaits.
                  </p>
                  <button className="border border-[#091E42] text-[#091E42] font-semibold py-2 px-6 rounded hover:bg-black/5 transition-colors">
                      Check out Trello
                  </button>
              </div>
          </div>
      </section>

      {/* Stay Organized (Interactive Tabs 1) */}
      <section className="bg-white py-16 px-4 border-t border-gray-100">
          <div className="max-w-[1200px] mx-auto text-center mb-16">
              <h2 className="text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed text-[#172B4D]">
                  Stay organized and efficient with Inbox, Boards, and Planner. Every to-do, idea, or responsibility—no matter how small—finds its place, keeping you at the top of your game.
              </h2>
          </div>
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16">
              <div className="w-full md:w-1/3 flex flex-col space-y-6">
                  <TourTab title="Inbox" isActive={activeTab1 === 'Inbox'} onClick={() => setActiveTab1('Inbox')}>
                      When it's on your mind, it goes in your Inbox. Capture your to-dos from anywhere, anytime.
                  </TourTab>
                  <TourTab title="Boards" isActive={activeTab1 === 'Boards'} onClick={() => setActiveTab1('Boards')}>
                      Your to-do list may be long, but it can be manageable! Keep tabs on everything from "to-dos to tackle" to "mission accomplished!"
                  </TourTab>
                  <TourTab title="Planner" isActive={activeTab1 === 'Planner'} onClick={() => setActiveTab1('Planner')}>
                      Drag, drop, get it done. Snap your top tasks into your calendar and make time for what truly matters.
                  </TourTab>
              </div>
                     <div className="w-full md:w-2/3 bg-[#F4F5F7] rounded-xl flex items-center justify-center min-h-[500px] overflow-hidden relative">
                  {/* Mockups changing based on activeTab1 - Now using static images! */}
                  {activeTab1 === 'Inbox' && (
                     <div className="w-full h-full p-6 flex flex-col justify-center animate-fade-in">
                         <div className="w-full relative shadow-xl rounded-lg overflow-hidden border border-gray-200 aspect-[4/3] bg-white flex items-center justify-center">
                             {/* The user will place 'inbox-tab.png' inside the 'public/images/tour' folder! */}
                             <Image 
                                 src="/images/tour/inbox-tab.png" 
                                 alt="Trello Inbox view with purple column and personal task board" 
                                 fill
                                 className="object-contain"
                                 unoptimized
                             />
                             <div className="absolute inset-0 flex items-center justify-center z-[-1] text-gray-400 text-sm">
                                 Please save your image as 'inbox-tab.png' inside 'public/images/tour'.
                             </div>
                         </div>
                     </div>
                  )}

                  {activeTab1 === 'Boards' && (
                     <div className="w-full h-full p-6 flex flex-col justify-center animate-fade-in">
                         <div className="w-full relative shadow-xl rounded-lg overflow-hidden border border-gray-200 aspect-[4/3] bg-white flex items-center justify-center">
                             {/* The user will place 'boards-tab.png' inside the 'public/images/tour' folder! */}
                             <Image 
                                 src="/images/tour/boards-tab.png" 
                                 alt="Trello Boards view with To Do, This week, and Read later columns" 
                                 fill
                                 className="object-contain"
                                 unoptimized
                             />
                             <div className="absolute inset-0 flex items-center justify-center z-[-1] text-gray-400 text-sm">
                                 Please save your image as 'boards-tab.png' inside 'public/images/tour'.
                             </div>
                         </div>
                     </div>
                  )}

                  {activeTab1 === 'Planner' && (
                     <div className="w-full h-full p-6 flex flex-col justify-center animate-fade-in">
                         <div className="w-full relative shadow-xl rounded-lg overflow-hidden border border-gray-200 aspect-[4/3] bg-white flex items-center justify-center">
                             {/* The user will place 'planner-tab.png' inside the 'public/images/tour' folder! */}
                             <Image 
                                 src="/images/tour/planner-tab.png" 
                                 alt="Trello Planner view with interactive calendar and focus blocks" 
                                 fill
                                 className="object-contain"
                                 unoptimized
                             />
                             <div className="absolute inset-0 flex items-center justify-center z-[-1] text-gray-400 text-sm">
                                 Please save your image as 'planner-tab.png' inside 'public/images/tour'.
                             </div>
                         </div>
                     </div>
                  )}
              </div>
          </div>
      </section>

      {/* Simplify Your To-Do List Section */}
      <section className="bg-white py-16 px-4">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16">
              {/* Left Side: Text Content */}
              <div className="w-full md:w-1/2 flex flex-col space-y-10 pr-8">
                  <div>
                      <h3 className="text-2xl font-bold text-[#091E42] mb-4">Due dates</h3>
                      <p className="text-xl text-[#091E42] leading-relaxed">
                          Due dates go hand-in-hand with staying organized. In Trello, they're easy to set, hard to miss (with reminders!), and oh-so-satisfying to mark as "done."
                      </p>
                  </div>
                  <div>
                      <h3 className="text-2xl font-bold text-[#091E42] mb-4">Attachments</h3>
                      <p className="text-xl text-[#091E42] leading-relaxed">
                          No more digging through endless email chains to find attachments. Just drag and drop them onto a card so the right files stay with the right tasks.
                      </p>
                  </div>
                  <div>
                      <h3 className="text-2xl font-bold text-[#091E42] mb-4">Checklists</h3>
                      <p className="text-xl text-[#091E42] leading-relaxed">
                          Your best tool to overpower overwhelming asks. Break big tasks into small ones, check things off the list, and watch that status bar go to 100% complete.
                      </p>
                  </div>
                  <div>
                      <h3 className="text-2xl font-bold text-[#091E42] mb-4">Powered by AI</h3>
                      <p className="text-xl text-[#091E42] leading-relaxed">
                          Harness the power of AI. Brainstorm new ideas, draft content, and summarize long documents in seconds.
                      </p>
                  </div>
              </div>

              {/* Right Side: Image Mockup on Yellow Background */}
              <div className="w-full md:w-1/2 bg-[#FFB020] rounded-tl-[80px] rounded-br-2xl rounded-bl-2xl overflow-hidden relative min-h-[500px] p-6 pt-16 -mr-4">
                  {/* Decorative background circle */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-[#FFC400] rounded-full opacity-50 transform -translate-x-1/4 -translate-y-1/4"></div>
                  
                  {/* Image Placeholder */}
                  <div className="w-full h-full relative z-10 rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100 flex items-center justify-center">
                      <Image 
                          src="/images/tour/card-features.png" 
                          alt="Trello card showing due dates, attachments, and checklists" 
                          fill
                          className="object-cover object-left-top"
                          unoptimized
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-[-1] text-gray-400 text-sm p-8 text-center bg-gray-50">
                          Please save your image as 'card-features.png' inside 'public/images/tour'.
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Unlock your potential Section */}
      <section className="bg-white py-16 px-4">
          <div className="max-w-[1200px] mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#091E42] mb-4">Unlock your potential with Trello</h2>
              <p className="text-xl max-w-3xl mx-auto text-[#172B4D] leading-relaxed">
                  Experience a new level of efficiency and productivity with Trello.
              </p>
          </div>

          <div className="max-w-[1000px] mx-auto space-y-24">
              {/* Feature 1 */}
              <div className="flex flex-col md:flex-row items-center gap-16">
                  <div className="w-full md:w-1/2 flex justify-center">
                      <div className="w-full max-w-md relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4F5F7] flex items-center justify-center shadow-inner">
                          {/* User will add feature-1.png here */}
                          <Image 
                              src="/images/tour/feature-1.png" 
                              alt="Your work, your way" 
                              fill 
                              className="object-contain p-4" 
                              unoptimized 
                          />
                          <div className="absolute inset-x-0 bottom-4 flex justify-center z-[-1] text-gray-400 text-xs px-4 text-center">
                              Please save image as 'feature-1.png' in 'public/images/tour'
                          </div>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2">
                      <h3 className="text-3xl font-bold text-[#091E42] mb-4">Your work, your way</h3>
                      <div className="w-32 h-1 bg-gradient-to-r from-[#0C66E4] to-[#00C7E5] mb-6"></div>
                      <p className="text-lg text-[#172B4D] leading-relaxed">
                          Need to structure information on Trello cards specific to the task at hand? Custom Fields lets you do all that and more— providing process and formality to your workflow to meet your unique needs.
                      </p>
                  </div>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-16">
                  <div className="w-full md:w-1/2 flex justify-center">
                      <div className="w-full max-w-md relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4F5F7] flex items-center justify-center shadow-inner">
                          {/* User will add feature-2.png here */}
                          <Image 
                              src="/images/tour/feature-2.png" 
                              alt="Automate your workflow" 
                              fill 
                              className="object-contain p-4" 
                              unoptimized 
                          />
                          <div className="absolute inset-x-0 bottom-4 flex justify-center z-[-1] text-gray-400 text-xs px-4 text-center">
                              Please save image as 'feature-2.png' in 'public/images/tour'
                          </div>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2">
                      <h3 className="text-3xl font-bold text-[#091E42] mb-4">Automate your workflow</h3>
                      <div className="w-32 h-1 bg-gradient-to-r from-[#0C66E4] to-[#00C7E5] mb-6"></div>
                      <p className="text-lg text-[#172B4D] leading-relaxed mb-4">
                          Create a foolproof process for moving work forward with Trello's built-in automation system. Run commands and set automated rules for almost any action in Trello so that you can focus on what matters most.
                      </p>
                      <Link href="#" className="text-[#0C66E4] hover:underline hover:text-[#0052CC] font-medium transition-colors">
                          Learn more {'>'}
                      </Link>
                  </div>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col md:flex-row items-center gap-16">
                  <div className="w-full md:w-1/2 flex justify-center">
                      <div className="w-full max-w-md relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F4F5F7] flex items-center justify-center shadow-inner">
                          {/* User will add feature-3.png here */}
                          <Image 
                              src="/images/tour/feature-3.png" 
                              alt="Get peace of mind" 
                              fill 
                              className="object-contain p-4" 
                              unoptimized 
                          />
                          <div className="absolute inset-x-0 bottom-4 flex justify-center z-[-1] text-gray-400 text-xs px-4 text-center">
                              Please save image as 'feature-3.png' in 'public/images/tour'
                          </div>
                      </div>
                  </div>
                  <div className="w-full md:w-1/2">
                      <h3 className="text-3xl font-bold text-[#091E42] mb-4">Get peace of mind</h3>
                      <div className="w-32 h-1 bg-gradient-to-r from-[#0C66E4] to-[#00C7E5] mb-6"></div>
                      <p className="text-lg text-[#172B4D] leading-relaxed">
                          Easily manage users in real-time and control content-management permissions with just a few clicks. With 99.99% uptime YoY and industry-leading compliance certifications, you can rest assured we'll never leave you hanging.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      {/* Try Premium CTA Section */}
      <section className="bg-[#0052CC] py-24 px-4 text-center text-white">
          <div className="max-w-[800px] mx-auto flex flex-col items-center">
              <h2 className="text-3xl md:text-[40px] font-semibold mb-6 tracking-tight">
                  Try Premium free for 14 days
              </h2>
              <p className="text-xl md:text-[22px] mb-10 max-w-2xl text-white/90">
                  Supercharge your productivity with AI and unlimited automation
              </p>
              
              <form className="w-full max-w-[600px] flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <input 
                      type="email" 
                      placeholder="Email" 
                      className="flex-1 px-4 py-3 rounded text-[#172B4D] text-[16px] outline-none border-2 border-transparent focus:border-blue-300"
                      required
                  />
                  <Link 
                      href="/signup" 
                      className="bg-white text-[#172B4D] font-bold px-8 py-3 rounded text-[16px] hover:bg-gray-100 transition-colors whitespace-nowrap text-center shadow-sm"
                  >
                      Sign up
                  </Link>
              </form>
              
              <div className="text-sm text-white/80">
                  By entering my email, I acknowledge the <Link href="/privacy-policy" className="underline hover:text-white transition-colors">Atlassian Privacy Policy</Link>
              </div>
          </div>
      </section>

      <Footer />
    </div>
  );
}

// Component for the Tour Page Feature Tabs
const TourTab = ({ title, isActive, children, onClick }: { title: string, isActive: boolean, children: React.ReactNode, onClick: () => void }) => {
    return (
        <div 
            onClick={onClick}
            className={`cursor-pointer transition-all duration-300 w-full ${
                isActive 
                    ? 'bg-white rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-8 border-l-8 border-[#0C66E4]' 
                    : 'p-8 border-l-8 border-transparent hover:bg-gray-50'
            }`}
        >
            <h3 className={`text-[19px] font-extrabold ${isActive ? 'text-[#091E42] mb-4' : 'text-[#172B4D]'}`}>
                {title}
            </h3>
            <div className={`text-[#172B4D] text-[15px] leading-relaxed transition-all duration-300 ${isActive ? 'opacity-100 max-h-[200px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                {children}
            </div>
        </div>
    );
};

function TourFeatureCard({ icon, title, desc, isActive = false }: { icon: React.ReactNode, title: string, desc: string, isActive?: boolean }) {
    return (
        <div className={`p-4 cursor-pointer transition-all ${isActive ? 'bg-[#FFF0F2] border-2 border-[#172B4D]' : 'border-2 border-transparent hover:bg-gray-50'}`}>
            <div className="flex items-center text-[#5E6C84] mb-3">
                <span className="mr-3">{icon}</span>
                <h4 className="font-bold text-[#172B4D] text-[16px]">{title}</h4>
            </div>
            <p className="text-[#5E6C84] text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
