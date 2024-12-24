import React from 'react';
import { Suit } from '../types/cards';

interface SuitSelectionModalProps {
  onSelectSuit: (suit: Suit) => void;
  onClose: () => void;
}

const suits: Suit[] = ['hearts', 'diamonds', 'clubs', 'spades'];

const SuitSelectionModal: React.FC<SuitSelectionModalProps> = ({ onSelectSuit, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Select a Suit</h2>
        <div className="suits">
          {suits.map(suit => (
            <button key={suit} onClick={() => onSelectSuit(suit)}>
              {suit}
            </button>
          ))}
        </div>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SuitSelectionModal;