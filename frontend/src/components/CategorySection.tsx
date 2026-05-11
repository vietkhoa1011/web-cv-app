const CategorySection = ({ categories, selectedCategory, onSelectCategory }: {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}) => {
    return (
        <section id="categories" className="max-w-7xl mx-auto px-4 py-8 text-center">
            <h3 className="text-2xl font-bold mb-6">Shop by Category</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 justify-center">
                {categories.map((c) => (
                    <div
                        key={c}
                        onClick={() => onSelectCategory(c)}
                        className={`
                                border rounded-lg shadow-sm p-4 text-center text-sm uppercase
                                font-semibold tracking-widest cursor-pointer transition-colors

                                ${selectedCategory === c
                                ? "bg-black text-white"
                                : "bg-white hover:bg-black hover:text-white"
                            }`
                        }>
                        {c}
                    </div>
                ))}
            </div>
        </section>
    );
}
export default CategorySection;