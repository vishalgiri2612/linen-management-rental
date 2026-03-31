import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LuCheck, LuStar, LuZap, LuShield, LuCircleHelp, LuArrowRight } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const packages = [
  {
    id: 'pkg_essential_001',
    name: 'Essential',
    price: '149',
    tagline: 'The Basics, Sterilized.',
    features: [
      '2x Fresh Bedsheets / Month',
      '2x Pillowcases / Month',
      'UV-C Treatment',
      'Standard Vacuum Sealing',
      'Free Delivery'
    ],
    icon: LuShield,
  },
  {
    id: 'pkg_comfort_002',
    name: 'Comfort Suite',
    price: '249',
    tagline: 'The Student Favorite.',
    features: [
      '4x Fresh Bedsheets / Month',
      '4x Pillowcases / Month',
      '90°C Thermal Sterilization',
      'UV-C Treatment',
      'Priority Delivery',
      'Eco-Safe Detergents'
    ],
    popular: true,
    icon: LuZap,
  },
  {
    id: 'pkg_elite_003',
    name: 'Elite Living',
    price: '399',
    tagline: 'Luxe Living, Redefined.',
    features: [
      '6x Fresh Bedsheets / Month',
      '6x Pillowcases / Month',
      '2x Duvet Covers / Month',
      'Accidental Damage Waiver',
      '90°C Thermal Sterilization',
      'Personal Concierge Support',
      'Ultra-Fast Delivery'
    ],
    icon: LuStar,
  },
];

