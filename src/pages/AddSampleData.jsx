import React, { useState } from 'react';
import { addSampleProjects } from '../data/sampleProjects';
import { Upload, CheckCircle, AlertTriangle } from 'lucide-react';

function AddSampleData() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAddSampleData = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      const response = await addSampleProjects();
      setResult(response);
    } catch (error) {
      setResult({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Add Sample Data
          </h1>
          <p className="text-gray-600 mb-8">
            This will add sample project data to your Firestore database for testing the Progress Project page.
          </p>

          {result && (
            <div className={`mb-6 p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="h-5 w-5 mr-2" />
                ) : (
                  <AlertTriangle className="h-5 w-5 mr-2" />
                )}
                <span className="font-medium">{result.message}</span>
              </div>
            </div>
          )}

          <button
            onClick={handleAddSampleData}
            disabled={loading}
            className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Adding Sample Data...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Add Sample Projects
              </>
            )}
          </button>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              This will add 8 sample projects with different statuses, work types, and realistic data for testing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSampleData;