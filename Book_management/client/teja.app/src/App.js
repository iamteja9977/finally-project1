import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Main from './components/Main';
function App() {
  return (
    <>
      <Header />
      <div style={{ overflow: "auto" }}>
        <Main />
        <Navbar />
      </div>
    </>
  );
}

export default App;

//Note : in-line styling in React JSx must be sent as object)key-value pair