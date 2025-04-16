import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/main.scss';

const MemeDetailsModal = ({ isOpen, onClose, meme, onEdit }) => {
  if (!meme) return null;
  
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
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="modal-content"
            >
              <ModalContent className=' bg-white shadow-lg rounded-lg'>
                <ModalHeader className="border-b pb-3">{meme.name}</ModalHeader>
                <ModalBody className="py-6">
                  <motion.div 
                    className="flex justify-center mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img 
                      src={meme.image} 
                      alt={meme.name} 
                      className="max-h-80 rounded object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/400x300/png?text=Image+Not+Found';
                      }}
                    />
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-gray-600">
                      <span className="font-semibold">{meme.likes}</span> {meme.likes === 1 ? 'like' : 'likes'}
                    </p>
                  </motion.div>
                </ModalBody>
                <ModalFooter className="border-t pt-3">
                  <Button color="secondary" onClick={onClose}>Close</Button>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button color="primary" onClick={() => onEdit(meme)}>Edit</Button>
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

export default MemeDetailsModal;