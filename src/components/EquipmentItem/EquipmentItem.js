import './EquipmentItem.css';

function EquipmentItem({ index, item, handleEquipmentChange }) {
  return (
    <fieldset className='equipment-content__equipment-item'>
      <legend>{`${item.type.substr(0, 1).toUpperCase()}${item.type.substr(1)}`}</legend>
      <textarea
        id={`${item.type}-name`}
        name={`${item.type}-name`}
        className="equipment-content__equipment-item-name"
        type="text"
        placeholder={`${item.type.substr(0, 1).toUpperCase()}${item.type.substr(1)} name`}
        required
        onChange={(e) => handleEquipmentChange(index, 'name', e.target.value)}
        minLength="1"
        maxLength="40"
      >{item.name}</textarea>
      <img 
        src={item.img}
        alt={item.type}
        className='equipment-content__equipment-item-image'
      />
      <fieldset className='equipment-content__equipment-item-addon'>
        <legend>Bonus</legend>
        <input
          id={`${item.type}-bonus`}
          name={`${item.type}-bonus`}
          className="equipment-content__equipment-item-addon-input"
          type="number"
          placeholder="Bonus"
          required
          value={item.bonus}
          onChange={(e) => handleEquipmentChange(index, 'bonus', e.target.value)}
          min="1"
          max="20"
        />
      </fieldset>
      <fieldset className='equipment-content__equipment-item-addon'>
        <legend>Bonus type</legend>
        <input
          id={`${item.type}-bonus-type`}
          name={`${item.type}-bonus-type`}
          className="equipment-content__equipment-item-addon-input"
          type="text"
          placeholder="Bonus type"
          required
          value={item.bonusType}
          onChange={(e) => handleEquipmentChange(index, 'bonusType', e.target.value)}
          minLength="1"
          maxLength="20"
        />
      </fieldset>
      {item.armorClass !== undefined && (
        <fieldset className='equipment-content__equipment-item-addon'>
          <legend>Armor Class</legend>
          <input
            id={`${item.type}-armor-class`}
            name={`${item.type}-armor-class`}
            className="equipment-content__equipment-item-addon-input"
            type="number"
            placeholder="Armor Class"
            required
            value={item.armorClass}
            onChange={(e) => handleEquipmentChange(index, 'armorClass', e.target.value)}
            min="1"
            max="20"
          />
        </fieldset>
      )}
      {item.stealth !== undefined && (
        <fieldset className='equipment-content__equipment-item-addon'>
          <legend>Stealth</legend>
          <input
            id={`${item.type}-stealth`}
            name={`${item.type}-stealth`}
            className="equipment-content__equipment-item-addon-input"
            type="text"
            placeholder="Stealth"
            required
            value={item.stealth}
            onChange={(e) => handleEquipmentChange(index, 'stealth', e.target.value)}
            minLength="1"
            maxLength="20"
          />
        </fieldset>
      )}
      {item.damage !== undefined && (
        <fieldset className='equipment-content__equipment-item-addon'>
          <legend>Damage</legend>
          <input
            id={`${item.type}-damage`}
            name={`${item.type}-damage`}
            className="equipment-content__equipment-item-addon-input"
            type="text"
            placeholder="Damage"
            required
            value={item.damage}
            onChange={(e) => handleEquipmentChange(index, 'damage', e.target.value)}
            minLength="1"
            maxLength="20"
          />
        </fieldset>
      )}
      {item.critical !== undefined && (
        <fieldset className='equipment-content__equipment-item-addon'>
          <legend>Critical</legend>
          <input
            id={`${item.type}-critical`}
            name={`${item.type}-critical`}
            className="equipment-content__equipment-item-addon-input"
            type="text"
            placeholder="Critical"
            required
            value={item.critical}
            onChange={(e) => handleEquipmentChange(index, 'critical', e.target.value)}
            minLength="1"
            maxLength="20"
          />
        </fieldset>
      )}
      {item.weight !== undefined && (
        <fieldset className='equipment-content__equipment-item-addon'>
          <legend>Weight</legend>
          <input
            id={`${item.type}-weight`}
            name={`${item.type}-weight`}
            className="equipment-content__equipment-item-addon-input"
            type="number"
            placeholder="Weight"
            required
            value={item.weight}
            onChange={(e) => handleEquipmentChange(index, 'stealth', e.target.value)}
            min="1"
            max="120"
          />
        </fieldset>
      )}
    </fieldset>
  );
}

export default EquipmentItem;