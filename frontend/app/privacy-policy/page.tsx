import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 py-4 px-6 md:px-12 flex items-center shadow-sm sticky top-0 bg-white z-10 w-full lg:hidden">
                 <Link href="/" className="flex items-center text-blue-600 font-bold text-2xl hover:text-blue-700 transition-colors">
                     <span className="text-blue-600 mr-2">▲</span> Legal
                 </Link>
            </header>

            <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row relative">
                {/* Desktop Left Sidebar Navigation */}
                <aside className="hidden lg:block w-64 xl:w-80 flex-shrink-0 border-r border-gray-200 py-10 px-8 sticky top-0 h-screen overflow-y-auto">
                    <Link href="/" className="flex items-center text-[#0C66E4] font-bold text-2xl mb-12 hover:opacity-80 transition-opacity">
                         <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg> Legal
                    </Link>
                    
                    <nav className="space-y-1">
                        <div className="font-bold text-[#172B4D] text-lg mb-4 px-3">Privacy Policy</div>
                        <Link href="#privacy-policy-overview" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50">Privacy policy overview</Link>
                        <Link href="#information-we-collect" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50">Information we collect</Link>
                        <div className="flex items-center px-3 py-2 bg-blue-50/50 rounded text-sm md:text-[15px]">
                            <span className="w-1.5 h-1.5 bg-[#0C66E4] rounded-full mr-2"></span>
                            <Link href="#how-we-use-information" className="text-[#0C66E4] font-medium">How we use information</Link>
                        </div>
                        <Link href="#how-we-disclose-information" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50">How we disclose information</Link>
                        <Link href="#how-we-store-and-secure" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50 leading-snug">How we store and secure information</Link>
                        <Link href="#how-long-we-keep-information" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50 leading-snug">How long we keep information</Link>
                        <Link href="#how-to-access-and-control" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50 leading-snug">How to access and control your information</Link>
                        <Link href="#our-policy-towards-children" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50">Our policy towards children</Link>
                        <Link href="#regional-disclosures" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50">Regional disclosures</Link>
                        <Link href="#changes-to-our-privacy-policy" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50">Changes to our privacy policy</Link>
                        <Link href="#how-to-contact-us" className="block px-3 py-2 text-[#5E6C84] hover:text-[#0C66E4] text-sm md:text-[15px] transition-colors rounded hover:bg-gray-50">How to contact us</Link>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 py-12 px-6 lg:px-16 xl:px-24 max-w-[900px]">
                    <article className="prose prose-slate prose-lg max-w-none text-[#172B4D]">
                        
                        <section id="privacy-policy-overview" className="mb-16 scroll-mt-24">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#091E42] mb-6 tracking-tight">Privacy Policy</h1>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                This Privacy Policy explains how Atlassian collects, uses, and discloses information 
                                about you when you use our websites, mobile applications, and other online products 
                                and services. We've designed this policy to be transparent and easy to understand.
                            </p>
                            <p className="text-[#172B4D] text-lg leading-relaxed">
                                Please read this carefully. By using our Services, you agree to the collection and 
                                use of information in accordance with this Privacy Policy.
                            </p>
                        </section>

                        <section id="information-we-collect" className="mb-16 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">Information we collect</h2>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                We collect information about you when you provide it to us, when you use our Services, and when other sources provide it to us, as further described below.
                            </p>
                            <h3 className="text-xl font-bold text-[#091E42] mb-4 mt-8">Information you provide to us</h3>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                <strong>Account and Profile Information:</strong> We collect information about you when you register for an account, create or modify your profile, set preferences, sign-up for or make purchases through the Services. For example, you provide your contact information and, in some cases, billing information when you register for the Services. You also have the option of adding a display name, profile photo, job title, and other details to your profile information to be displayed in our Services.
                            </p>
                            <h3 className="text-xl font-bold text-[#091E42] mb-4 mt-8">Information we collect automatically when you use the Services</h3>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                <strong>Your use of the Services:</strong> We keep track of certain information about you when you visit and interact with any of our Services. This information includes the features you use; the links you click on; the type, size and filenames of attachments you upload to the Services; frequently used search terms; and how you interact with others on the Services.
                            </p>
                        </section>

                        <section id="how-we-use-information" className="mb-16 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">How we use information</h2>
                            
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6 italic text-gray-500 line-clamp-2 md:line-clamp-none">
                                ... managed accounts and administrators. If you register or access the Services using an email address with a domain that is owned by your employer or organization...
                            </p>

                            <p className="text-[#172B4D] text-lg leading-relaxed mb-8">
                                <strong>Managed accounts and administrators:</strong> If you register or access the Services using an 
                                email address with a domain that is owned by your employer or organization, or 
                                associate that email address with your existing account, and such organization wishes 
                                to establish an account or site, certain information about you, including your name, 
                                profile picture, contact info, content and past use of your account may become 
                                accessible to that organization's administrator and other Service users sharing the 
                                same domain. If you are an administrator for a particular site or group of users within 
                                the Services, we may disclose your contact information to current or past Service users, 
                                for the purpose of facilitating Service-related requests.
                            </p>

                            <p className="text-[#172B4D] text-lg leading-relaxed mb-8">
                                <strong>Community Forums:</strong> Our websites offer publicly accessible blogs, forums, issue trackers, 
                                and wikis (e.g., <Link href="#" className="text-[#0C66E4] hover:underline">Atlassian Community</Link>, <Link href="#" className="text-[#0C66E4] hover:underline">Atlassian Developer Community</Link>, <Link href="#" className="text-[#0C66E4] hover:underline">Trello Community</Link>, 
                                and <Link href="#" className="text-[#0C66E4] hover:underline">Trello Inspiration</Link>). You should be aware that any information you provide on these 
                                websites - including profile information associated with the account you use to post the 
                                information - may be read, collected, and used by any member of the public who 
                                accesses these websites. Your posts and certain profile information may remain even 
                                after you terminate your account. We urge you to consider the sensitivity of any 
                                information you input into these Services. To request removal of your information from 
                                publicly accessible websites operated by us, please contact us as provided below. In 
                                some cases, we may not be able to remove your information, in which case we will let 
                                you know if we are unable to and why.
                            </p>

                            <h3 className="text-xl font-bold text-[#091E42] mb-4 mt-12">To provide the Services and personalize your experience</h3>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                We use information about you to provide the Services to you, including to process transactions with you, authenticate you when you log in, provide customer support, and operate, maintain, and improve the Services. For example, we use the name and picture you provide in your account to uniquely identify you to other Service users.
                            </p>

                            <h3 className="text-xl font-bold text-[#091E42] mb-4 mt-10">For research and development</h3>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                We are always looking for ways to make our Services smarter, faster, secure, integrated, and useful to you. We use collective learnings about how people use our Services and feedback provided directly to us to troubleshoot and to identify trends, usage, activity patterns and areas for integration and improvement of the Services.  For example, to improve the search feature, we automatically analyze your recent search history to suggest relevant results. 
                            </p>
                        </section>

                        <section id="how-we-disclose-information" className="mb-16 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">How we disclose information</h2>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                We make tools that help people collaborate, and sharing is a core part of that collaboration. We share information we collect in the ways discussed below, including in connection with possible business transfers, but we are not in the business of selling information about you to advertisers or other third parties.
                            </p>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                <strong>Sharing with other Service users:</strong> When you use the Services, we share certain information about you with other Service users. For example, when you participate in an interactive area of the Services, such as adding a comment to a Trello card, providing a description of a Jira issue, or editing a Confluence page, your name, profile picture, and the date and time you made the contribution are displayed to other Service users.
                            </p>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                <strong>Sharing with third parties:</strong> We share information with third parties that help us operate, provide, improve, integrate, customize, support and market our Services. This includes service providers that provide hosting, maintenance, backup, storage, virtual infrastructure, payment processing, analysis and other services for us, which may require them to access or use information about you.
                            </p>
                        </section>
                        
                        <section id="how-we-store-and-secure" className="mb-16 scroll-mt-24">
                             <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">How we store and secure information</h2>
                             <h3 className="text-xl font-bold text-[#091E42] mb-4 mt-8">Information storage and security</h3>
                             <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                We use data hosting service providers in the United States and Ireland to host the information we collect, and we use technical measures to secure your data. While we implement safeguards designed to protect your information, no security system is impenetrable and due to the inherent nature of the Internet, we cannot guarantee that data, during transmission through the Internet or while stored on our systems or otherwise in our care, is absolutely safe from intrusion by others.
                             </p>
                        </section>

                        <section id="how-long-we-keep-information" className="mb-16 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">How long we keep information</h2>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                How long we keep information we collect about you depends on the type of information, as described in further detail below. After such time, we will either delete or anonymize your information or, if this is not possible (for example, because the information has been stored in backup archives), then we will securely store your information and isolate it from any further use until deletion is possible.
                            </p>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                <strong>Account information:</strong> We retain your account information for as long as your account is active and a reasonable period thereafter in case you decide to re-activate the Services. We also retain some of your information as necessary to comply with our legal obligations, to resolve disputes, to enforce our agreements, to support business operations, and to continue to develop and improve our Services.
                            </p>
                        </section>

                        <section id="how-to-access-and-control" className="mb-16 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">How to access and control your information</h2>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                You have certain choices available to you when it comes to your information. Below is a summary of those choices, how to exercise them and any limitations.
                            </p>
                            <h3 className="text-xl font-bold text-[#091E42] mb-4 mt-8">Your Choices:</h3>
                            <ul className="list-disc pl-6 space-y-2 mb-6 text-[#172B4D] text-lg">
                                <li>You have the right to request a copy of your information</li>
                                <li>You have the right to object to our use of your information (including for marketing purposes)</li>
                                <li>You have the right to request the deletion or restriction of your information, or to request your information in a structured, electronic format.</li>
                            </ul>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6 border-l-4 border-[#0C66E4] pl-4 py-2 bg-blue-50/50 italic">
                                Note that your request and choices may be limited in certain cases: for example, if fulfilling your request would reveal information about another person, or if you ask to delete information which we or your administrator are permitted by law or have compelling legitimate interests to keep.
                            </p>
                        </section>

                        <section id="our-policy-towards-children" className="mb-16 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">Our policy towards children</h2>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                The Services are not directed to individuals under 16. We do not knowingly collect personal information from children under 16. If we become aware that a child under 16 has provided us with personal information, we will take steps to delete such information. If you become aware that a child has provided us with personal information, please contact our support services.
                            </p>
                        </section>

                        <section id="regional-disclosures" className="mb-16 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">Regional disclosures</h2>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                Depending on where you reside, you may have specific rights around the collection and processing of your personal data.
                            </p>
                            <h3 className="text-xl font-bold text-[#091E42] mb-4 mt-8">For users in Europe (GDPR)</h3>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                If you are an individual in the European Economic Area (EEA), the UK, or Switzerland, we process your personal data under the legal bases of performance of a contract, legitimate interests, legal obligations, and consent.
                            </p>
                            <h3 className="text-xl font-bold text-[#091E42] mb-4 mt-8">For users in California (CCPA)</h3>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                If you are a California resident, the California Consumer Privacy Act (CCPA) requires us to disclose the categories of personal information we collect and how we use it, the categories of sources from whom we collect personal information, and the third parties with whom we share it, which we have explained above.
                            </p>
                        </section>

                        <section id="changes-to-our-privacy-policy" className="mb-16 scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">Changes to our privacy policy</h2>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                We may change this privacy policy from time to time. We will post any privacy policy changes on this page and, if the changes are significant, we will provide a more prominent notice by adding a notice on the Services homepages, login screens, or by sending you an email notification. We encourage you to review our privacy policy whenever you use the Services to stay informed about our information practices and the ways you can help protect your privacy.
                            </p>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                If you disagree with any changes to this privacy policy, you will need to stop using the Services and deactivate your account(s), as outlined above.
                            </p>
                        </section>

                        <section id="how-to-contact-us" className="scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-bold text-[#091E42] mb-6 pb-2 border-b border-gray-100">How to contact us</h2>
                            <p className="text-[#172B4D] text-lg leading-relaxed mb-6">
                                Your information is controlled by Atlassian Pty Ltd. If you have questions or concerns about how your information is handled, please direct your inquiry to Atlassian Pty Ltd, which we will respond to within a reasonable timeframe. You may contact us at:
                            </p>
                            <div className="bg-gray-50 p-6 rounded border border-gray-100 text-[#172B4D] text-lg">
                                <strong>Atlassian Pty Ltd</strong><br />
                                c/o Atlassian, Inc.<br />
                                350 Bush Street, Floor 13<br />
                                San Francisco, CA 94104<br />
                                E-Mail: privacy@atlassian.com
                            </div>
                        </section>

                    </article>
                    
                    {/* Floating Privacy Banner/Footer */}
                    <div className="mt-16 pt-8 border-t border-gray-200 text-sm text-[#5E6C84] flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p>© 2024 Atlassian. All rights reserved.</p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-[#0C66E4] hover:underline">Privacy</Link>
                            <Link href="#" className="hover:text-[#0C66E4] hover:underline">Terms</Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
