import ChiefCard from "./ChiefCard"

export default function ChiefsSection(){
    const chiefs = [
        {
            name: "jett",
            img: "/img/top-chiefs/img_1.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "jett",
            img: "/img/top-chiefs/img_2.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "jett",
            img: "/img/top-chiefs/img_3.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "jett",
            img: "/img/top-chiefs/img_4.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "jett",
            img: "/img/top-chiefs/img_5.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        },
        {
            name: "jett",
            img: "/img/top-chiefs/img_6.jpg",
            recipesCount: "10",
            cuisine: "Mexican",
        }
    ]

    return (
        <div className="section chiefs">
            <h1 className="title">Đầu bếp hàng đầu</h1>
            <div className="top-chiefs-container">
                {/* <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard />
                <ChiefCard /> */}
                {chiefs.map(chief => <ChiefCard key={chief.name} chief={chief} />)}
            </div>
        </div>
    )
}