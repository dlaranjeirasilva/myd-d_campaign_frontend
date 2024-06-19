import aberration from '../images/aberration.png';
import beast from '../images/beast.png';
import celestial from '../images/celestial.png';
import construct from '../images/construct.png';
import dragon from '../images/dragon.png';
import elemental from '../images/elemental.png';
import fey from '../images/fey.png';
import fiend from '../images/fiend.png';
import giant from '../images/giant.png';
import humanoid from '../images/humanoid.png';
import monstrosity from '../images/monstrosity.png';
import plant from '../images/plant.png';
import ooze from '../images/ooze.png';
import undead from '../images/undead.png';
import lawfulGood from '../images/lawful_good.png';
import lawfulNeutral from '../images/lawful_neutral.png';
import lawfulEvil from '../images/lawful_evil.png';
import neutralGood from '../images/neutral_good.png';
import neutral from '../images/neutral.png';
import neutralEvil from '../images/neutral_evil.png';
import chaoticGood from '../images/chaotic_good.png';
import chaoticNeutral from '../images/chaotic_neutral.png';
import chaoticEvil from '../images/chaotic_evil.png';
import anyNonGood from '../images/any_non_good.png';
import anyNonEvil from '../images/any_non_evil.png';
import anyChaotic from '../images/any_chaotic.png';
import anyNonLawful from '../images/any_non_lawful.png';
import paladin from '../images/paladin.png';
import fighter from '../images/fighter.png';
import cleric from '../images/cleric.png';
import druid from '../images/druid.png';
import artificer from '../images/artificer.png';
import barbarian from '../images/barbarian.png';
import bard from '../images/bard.png';
import monk from '../images/monk.png';
import helmet from '../images/helmet.png';
import armor from '../images/armor.png';
import shoulder from '../images/shoulder.png';
import off_hand from '../images/off-hand.png';
import main_weapon from '../images/main-weapon.png';
import necklace from '../images/necklace.png';
import acessory from '../images/acessory.png';
import waist from '../images/waist.png';
import boots from '../images/boots.png';
import imgNotFound from '../images/image-not-found.png'

export function getImageUrl(description) {
  switch (description) {
    case 'Aberration':
      return aberration;
    case 'Beast':
      return beast;
    case 'Celestial':
      return celestial;
    case 'Construct':
      return construct;
    case 'Dragon':
      return dragon;
    case 'Elemental':
      return elemental;
    case 'Fey':
      return fey;
    case 'Fiend':
      return fiend;
    case 'Giant':
      return giant;
    case 'Humanoid':
      return humanoid;
    case 'Monstrosity':
      return monstrosity;
    case 'Plant':
      return plant;
    case 'Ooze':
      return ooze;
    case 'Undead':
      return undead;
    case 'lawful good':
      return lawfulGood;
    case 'lawful neutral':
      return lawfulNeutral;
    case 'lawful evil':
      return lawfulEvil;
    case 'neutral good':
      return neutralGood;
    case 'neutral':
    case 'any':
    case 'any alignment':
    case 'any alignment (as its deity)':
    case 'unaligned':
      return neutral;
    case 'neutral evil':
      return neutralEvil;
    case 'chaotic good':
      return chaoticGood;
    case 'chaotic neutral':
      return chaoticNeutral;
    case 'chaotic evil':
      return chaoticEvil;
    case 'any non-good alignment':
      return anyNonGood;
    case 'any non-evil alignment':
      return anyNonEvil;
    case 'any non-lawful alignment':
      return anyNonLawful;
    case 'any chaotic alignment':
    case 'chaotic neutral or chaotic good':
      return anyChaotic;
    case 'paladin':
      return paladin;
    case 'fighter':
      return fighter;
    case 'cleric':
      return cleric;
    case 'druid':
      return druid;
    case 'artificer':
      return artificer;
    case 'barbarian':
      return barbarian;
    case 'bard':
      return bard;
    case 'monk':
      return monk;
    default:
      return imgNotFound;
  };
};

export function calculateModifier(value) {
  const modifier = Math.floor((value - 10) / 2);
  if (modifier > 0) {
    return `+${modifier}`;
  } else {
    return `${modifier}`;
  }
};