const Packages = ({ isDark = false }) => {
  const brandNavy = '#1A3263';
  const brandCream = '#EFD2B0';
  const brandGold = '#FFC570';
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [dbItems, setDbItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/items');
        const data = await response.json();
        setDbItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);

  const handleEnroll = (pkg) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    // Find matching DB item to get real ObjectId
    const matchingDbItem = dbItems.find(item => 
      item.itemName.toLowerCase().includes(pkg.name.toLowerCase()) && 
      item.category === 'Package'
    );

    const actualId = matchingDbItem ? matchingDbItem._id : pkg.id;
    
    // Add to cart with the required structure
    addToCart({
      id: actualId,
      name: pkg.name,
      price: pkg.price,
      quantity: 1
    });
    
    navigate('/cart');
  };

  return (
    <div className={`py-48 px-6 lg:px-12 transition-colors duration-700 ${isDark ? 'bg-[#1A3263] text-[#EFD2B0]' : 'bg-[#EFD2B0] text-[#1A3263]'}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-32">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`text-[10px] font-black uppercase tracking-[1em] mb-8 block ${isDark ? 'text-[#FFC570]' : 'text-[#1A3263]/40'}`}
          >
            Pricing Plans
          </motion.span>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`text-7xl lg:text-9xl font-serif italic leading-none tracking-tighter ${isDark ? 'text-white' : 'text-[#1A3263]'}`}
            >
              <span className="whitespace-nowrap">Choose Your</span> <br /> <span className="opacity-30">Tier.</span>
            </motion.h1>
            <p className={`text-xl font-light leading-relaxed max-w-md border-l pl-10 italic ${isDark ? 'text-[#EFD2B0]/70 border-[#FFC570]' : 'text-[#1A3263]/60 border-[#1A3263]/20'}`}>
              Premium linen management doesn't have to be expensive. Find the perfect plan for your hostel stay.
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-px border transition-colors ${isDark ? 'bg-[#EFD2B0]/10 border-[#EFD2B0]/10' : 'bg-[#1A3263]/5 border-[#1A3263]/10'}`}>
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-16 transition-all duration-700 h-full flex flex-col group ${isDark ? 'bg-[#1A3263] hover:bg-white/[0.03]' : 'bg-[#EFD2B0] hover:bg-white'}`}
            >
              {pkg.popular && (
                <div className={`absolute top-0 right-0 px-8 py-3 text-[10px] font-black uppercase tracking-widest translate-y-[-100%] shadow-2xl ${isDark ? 'bg-[#FFC570] text-[#1A3263]' : 'bg-[#1A3263] text-[#EFD2B0]'}`}>
                  Recommended Choice
                </div>
              )}

              <div className="mb-16">
                <h3 className={`text-5xl font-serif italic mb-2 tracking-tight ${isDark ? 'text-white' : 'text-[#1A3263]'}`}>{pkg.name}</h3>
                <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-[#FFC570]' : 'text-[#547792]'}`}>{pkg.tagline}</p>
                <div className={`mt-12 flex items-baseline gap-2 ${isDark ? 'text-white' : 'text-[#1A3263]'}`}>
                  <span className="text-7xl font-serif italic tracking-tighter">₹{pkg.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">/ month</span>
                </div>
              </div>

              <div className="space-y-6 mb-20 flex-1">
                {pkg.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-6 group/item cursor-default">
                    <LuCheck className={`w-5 h-5 shrink-0 transition-transform ${isDark ? 'text-[#FFC570]' : 'text-[#1A3263]/40 group-hover/item:text-[#1A3263]'} group-hover/item:scale-125`} />
                    <span className={`text-lg font-light transition-opacity italic ${isDark ? 'opacity-60 group-hover/item:opacity-100' : 'text-[#1A3263]/60 group-hover/item:text-[#1A3263]'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleEnroll(pkg)}
                className={`w-full py-8 font-black uppercase tracking-[0.4em] text-[10px] border-none outline-none cursor-pointer transition-all flex items-center justify-center gap-6 group/btn ${isDark
                    ? pkg.popular ? 'bg-[#FFC570] text-[#1A3263] hover:bg-white' : 'bg-[#EFD2B0] text-[#1A3263] hover:bg-[#FFC570]'
                    : pkg.popular ? 'bg-[#1A3263] text-[#EFD2B0] hover:bg-[#FFC570] hover:text-[#1A3263]' : 'bg-[#1A3263]/5 text-[#1A3263] hover:bg-[#1A3263] hover:text-[#EFD2B0]'
                  }`}
              >
                Enroll Now <LuArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison & FAQ */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-px border mt-32 transition-colors ${isDark ? 'bg-[#EFD2B0]/10 border-[#EFD2B0]/10' : 'bg-[#1A3263]/5 border-[#1A3263]/10'}`}>
          <div className={`p-16 lg:p-24 space-y-16 transition-colors ${isDark ? 'bg-[#1A3263]' : 'bg-[#EFD2B0]'}`}>
            <div>
              <h2 className={`text-6xl font-serif italic mb-8 ${isDark ? 'text-white' : 'text-[#1A3263]'}`}>Compare <br /> <span className="opacity-30">Features.</span></h2>
              <p className={`text-xl font-light max-w-sm italic ${isDark ? 'text-[#EFD2B0]/60' : 'text-[#1A3263]/60'}`}>Still unsure? Our feature comparison helps you pick the right service.</p>
            </div>

            <div className="space-y-px">
              {['Hygiene Standards', 'Delivery Frequency', 'Damages Protection', 'Customer Support'].map((item, i) => (
                <div key={i} className={`flex justify-between items-center p-12 border transition-colors cursor-pointer group ${isDark ? 'border-[#EFD2B0]/5 hover:bg-white/[0.03]' : 'border-[#1A3263]/5 hover:bg-white'}`}>
                  <span className={`text-xs font-black uppercase tracking-[0.4em] ${isDark ? 'text-[#EFD2B0]' : 'text-[#1A3263]/60 group-hover:text-[#1A3263]'}`}>{item}</span>
                  <LuCircleHelp className={`w-6 h-6 transition-opacity ${isDark ? 'text-[#FFC570] opacity-20 group-hover:opacity-100' : 'text-[#1A3263] opacity-10 group-hover:opacity-100'}`} />
                </div>
              ))}
            </div>
          </div>

          <div className={`p-16 lg:p-32 relative overflow-hidden flex flex-col justify-center transition-colors ${isDark ? 'bg-[#EFD2B0] text-[#1A3263]' : 'bg-[#1A3263] text-[#EFD2B0]'}`}>
            <h3 className={`text-4xl font-serif italic mb-20 ${isDark ? 'text-[#1A3263]' : 'text-white'}`}>Packages FAQ</h3>
            <div className="space-y-16">
              <div className="space-y-6">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.6em] ${isDark ? 'text-[#1A3263]' : 'text-[#FFC570]'}`}>What if something gets damaged?</h4>
                <p className={`text-2xl font-light italic leading-relaxed ${isDark ? 'text-[#1A3263]/70' : 'text-[#EFD2B0]/60'}`}>Elite Living users have a 100% waiver. For others, nominal charges apply based on item type.</p>
              </div>
              <div className={`w-16 h-px ${isDark ? 'bg-[#1A3263]/20' : 'bg-white/10'}`} />
              <div className="space-y-6">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.6em] ${isDark ? 'text-[#1A3263]' : 'text-[#FFC570]'}`}>Can I switch plans mid-month?</h4>
                <p className={`text-2xl font-light italic leading-relaxed ${isDark ? 'text-[#1A3263]/70' : 'text-[#EFD2B0]/60'}`}>Yes, upgrades are instant. Downgrades take effect from the next billing cycle.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
