import { useNavigate } from 'react-router-dom';
import { 
  Bed, 
  Wind, 
  BookOpen, 
  Sparkles, 
  Box, 
  Sofa 
} from 'lucide-react';

const categories = [
  { name: 'Bedding', icon: Bed, count: '5 Items', span: 'md:col-span-2 md:row-span-2', bg: 'bg-[#63489A]', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800' },
  { name: 'Comfort', icon: Wind, count: '4 Items', span: 'md:col-span-2 md:row-span-1', bg: 'bg-[#4EBCBE]', img: 'https://images.unsplash.com/photo-1592433051474-06c8022758v?auto=format&fit=crop&q=80&w=800' },
  { name: 'Study', icon: BookOpen, count: '4 Items', span: 'md:col-span-1 md:row-span-2', bg: 'bg-[#FF8B66]', img: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=800' },
  { name: 'Storage', icon: Box, count: '3 Items', span: 'md:col-span-1 md:row-span-2', bg: 'bg-rose-500', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800' },
  { name: 'Personal Care', icon: Sparkles, count: '3 Items', span: 'md:col-span-2 md:row-span-1', bg: 'bg-indigo-500', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' },
  { name: 'Living', icon: Sofa, count: '3 Items', span: 'md:col-span-4 md:row-span-1', bg: 'bg-amber-600', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800' },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-[#FDFCFB] dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 px-4">
          <div className="max-w-xl text-left">
            <h2 className="text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-none">
              Shop by <br /><span className="text-blue-600">Category</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
              Discover everything you need for a comfortable hostel stay.
            </p>
          </div>
          <button 
            onClick={() => navigate('/browse')}
            className="mt-8 md:mt-0 text-sm font-black text-gray-900 dark:text-white uppercase tracking-[0.2em] border-b-4 border-blue-600 pb-2 hover:text-blue-600 transition-colors"
          >
            Explore All Essentials →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[220px]">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/browse?category=${cat.name}`)}
              className={`group relative overflow-hidden rounded-[2rem] transition-all duration-700 hover:shadow-2xl hover:-translate-y-1.5 ${cat.span} ${cat.bg}`}
            >
              {/* Background Image with Layered Overlays */}
              <img 
                src={cat.img} 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 group-hover:scale-110 group-hover:opacity-60 transition-all duration-1000" 
                alt={cat.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/60 group-hover:from-black/40 transition-all duration-700" />
              
              <div className="relative h-full p-8 flex flex-col justify-between text-left">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-xl border border-white/20 transform-gpu group-hover:rotate-12 transition-all duration-500">
                  <cat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-1 group-hover:translate-x-2 transition-transform duration-500">{cat.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform duration-500 delay-75">
                      {cat.count}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
