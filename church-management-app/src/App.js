import {About,Contact,Events,Footer,Header,Donate} from "./containers"
import {NavBar} from "./components"
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  return (
    <div className="App">
        <NavBar />
      <div className="gradient__bg">
        <Header />
      </div>
      <About />
      <Events />
      <Donate />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
