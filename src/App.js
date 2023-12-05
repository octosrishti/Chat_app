import logo from './logo.svg';
import styles from './App.module.css'
import Header from './components/header';
import Footer from './components/footer';
import Chat from './components/chat';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <Chat />
      <Footer />
    </div>
  );
}

export default App;
