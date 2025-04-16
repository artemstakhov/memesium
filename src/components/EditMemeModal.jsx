import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/main.scss';

const EditMemeModal = ({ isOpen, onClose, meme, onSave }) => {
    const [formData, setFormData] = useState({ name: '', image: '', likes: 0 });
    const [errors, setErrors] = useState({});
    const [imageSource, setImageSource] = useState('url');

    useEffect(() => {
        if (meme) {
            setFormData({
                name: meme?.name,
                image: meme?.image,
                likes: meme?.likes
            });
        }
    }, [meme]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'likes' ? parseInt(value) || 0 : value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name || formData.name.length < 3 || formData.name.length > 100) {
            newErrors.name = 'Name must be between 3 and 100 characters';
        }

        if (!formData.image.toLowerCase().match(/\.(jpg|jpeg)$/)) {
            newErrors.image = 'Image must be a JPG/JPEG format';
          }

        if (formData.likes < 0 || formData.likes > 99 || !Number.isInteger(formData.likes)) {
            newErrors.likes = 'Likes must be an integer between 0 and 99';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        onSave({
            ...meme,
            name: formData.name,
            image: formData.image,
            likes: formData.likes
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Check if the file is jpg/jpeg
            if (!file.type.match('image/jpeg')) {
                setErrors({ ...errors, image: 'File must be JPG format' });
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                setFormData({
                    ...formData,
                    image: event.target.result
                });
                setErrors({ ...errors, image: null });
            };
            reader.readAsDataURL(file);
        }
    };

    const setImageSourceType = (source) => {
        setImageSource(source);
        setErrors({ ...errors, image: null });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="modal-overlay"
                        onClick={onClose}
                    />

                    <Modal isOpen={isOpen} onClose={onClose} className="z-50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="modal-content"
                        >
                            <ModalContent className=' bg-white shadow-lg rounded-lg'>
                                <ModalHeader className="border-b pb-3">Edit Meme</ModalHeader>
                                <ModalBody className="py-6">
                                    <>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">ID</label>
                                            <Input value={meme?.id} disabled className="bg-gray-100" />
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                            <Input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={errors.name ? 'border-red-500' : ''}
                                                placeholder="Enter meme name"
                                            />
                                            {errors.name && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-500 text-sm mt-1"
                                                >
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </div>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Image Source</label>
                                            <Input
                                                name="image"
                                                value={formData.image}
                                                onChange={handleChange}
                                                className={errors.image ? 'border-red-500' : ''}
                                                placeholder="Enter image URL"
                                            />
                                            
                                            {errors.image && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-500 text-sm mt-1"
                                                >
                                                    {errors.image}
                                                </motion.p>
                                            )}
                                        </div>

                                        <AnimatePresence>
                                            {formData.image && !errors.image && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="mb-4 flex justify-center"
                                                >
                                                    <img
                                                        src={formData.image}
                                                        alt="preview"
                                                        className="max-h-40 rounded mt-2 object-contain"
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Likes</label>
                                            <Input
                                                name="likes"
                                                type="number"
                                                value={formData.likes}
                                                onChange={handleChange}
                                                className={errors.likes ? 'border-red-500' : ''}
                                                min="0"
                                                max="99"
                                            />
                                            {errors.likes && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-500 text-sm mt-1"
                                                >
                                                    {errors.likes}
                                                </motion.p>
                                            )}
                                        </div>
                                    </>
                                </ModalBody>
                                <ModalFooter className="border-t pt-3">
                                    <Button color="secondary" onClick={onClose}>Cancel</Button>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button color="primary" onClick={handleSubmit}>Save Changes</Button>
                                    </motion.div>
                                </ModalFooter>
                            </ModalContent>
                        </motion.div>
                    </Modal>
                </>
            )}
        </AnimatePresence>
    );
};

export default EditMemeModal;