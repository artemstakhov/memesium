import React, { useState, useEffect } from 'react';
import api from '../api/axios-config';
import likeService from '../services/likeService';
import MemeCard from '../components/MemeCard';
import EditMemeModal from '../components/EditMemeModal';
import MemeDetailsModal from '../components/MemeDetailsModal';
import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import '../styles/main.scss';

const ListView = () => {
  const [memes, setMemes] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMemes = async () => {
      setIsLoading(true);
      try {
        const response = await api.get('/memes');
        const updatedMemes = likeService.initMemeLikes(response.data);
        setMemes(updatedMemes);
      } catch (error) {
        console.error('Error fetching memes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMemes();
  }, []);

  const handleLike = (id) => {
    const updatedMemes = memes.map(meme =>
      meme.id === id ? 
        { ...meme, liked: !meme.liked, likes: meme.likes + (meme.liked ? -1 : 1) } 
        : meme
    );
    setMemes(updatedMemes);
    likeService.saveLikes(updatedMemes);
  };

  const handleImageClick = (meme) => {
    setSelectedMeme(meme);
    setIsDetailsModalOpen(true);
  };

  const handleEditClick = (meme) => {
    setSelectedMeme(meme);
    setIsDetailsModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleSaveMeme = (updatedMeme) => {
    const updatedMemes = memes.map(meme =>
      meme.id === updatedMeme.id ? updatedMeme : meme
    );
    
    setMemes(updatedMemes);
    Cookies.set(`meme_${updatedMeme.id}`, JSON.stringify(updatedMeme), { expires: 7 });
    
    setIsEditModalOpen(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="py-6 container mx-auto px-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 my-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {memes.map((meme) => (
            <MemeCard 
              key={meme.id} 
              meme={meme} 
              onLike={handleLike}
              onImageClick={handleImageClick}
            />
          ))}
        </motion.div>
      )}

      <MemeDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        meme={selectedMeme}
        onEdit={handleEditClick}
      />

      <EditMemeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        meme={selectedMeme}
        onSave={handleSaveMeme}
      />
    </div>
  );
};

export default ListView;