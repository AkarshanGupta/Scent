// // import React, { useState, useEffect } from 'react';
// // import { Sparkles, Save, Share2, Loader, AlertTriangle, Beaker } from 'lucide-react';
// // import { generateScent, mockScentData } from '../utils/apiUtils';
// // import { saveScentToStorage, getSavedScents } from '../utils/storageUtils';
// // import ScentCard from './ScentCard';
// // import SavedScents from './SavedScents';

// // interface GeneratedScent {
// //   name: string;
// //   topNotes: string[];
// //   middleNotes: string[];
// //   baseNotes: string[];
// //   ingredients: { name: string; percentage: string }[];
// //   description: string;
// //   timestamp?: number;
// // }

// // const ScentGenerator: React.FC = () => {
// //   const [description, setDescription] = useState('');
// //   const [generatedScent, setGeneratedScent] = useState<GeneratedScent | null>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);
// //   const [savedScents, setSavedScents] = useState<GeneratedScent[]>([]);
// //   const [showSaved, setShowSaved] = useState(false);

// //   const presetCategories = [
// //     { label: "Fresh Ocean", description: "A crisp oceanic fragrance with sea salt, marine algae, and coastal breeze notes" },
// //     { label: "Warm Vanilla", description: "A comforting vanilla blend with caramel, bourbon, and creamy sandalwood undertones" },
// //     { label: "Floral Garden", description: "A romantic bouquet of blooming roses, jasmine, and lily with green stem accents" },
// //     { label: "Woody Forest", description: "An earthy composition of cedar, pine, moss, and damp soil after rain" }
// //   ];

// //   useEffect(() => {
// //     setSavedScents(getSavedScents());
// //   }, []);

// //   const handleGenerate = async () => {
// //     if (!description.trim()) {
// //       setError('Please enter a scent description');
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const result = await generateScent(description);
// //       if (result) {
// //         const scentWithTimestamp = {
// //           ...result,
// //           timestamp: Date.now()
// //         };
// //         setGeneratedScent(scentWithTimestamp);
// //       } else {
// //         // Use fallback data
// //         const fallbackScent = {
// //           ...mockScentData,
// //           name: `${mockScentData.name}`,
// //           timestamp: Date.now()
// //         };
// //         setGeneratedScent(fallbackScent);
// //         setError('Demo mode: Add your Gemini API key in src/utils/apiUtils.ts to enable AI generation');
// //       }
// //     } catch (err) {
// //       setError('Failed to generate scent. Please try again.');
// //       console.error('Generation error:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSave = () => {
// //     if (generatedScent) {
// //       saveScentToStorage(generatedScent);
// //       setSavedScents(getSavedScents());
// //     }
// //   };

// //   const handleShare = async () => {
// //     if (generatedScent) {
// //       const shareText = `I created "${generatedScent.name}" with AI! ${generatedScent.description}`;
// //       try {
// //         await navigator.clipboard.writeText(shareText);
// //         // You could add a toast notification here
// //       } catch (err) {
// //         console.error('Failed to copy to clipboard:', err);
// //       }
// //     }
// //   };

// //   const calculateScentStrength = (ingredients: { name: string; percentage: string }[]): 'Light' | 'Medium' | 'Strong' => {
// //     const totalPercentage = ingredients.reduce((sum, ingredient) => {
// //       const percentage = parseInt(ingredient.percentage.replace('%', ''));
// //       return sum + percentage;
// //     }, 0);

// //     if (totalPercentage > 40) return 'Strong';
// //     if (totalPercentage > 20) return 'Medium';
// //     return 'Light';
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <div className="flex items-center justify-center mb-4">
// //             <Beaker className="h-12 w-12 text-white mr-3" />
// //             <h1 className="text-5xl font-bold text-white">AI Scent Lab</h1>
// //           </div>
// //           <p className="text-xl text-white/90">Create unique fragrances with artificial intelligence</p>
// //         </div>

