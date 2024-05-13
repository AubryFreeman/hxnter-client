import { useEffect, useState } from 'react';
import '../css/home.css'; 

function Home() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <div className="logo-container">
        {showLogo && (
          <div className={`fade-in ${showLogo ? 'fade-in' : ''}`}>
            <img src="src/assets/Your_paragraph_text-removebg-preview.png" alt="HXNTER" />
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
