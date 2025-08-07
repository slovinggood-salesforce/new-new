import Link from "next/link";
import styles from './styles/home.module.css';

export default function Home() {
  // Add your prototypes to this array
  const prototypes = [
    {
      title: 'GETTING STARTED',
      description: 'HOW TO CREATE A PROTOTYPE',
      path: '/prototypes/example'
    },
    {
      title: 'CONFETTI BUTTON',
      description: 'AN INTERACTIVE BUTTON THAT CREATES A COLORFUL CONFETTI EXPLOSION',
      path: '/prototypes/confetti-button'
    },
    // Add your new prototypes here like this:
    // {
    //   title: 'YOUR NEW PROTOTYPE',
    //   description: 'A SHORT DESCRIPTION OF WHAT THIS PROTOTYPE DOES',
    //   path: '/prototypes/my-new-prototype'
    // },
  ];

  return (
    <div className={styles.brutalistContainer}>
      {/* Brutalist header with massive, juxtaposed typography */}
      <header className={styles.brutalistHeader}>
        <h1 className={styles.mainTitle}>
          <span className={styles.titlePart1}>STUART'S</span>
          <span className={styles.titlePart2}>Prototypes</span>
        </h1>
        <div className={styles.subtitle}>
          EXPERIMENTAL • RAW • FUNCTIONAL
        </div>
      </header>

      <main className={styles.brutalistMain}>
        {/* Harsh divider */}
        <div className={styles.divider}>
          ████████████████████████████████████████
        </div>
        
        <section className={styles.brutalistGrid}>
          <h2 className={styles.sectionTitle}>AVAILABLE PROTOTYPES:</h2>
          
          {/* Goes through the prototypes list (array) to create brutalist cards */}
          {prototypes.map((prototype, index) => (
            <Link 
              key={index}
              href={prototype.path} 
              className={styles.brutalistCard}
            >
              <div className={styles.cardNumber}>
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{prototype.title}</h3>
                <p className={styles.cardDescription}>{prototype.description}</p>
              </div>
              <div className={styles.cardArrow}>→</div>
            </Link>
          ))}
        </section>

        {/* Footer with harsh styling */}
        <footer className={styles.brutalistFooter}>
          <div className={styles.footerDivider}>
            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
          </div>
          <p className={styles.footerText}>
            BUILT WITH BRUTALIST PRINCIPLES • NO SMOOTH EDGES • FUNCTION OVER FORM
          </p>
        </footer>
      </main>
    </div>
  );
}