// //         {/* Main Interface */}
// //         <div className="max-w-4xl mx-auto">
// //           <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
// //             {/* Input Section */}
// //             <div className="mb-8">
// //               <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-3">
// //                 Describe your perfect scent
// //               </label>
// //               <textarea
// //                 id="description"
// //                 value={description}
// //                 onChange={(e) => setDescription(e.target.value)}
// //                 placeholder="Describe the fragrance you want to create... (e.g., 'A warm, cozy scent reminiscent of autumn mornings with coffee and vanilla')"
// //                 className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-800 placeholder-gray-500 resize-none"
// //               />
// //             </div>

// //             {/* Preset Categories */}
// //             <div className="mb-8">
// //               <p className="text-sm font-medium text-gray-600 mb-3">Quick inspiration:</p>
// //               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                 {presetCategories.map((preset) => (
// //                   <button
// //                     key={preset.label}
// //                     onClick={() => setDescription(preset.description)}
// //                     className="p-3 text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-xl hover:from-purple-200 hover:to-pink-200 transition-all duration-200 font-medium"
// //                   >
// //                     {preset.label}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>

// //             {/* Generate Button */}
// //             <div className="flex flex-col sm:flex-row gap-4 mb-8">
// //               <button
// //                 onClick={handleGenerate}
// //                 disabled={loading}
// //                 className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
// //               >
// //                 {loading ? (
// //                   <>
// //                     <Loader className="animate-spin h-5 w-5 mr-2" />
// //                     Creating your scent...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Sparkles className="h-5 w-5 mr-2" />
// //                     Generate Scent
// //                   </>
// //                 )}
// //               </button>
              
// //               <button
// //                 onClick={() => setShowSaved(!showSaved)}
// //                 className="bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200"
// //               >
// //                 My Scents ({savedScents.length})
// //               </button>
// //             </div>

// //             {/* Error Display */}
// //             {error && (
// //               <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
// //                 <AlertTriangle className="h-5 w-5 text-red-500 mr-3" />
// //                 <p className="text-red-700">{error}</p>
// //               </div>
// //             )}
// //           </div>

// //           {/* Results */}
// //           {generatedScent && (
// //             <ScentCard
// //               scent={generatedScent}
// //               strength={calculateScentStrength(generatedScent.ingredients)}
// //               onSave={handleSave}
// //               onShare={handleShare}
// //             />
// //           )}

// //           {/* Saved Scents */}
// //           {showSaved && (
// //             <SavedScents
// //               scents={savedScents}
// //               onClose={() => setShowSaved(false)}
// //               onScentSelect={setGeneratedScent}
// //             />
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ScentGenerator;
// import React, { useState, useEffect } from 'react';
// import { Sparkles, Loader, AlertTriangle, Beaker, BookOpen } from 'lucide-react';
// import { generateScent, mockScentData } from '../utils/apiUtils';
// import { saveScentToStorage, getSavedScents } from '../utils/storageUtils';
// import ScentCard from './ScentCard';
// import SavedScents from './SavedScents';

// interface GeneratedScent {
//   name: string;
//   topNotes: string[];
//   middleNotes: string[];
//   baseNotes: string[];
//   ingredients: { name: string; percentage: string }[];
//   description: string;
//   timestamp?: number;
// }

// const ScentGenerator: React.FC = () => {
//   const [description, setDescription] = useState('');
//   const [generatedScent, setGeneratedScent] = useState<GeneratedScent | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [savedScents, setSavedScents] = useState<GeneratedScent[]>([]);
//   const [showSaved, setShowSaved] = useState(false);

//   const presetCategories = [
//     { label: "Fresh Ocean", description: "A crisp oceanic fragrance with sea salt, marine algae, and coastal breeze notes" },
//     { label: "Warm Vanilla", description: "A comforting vanilla blend with caramel, bourbon, and creamy sandalwood undertones" },
//     { label: "Floral Garden", description: "A romantic bouquet of blooming roses, jasmine, and lily with green stem accents" },
//     { label: "Woody Forest", description: "An earthy composition of cedar, pine, moss, and damp soil after rain" }
//   ];

//   useEffect(() => {
//     setSavedScents(getSavedScents());
//   }, []);

