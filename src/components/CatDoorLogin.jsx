import { useState, useRef, useEffect } from 'react';
import './CatDoorLogin.css';

// Password demo: nana1908
const PASSWORD = 'nana1908';

const BUBBLE = {
  idle: 'Klik aku dong~ 🐾',
  meong: 'Meong~ silakan masuk!',
  wrong: 'Mrr… salah 🙈',
  success: 'Yeay! Selamat datang 💕',
};

export default function CatDoorLogin() {
  const [status, setStatus] = useState('idle'); // idle | meong | wrong | success
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const isOpen = status !== 'idle';

  const handleCatClick = () => {
    if (status === 'success') return;
    clearTimeout(timer.current);
    setError('');
    setStatus(status === 'idle' ? 'meong' : 'idle');
  };

  const wrong = (msg) => {
    setError(msg);
    setStatus('wrong');
    setShakeKey((k) => k + 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus('meong'), 1600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      wrong('Isi semuanya dulu ya~');
      return;
    }
    if (password === PASSWORD) {
      clearTimeout(timer.current);
      setError('');
      setStatus('success');
    } else {
      setPassword('');
      wrong('Password-nya belum tepat, coba lagi ya.');
    }
  };

  const handleLogout = () => {
    setUsername('');
    setPassword('');
    setStatus('idle');
  };

  return (
    <main className="stage">
      <span className="cloud cloud--a" aria-hidden="true">☁️</span>
      <span className="cloud cloud--b" aria-hidden="true">☁️</span>

      <div className="house">
        <div className="roof" aria-hidden="true" />
        <div className="wall">
          <span className="pot pot--l" aria-hidden="true">🌷</span>
          <span className="pot pot--r" aria-hidden="true">🌸</span>

          <div className={`doorway ${isOpen ? 'is-open' : ''}`}>
            {/* Bagian dalam rumah */}
            <div className="inside" aria-hidden="true">✨</div>

            {/* Daun pintu */}
            <div className="door" aria-hidden="true">
              <span className="knob" />
            </div>

            {/* Papan nama = form login */}
            <section
              className={`sign ${isOpen ? 'sign--show' : ''}`}
              aria-label="Formulir login"
              inert={!isOpen}
            >
              <span className="rope rope--l" aria-hidden="true" />
              <span className="rope rope--r" aria-hidden="true" />

              {status === 'success' ? (
                <div className="welcome">
                  <p className="welcome-emoji" aria-hidden="true">🏡</p>
                  <h2>Halo, {username}!</h2>
                  <p className="hint">Pintunya terbuka lebar untukmu.</p>
                  <button type="button" className="btn btn--ghost" onClick={handleLogout}>
                    Tutup pintu
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h2>Rumah Mimi</h2>
                  <p className="hint">Ketuk dulu, lalu masuk~</p>

                  <label htmlFor="username">Nama panggilan</label>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    placeholder="misal: kakak"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <label htmlFor="password">Kata sandi</label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <p className="error" role="alert">{error}</p>

                  <button type="submit" className="btn">Masuk 🐾</button>
                  <p className="demo">petunjuk: meong123</p>
                </form>
              )}
            </section>

            {status === 'success' && (
              <div className="hearts" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span key={i} style={{ '--i': i }}>💗</span>
                ))}
              </div>
            )}

            {/* Kucing */}
            <button
              type="button"
              className={`cat cat--${status}`}
              onClick={handleCatClick}
              aria-label={isOpen ? 'Tutup pintu' : 'Klik kucing untuk membuka pintu'}
              disabled={status === 'success'}
            >
              <span className="cat-tail" />
              <span className="cat-body">
                <span className="paw paw--l" />
                <span className="paw paw--r" />
              </span>
              <span className="cat-head" key={shakeKey}>
                <span className="ear ear--l"><i /></span>
                <span className="ear ear--r"><i /></span>
                <span className="eye eye--l" />
                <span className="eye eye--r" />
                <span className="blush blush--l" />
                <span className="blush blush--r" />
                <span className="nose" />
                <span className="mouth" />
                <span className="whisker w1" /><span className="whisker w2" />
                <span className="whisker w3" /><span className="whisker w4" />
              </span>
            </button>

            <p className={`bubble bubble--${status}`} aria-live="polite">
              {BUBBLE[status]}
            </p>
          </div>
        </div>
        <div className="mat" aria-hidden="true">selamat datang</div>
      </div>
    </main>
  );
}