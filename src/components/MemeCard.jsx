import React from 'react';
import { Card, Image } from '@heroui/react';
import { motion } from 'framer-motion';
import '../styles/main.scss';

const MemeCard = ({ meme, onLike, onImageClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="meme-card"
    >
      <Card className="border-none shadow-none bg-transparent">
        <div 
          className="cursor-pointer overflow-hidden rounded-t-lg"
          onClick={() => onImageClick(meme)}
        >
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="flex justify-center bg-indigo-100 rounded-t-lg">
            <Image
              src={meme.image}
              alt={meme.name}
              className="w-100% h-48 object-cover m-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/400x300/png?text=Image+Not+Found';
              }}
            />
          </motion.div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-3 text-center truncate">{meme.name}</h2>
          <div className="flex justify-between items-center">
            <motion.div
              className={`like-button ${meme.liked ? 'liked' : ''}`}
              onClick={() => onLike(meme.id)}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              {meme.likes} {meme.likes === 1 ? 'like' : 'likes'}
            </motion.div>
            <a
              href={meme.image}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              View Original
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MemeCard;