import CustomImage from "./CustomImage"
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="50%" />
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.authorImg ? recipe.authorImg : 'https://www.gravatar.com/avatar/?d=identicon'} alt="" />
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-desc">{recipe.description}.</p>
                <p className="author"><strong>_{recipe.author}_</strong></p>
                <Link to={`/recipes/${recipe._id}`} className="view-btn">XEM CÔNG THỨC</Link>
            </div>
        </div>
    )
}