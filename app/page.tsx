'use client'; // This directive is necessary for using React hooks (useState, useEffect)

import React, { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

// Setup the Inter font for Next.js
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

// This is the main component for your page
export default function RecoveryPhrasePage() {
  
  // --- STATE MANAGEMENT (using React Hooks with TypeScript) ---
  
  // State for the 3-second loader
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // State for the number of words (defaults to 12)
  const [wordCount, setWordCount] = useState<number>(12);
  
  // State for the actual words in the input fields.
  const [inputs, setInputs] = useState<string[]>(Array(12).fill(''));
  
  // State for the error message
  const [message, setMessage] = useState<string>('');
  
  // This state is just to hold the final saved phrase for console logging.
  const [savedPhrase, setSavedPhrase] = useState<string[]>([]);

  // --- EFFECTS (Handling side-effects like timers) ---
  
  // This useEffect hook handles the 3-second loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    // Cleanup function: clears the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty array [] means this effect runs only once on mount

  // --- DERIVED STATE (Values calculated from existing state) ---

  // The "Save" button is disabled if *any* input is empty.
  const isSaveDisabled: boolean = inputs.some(input => input.trim() === '');
  
  // --- EVENT HANDLERS ---

  /**
   * Handles switching between 12 and 24 words.
   * @param {number} count - The new word count (12 or 24).
   */
  const handleWordCountChange = (count: number): void => {
    setWordCount(count);
    // Create a new empty array of the correct size
    setInputs(Array(count).fill(''));
    setMessage(''); // Clear any error messages
  };

  /**
   * Handles changes to any input field.
   * @param {number} index - The index of the input being changed.
   * @param {string} value - The new value from the input field.
   */
  const handleInputChange = (index: number, value: string): void => {
    // 1. Sanitize the value to allow only Latin alphabet characters
    const sanitizedValue = value.replace(/[^a-z]/gi, '');

    // 2. Create a copy of the inputs array to avoid direct mutation
    const newInputs = [...inputs];
    
    // 3. Update the value at the specific index
    newInputs[index] = sanitizedValue;
    
    // 4. Set the state with the new array
    setInputs(newInputs);

    // 5. Clear the error message as the user is typing
    if (message) {
      setMessage('');
    }
  };

  /**
   * Handles the form submission (Save button click).
   * @param {React.FormEvent<HTMLFormElement>} event - The form event.
   */
  const handleSave = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Prevent default form submission
    
    // Check again just in case (though button should be disabled)
    if (isSaveDisabled) {
      setMessage(`Please fill in all ${wordCount} words.`);
      return;
    }

    // Create the final phrase by trimming and lowercasing
    const finalPhrase = inputs.map(input => input.trim().toLowerCase());
    
    setSavedPhrase(finalPhrase);
    
    // Log the result to the console
    console.clear();
    console.log('--- Recovery Phrase Saved ---');
    console.log(finalPhrase);
    console.log('-----------------------------');

    setMessage(''); // Clear any old messages
  };

  /**
   * Handles the form reset (Clear button click).
   * @param {React.FormEvent<HTMLFormElement>} event - The form event.
   */
  const handleClear = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault(); // Use preventDefault for reset to stop native form reset
    setInputs(Array(wordCount).fill('')); // Reset inputs to empty
    setMessage(''); // Clear error message
    setSavedPhrase([]); // Clear saved phrase
  };

  // --- RENDER ---
  
  // Use a `main` tag and apply the font className
  return (
    <main className={`${inter.className} bg-zinc-950 text-zinc-200 font-sans flex justify-center items-center min-h-screen p-5`}>
      
      {/* 1. Loader: Conditionally rendered based on isLoading state */}
      {isLoading ? (
        <div className="flex justify-center items-center fixed inset-0 bg-zinc-950 z-50">
          <div className="w-14 h-14 border-4 border-zinc-800 border-t-zinc-200 rounded-full animate-spin"></div>
        </div>
      ) : (
        
        /* 2. Main Content Card: Rendered after loading */
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50 max-w-3xl w-full">
          
          {/* Header */}
          <h1 className="text-sm tracking-[0.2em] mb-2 font-bold text-zinc-500 uppercase">
            LEDGER
          </h1>
          <h2 className="mb-5 text-2xl font-semibold text-white">
            Enter recovery phrase
          </h2>

          {/* Notice Box */}
          <div className="flex items-center gap-2.5 bg-zinc-800 p-3 sm:p-4 rounded-xl mb-6 text-zinc-400 text-sm border border-zinc-700">
            <svg className="flex-shrink-0 w-5 h-5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <strong className="text-zinc-200">Demo mode:</strong> This is a visual mock-up. Do not type real seed words here.
            </div>
          </div>

          {/* Word Count Selector */}
          <div className="flex gap-2.5 mb-6 bg-zinc-800 rounded-xl p-1 border border-zinc-700">
            <button
              type="button"
              onClick={() => handleWordCountChange(12)}
              className={`flex-1 border-0 p-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all
                ${wordCount === 12 
                  ? 'bg-zinc-200 text-zinc-900 font-semibold shadow-md shadow-white/10' 
                  : 'bg-transparent text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }
              `}
            >
              12 words
            </button>
            <button
              type="button"
              onClick={() => handleWordCountChange(24)}
              className={`flex-1 border-0 p-2.5 rounded-lg cursor-pointer text-sm font-medium transition-all
                ${wordCount === 24 
                  ? 'bg-zinc-200 text-zinc-900 font-semibold shadow-md shadow-white/10' 
                  : 'bg-transparent text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }
              `}
            >
              24 words
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} onReset={handleClear}>
            
            {/* Dynamic Input Grid: Generated by mapping the 'inputs' state */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inputs.map((value, index) => (
                <div className="item" key={index}>
                  <input
                    type="text"
                    placeholder={`Word ${index + 1}`}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(index, e.target.value)}
                    required
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-200 p-2.5 text-sm font-sans transition-all placeholder-zinc-600 focus:outline-none focus:border-zinc-200 focus:ring-2 focus:ring-white/20"
                  />
                </div>
              ))}
            </div>
            
            {/* Controls Area */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-6 items-center">
              {/* Error Message Area */}
              <p className={`text-sm min-h-[1.2em] m-0 flex-1 sm:text-left text-center mb-3 sm:mb-0
                ${message ? 'text-red-500 font-medium' : 'text-zinc-500'}
              `}>
                {message}
              </p>
              
              {/* Clear Button */}
              <button 
                type="reset"
                className="border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-600 px-4 py-2.5 rounded-lg cursor-pointer text-sm font-semibold transition-all w-full sm:w-auto"
              >
                Clear
              </button>
              
              {/* Save Button (dynamically disabled) */}
              <button 
                type="submit"
                disabled={isSaveDisabled}
                className="border-0 px-4 py-2.5 rounded-lg cursor-pointer text-sm font-semibold transition-all w-full sm:w-auto
                  disabled:bg-zinc-800 disabled:text-zinc-600 disabled:border-zinc-700 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:bg-zinc-800
                  bg-zinc-200 text-zinc-900 shadow-md shadow-white/10 hover:bg-zinc-300
                "
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}


