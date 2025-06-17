import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 100% refund if the booking is cancelled at least 3 days before the event. Cancellations made less than 3 days before the event may be subject to partial or no refund as per our cancellation policy.',
  },
  {
    question: 'Will I have to provide accommodation and traveling charges for an artist separately?',
    answer: 'No, accommodation and travel charges are included in the event price. You don\'t need to pay anything extra for these arrangements.',
  },
  {
    question: 'Will the artist perform on requested songs?',
    answer: 'Yes, artists generally accept special song requests. We recommend sharing your preferred songs in advance so the artist can prepare accordingly.',
  },
  {
    question: 'Who will arrange the sound system or audio equipment for my event?',
    answer: 'PrimeStage will handle the complete sound system setup. We offer a wide range of sound and audio options to suit your event size and needs.',
  },
  {
    question: 'Who will be responsible for the artist\'s arrival, sound system, and overall event management to ensure my event goes well?',
    answer: 'Your event will be assigned a dedicated event manager from PrimeStage. They will ensure the artist\'s timely arrival, sound system setup, and smooth event coordination.',
  },
  {
    question: 'Can the performance time be extended during the event?',
    answer: 'Yes, performance time can be extended based on the artist\'s availability. Additional charges may apply, and extensions should be requested in advance or during the event.',
  },
  {
    question: 'What if the artist does not arrive on time?',
    answer: 'In the rare case of a delay, our event manager will coordinate and keep you updated. We ensure minimal disruption and work proactively to manage timing.',
  },
  {
    question: 'What if the artist cancels the request at the last moment?',
    answer: 'Artist cancellations are extremely rare, but if it happens, PrimeStage will arrange a suitable replacement artist of equal or better quality, at no extra cost.',
  },
  {
    question: 'Where can I discuss the event details with the artists or chefs?',
    answer: 'Once your booking is confirmed, you can discuss all event details directly with the artist or chef through our platform. Our support team is also available to assist you at every step.',
  },
];

const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 pr-4">
          {faq.question}
        </h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-purple-600 transform transition-transform duration-200" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400 transform transition-transform duration-200" />
          )}
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="px-6 pb-6">
          <div className="pt-2 border-t border-gray-100">
            <p className="text-gray-600 leading-relaxed mt-3">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const [openItems, setOpenItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const expandAll = () => {
    setOpenItems(new Set(filteredFaqs.map((_, index) => index)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about PrimeStage events and services
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-sm"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={expandAll}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
          >
            Collapse All
          </button>
          <div className="flex items-center text-gray-600 ml-auto">
            <span className="text-sm font-medium">
              {filteredFaqs.length} question{filteredFaqs.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openItems.has(index)}
                onToggle={() => toggleItem(index)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No FAQs Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse all questions above.
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg opacity-90 mb-6">
            Our support team is here to help you with any additional questions.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}