
import  Header  from '../landing component/Header'
import '../../styles/Landing/Home.css';

export default function Home() {
  return (
    <div>
      <>
      <Header />
      </>
      <div className=" gradient text-center p-3 " id='Home'>
        <header className="text-white p-5">
            <h1 className="display-1 pw-bold p-3 ">Bid Smart. Win Big.</h1>
            <p className="lead fs-4 mb-4">Join our secure and transparent online bidding platform</p>
        </header>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <button className="btn btn-dark-navy btn-lg rounded-pill px-5 py-3 fw-semibold">
                  Explore Auctions
                </button>
                <button className="btn btn-transparent-light btn-lg rounded-pill px-5 py-3 fw-semibold">
                  Learn More
                </button>
              </div>
            </div>
            </div>
          </div>
      </div>
    </div>
  )
}