//   const handleGenerate = async () => {
//     if (!description.trim()) {
//       setError('Please enter a scent description');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const result = await generateScent(description);
//       if (result) {
//         const scentWithTimestamp = {
//           ...result,
//           timestamp: Date.now()
//         };
//         setGeneratedScent(scentWithTimestamp);
//       } else {
//         // Use fallback data
//         const fallbackScent = {
//           ...mockScentData,
//           name: `Demo: ${mockScentData.name}`,
//           timestamp: Date.now()
//         };
//         setGeneratedScent(fallbackScent);
//         setError('Demo mode: Add your Gemini API key to .env file for AI generation');
//       }
//     } catch (err) {
//       setError('Failed to generate scent. Please try again.');
//       console.error('Generation error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSave = () => {
//     if (generatedScent) {
//       saveScentToStorage(generatedScent);
//       setSavedScents(getSavedScents());
//       // Show success feedback
//       const originalError = error;
//       setError('✅ Scent saved successfully!');
//       setTimeout(() => setError(originalError), 2000);
//     }
//   };

//   const handleShare = async () => {
//     if (generatedScent) {
//       const shareText = `🌸 I created "${generatedScent.name}" with AI Scent Lab! 

// ${generatedScent.description}

// Top Notes: ${generatedScent.topNotes.join(', ')}
// Heart Notes: ${generatedScent.middleNotes.join(', ')}
// Base Notes: ${generatedScent.baseNotes.join(', ')}

// Try it yourself at: ${window.location.origin}`;

//       try {
//         if (navigator.clipboard && window.isSecureContext) {
//           await navigator.clipboard.writeText(shareText);
//           const originalError = error;
//           setError('✅ Scent details copied to clipboard!');
//           setTimeout(() => setError(originalError), 2000);
//         } else {
//           // Fallback for older browsers or non-HTTPS
//           const textArea = document.createElement('textarea');
//           textArea.value = shareText;
//           document.body.appendChild(textArea);
//           textArea.select();
//           document.execCommand('copy');
//           document.body.removeChild(textArea);
//           const originalError = error;
//           setError('✅ Scent details copied to clipboard!');
//           setTimeout(() => setError(originalError), 2000);
//         }
//       } catch (err) {
//         console.error('Failed to copy to clipboard:', err);
//         setError('❌ Failed to copy to clipboard');
//       }
//     }
//   };

//   const calculateScentStrength = (ingredients: { name: string; percentage: string }[]): 'Light' | 'Medium' | 'Strong' => {
//     const totalPercentage = ingredients.reduce((sum, ingredient) => {
//       const percentage = parseInt(ingredient.percentage.replace('%', ''));
//       return sum + percentage;
//     }, 0);

//     if (totalPercentage > 40) return 'Strong';
//     if (totalPercentage > 20) return 'Medium';
//     return 'Light';
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center mb-4">
//             <Beaker className="h-12 w-12 text-white mr-3" />
//             <h1 className="text-5xl font-bold text-white">AI Scent Lab</h1>
//           </div>
//           <p className="text-xl text-white/90">Create unique fragrances with artificial intelligence</p>
//           <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 max-w-lg mx-auto">
//             <p className="text-white/80 text-sm">
//               <Beaker className="h-4 w-4 inline mr-1" />
//               Add your Gemini API key to the .env file for AI-powered scent generation
//             </p>
//           </div>
//         </div>

//         {/* Main Interface */}
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
//             {/* Input Section */}
//             <div className="mb-8">
//               <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-3">
//                 Describe your perfect scent
//               </label>
//               <textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Describe the fragrance you want to create... (e.g., 'A warm, cozy scent reminiscent of autumn mornings with coffee and vanilla')"
//                 className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-800 placeholder-gray-500 resize-none"
//               />
//             </div>

//             {/* Preset Categories */}
//             <div className="mb-8">
//               <p className="text-sm font-medium text-gray-600 mb-3">Quick inspiration:</p>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 {presetCategories.map((preset) => (
//                   <button
//                     key={preset.label}
//                     onClick={() => setDescription(preset.description)}
//                     className="p-3 text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-xl hover:from-purple-200 hover:to-pink-200 transition-all duration-200 font-medium"
//                   >
//                     {preset.label}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Generate Button */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-8">
//               <button
//                 onClick={handleGenerate}
//                 disabled={loading}
//                 className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <Loader className="animate-spin h-5 w-5 mr-2" />
//                     Creating your scent...
//                   </>
//                 ) : (
//                   <>
//                     <Sparkles className="h-5 w-5 mr-2" />
//                     Generate Scent
//                   </>
//                 )}
//               </button>
              
