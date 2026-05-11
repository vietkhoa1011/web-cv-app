import { CategorySectionProps, FetchProductsParams } from "@/types/index";

const CategorySection = ({ categories, selectedCategory, setSelectedCategory }: CategorySectionProps) => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all border-2 ${selectedCategory === "" ? "bg-black text-white border-black" : "bg-white text-black border-neutral-200 hover:border-black"
                        }`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all border-2 ${selectedCategory === category ? "bg-black text-white border-black" : "bg-white text-black border-neutral-200 hover:border-black"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </section>
    );
};
export default CategorySection;