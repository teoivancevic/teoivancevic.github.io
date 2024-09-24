import React, { useState } from 'react';
import { CalendarCheck, Linkedin, Rss } from 'lucide-react';


const PersonalLandingPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const FORMSPARK_ACTION_URL = "https://submit-form.com/iFdC8wLoM"; // Replace with your Formspark form ID
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      setIsSubmitted(true);
      setEmail('');
    };

  return (
    <div className="min-h-screen bg-[#ffffff] flex justify-left p-10 ">
      <div className="w-full max-w-[600px] flex flex-col justify-between">
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-[#333333]">
            Hi, I'm <strong><span className="bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">Teo</span></strong> Ivancevic
            {/* Hi, I'm <span className="bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">Teo</span> <span className="bg-gradient-to-r to-teal-500 from-teal-400 text-transparent bg-clip-text">Ivančević</span>. */}
            
          </h1>
          {/* <h1 className="text-9xl font-bold text-[#333333]">
            <strong><span className="bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">TI          </span></strong>
          </h1> */}
        </header>

        <main className="flex-grow text-xl">
          <section className="mb-6">
            {/* <h2 className="text-lg font-semibold mb-2 text-[#666666]">About Me</h2> */}
            <p className="text-[#666666]">
              I love Startups, Technology, Music, Business, Robotics...
              <br/><br/>
              Currently, I'm studying CS at <a href='https://www.fer.unizg.hr/en' className='underline'>FER</a> in <strong>Zagreb, Croatia</strong>. 
              {/* I am working on starting an Entrepreneurship Club at my uni to "Inspire the new generation of Croatian leaders". */}
              <br/><br/>
              Recently, I've spent 2 months at <a href='https://www.stanford.edu/' className='font-bold hover:text-[#8C1515]'>Stanford University</a> as a visiting student for the summer. While studying Technology Entrepreneurship and Data Science I've made a lot of cool friends from all around the world. 
              <br/><br/>
              {/* Some of my favorite songs lately:
              <ol className="text-[#666666] list-decimal pl-10">
                <li><a href='https://www.youtube.com/watch?v=e-IAGmTuUmw' className='underline'>The Glory</a> by Ye</li>
                <li><a href='https://www.youtube.com/watch?v=3c3XJ_HMB0A' className='underline'>Roses</a> by Jaden</li>
                <li><a href='https://www.youtube.com/watch?v=BbYpktj1axw' className='underline'>Demon me čuva</a> by Baks</li>
              </ol> */}
            </p>
          </section>
          
          <section className="mb-6">
                {/* <h2 className="text-lg font-semibold mb-2 text-[#444444]">Newsletter</h2> */}
                <p className="text-[#666666]">
                    Also, I started writing <a href='https://teoivancevic.substack.com' className='font-bold underline'>mini blog posts</a> about stuff I find cool, my experiences or just my thoughts. 
                    <br/>
                    I write maybe <strong>1 per month</strong>, so if you want to hear from me you can add yourself to my list
                </p>
                <br/>
            {isSubmitted ? (
              <p className="text-green-600">thank you &#60;3</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your email :)"
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-400"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-green-400 text-white rounded-md hover:bg-teal-600 transition-colors text-sm"
                >
                  <strong>wooo</strong>
                </button>
              </form>
              
            )}
          </section>
          <section className="mb-6">
            <div className="w-full aspect-square border-4 border-green-200 flex items-center justify-center">
              <p className="text-lg text-green-500 font-semibold">image coming soon...</p>
            </div>
          </section>
          
        </main>
        <footer className="mt-8 pt-4 text-[#666666] text-xl">
          <section>
            <p className="text-[#666666]">
                p.s: I like getting emails, so if you want to talk about startups, tech, or literally anything, <a href="mailto:hey@teoivancevic.com" aria-label="Email" className='underline'>hit me up</a> :)
            </p>
            {/* <br/>
            <p className="text-[#666666]">
                I'm echoing the so-called "<a href='https://www.kalzumeus.com/standing-invitation/' className='underline'>standing invitation</a>"
            </p> */}
          
          </section>
        </footer>
        <footer className="mt-8 pt-4 border-t border-[#dddddd] text-[#666666]">
          <div className="flex justify-between items-center mb-2">
            {/* <p className="text-sm">&copy; 2024 Teo Ivancevic</p> */}
            
            <a href="mailto:hey@teoivancevic.com" aria-label="Email">
                <strong><p className="text-sm">hey@teoivancevic.com</p></strong>
            </a>
            <div className="flex gap-2">
              {/* <a href="mailto:hey@teoivancevic.com" aria-label="Email">
                <Mail className="text-[#666666] hover:text-[#444444]" size={20} />
              </a> */}
              <a href="https://cal.com/teoivancevic" target="_blank" rel="noopener noreferrer" aria-label="Cal.com Meeting">
                <CalendarCheck className="text-[#666666] hover:text-[#9834eb]" size={20} />
              </a>
              <a href="https://teoivancevic.substack.com" target="_blank" rel="noopener noreferrer" aria-label="Substack Newsletter">
                <Rss className="text-[#666666] hover:text-[#FF6719]" size={20} />
              </a>
              <a href="https://www.linkedin.com/in/teoivancevic" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <Linkedin className="text-[#666666] hover:text-[#0077B5]" size={20} />
              </a>
            </div>
            
          </div>
          
        </footer>
      </div>
    </div>
  );
};

export default PersonalLandingPage;