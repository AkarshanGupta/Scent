// import React from 'react';
// import { Save, Share2, Droplet, Leaf, Trees } from 'lucide-react';

// interface Scent {
//   name: string;
//   topNotes: string[];
//   middleNotes: string[];
//   baseNotes: string[];
//   ingredients: { name: string; percentage: string }[];
//   description: string;
// }

// interface ScentCardProps {
//   scent: Scent;
//   strength: 'Light' | 'Medium' | 'Strong';
//   onSave: () => void;
//   onShare: () => void;
// }

// const ScentCard: React.FC<ScentCardProps> = ({ scent, strength, onSave, onShare }) => {
//   const getStrengthColor = (strength: string) => {
//     switch (strength) {
//       case 'Light': return 'bg-green-500';
//       case 'Medium': return 'bg-yellow-500';
//       case 'Strong': return 'bg-red-500';
//       default: return 'bg-gray-500';
//     }
//   };

//   const getStrengthWidth = (strength: string) => {
//     switch (strength) {
//       case 'Light': return 'w-1/3';
//       case 'Medium': return 'w-2/3';
//       case 'Strong': return 'w-full';
//       default: return 'w-1/4';
//     }
//   };

//   return (
//     <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">{scent.name}</h2>
//         <div className="flex gap-3">
//           <button
//             onClick={onSave}
//             className="bg-blue-100 text-blue-700 p-3 rounded-xl hover:bg-blue-200 transition-colors duration-200"
//           >
//             <Save className="h-5 w-5" />
//           </button>
//           <button
//             onClick={onShare}
//             className="bg-green-100 text-green-700 p-3 rounded-xl hover:bg-green-200 transition-colors duration-200"
//           >
//             <Share2 className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Scent Strength Indicator */}
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-medium text-gray-600">Scent Strength</span>
//           <span className="text-sm font-semibold text-gray-800">{strength}</span>
//         </div>
//         <div className="w-full bg-gray-200 rounded-full h-2">
//           <div className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor(strength)} ${getStrengthWidth(strength)}`}></div>
//         </div>
//       </div>

//       {/* Notes Section */}
//       <div className="grid md:grid-cols-3 gap-6 mb-8">
//         <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
//           <div className="flex items-center mb-4">
//             <Droplet className="h-6 w-6 text-blue-600 mr-2" />
//             <h3 className="text-lg font-semibold text-blue-800">Top Notes</h3>
//           </div>
//           <ul className="space-y-2">
//             {scent.topNotes.map((note, index) => (
//               <li key={index} className="text-blue-700 bg-blue-100 px-3 py-1 rounded-lg text-sm">
//                 {note}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
//           <div className="flex items-center mb-4">
//             <Leaf className="h-6 w-6 text-green-600 mr-2" />
//             <h3 className="text-lg font-semibold text-green-800">Middle Notes</h3>
//           </div>
//           <ul className="space-y-2">
//             {scent.middleNotes.map((note, index) => (
//               <li key={index} className="text-green-700 bg-green-100 px-3 py-1 rounded-lg text-sm">
//                 {note}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
//           <div className="flex items-center mb-4">
//             <Trees className="h-6 w-6 text-amber-600 mr-2" />
//             <h3 className="text-lg font-semibold text-amber-800">Base Notes</h3>
//           </div>
//           <ul className="space-y-2">
//             {scent.baseNotes.map((note, index) => (
//               <li key={index} className="text-amber-700 bg-amber-100 px-3 py-1 rounded-lg text-sm">
//                 {note}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Key Ingredients */}
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Ingredients</h3>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {scent.ingredients.map((ingredient, index) => (
//             <div key={index} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
//               <span className="text-gray-800 font-medium">{ingredient.name}</span>
//               <span className="text-purple-600 font-semibold">{ingredient.percentage}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Description */}
//       <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
//         <h3 className="text-lg font-semibold text-gray-800 mb-3">Fragrance Profile</h3>
//         <p className="text-gray-700 leading-relaxed">{scent.description}</p>
//       </div>
//     </div>
//   );
// };

// export default ScentCard;
import React from 'react';
import { Download, Share2, Droplet, Leaf, Trees, FileText, Image } from 'lucide-react';
import { generateScentPDF, generateScentImage } from '../utils/pdfUtils';

interface Scent {
  name: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  ingredients: { name: string; percentage: string }[];
  description: string;
}

interface ScentCardProps {
  scent: Scent;
  strength: 'Light' | 'Medium' | 'Strong';
  onSave: (type: 'pdf' | 'image') => void;
  onShare: () => void;
}

const ScentCard: React.FC<ScentCardProps> = ({ scent, strength, onSave, onShare }) => {
  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'Light': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Strong': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStrengthWidth = (strength: string) => {
    switch (strength) {
      case 'Light': return 'w-1/3';
      case 'Medium': return 'w-2/3';
      case 'Strong': return 'w-full';
      default: return 'w-1/4';
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">{scent.name}</h2>
        <div className="flex gap-3">
          <div className="relative group">
            <button className="bg-blue-100 text-blue-700 p-3 rounded-xl hover:bg-blue-200 transition-colors duration-200">
              <Download className="h-5 w-5" />
            </button>
            <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <button
                onClick={() => onSave('pdf')}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg w-full text-left"
              >
                <FileText className="h-4 w-4" />
                Save as PDF
              </button>
              <button
                onClick={() => onSave('image')}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg w-full text-left"
              >
                <Image className="h-4 w-4" />
                Save as Image
              </button>
            </div>
          </div>
          <button
            onClick={onShare}
            className="bg-green-100 text-green-700 p-3 rounded-xl hover:bg-green-200 transition-colors duration-200"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scent Strength Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Scent Strength</span>
          <span className="text-sm font-semibold text-gray-800">{strength}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`h-2 rounded-full transition-all duration-500 ${getStrengthColor(strength)} ${getStrengthWidth(strength)}`}></div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <Droplet className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-blue-800">Top Notes</h3>
          </div>
          <ul className="space-y-2">
            {scent.topNotes.map((note, index) => (
              <li key={index} className="text-blue-700 bg-blue-100 px-3 py-1 rounded-lg text-sm">
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <Leaf className="h-6 w-6 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-green-800">Middle Notes</h3>
          </div>
          <ul className="space-y-2">
            {scent.middleNotes.map((note, index) => (
              <li key={index} className="text-green-700 bg-green-100 px-3 py-1 rounded-lg text-sm">
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <Trees className="h-6 w-6 text-amber-600 mr-2" />
            <h3 className="text-lg font-semibold text-amber-800">Base Notes</h3>
          </div>
          <ul className="space-y-2">
            {scent.baseNotes.map((note, index) => (
              <li key={index} className="text-amber-700 bg-amber-100 px-3 py-1 rounded-lg text-sm">
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key Ingredients */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Ingredients</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scent.ingredients.map((ingredient, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-xl flex justify-between items-center">
              <span className="text-gray-800 font-medium">{ingredient.name}</span>
              <span className="text-purple-600 font-semibold">{ingredient.percentage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Fragrance Profile</h3>
        <p className="text-gray-700 leading-relaxed">{scent.description}</p>
      </div>
    </div>
  );
};

export default ScentCard;