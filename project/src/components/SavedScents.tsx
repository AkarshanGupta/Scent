import React from 'react';
import { X, Clock, Trash2 } from 'lucide-react';
import { removeScentFromStorage } from '../utils/storageUtils';

interface Scent {
  name: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  ingredients: { name: string; percentage: string }[];
  description: string;
  timestamp?: number;
}

interface SavedScentsProps {
  scents: Scent[];
  onClose: () => void;
  onScentSelect: (scent: Scent) => void;
}

const SavedScents: React.FC<SavedScentsProps> = ({ scents, onClose, onScentSelect }) => {
  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Unknown date';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRemove = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    removeScentFromStorage(index);
    window.location.reload(); // Simple refresh to update the list
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Saved Scents</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-2"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {scents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No saved scents yet</p>
          <p className="text-gray-400 text-sm mt-2">Generate and save your favorite fragrances!</p>
        </div>
      ) : (
        <div className="grid gap-4 max-h-96 overflow-y-auto">
          {scents.map((scent, index) => (
            <div
              key={index}
              onClick={() => {
                onScentSelect(scent);
                onClose();
              }}
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl cursor-pointer hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-lg mb-2">{scent.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{scent.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <div className="flex items-center text-xs text-blue-600">
                      <span className="font-medium mr-1">Top:</span>
                      <span>{scent.topNotes.slice(0, 2).join(', ')}</span>
                    </div>
                    <div className="flex items-center text-xs text-green-600">
                      <span className="font-medium mr-1">Heart:</span>
                      <span>{scent.middleNotes.slice(0, 2).join(', ')}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(scent.timestamp)}
                  </div>
                </div>
                <button
                  onClick={(e) => handleRemove(index, e)}
                  className="text-red-400 hover:text-red-600 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedScents;