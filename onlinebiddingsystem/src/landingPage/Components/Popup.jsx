import { Button, Page, Popup, setOptions } from '@mobiscroll/react';
import { useEffect, useState } from 'react';

setOptions({});

export default function PopMessage({ isAuctionEnded }) {
    const [isPopupOpen, setPopupOpen] = useState(false);


    useEffect(() => {
        if (isAuctionEnded) {
            setPopupOpen(true);
        }
    }, [isAuctionEnded]);

    return (
        <Page>
            <Popup display="center" isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
                <div className="mbsc-align-center mbsc-padding">
                    <img src="https://img.mobiscroll.com/demos/logo-noshadow.jpg" alt="logo" />
                    <h4>
                        Hello, this bid has been completed.<br />
                        Thank you!
                    </h4>

                </div>
                <div className="mbsc-button-group-block">
                    <Button onClick={() => setPopupOpen(false)}>Close</Button>
                </div>
            </Popup>
        </Page>
    );
}
