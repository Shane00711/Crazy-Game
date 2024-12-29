import React from 'react';
import { Suit } from '../types/cards';
import { useModal } from '../ModelContext';
import '../style.css';

interface SuitSelectionModalProps {
  onSelectSuit: (suit: Suit) => void;
}


const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

const SuitSelectionModal: React.FC<SuitSelectionModalProps> = ({ onSelectSuit }) => {
  const { isOpen, closeModal } = useModal();
  if (!isOpen) return null;

  function isRed(suit: string){
    return suit === 'hearts' || suit === 'diamonds';
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select a Suit</h2>
        <div className="suits">
          {suits.map(suit => (
            <button key={suit} onClick={() => onSelectSuit(suit)}>
              <span className={`text-2xl ${isRed(suit) ? 'text-red-500' : 'text-black'}`}>{suit === 'hearts' ? '♥' : 
                suit === 'diamonds' ? '♦' : 
                suit === 'clubs' ? '♣' : '♠'}</span>
            </button>
          ))}
        </div>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
};

export default SuitSelectionModal;