import Header from '../Header/Header';
import Home from '../Home/Home';
import Character from '../Character/Character';
import Main from '../Main/Main';
import About from '../About/About';
import Footer from '../Footer/Footer';
import api from '../../utils/DAndDApi';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CardDetailsPopup from '../CardDetailsPopup/CardDetailsPopup';
import Preloader from '../Preloader/Preloader';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null)
  const [totalPages, setTotalPages] = useState(0);
  const [killCounts, setKillCounts] = useState(() => {
    const characterData = JSON.parse(sessionStorage.getItem(`savedCharacterData`)) || {};
    return characterData.killCounts || {}; 
  });
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 50;

  useEffect(() => {
    setLoading(true);
    api.getMonsterCards(currentPage)
      .then(cardData => {
        setCards(cardData.results);
        setTotalPages(Math.ceil(cardData.count / itemsPerPage));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching monster cards:', error);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    api.getClasses()
      .then(pageData => {
        setClasses(pageData.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    api.getRaces()
      .then(pageData => {
        setRaces(pageData.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching races:', error);
        setLoading(false);
      });
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  function updateCharacterData(killCounts) {
    const characterData = JSON.parse(sessionStorage.getItem(`savedCharacterData`)) || {};
    characterData.killCounts = killCounts;
    sessionStorage.setItem(`savedCharacterData`, JSON.stringify(characterData));
  }

  const updateKillCount = (cardName, increment) => {
    setKillCounts(prevState => {
      const currentKillCount = prevState[cardName] || 0;
      const newKillCount = increment ? currentKillCount + 1 : Math.max(currentKillCount - 1, 0);
      updateCharacterData({ ...prevState, [cardName]: newKillCount });
      return {
        ...prevState,
        [cardName]: newKillCount
      };
    });
  };

  function clearKillCount(cardName) {
    setKillCounts(prevState => {
      const newKillCounts = { ...prevState, [cardName]: 0 };
      updateCharacterData(newKillCounts);
      return newKillCounts;
    });
  }

  function closeAllPopups() {
    setSelectedCard(null)
  }

  return (
      <BrowserRouter>
        <div className="page">
          <Header />
          {loading ? (
            <Preloader />
          ) : (
          <Routes>
            <Route path='/about' element = {
              <About />
            }/>
            <Route path='/bestiary' element = {
              <Main 
                cards={cards}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                onCardClick={handleCardClick}
                updateKillCount={updateKillCount}
              >
                <CardDetailsPopup
                  card={selectedCard}
                  onClose={closeAllPopups}
                />
              </Main>
            }/>
            <Route path='/character' element = {
              <Character 
                classes={classes}
                races={races}
                cards={cards}
                killCounts={killCounts}
                clearKillCount={clearKillCount}
              />
            }/>
            <Route path='/' element = {
              <Home />
            }/>
          </Routes>
          )}
          <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
