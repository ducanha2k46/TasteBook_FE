import PreviousSearches from "../components/PreviousSearches"
import RecipeCard from "../components/RecipesCard"

export default function Recipes() {
    const recipes = [
        {
            title: "Chick Jett 1",
            image: "img/gallery/img_1.jpg",
            authorImg: "img/gallery/img_1.jpg",
        },
        {
            title: "Chick Jett 2",
            image: "img/gallery/img_1.jpg",
            authorImg: "img/gallery/img_1.jpg",
        },
        {
            title: "Chick Jett 3",
            image: "img/gallery/img_1.jpg",
            authorImg: "img/gallery/img_1.jpg",
        },
        {
            title: "Chick Jett 4",
            image: "img/gallery/img_1.jpg",
            authorImg: "img/gallery/img_1.jpg",
        },
        {
            title: "Chick Jett 5",
            image: "img/gallery/img_1.jpg",
            authorImg: "img/gallery/img_1.jpg",
        },
        {
            title: "Chick Jett 6",
            image: "img/gallery/img_1.jpg",
            authorImg: "img/gallery/img_1.jpg",
        }
    ].sort(() => Math.random() - 0.5)

    return (
        <div>
            <PreviousSearches />
            <div className="recipes-container">
                {/* <RecipeCard /> */}
                {recipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
        </div>
    )
}