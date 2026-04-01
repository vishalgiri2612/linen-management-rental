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
    <div className={`py-20 px-6 lg:px-12 transition-colors duration-700 ${isDark ? 'bg-[var(--bg-secondary)] text-[var(--text-primary)]' : 'bg-[var(--bg-primary)] text-[var(--text-primary)]'}`}>
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-16">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className={`text-[10px] font-black uppercase tracking-[1em] mb-8 block ${isDark ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]/40'}`}
          >
            Pricing Plans
          </motion.span>
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className={`text-7xl lg:text-9xl font-serif italic leading-none tracking-tighter ${isDark ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}
            >
              <span className="whitespace-nowrap">Choose Your</span> <br /> <span className="opacity-30">Tier.</span>
            </motion.h1>
            <p className={`text-xl font-light leading-relaxed max-w-md border-l pl-10 italic ${isDark ? 'text-[var(--text-primary)]/70 border-[var(--accent-primary)]' : 'text-[var(--text-primary)]/60 border-[var(--text-primary)]/20'}`}>
              Premium linen management doesn't have to be expensive. Find the perfect plan for your hostel stay.
            </p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-px border transition-colors ${isDark ? 'bg-[var(--text-primary)]/10 border-[var(--text-primary)]/10' : 'bg-[var(--accent-primary)]/5 border-[var(--accent-primary)]/10'}`}>
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-16 transition-all duration-700 h-full flex flex-col group ${isDark ? 'bg-[var(--bg-secondary)] hover:shadow-2xl' : 'bg-[var(--bg-secondary)] hover:shadow-2xl hover:translate-y-[-10px]'}`}
            >
              {pkg.popular && (
                <div className={`absolute top-0 right-0 px-8 py-3 text-[10px] font-black uppercase tracking-widest translate-y-[-100%] shadow-2xl ${isDark ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]' : 'bg-[var(--accent-primary)] text-[var(--bg-primary)]'}`}>
                  Recommended Choice
                </div>
              )}

              <div className="mb-16">
                <h3 className={`text-5xl font-serif italic mb-2 tracking-tight ${isDark ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>{pkg.name}</h3>
                <p className={`text-[10px] font-black uppercase tracking-widest ${isDark ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]/50'}`}>{pkg.tagline}</p>
                <div className={`mt-12 flex items-baseline gap-2 ${isDark ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)]'}`}>
                  <span className="text-7xl font-serif italic tracking-tighter">₹{pkg.price}</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">/ month</span>
                </div>
              </div>

              <div className="space-y-6 mb-20 flex-1">
                {pkg.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-6 group/item cursor-default">
                    <LuCheck className={`w-5 h-5 shrink-0 transition-transform ${isDark ? 'text-[var(--accent-primary)]' : 'text-[var(--accent-primary)]/40 group-hover/item:text-[var(--accent-primary)]'} group-hover/item:scale-125`} />
                    <span className={`text-lg font-light transition-opacity italic ${isDark ? 'opacity-60 group-hover/item:opacity-100' : 'text-[var(--text-primary)]/60 group-hover/item:text-[var(--text-primary)]'}`}>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleEnroll(pkg)}
                className={`w-full py-8 font-black uppercase tracking-[0.4em] text-[10px] border-none outline-none cursor-pointer transition-all flex items-center justify-center gap-6 group/btn ${isDark
                  ? pkg.popular ? 'bg-[var(--accent-primary)] text-[var(--bg-primary)]' : 'bg-[var(--bg-primary)] text-[var(--text-primary)]'
                  : pkg.popular ? 'bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-primary)] hover:text-[var(--bg-primary)]' : 'bg-[var(--text-primary)]/5 text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)]'
                  }`}
              >
                Enroll Now <LuArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Premium Feature Comparison Matrix */}
        <div className="mt-32 border-t border-[var(--border)] pt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20 items-end">
            <div className="lg:col-span-8">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-[10px] font-black uppercase tracking-[1em] text-[var(--accent-primary)] mb-8 block"
              >
                In-Depth Analysis
              </motion.span>
              <h2 className="text-5xl lg:text-7xl font-serif italic text-[var(--text-primary)] leading-none tracking-tighter">
                Compare <br /> <span className="opacity-30">The Details.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-xl text-[var(--text-primary)]/60 font-light italic leading-relaxed border-l border-[var(--border)] pl-8">
                Still unsure? Our feature comparison helps you pick the right service for your lifestyle.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-[var(--border)]">
                  <th className="py-12 px-8 text-left text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-secondary)] opacity-50 border-r border-[var(--border)]">Feature</th>
                  <th className="py-12 px-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">Essential</th>
                  <th className="py-12 px-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent-primary)] bg-[var(--text-primary)]/[0.02]">Comfort Suite</th>
                  <th className="py-12 px-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">Elite Living</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Hygiene Standards', essential: 'Standard', comfort: '90°C Thermal', elite: 'UV-C + 90°C' },
                  { name: 'Delivery Frequency', essential: 'Bi-Weekly', comfort: 'Weekly', elite: 'On-Demand' },
                  { name: 'Damages Protection', essential: 'Basic', comfort: 'Standard', elite: '100% Waiver' },
                  { name: 'Customer Support', essential: 'Email', comfort: 'Priority', elite: '24/7 Concierge' },
                  { name: 'Fabric Grade', essential: 'Premium Cotton', comfort: 'Luxe Percale', elite: 'Elite Sateen' }
                ].map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="border-t border-[var(--border)] hover:bg-[var(--text-primary)]/[0.01] transition-colors group"
                  >
                    <td className="py-10 px-8 text-lg font-serif italic text-[var(--text-primary)] border-r border-[var(--border)]">{row.name}</td>
                    <td className="py-10 px-8 text-center text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]/50">{row.essential}</td>
                    <td className="py-10 px-8 text-center text-[11px] font-bold uppercase tracking-widest text-[var(--accent-primary)] bg-[var(--text-primary)]/[0.02]">{row.comfort}</td>
                    <td className="py-10 px-8 text-center text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] opacity-100 font-black">{row.elite}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic FAQ Accordion */}
        <div className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="space-y-8"
            >
              <h3 className="text-5xl font-serif italic text-[var(--text-primary)] opacity-30">Packages FAQ</h3>
              <div className="w-20 h-1 bg-[var(--accent-primary)]" />
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  q: "What if something gets damaged?",
                  a: "Elite Living users have a 100% waiver. For others, nominal charges apply based on item type and severity of damage."
                },
                {
                  q: "Can I switch plans mid-month?",
                  a: "Yes, upgrades are instant. Downgrades take effect from the next billing cycle to ensure consistent service delivery."
                },
                {
                  q: "Is there a security deposit?",
                  a: "No, we believe in a trust-based model for our student community. Your identity verification is sufficient."
                }
              ].map((faq, i) => (
                <details key={i} className="group border border-[var(--border)] bg-white/5 backdrop-blur-sm shadow-sm">
                  <summary className="list-none p-10 cursor-pointer flex justify-between items-center group-hover:bg-[var(--text-primary)]/[0.02] transition-all">
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[var(--text-primary)]">{faq.q}</span>
                    <div className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center group-open:rotate-45 transition-transform duration-500">
                      <span className="text-xl font-light">+</span>
                    </div>
                  </summary>
                  <div className="p-10 pt-0 pb-12 animate-fade-in">
                    <p className="text-2xl font-serif italic font-light text-[var(--text-primary)]/60 leading-relaxed max-w-2xl border-l-[3px] border-[var(--accent-primary)] pl-8 ml-2">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Abstract CTA Side */}
          <div className="relative bg-[var(--text-primary)] p-16 lg:p-24 flex flex-col justify-end overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10 space-y-12">

              <h2 className="text-5xl lg:text-7xl font-serif italic text-white leading-tight tracking-tighter">
                Still have <br /> <span className="opacity-40">questions?</span>
              </h2>
              <p className="text-white/60 text-lg font-light italic max-w-sm">
                Our team is available 24/7 to help you choose the best plan for your hostel.
              </p>
              <button className="flex items-center gap-4 text-white text-[10px] font-black uppercase tracking-[0.5em] group/chat">
                Talk to Support <LuArrowRight className="w-4 h-4 group-hover/chat:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
