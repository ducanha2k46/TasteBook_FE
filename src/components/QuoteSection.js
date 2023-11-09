import { FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faQuoteLeft} from "@fortawesome/free-solid-svg-icons"

export default function QuoteSection(){
    return (
        <div className="section quote">
            <p className="quote-text"><FontAwesomeIcon icon={faQuoteLeft}/>Food, in the end, in our own tradition, is something holy. It's not about nutrients and calories. It's about sharing. It's about honesty. It's about identity."</p>
            <p className="quote-auther">- Louise Fresco</p>
        </div>
    )
}