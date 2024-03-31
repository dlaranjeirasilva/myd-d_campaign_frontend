import adventurers from '../../images/adventurers.png';
import './Home.css';

function Home() {
  return(
    <section className="home">
      <article className="home__container">
        <h1 className="home__title">Welcome to your campaign, adventurer!</h1>
        <p className="home__description">This is a simple web application designed for role-playing game (RPG) players. It allows you to create and manage your character and keep track of its inventory, spells, abilities and more useful information. Now you won't have a problem with your character profile passing through common accidents like getting lost, torn, worn-out or maybe fall into the jaws of the most unbeatable creature of all: your dog. 🐶</p>
      </article>
      <img 
        className="home__splash"
        src={adventurers}
      />
    </section>
  );
}

export default Home;