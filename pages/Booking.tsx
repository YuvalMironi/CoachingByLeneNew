
import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, User, Mail, MessageSquare, CheckCircle, ArrowLeft, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import { BookingFormData } from '../types';
import { Link } from 'react-router-dom';

const Booking: React.FC = () => {
  // Updated with your new Formspree ID: xqeekgbe
  const FORMSPREE_ID = "xqeekgbe"; 

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    day: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    setFormData(prev => ({ ...prev, day: formattedDate }));
    setShowCalendar(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          appointmentDate: formData.day,
          message: formData.description,
          _subject: `New Coaching Booking: ${formData.fullName}`
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to send booking request.");
      }
    } catch (err) {
      setSubmitError("We couldn't process the automatic booking. Please try again or email Lene directly.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const constructMailto = () => {
    const recipient = "lene@coachingbylene.dk";
    const subject = `Booking Request: ${formData.fullName}`;
    const body = `Name: ${formData.fullName}\nEmail: ${formData.email}\nDate: ${formData.day}\n\nMessage: ${formData.description}`;
    return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Calendar Logic
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-10"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPast = date < today;
      const formatted = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const isSelected = formData.day === formatted;

      days.push(
        <button
          key={day}
          type="button"
          disabled={isWeekend || isPast}
          onClick={() => selectDate(date)}
          className={`h-10 w-full rounded-lg flex items-center justify-center text-sm transition-all
            ${isSelected ? 'bg-darkGreen text-white font-bold' : ''}
            ${!isWeekend && !isPast && !isSelected ? 'hover:bg-primary/20 text-gray-700' : ''}
            ${isWeekend || isPast ? 'text-gray-300 cursor-not-allowed' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-lg w-full text-center space-y-8 border border-primary/20 animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-primary/20 text-darkGreen rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-serif text-gray-900">Request Sent Successfully</h2>
          <p className="text-gray-600 leading-relaxed">
            Thank you, <span className="font-bold">{formData.fullName}</span>. Your request for a session on <span className="font-bold text-darkGreen">{formData.day}</span> has been received.
          </p>
          <div className="bg-softBeige p-6 rounded-2xl text-sm text-gray-600 text-left border border-gray-100 italic">
            "We will review your details and reach out to you at {formData.email} within 24 hours to confirm a specific time."
          </div>
          <Link to="/" className="inline-block bg-darkGreen text-white px-8 py-4 rounded-xl font-bold hover:bg-[#2d5e43] transition-all">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-softBeige min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <Link to="/" className="flex items-center gap-2 text-darkGreen font-semibold hover:underline mb-4">
            <ArrowLeft size={16} /> Back to Site
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900">Book an Appointment</h1>
          <p className="text-gray-600 mt-2">Choose a weekday for your professional coaching session.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-10 space-y-6 border border-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-darkGreen" size={16} />
                    <input
                      required
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 focus:ring-2 focus:ring-primary rounded-xl"
                      placeholder="Your Name"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-darkGreen" size={16} />
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-4 bg-gray-50 border-0 focus:ring-2 focus:ring-primary rounded-xl"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* DROPDOWN CALENDAR */}
                <div className="space-y-1 relative" ref={calendarRef}>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Requested Weekday</label>
                  <button
                    type="button"
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full px-5 py-4 bg-gray-50 border-0 focus:ring-2 focus:ring-primary rounded-xl text-left flex justify-between items-center h-[56px]"
                  >
                    <span className={formData.day ? 'text-gray-900' : 'text-gray-400'}>
                      {formData.day || 'Select Weekday'}
                    </span>
                    <CalendarIcon size={18} className="text-darkGreen" />
                  </button>

                  {showCalendar && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="flex justify-between items-center mb-4">
                        <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={16} /></button>
                        <span className="text-sm font-bold text-gray-800">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={16} /></button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-[10px] font-bold text-gray-400">{d}</div>)}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {renderCalendar()}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Coaching Reason</label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-gray-50 border-0 focus:ring-2 focus:ring-primary rounded-xl resize-none"
                  placeholder="Tell Lene a bit about your goals..."
                ></textarea>
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-start gap-3">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Submission Issue</p>
                    <p>{submitError}</p>
                    <a href={constructMailto()} className="mt-2 inline-block font-bold underline">Click here to send via email client</a>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !formData.day}
                className="w-full bg-darkGreen text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:bg-[#2d5e43] transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-darkGreen text-white p-8 rounded-3xl shadow-xl">
              <h4 className="font-serif text-xl text-white mb-4">Secure Booking</h4>
              <p className="text-sm text-white/80 leading-relaxed mb-6">
                Your request is encrypted and sent directly to Lene's private inbox.
              </p>
              <ul className="space-y-3 text-xs text-white/70">
                <li className="flex items-start gap-2">• Response within 24 business hours</li>
                <li className="flex items-start gap-2">• Weekday sessions only</li>
                <li className="flex items-start gap-2">• Virtual sessions available via Zoom</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
