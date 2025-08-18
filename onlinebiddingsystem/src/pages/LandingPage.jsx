
import Home from './landing component/Home.jsx';
import Auction from './landing component/Auction.jsx';
import Step from './landing component/Step.jsx';
import Contact from './landing component/Contact.jsx';
import Works from './landing component/Works.jsx';




export default function LandingPage() {
  return (
    <div id='Home'>
      <Home />
      <Auction />
      <Works />
      <Step />
      <Contact />
    </div>
  )
}
