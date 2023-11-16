import CustomImage from "./CustomImage"

export default function RecipeCard({ recipe }) {
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.image} pt="50%" />
            <div className="recipe-card-info">
                <img className="auther-img" src={recipe.authorImg ? recipe.authorImg : 'https://www.gravatar.com/avatar/?d=identicon'} alt="" />
                <p className="recipe-title">{recipe.name}</p>
                <p className="recipe-desc">{recipe.description}.</p>
                <p className="author"><strong>_{recipe.author}_</strong></p>
                <a className="view-btn" href="#!">XEM CÔNG THỨC</a>
            </div>
        </div>
    )
}