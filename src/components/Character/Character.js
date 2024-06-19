import './Character.css';
import helmet from '../../images/helmet.png';
import armor from '../../images/armor.png';
import shoulder from '../../images/shoulder.png';
import off_hand from '../../images/off-hand.png';
import main_weapon from '../../images/main-weapon.png';
import necklace from '../../images/necklace.png';
import acessory from '../../images/acessory.png';
import waist from '../../images/waist.png';
import boots from '../../images/boots.png';
import EquipmentItem from '../EquipmentItem/EquipmentItem';
import { useState, useEffect } from 'react';
import { getImageUrl, calculateModifier } from '../../utils/CardPresets';

function Character({ classes, races, cards, killCounts, clearKillCount }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [name, setName] = useState({
    characterName: 'Anor Londo',
    playerName: 'Player'
  });
  const playerClasses = classes.map(characterClass => characterClass.slug);
  const alignments = 
  [
    {
      LG: 'Lawful Good',
      LN: 'Lawful Neutral',
      LE: 'Lawful Evil',
      NG: 'Neutral Good',
      NN: 'Neutral',
      NE: 'Neutral Evil',
      CG: 'Chaotic Good',
      CN: 'Chaotic Neutral',
      CE: 'Chaotic Evil',
    }
  ];
  const filteredCards = cards.filter(card => killCounts[card.name] && killCounts[card.name] > 0);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedRace, setSelectedRace] = useState('');
  const [selectedSubRace, setSelectedSubRace] = useState('');
  const [subRaces, setSubRaces] = useState([]);
  const [characterSpeed, setCharacterSpeed] = useState(0);
  const [selectedAlignment, setSelectedAlignment] = useState('');
  const [statScore, setStatScore] = useState({
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
    armorClass: 0,
    initiative: 0,
    experience: 0,
    proficiency: 0,
    inspiration: 0,
    strSavingThrow: 0,
    dexSavingThrow: 0,
    conSavingThrow: 0,
    intSavingThrow: 0,
    wisSavingThrow: 0,
    chaSavingThrow: 0,
    athletics: 0,
    acrobatics: 0,
    sleighOfHand: 0,
    stealth: 0,
    arcana: 0,
    history: 0,
    investigation: 0,
    nature: 0,
    religion: 0,
    animalHandling: 0,
    insight: 0,
    medicine: 0,
    perception: 0,
    survival: 0,
    deception: 0,
    intimidation: 0,
    performance: 0,
    persuasion: 0,
  });

  const [maxWeight, setMaxWeight] = useState(0);
  const [inventory, setInventory] = useState([
    { id: 1, quantity: 0, weight: 0, description: '' },
    { id: 2, quantity: 0, weight: 0, description: '' },
    { id: 3, quantity: 0, weight: 0, description: '' },
    { id: 4, quantity: 0, weight: 0, description: '' },
    { id: 5, quantity: 0, weight: 0, description: '' },  
  ]);

  const [equipment, setEquipment] = useState([
    { type:'helmet', name: 'Helmet of Ashes', img: helmet, bonus: 0, bonusType: '', weight: 0 },
    { type:'shoulder', name: 'Shoulder of Ashes', img: shoulder, bonus: 0, bonusType: '', weight: 0 },
    { type:'waist', name: 'Waist of Ashes', img: waist, bonus: 0, bonusType: '', weight: 0 },
    { type:'main-weapon', name: 'Sword of Ashes', img: main_weapon, bonus: 0, bonusType: '', damage: 0, critical: 0, weight: 0 },
    { type:'armor', name: 'Armor of Ashes', img: armor, bonus: 0, bonusType: '', armorClass: 0, stealth: 0, weight: 0 },
    { type:'off-hand', name: 'Axe of Ashes', img: off_hand, bonus: 0, bonusType: '', armorClass: 0, damage: 0, critical: 0, weight: 0 },
    { type:'acessory', name: 'Ring of Ashes', img: acessory, bonus: 0, bonusType: '' },
    { type:'necklace', name: 'Necklace of Ashes', img: necklace, bonus: 0, bonusType: '' },
    { type:'acessory', name: 'Ring of Ashes', img: acessory, bonus: 0, bonusType: '' },
    { type:'acessory', name: 'Ring of Ashes', img: acessory, bonus: 0, bonusType: '' },
    { type:'boots', name: 'Boots of Ashes', img: boots, bonus: 0, bonusType: '', weight: 0 },
    { type:'acessory', name: 'Ring of Ashes', img: acessory, bonus: 0, bonusType: '' },
  ]);

  const handleEquipmentChange = (index, field, value) => {
    const updatedEquipment = [...equipment];
    updatedEquipment[index][field] = value;
    setEquipment(updatedEquipment);
  };

  const groupedEquipment = [];
  for (let i = 0; i < equipment.length; i += 3) {
    groupedEquipment.push(equipment.slice(i, i + 3));
  }

  function handleStatScoreChange(stat, value) {
    setStatScore(prevScores => ({
      ...prevScores,
      [stat]: value
    }));
  }

  const handleNameChange = (event) => {
    const { name: inputName, value } = event.target;
    setName(prevState => ({
      ...prevState,
      [inputName]: value
    }));
  };

  const handleInventoryChange = (id, field, value) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setInventory(updatedInventory);
  };

  const handleMaxWeightChange = (value) => {
    setMaxWeight(value);
  };

  function handleRaceSelection(event) {
    const selectedRace = event.target.value;
    setSelectedRace(selectedRace);
    
    const selectedRaceObj = races.find(race => race.name === selectedRace);
    if (selectedRaceObj) {
        setCharacterSpeed(selectedRaceObj.speed.walk || 0);
        setSubRaces(selectedRaceObj.subraces || []);
    } else {
        setCharacterSpeed(0);
        setSubRaces([])
    }
    setSelectedSubRace('');
  }

  function handleSubRaceSelection(event) {
    setSelectedSubRace(event.target.value);
  }

  const handleAlignmentSelection = (event) => {
    setSelectedAlignment(event.target.value);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + playerClasses.length) % playerClasses.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % playerClasses.length);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const characterData = {
      currentImageIndex,
      name,
      selectedClass,
      selectedRace,
      selectedSubRace,
      subRaces,
      characterSpeed,
      statScore,
      maxWeight,
      inventory,
      equipment,
      selectedAlignment,
    };

    const characterDataJson = JSON.stringify(characterData);
    sessionStorage.setItem('savedCharacterData', characterDataJson);
  }

  useEffect(() => {
    const savedData = sessionStorage.getItem('savedCharacterData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setCurrentImageIndex(parsedData.currentImageIndex);
      setName(parsedData.name);
      setSelectedClass(parsedData.selectedClass);
      setSelectedRace(parsedData.selectedRace);
      setSelectedSubRace(parsedData.selectedSubRace);
      setCharacterSpeed(parsedData.characterSpeed);
      setStatScore(parsedData.statScore);
      setMaxWeight(parsedData.maxWeight);
      setInventory(parsedData.inventory);
      setEquipment(parsedData.equipment);
    }
  }, []);

  return(
    <section className="character">
      <form className="form" noValidate onSubmit={handleSubmit}>
        <h1 className="form__title">Character Sheet</h1>
        <section className='character-heading'>
          <div className="character-heading__details-vertical">
            <fieldset className='character-heading__details-vertical character-heading__details-vertical_bottom-padding'>
              <input
                id='character-name'
                className="character-heading__details character-heading__details_name"
                type="text"
                name="character-name"
                placeholder="Character Name"
                required
                value={name.characterName}
                onChange={handleNameChange}
                minLength="4"
                maxLength="40"
              />
              <label htmlFor='character-name' className='character-heading__details-label'>Character Name</label>
            </fieldset>
            <div className="character-heading__details-vertical-box">
              <fieldset className='character-heading__details-vertical'>
                <input
                  id='strength'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="strength"
                  placeholder="STR"
                  required
                  value={statScore.strength}
                  onChange={(event) => handleStatScoreChange('strength', event.target.value)}
                  min="1"
                  max="40"
                />
                <label htmlFor='strength' className='character-heading__details-label-stat'>STR</label>
                <label htmlFor='strength' className='character-heading__details-label-modifier'>{calculateModifier(statScore.strength)}</label>
              </fieldset>
              <fieldset className='character-heading__details-vertical'>
                <input
                  id='dexterity'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="dexterity"
                  placeholder="DEX"
                  required
                  value={statScore.dexterity}
                  onChange={(event) => handleStatScoreChange('dexterity', event.target.value)}
                  min="1"
                  max="40"
                />
                <label htmlFor='dexterity' className='character-heading__details-label-stat'>DEX</label>
                <label htmlFor='dexterity' className='character-heading__details-label-modifier'>{calculateModifier(statScore.dexterity)}</label>
              </fieldset>
              <fieldset className='character-heading__details-vertical'>
                <input
                  id='constitution'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="constitution"
                  placeholder="CON"
                  required
                  value={statScore.constitution}
                  onChange={(event) => handleStatScoreChange('constitution', event.target.value)}
                  min="1"
                  max="40"
                />
                <label htmlFor='constitution' className='character-heading__details-label-stat'>CON</label>
                <label htmlFor='constitution' className='character-heading__details-label-modifier'>{calculateModifier(statScore.constitution)}</label>
              </fieldset>
              <fieldset className='character-heading__details-vertical'>
                <input
                  id='intelligence'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="intelligence"
                  placeholder="INT"
                  required
                  value={statScore.intelligence}
                  onChange={(event) => handleStatScoreChange('intelligence', event.target.value)}
                  min="1"
                  max="40"
                />
                <label htmlFor='intelligence' className='character-heading__details-label-stat'>INT</label>
                <label htmlFor='intelligence' className='character-heading__details-label-modifier'>{calculateModifier(statScore.intelligence)}</label>
              </fieldset>
              <fieldset className='character-heading__details-vertical'>
                <input
                  id='wisdom'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="wisdom"
                  placeholder="WIS"
                  required
                  value={statScore.wisdom}
                  onChange={(event) => handleStatScoreChange('wisdom', event.target.value)}
                  min="1"
                  max="40"
                />
                <label htmlFor='wisdom' className='character-heading__details-label-stat'>WIS</label>
                <label htmlFor='wisdom' className='character-heading__details-label-modifier'>{calculateModifier(statScore.wisdom)}</label>
              </fieldset>
              <fieldset className='character-heading__details-vertical'>
                <input
                  id='charisma'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="charisma"
                  placeholder="CHA"
                  required
                  value={statScore.charisma}
                  onChange={(event) => handleStatScoreChange('charisma', event.target.value)}
                  min="1"
                  max="40"
                />
                <label htmlFor='charisma' className='character-heading__details-label-stat'>CHA</label>
                <label htmlFor='charisma' className='character-heading__details-label-modifier'>{calculateModifier(statScore.charisma)}</label>
              </fieldset>
            </div>
            <h2 className='character-heading__details-vertical-box-title'>
              Saving Throws
            </h2>
            <div className="character-heading__details-vertical-box">
              <fieldset className='character-heading__details-field_flagged'>
                <input
                  id='strength-st'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="strength-st"
                  placeholder="STR"
                  required
                  value={statScore.strSavingThrow}
                  onChange={(event) => handleStatScoreChange('strSavingThrow', event.target.value)}
                  min="0"
                  max="40"
                />
                <label htmlFor='strength-st' className='character-heading__details-label-stat'>STR</label>
                <div className='character-heading__details-field-flag'>
                  <span className='character-heading__details-field-flag'></span>
                </div>
              </fieldset>
              <fieldset className='character-heading__details-field_flagged'>
                <input
                  id='dexterity-st'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="dexterity-st"
                  placeholder="DEX"
                  required
                  value={statScore.dexSavingThrow}
                  onChange={(event) => handleStatScoreChange('dexSavingThrow', event.target.value)}
                  min="0"
                  max="40"
                />
                <label htmlFor='dexterity-st' className='character-heading__details-label-stat'>DEX</label>
                <div className='character-heading__details-field-flag'>
                  <span className='character-heading__details-field-flag'></span>
                </div>
              </fieldset>
              <fieldset className='character-heading__details-field_flagged'>
                <input
                  id='constitution-st'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="constitution-st"
                  placeholder="CON"
                  required
                  value={statScore.conSavingThrow}
                  onChange={(event) => handleStatScoreChange('conSavingThrow', event.target.value)}
                  min="0"
                  max="40"
                />
                <label htmlFor='constitution-st' className='character-heading__details-label-stat'>CON</label>
                <div className='character-heading__details-field-flag'>
                  <span className='character-heading__details-field-flag'></span>
                </div>
              </fieldset>
              <fieldset className='character-heading__details-field_flagged'>
                <input
                  id='intelligence-st'
                  className="character-heading__details character-heading__details_stat"
                  type="text"
                  name="intelligence-st"
                  placeholder="INT"
                  required
                  value={statScore.intSavingThrow}
                  onChange={(event) => handleStatScoreChange('intSavingThrow', event.target.value)}
                  minLength="2"
                  maxLength="40"
                />
                <label htmlFor='intelligence-st' className='character-heading__details-label-stat'>INT</label>
                <div className='character-heading__details-field-flag'>
                  <span className='character-heading__details-field-flag'></span>
                </div>
              </fieldset>
              <fieldset className='character-heading__details-field_flagged'>
                <input
                  id='wisdom-st'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="wisdom-st"
                  placeholder="WIS"
                  required
                  value={statScore.wisSavingThrow}
                  onChange={(event) => handleStatScoreChange('wisSavingThrow', event.target.value)}
                  min="0"
                  max="40"
                />
                <label htmlFor='wisdom-st' className='character-heading__details-label-stat'>WIS</label>
                <div className='character-heading__details-field-flag'>
                  <span className='character-heading__details-field-flag'></span>
                </div>
              </fieldset>
              <fieldset className='character-heading__details-field_flagged'>
                <input
                  id='charisma-st'
                  className="character-heading__details character-heading__details_stat"
                  type="number"
                  name="charisma-st"
                  placeholder="CHA"
                  required
                  value={statScore.chaSavingThrow}
                  onChange={(event) => handleStatScoreChange('chaSavingThrow', event.target.value)}
                  minLength="0"
                  maxLength="40"
                />
                <label htmlFor='charisma-st' className='character-heading__details-label-stat'>CHA</label>
                <div className='character-heading__details-field-flag'>
                  <span className='character-heading__details-field-flag'></span>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="character-heading__details-vertical-box">
            <fieldset className='character-heading__details-vertical'>
              <select
                id="character-race"
                className="character-heading__details character-heading__details_desc"
                name="character-race"
                required
                value={selectedRace}
                onChange={handleRaceSelection}
              >
                <option value="">Select a race</option>
                {races.map((characterRace) => (
                  <option id={characterRace.slug} value={characterRace.name}>
                    {characterRace.name}
                  </option>
                ))}
              </select>
              <label htmlFor='character-race' className='character-heading__details-label'>Character Race</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <select
                id="character-subrace"
                className="character-heading__details character-heading__details_desc"
                name="character-subrace"
                required
                value={selectedSubRace}
                onChange={handleSubRaceSelection}
                disabled={subRaces.length === 0}
              >
                <option value="">Select a sub-race</option>
                <option value="No sub-race">No sub-race</option>
                {subRaces.map((subRace) => (
                  <option id={subRace.slug} value={subRace.name}>
                    {subRace.name}
                  </option>
                ))}
              </select>
              <label htmlFor='character-subrace' className='character-heading__details-label'>Character Sub-Race</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <select
                id="character-class"
                className="character-heading__details character-heading__details_desc"
                name="character-class"
                required
                value={selectedClass}
                onChange={(event) => setSelectedClass(event.target.value)}
              >
                <option value="">Select a class</option>
                {classes.map((characterClass) => (
                  <option id={characterClass.slug} value={characterClass.name}>
                    {characterClass.name}
                  </option>
                ))}
              </select>
              <label htmlFor='character-class' className='character-heading__details-label'>Character Class</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <select
                id="character-aligment"
                className="character-heading__details character-heading__details_desc"
                name="character-aligment"
                required
                value={selectedAlignment}
                onChange={handleAlignmentSelection}
              >
                <option value="">Alignment</option>
                {alignments.map((alignment, index) => (
                  Object.entries(alignment).map(([key, value]) => (
                    <option key={index + key} value={key}>
                      {value}
                    </option>
                  ))
                ))}
              </select>
              <label htmlFor='character-aligment' className='character-heading__details-label'>Character Alignment</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <span className='character-heading__details'>Walk {characterSpeed} ft.</span>
              <span className='character-heading__details-label'>Character Speed</span>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <input
                id="armor-class"
                name="armor-class"
                className="character-heading__details character-heading__details_desc"
                type="number"
                placeholder="Armor Class"
                required
                value={statScore.armorClass}
                onChange={(event) => handleStatScoreChange('armorClass', event.target.value)}
                min="0"
                max="40"
              />
              <label htmlFor='armor-class' className='character-heading__details-label'>Armor Class</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <input
                id="initiative"
                className="character-heading__details character-heading__details_desc"
                type="number"
                name="initiative"
                placeholder="Initiative"
                required
                value={statScore.initiative}
                onChange={(event) => handleStatScoreChange('initiative', event.target.value)}
                min="0"
                max="20"
              />
              <label htmlFor='initiative' className='character-heading__details-label'>Initiative</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <input
                id="proficiency"
                className="character-heading__details character-heading__details_desc"
                type="number"
                name="proficiency"
                placeholder="Proficiency"
                required
                value={statScore.proficiency}
                onChange={(event) => handleStatScoreChange('proficiency', event.target.value)}
                min="0"
                max="20"
              />
              <label htmlFor='proficiency' className='character-heading__details-label'>Proficiency</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <input
                id="character-exp"
                className="character-heading__details character-heading__details_desc"
                type="text"
                name="character-exp"
                placeholder="Experience"
                required
                value={statScore.experience}
                onChange={(event) => handleStatScoreChange('experience', event.target.value)}
                minLength="0"
                maxLength="355000"
              />
              <label htmlFor='character-exp' className='character-heading__details-label'>Experience</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <input
                id="inspiration"
                className="character-heading__details character-heading__details_desc"
                type="text"
                name="inspiration"
                placeholder="Inspiration"
                required
                value={statScore.inspiration}
                onChange={(event) => handleStatScoreChange('inspiration', event.target.value)}
                min="0"
                max="20"
              />
              <label htmlFor='inspiration' className='character-heading__details-label'>Inspiration</label>
            </fieldset>
            <fieldset className='character-heading__details-vertical'>
              <input
                id='player-name'
                name="player-name"
                className="character-heading__details character-heading__details_desc"
                type="text"
                placeholder="Player Name"
                required
                value={name.playerName}
                onChange={handleNameChange}
                minLength="4"
                maxLength="40"
              />
              <label htmlFor='player-name' className='character-heading__details-label'>Player Name</label>
            </fieldset>
          </div>
        </section>
        <section className='character-content'>
          <div className='character-content__column'>
            <div className='character-content__column-container'>
              <h2 className='character-content__column-title'>Image</h2>
              <div className='character-content__column_row'>
                <button onClick={prevImage} type='button' className='character-content__image-button'>«</button>
                <button onClick={nextImage} type='button' className='character-content__image-button'>»</button>
              </div>
              <img
                src={getImageUrl(playerClasses[currentImageIndex])}
                alt={playerClasses[currentImageIndex]}
                className='character-content__image'
              />
            </div>
            <div className='character-content__column-container'>
              <h2 className='character-content__column-title'>Inventory</h2>
              <fieldset className='character-content__column-field'>
                <label htmlFor='max-weight' className='character-content__field-label'>Max Weight (kg)</label>
                <input
                  id="max-weight"
                  name="max-weight"
                  className="character-content__field-input character-content__field-input_med"
                  type="number"
                  placeholder="Max Weight"
                  required
                  value={maxWeight}
                  onChange={(e) => handleMaxWeightChange(e.target.value)}
                  min="0"
                  max="1000"
                />
              </fieldset>
              <div className="character-content__column-field-grid">
                <span className='character-content__column-field-grid-label'>Qtd</span>
                <span className='character-content__column-field-grid-label'>Wt</span>
                <span className='character-content__column-field-grid-label'>Description</span>
                {inventory.map(item => (
                  <fieldset key={item.id} className='character-content__column-field'>
                    <label htmlFor={`item-${item.id}`} className='character-content__field-label'>Item</label>
                    <input
                      id={`quantity-${item.id}`}
                      name={`quantity-${item.id}`}
                      className="character-content__field-input character-content__field-input_min"
                      type="number"
                      placeholder="Qtd"
                      required
                      value={item.quantity}
                      onChange={(e) => handleInventoryChange(item.id, 'quantity', e.target.value)}
                      min="0"
                      max="100"
                    />
                    <input
                      id={`weight-${item.id}`}
                      name={`weight-${item.id}`}
                      className="character-content__field-input character-content__field-input_min"
                      type="number"
                      placeholder="Wt"
                      required
                      value={item.weight}
                      onChange={(e) => handleInventoryChange(item.id, 'weight', e.target.value)}
                      min="0"
                      max="120"
                    />
                    <input
                      id={`item-${item.id}`}
                      name={`item-${item.id}`}
                      className="character-content__field-input"
                      type="text"
                      placeholder="Description"
                      required
                      value={item.description}
                      onChange={(e) => handleInventoryChange(item.id, 'description', e.target.value)}
                      minLength="0"
                      maxLength="20"
                    />
                  </fieldset>
                ))}
              </div>
            </div>
          </div>
          <div className='character-content__column'>
            <h2 className='character-content__column-title'>Equipment</h2>            
            {groupedEquipment.map((group, groupIndex) => (
              <div key={groupIndex} className='character-content__equipment'>
                {group.map((item, index) => (
                  <EquipmentItem
                    key={index}
                    index={groupIndex * 3 + index}
                    item={item}
                    handleEquipmentChange={handleEquipmentChange}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className='character-content__column'>
            <h2 className='character-content__column-title'>Skills</h2>
            <fieldset className='character-content__column-field'>
              <label htmlFor='athletics' className='character-content__field-label'>Athletics (STR)</label>
              <input
                id="athletics"
                name="athletics"
                className="character-content__field-input"
                type="number"
                placeholder="Athletics"
                required
                value={statScore.athletics}
                onChange={(event) => handleStatScoreChange('athletics', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='acrobatics' className='character-content__field-label'>Acrobatics (DEX)</label>
              <input
                id="acrobatics"
                name="acrobatics"
                className="character-content__field-input"
                type="number"
                placeholder="Acrobatics"
                required
                value={statScore.acrobatics}
                onChange={(event) => handleStatScoreChange('acrobatics', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='sleight-of-hand' className='character-content__field-label'>Sleigh of hand (DEX)</label>
              <input
                id="sleight-of-hand"
                name="sleight-of-hand"
                className="character-content__field-input"
                type="number"
                placeholder="Sleigh of hand"
                required
                value={statScore.sleighOfHand}
                onChange={(event) => handleStatScoreChange('sleighOfHand', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='stealth' className='character-content__field-label'>Stealth (DEX)</label>
              <input
                id="stealth"
                name="stealth"
                className="character-content__field-input"
                type="number"
                placeholder="Stealth"
                required
                value={statScore.stealth}
                onChange={(event) => handleStatScoreChange('stealth', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='arcana' className='character-content__field-label'>Arcana (INT)</label>
              <input
                id="arcana"
                name="arcana"
                className="character-content__field-input"
                type="number"
                placeholder="Arcana"
                required
                value={statScore.arcana}
                onChange={(event) => handleStatScoreChange('arcana', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='history' className='character-content__field-label'>History (INT)</label>
              <input
                id="history"
                name="history"
                className="character-content__field-input"
                type="number"
                placeholder="History"
                required
                value={statScore.history}
                onChange={(event) => handleStatScoreChange('history', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='investigation' className='character-content__field-label'>Investigation (INT)</label>
              <input
                id="investigation"
                className="character-content__field-input"
                type="number"
                name="investigation"
                placeholder="Investigation"
                required
                value={statScore.investigation}
                onChange={(event) => handleStatScoreChange('investigation', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='nature' className='character-content__field-label'>Nature (INT)</label>
              <input
                id="nature"
                name="nature"
                className="character-content__field-input"
                type="number"
                placeholder="Nature"
                required
                value={statScore.nature}
                onChange={(event) => handleStatScoreChange('nature', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='religion' className='character-content__field-label'>Religion (INT)</label>
              <input
                id="religion"
                name="religion"
                className="character-content__field-input"
                type="number"
                placeholder="Religion"
                required
                value={statScore.religion}
                onChange={(event) => handleStatScoreChange('religion', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='animal-handling' className='character-content__field-label'>Animal Handling (WIS)</label>
              <input
                id="animal-handling"
                className="character-content__field-input"
                type="number"
                name="animal-handling"
                placeholder="Animal Handling"
                required
                value={statScore.animalHandling}
                onChange={(event) => handleStatScoreChange('animalHandling', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='insight' className='character-content__field-label'>Insight (WIS)</label>
              <input
                id="insight"
                className="character-content__field-input"
                type="number"
                name="insight"
                placeholder="Insight"
                required
                value={statScore.insight}
                onChange={(event) => handleStatScoreChange('insight', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='medicine' className='character-content__field-label'>Medicine (WIS)</label>
              <input
                id="medicine"
                name="medicine"
                className="character-content__field-input"
                type="number"
                placeholder="Medicine"
                required
                value={statScore.medicine}
                onChange={(event) => handleStatScoreChange('medicine', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='perception' className='character-content__field-label'>Perception (WIS)</label>
              <input
                id="perception"
                name="perception"
                className="character-content__field-input"
                type="number"
                placeholder="Perception"
                required
                value={statScore.perception}
                onChange={(event) => handleStatScoreChange('perception', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='survival' className='character-content__field-label'>Survival (WIS)</label>
              <input
                id="survival"
                name="survival"
                className="character-content__field-input"
                type="number"
                placeholder="Survival"
                required
                value={statScore.survival}
                onChange={(event) => handleStatScoreChange('survival', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='deception' className='character-content__field-label'>Deception (CHA)</label>
              <input
                id="deception"
                name="deception"
                className="character-content__field-input"
                type="number"
                placeholder="Deception"
                required
                value={statScore.deception}
                onChange={(event) => handleStatScoreChange('deception', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='intimidation' className='character-content__field-label'>Intimidation (CHA)</label>
              <input
                id="intimidation"
                name="intimidation"
                className="character-content__field-input"
                type="number"
                placeholder="Intimidation"
                required
                value={statScore.intimidation}
                onChange={(event) => handleStatScoreChange('intimidation', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='performance' className='character-content__field-label'>Performance (CHA)</label>
              <input
                id="performance"
                name="performance"
                className="character-content__field-input"
                type="number"
                placeholder="Performance"
                required
                value={statScore.performance}
                onChange={(event) => handleStatScoreChange('performance', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
            <fieldset className='character-content__column-field'>
              <label htmlFor='persuasion' className='character-content__field-label'>Persuasion (CHA)</label>
              <input
                id="persuasion"
                name="persuasion"
                className="character-content__field-input"
                type="number"
                placeholder="Persuasion"
                required
                value={statScore.persuasion}
                onChange={(event) => handleStatScoreChange('persuasion', event.target.value)}
                min="0"
                max="20"
              />
            </fieldset>
          </div>
        </section>
        <section className='character-footer'>
          <h2 className='character-footer__column-title'>Kill count</h2>
          <section className='character-footer__row'>
            {filteredCards.map(card => (
            <div className='character-footer__row-item' key={card.slug}>
              <p className='character-footer__row-text'>{card.name}: {killCounts[card.name]}</p>
              <button className='character-footer__row-button' onClick={() => clearKillCount(card.name)}>Clear Kill Count</button>
            </div>
            ))}
          </section>
        </section>
        <button type="submit" className={`form__button`}>
          Save
        </button>
      </form>
    </section>
  );
}

export default Character;
