import developer from '../../images/developer.png';
import './About.css';

function About() {
  return(
    <section className="about">
      <article className="about__container">
        <h1 className="about__title">Who is behind the DM Screen?</h1>
        <p className="about__description">Hi Adventurer! I'm a front-end web developer passionate about creating amazing digital experiences. My main focus is bringing designs and concepts to life, turning them into interactive and responsive interfaces. I specialize in HTML, CSS, JavaScript and React framework, and I'm constantly seeking to learn and apply the latest technologies and industry best practices. With a keen eye for detail and a creative mind, I'm always looking for ways to enhance the usability and aesthetics of digital products.</p>
      </article>
      <img 
        className="about__image"
        src={developer}
        alt="developer"
      />
    </section>
  );
}

export default About;