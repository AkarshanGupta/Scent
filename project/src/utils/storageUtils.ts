interface Scent {
  name: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  ingredients: { name: string; percentage: string }[];
  description: string;
  timestamp?: number;
}

const STORAGE_KEY = 'aiScentLab_savedScents';

export const saveScentToStorage = (scent: Scent): void => {
  try {
    const existingScents = getSavedScents();
    const newScent = {
      ...scent,
      timestamp: scent.timestamp || Date.now()
    };
    
    // Check if scent already exists (by name)
    const exists = existingScents.some(s => s.name === scent.name);
    if (!exists) {
      const updatedScents = [newScent, ...existingScents];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScents));
    }
  } catch (error) {
    console.error('Failed to save scent to storage:', error);
  }
};

export const getSavedScents = (): Scent[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const scents = JSON.parse(stored);
      // Sort by timestamp, newest first
      return scents.sort((a: Scent, b: Scent) => (b.timestamp || 0) - (a.timestamp || 0));
    }
    return [];
  } catch (error) {
    console.error('Failed to load scents from storage:', error);
    return [];
  }
};

export const removeScentFromStorage = (index: number): void => {
  try {
    const scents = getSavedScents();
    if (index >= 0 && index < scents.length) {
      scents.splice(index, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scents));
    }
  } catch (error) {
    console.error('Failed to remove scent from storage:', error);
  }
};

export const clearAllScents = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear scents from storage:', error);
  }
};