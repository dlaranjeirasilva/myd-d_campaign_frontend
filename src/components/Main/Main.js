import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import './Main.css';

function Main({
  cards,
  currentPage,
  totalPages,
  onPageChange,
  onCardClick,
  updateKillCount,
  children
}) {
  return (
    <main className="main">

      {children}

      <section className="cards">
        {cards.map(card => (
          <Card
            key={card.slug}
            card={card}
            onCardClick={onCardClick}
            updateKillCount={updateKillCount}
          />
        ))}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </main>
  );
}

export default Main;
