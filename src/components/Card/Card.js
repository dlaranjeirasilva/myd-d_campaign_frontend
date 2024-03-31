import positiveCounter from '../../images/counter-positive2.png';
import negativeCounter from '../../images/counter-negative2.png';
import { getImageUrl, calculateModifier } from '../../utils/CardPresets';

import './Card.css';

function Card({
  card,
  onCardClick,
  updateKillCount,
}) {

  function handleClick() {
    onCardClick(card);
  }

  return(
    <ul id={card.slug} className="card">
      <h2 className="card__title">{card.name}</h2>
      <div className='card__upper-section'>
        <div className='card__hit-points'>
          <h2 className='card__hit-points-title'>Hit Points</h2>
          <p className='card__hit-points-value'>{card.hit_points}</p>
          <p className='card__hit-points-value'>({card.hit_dice})</p>
        </div>
        <span>{card.experience}</span> 
        <div className='card__counter'>
          <h2 className='card__counter-title'>Kill Counter</h2>
          <div className='card__counter-controls'>
            <img
              src={negativeCounter}
              alt="Minus counter"
              className='card__counter-button'
              onClick={() => updateKillCount(card.name, false)}
            />
            <p className='card__counter-display'>
              {JSON.parse(sessionStorage.getItem(`savedCharacterData`))?.killCounts?.[card.name] || 0}
            </p>
            <img
              src={positiveCounter}
              alt="Plus counter"
              className='card__counter-button'
              onClick={() => updateKillCount(card.name, true)}
            />
          </div>
        </div>
      </div>
      <img
        src={ getImageUrl(card.type) }
        alt={card.name}
        className="card__image"
        onClick={handleClick}
      />
      <li className="card__info">
        <h2 className="card__attribute">{card.size} {card.type}</h2>
        <h2 className="card__attribute">Challenge Rating {card.challenge_rating}</h2>
        <div>
          <h2 className="card__attribute">{card.armor_desc ? card.armor_desc : "Natural Armor"} {card.armor_class}</h2>
          <h2 className="card__attribute">{card.alignment}
            <img 
              src={getImageUrl(card.alignment)}
              alt={card.alignment}
              className='card__alignment'
            />
          </h2>
        </div>
        <ul className="card__stats">
          <li>
            <p>STR</p>
            <p>{card.strength} {`(${calculateModifier(card.strength)})`}</p>
          </li>
          <li>
            <p>DEX</p>
            <p>{card.dexterity} {`(${calculateModifier(card.dexterity)})`}</p>
          </li>
          <li>
            <p>CON</p>
            <p>{card.constitution} {`(${calculateModifier(card.constitution)})`}</p>
          </li>
          <li>
            <p>INT</p>
            <p>{card.intelligence} {`(${calculateModifier(card.intelligence)})`}</p>
          </li>
          <li>
            <p>WIS</p>
            <p>{card.wisdom} {`(${calculateModifier(card.wisdom)})`}</p>
          </li>
          <li>
            <p>CHA</p>
            <p>{card.charisma} {`(${calculateModifier(card.charisma)})`}</p>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default Card;