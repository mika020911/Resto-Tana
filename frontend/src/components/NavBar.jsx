export default function NavBar() {
    return(
        <nav className="flex items-center justify-between px-6 md:px-12 py-4 sticky top-0 z-50 glass-card mx-4 mt-4 mb-2 ">
            <div className=" flex items-center gap-2">
                <span className="text-2xl">R</span>
                <span className="font-bold text-xl text-dark">Resto <span className="text-orange-400">Tana</span></span>
                
            </div>

            <div>
                <a href="#" className="text-dark/70 hover:text-dark font-medium transition-colors">Home</a>
                <a href="#" className="text-dark/70 hover:text-dark font-medium transition-colors">Restaurants</a>
                <a href="#" className="text-dark/70 hover:text-dark font-medium transition-colors">Categories</a>
            </div>

            <div className="flex items-center gap-3">
                <button className="bg-dark text-white px-5 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">Connexion</button>
            </div>
        </nav>
    )
}