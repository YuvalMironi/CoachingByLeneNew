
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', text: string }[]>([
    { role: 'assistant', text: "Hello! I'm Lene's virtual assistant. How can I help you explore coaching possibilities today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `
            You are a professional and calm AI assistant for Lene Vindelev D. Nielsen (CoachingByLene). 
            Your goal is to help potential clients understand her services.
            
            Key Information about Lene:
            - Education: IMD, Lausanne.
            - Credentials: EMCC Credentialed Coach.
            - Background: 30 years in the pharmaceutical industry, including leadership/departmental management.
            - Approach: Blends Positive Intelligence (PQ) and Brain Calm methods.
            - Focus: Identifying Saboteurs, building a Sage-powered mindset, balance, resilience, and personal/professional growth.
            - Location: Denmark (Virtual sessions available globally).
            - Offer: A complimentary chemistry session is always available.
            - Contact: Connect via LinkedIn or book through the website's booking page.
            
            Guidelines:
            - Maintain a professional, trustworthy, and supportive tone.
            - If asked about booking, direct them to the "Book Appointment" page.
            - Keep responses concise and helpful.
            - Do not invent credentials not listed here.
          `
        }
      });

      const assistantText = response.text || "I apologize, I'm having trouble connecting right now. Please try again or reach out to Lene directly.";
      setMessages(prev => [...prev, { role: 'assistant', text: assistantText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: "I'm currently resting. Please feel free to use the booking form or contact Lene via LinkedIn!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-darkGreen text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
        >
          <MessageSquare size={28} className="group-hover:rotate-12 transition-transform" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-darkGreen p-5 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-2 rounded-xl">
                <Sparkles size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-bold leading-none">Consultation Assistant</p>
                <p className="text-xs text-primary/80 mt-1">Powered by Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 bg-softBeige/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-darkGreen text-white rounded-tr-none' 
                    : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                  <Loader2 size={18} className="animate-spin text-darkGreen" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about coaching focus..."
              className="flex-grow px-4 py-2 bg-gray-50 border-0 focus:ring-2 focus:ring-primary rounded-xl text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-darkGreen text-white p-2.5 rounded-xl disabled:opacity-50 hover:bg-[#2d5e43] transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AiAssistant;
