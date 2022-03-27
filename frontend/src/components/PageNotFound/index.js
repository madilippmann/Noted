import './PageNotFound.css'
import RubberBand from '../Animations/RubberBand'

export default function PageNotFound() {
    return (
        <div className='page-not-found'>
            <RubberBand>
                <h1 className='page-not-found-text'>
                    Page Not Found
                </h1>
            </RubberBand>
        </div>
    )
}
