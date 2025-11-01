import { AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

interface SimilarityDisplayProps {
  similarityValue: number;
}

export default function SimilarityDisplay({
  similarityValue,
}: SimilarityDisplayProps) {
  const [showSimilarity, setShowSimilarity] = useState(true);
  const [displayValue, setDisplayValue] = useState(similarityValue);

  const lastUpdateRef = useRef(Date.now());
  const THROTTLE_MS = 500; // 500ms마다 한 번만 업데이트

  useEffect(() => {
    const now = Date.now();
    if (now - lastUpdateRef.current >= THROTTLE_MS) {
      setDisplayValue(Math.round(similarityValue * 10) / 10);
      lastUpdateRef.current = now;
    }
  }, [similarityValue]);

  return (
    <>
      <AnimatePresence>
        {showSimilarity && (
          <div className='fixed bottom-8 right-8 z-30'>
            <div className='relative bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200/50 p-6 min-w-[180px]'>
              <button
                onClick={() => setShowSimilarity(false)}
                className='absolute -top-2 -right-2 w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg'
              >
                <FiEyeOff className='w-4 h-4 text-white' />
              </button>
              <div>
                <h3 className='text-sm font-semibold text-gray-900 mb-3'>
                  현재 유사도
                </h3>

                <div
                  className='text-4xl font-bold bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent mb-2 w-36 text-center'
                  key={displayValue}
                >
                  {displayValue.toFixed(1)}%
                </div>
                <div className='flex items-center justify-center gap-1 mt-3'>
                  <div className='w-full bg-gray-200 rounded-full h-2.5 overflow-hidden'>
                    <div className='h-full bg-linear-to-r from-blue-500 to-indigo-500 rounded-full' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {!showSimilarity && (
        <button
          onClick={() => setShowSimilarity(true)}
          className='fixed bottom-8 right-8 z-30 w-12 h-12 bg-linear-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all shadow-md'
        >
          <FiEye className='w-6 h-6 text-white' />
        </button>
      )}
    </>
  );
}
