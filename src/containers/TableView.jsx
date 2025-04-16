import React, { useState, useEffect } from 'react';
import api from '../api/axios-config';
import Cookies from 'js-cookie';
import likeService from '../services/likeService';
import EditMemeModal from '../components/EditMemeModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';
import '../styles/main.scss';

const TableView = () => {
    const [memes, setMemes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleEdit = (meme) => {
        setSelectedMeme(meme);
        setIsModalOpen(true);
    };

    const handleSave = (updatedMeme) => {
        const updatedMemes = memes.map(meme =>
            meme.id === updatedMeme.id ? updatedMeme : meme
        );

        setMemes(updatedMemes);
        Cookies.set(`meme_${updatedMeme.id}`, JSON.stringify(updatedMeme), { expires: 7 });

        setIsModalOpen(false);
    };

    return (
        <div className="py-6 container mx-auto px-4">

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <motion.div
                    className="overflow-x-auto my-4"
                    initial={{ opacity: 0, overflow: 'hidden' }}
                    animate={{ opacity: 1, overflow: 'visible' }}
                    transition={{ duration: 0.5 }}
                >
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Likes</th>
                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {memes.map((meme, index) => (
                                    <motion.tr
                                        key={meme.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="bg-white"
                                    >
                                        <td className="py-3 px-4 border-b border-gray-200">{meme.id}</td>
                                        <td className="py-3 px-4 border-b border-gray-200">{meme.name}</td>
                                        <td className="py-3 px-4 border-b border-gray-200">
                                            <div className="flex justify-center items-center gap-2">
                                                <span>{meme.likes}</span>
                                                    👍
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 border-b border-gray-200">
                                            <motion.div className="flex justify-center items-center gap-2">
                                            <Button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                                                onClick={() => handleEdit(meme)}
                                            >
                                                Edit
                                            </Button>
                                            </motion.div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </motion.div>
            )}

            <EditMemeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                meme={selectedMeme}
                onSave={handleSave}
            />
        </div>
    );
};

export default TableView;