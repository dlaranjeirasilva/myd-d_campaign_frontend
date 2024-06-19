import closeIcon from '../../images/close-icon.png';
import { getImageUrl } from '../../utils/CardPresets';
import './CardDetailsPopup.css';

function CardDetailsPopup({card, onClose}) {
  return(
    <section className={`modal ${card ? 'modal_opened' : ''}`}>
      <div className="modal__popup-container">
        <img
          id="popup-modal__button"
          className="modal__popup-button"
          src={closeIcon}
          alt="Ícone para fechar"
          onClick={onClose}
        />
        {card && (
          <div className="modal__popup-info">
            <img
              src={getImageUrl(card.type)}
              alt={card.name}
              className="modal__popup-image"
            />
            <div className='modal__popup-content-resume'>
              <h2 className="modal__popup-content-card-title">{card.name}</h2>
              <h2 className='modal__popup-resume-title'>Skills</h2>
              <div className='modal__popup-resume-list'>
                {Object.keys(card.skills).length === 0 ? (
                  <p className='modal__popup-resume-desc'>No particular skill</p>
                ) : (
                  Object.entries(card.skills).map(([key, value]) => (
                    <p className='modal__popup-resume-desc' key={key}>{key}: {value}</p>
                  ))
                )}
              </div>
              <h2 className='modal__popup-resume-title'>Speed</h2>
              <div className='modal__popup-resume-list'>
                {Object.keys(card.speed).length === 0 ? (
                  <p className='modal__popup-resume-desc'>Static entity</p>
                ) : (
                  Object.entries(card.speed).map(([key, value]) => (
                    <p className='modal__popup-resume-desc' key={key}>{key}: {value} ft.</p>
                  ))
                )}
              </div>
              <h2 className='modal__popup-resume-title'>Environments</h2>
              <div className='modal__popup-resume-list'>
                {Object.keys(card.environments).length === 0 ? (
                  <p className='modal__popup-resume-desc'>Unknown fixed environments, may appear anywhere</p>
                ) : (
                  Object.entries(card.environments).map(([key, value], index, array) => (
                    <>
                    <p className='modal__popup-resume-desc' key={key}>{value}</p>
                    {index < array.length - 1 && <p className='modal__popup-resume-desc'>-</p>}
                    </>
                  ))
                )}
              </div>
              <h2 className='modal__popup-resume-title'>Languages</h2>
              <div className='modal__popup-resume-list'>
                {card.languages ? (card.languages.split(',').map((language, index) => (
                  <p className='modal__popup-resume-desc' key={index}>{language.trim()}</p>
                ))) : (
                  <p className='modal__popup-resume-desc'>This creature do not speak</p>
                )}
              </div>
              <h2 className='modal__popup-resume-title'>Senses</h2>
              <div className='modal__popup-resume-list'>
                {card.senses ? (card.senses.split(',').map((sense, index) => (
                  <p className='modal__popup-resume-desc' key={index}> {sense.trim()}</p>
                ))) : (
                  <p className='modal__popup-resume-desc'>This creature is nonsense :D</p>
                )}
              </div>
            </div>
            <div className='modal__popup-content-actions'>
              <div className='modal__popup-action-list'>
                <h2 className='modal__popup-action-title'>Actions</h2>
                {card.actions && card.actions.length !== null ? (card.actions.map((actions, index) => (
                  <p className='modal__popup-action-desc' key={index}>
                    <strong className='modal__popup-action-name'>{actions.name}:</strong> {actions.desc}
                  </p>
                ))) : (
                  <p className='modal__popup-action-desc'>No actions known</p>
                )}
              </div>
              <div className='modal__popup-action-list'>
                <h2 className='modal__popup-action-title'>Special Abilities</h2>
                {card.special_abilities && card.special_abilities.length !== null ? (card.special_abilities.map((abilities, index) => (
                  <p className='modal__popup-action-desc' key={index}>
                    <strong className='modal__popup-action-name'>{abilities.name}:</strong> {abilities.desc}
                  </p>
                ))) : (
                  <p className='modal__popup-action-desc'>No special abilities known</p>
                )}
              </div>
              <div className='modal__popup-action-list'>
                <h2 className='modal__popup-action-title'>Legendary Actions</h2>
                {card.legendary_actions && card.legendary_actions.length !== null ? (card.legendary_actions.map((action, index) => (
                  <p className='modal__popup-action-desc' key={index}>
                    <strong className='modal__popup-action-name'>{action.name}:</strong> {action.desc}
                  </p>
                ))) : (
                  <p className='modal__popup-action-desc'>No lengendary actions known</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CardDetailsPopup;