//               <button
//                 onClick={() => setShowSaved(!showSaved)}
//                 className="bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center"
//               >
//                 <BookOpen className="h-5 w-5 mr-2" />
//                 My Scents ({savedScents.length})
//               </button>
//             </div>

//             {/* Error Display */}
//             {error && (
//               <div className={`mb-6 p-4 rounded-xl flex items-center ${
//                 error.includes('✅') 
//                   ? 'bg-green-50 border border-green-200' 
//                   : 'bg-red-50 border border-red-200'
//               }`}>
//                 <AlertTriangle className={`h-5 w-5 mr-3 ${
//                   error.includes('✅') ? 'text-green-500' : 'text-red-500'
//                 }`} />
//                 <p className={error.includes('✅') ? 'text-green-700' : 'text-red-700'}>{error}</p>
//               </div>
//             )}
//           </div>

//           {/* Results */}
//           {generatedScent && (
//             <ScentCard
//               scent={generatedScent}
//               strength={calculateScentStrength(generatedScent.ingredients)}
//               onSave={handleSave}
//               onShare={handleShare}
//             />
//           )}

//           {/* Saved Scents */}
//           {showSaved && (
//             <SavedScents
//               scents={savedScents}
//               onClose={() => setShowSaved(false)}
//               onScentSelect={setGeneratedScent}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScentGenerator;
import React, { useState, useEffect } from 'react';
import { Sparkles, Loader, AlertTriangle, Beaker, BookOpen } from 'lucide-react';
import { generateScent, mockScentData } from '../utils/apiUtils';
import { saveScentToStorage, getSavedScents } from '../utils/storageUtils';
import { generateScentPDF, generateScentImage } from '../utils/pdfUtils';
import ScentCard from './ScentCard';
import SavedScents from './SavedScents';

interface GeneratedScent {
  name: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  ingredients: { name: string; percentage: string }[];
  description: string;
  timestamp?: number;
}

const ScentGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [generatedScent, setGeneratedScent] = useState<GeneratedScent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedScents, setSavedScents] = useState<GeneratedScent[]>([]);
  const [showSaved, setShowSaved] = useState(false);

  const presetCategories = [
    { label: "Fresh Ocean", description: "A crisp oceanic fragrance with sea salt, marine algae, and coastal breeze notes" },
    { label: "Warm Vanilla", description: "A comforting vanilla blend with caramel, bourbon, and creamy sandalwood undertones" },
    { label: "Floral Garden", description: "A romantic bouquet of blooming roses, jasmine, and lily with green stem accents" },
    { label: "Woody Forest", description: "An earthy composition of cedar, pine, moss, and damp soil after rain" }
  ];

  useEffect(() => {
    setSavedScents(getSavedScents());
  }, []);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a scent description');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateScent(description);
      if (result) {
        const scentWithTimestamp = {
          ...result,
          timestamp: Date.now()
        };
        setGeneratedScent(scentWithTimestamp);
      } else {
        // Use fallback data
        const fallbackScent = {
          ...mockScentData,
          name: `Demo: ${mockScentData.name}`,
          timestamp: Date.now()
        };
        setGeneratedScent(fallbackScent);
        setError('Demo mode: Add your Gemini API key to .env file for AI generation');
      }
    } catch (err) {
      setError('Failed to generate scent. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (type: 'pdf' | 'image') => {
    if (generatedScent) {
      try {
        if (type === 'pdf') {
          await generateScentPDF(generatedScent, calculateScentStrength(generatedScent.ingredients));
          setError('✅ PDF downloaded successfully!');
        } else {
          const imageData = await generateScentImage(generatedScent, calculateScentStrength(generatedScent.ingredients));
          
          // Create download link for image
          const link = document.createElement('a');
          link.download = `${generatedScent.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_scent.png`;
          link.href = imageData;
          link.click();
          
          setError('✅ Image downloaded successfully!');
        }
        
        // Also save to localStorage
        saveScentToStorage(generatedScent);
        setSavedScents(getSavedScents());
        
        setTimeout(() => setError(null), 3000);
      } catch (err) {
        console.error('Save error:', err);
        setError('❌ Failed to save file. Please try again.');
        setTimeout(() => setError(null), 3000);
      }
    }
  };

  const handleShare = async () => {
    if (generatedScent) {
      const shareText = `🌸 I created "${generatedScent.name}" with AI Scent Lab!

${generatedScent.description}

Top Notes: ${generatedScent.topNotes.join(', ')}
Heart Notes: ${generatedScent.middleNotes.join(', ')}
Base Notes: ${generatedScent.baseNotes.join(', ')}

Key Ingredients: ${generatedScent.ingredients.map(ing => `${ing.name} (${ing.percentage})`).join(', ')}

Create your own at: ${window.location.origin}`;
      try {
        if (navigator.share) {
          // Use native sharing if available (mobile devices)
          await navigator.share({
            title: `${generatedScent.name} - AI Generated Scent`,
            text: shareText,
            url: window.location.origin
          });
          setError('✅ Shared successfully!');
        } else if (navigator.clipboard && window.isSecureContext) {
          // Use clipboard API
          await navigator.clipboard.writeText(shareText);
          setError('✅ Scent details copied to clipboard!');
        } else {
          // Fallback for older browsers or non-HTTPS
          const textArea = document.createElement('textarea');
          textArea.value = shareText;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setError('✅ Scent details copied to clipboard!');
        }
        setTimeout(() => setError(null), 3000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        setError('❌ Failed to copy to clipboard');
      }
    }
  };

  const calculateScentStrength = (ingredients: { name: string; percentage: string }[]): 'Light' | 'Medium' | 'Strong' => {
    const totalPercentage = ingredients.reduce((sum, ingredient) => {
      const percentage = parseInt(ingredient.percentage.replace('%', ''));
      return sum + percentage;
    }, 0);

    if (totalPercentage > 40) return 'Strong';
    if (totalPercentage > 20) return 'Medium';
    return 'Light';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Beaker className="h-12 w-12 text-white mr-3" />
            <h1 className="text-5xl font-bold text-white">AI Scent Lab</h1>
          </div>
          <p className="text-xl text-white/90">Create unique fragrances with artificial intelligence</p>
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 max-w-lg mx-auto">
            <p className="text-white/80 text-sm">
              <Beaker className="h-4 w-4 inline mr-1" />
              Add your Gemini API key to the .env file for AI-powered scent generation
            </p>
          </div>
        </div>

        {/* Main Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
            {/* Input Section */}
            <div className="mb-8">
              <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-3">
                Describe your perfect scent
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the fragrance you want to create... (e.g., 'A warm, cozy scent reminiscent of autumn mornings with coffee and vanilla')"
                className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-800 placeholder-gray-500 resize-none"
              />
            </div>

            {/* Preset Categories */}
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-600 mb-3">Quick inspiration:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presetCategories.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setDescription(preset.description)}
                    className="p-3 text-sm bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-xl hover:from-purple-200 hover:to-pink-200 transition-all duration-200 font-medium"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Creating your scent...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Scent
                  </>
                )}
              </button>
              
              <button
                onClick={() => setShowSaved(!showSaved)}
                className="bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                My Scents ({savedScents.length})
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className={`mb-6 p-4 rounded-xl flex items-center ${
                error.includes('✅') 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <AlertTriangle className={`h-5 w-5 mr-3 ${
                  error.includes('✅') ? 'text-green-500' : 'text-red-500'
                }`} />
                <p className={error.includes('✅') ? 'text-green-700' : 'text-red-700'}>{error}</p>
              </div>
            )}
          </div>

          {/* Results */}
          {generatedScent && (
            <ScentCard
              scent={generatedScent}
              strength={calculateScentStrength(generatedScent.ingredients)}
              onSave={handleSave}
              onShare={handleShare}
            />
          )}

          {/* Saved Scents */}
          {showSaved && (
            <SavedScents
              scents={savedScents}
              onClose={() => setShowSaved(false)}
              onScentSelect={setGeneratedScent}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScentGenerator;