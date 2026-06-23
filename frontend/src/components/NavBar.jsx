export default function NavBar() {
    return(
        <nav className="flex items-center justify-between px-6 md:px-12 py-4 sticky top-0 z-50 glass-card mx-4 mt-4 mb-2 ">
            <div>
                <span>Resto</span><span>Tana</span>
            </div>

            <div>
                <a href="#">Home</a>
                <a href="#">Restaurants</a>
                <a href="#">Categories</a>
            </div>

            <div>
                <button>Connexion</button>
            </div>
        </nav>
    )
}