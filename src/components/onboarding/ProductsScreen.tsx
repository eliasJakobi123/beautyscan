import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface ProductsScreenProps {
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

const ProductsScreen: React.FC<ProductsScreenProps> = ({ onNext }) => {
  const { t } = useLanguage();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products = [
    { id: "foundation", label: "Foundation", emoji: "🧴" },
    { id: "mascara", label: "Mascara", emoji: "👁️" },
    { id: "lipProducts", label: "Lip Products", emoji: "💋" },
    { id: "eyeliner", label: "Eyeliner", emoji: "✏️" },
    { id: "highlighter", label: "Highlighter", emoji: "✨" },
    { id: "skincare", label: "Skincare", emoji: "🌿" },
  ];

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const canContinue = selectedProducts.length > 0;

  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-sm mx-auto w-full"
      >
        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold font-poppins text-foreground mb-2 text-center leading-tight"
        >
          Which beauty products do you use?
        </motion.h1>

        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm font-nunito text-muted-foreground text-center mb-6"
        >
          This helps us provide personalized recommendations
        </motion.p>

        {/* Makeup Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
          className="text-4xl text-center mb-8"
        >
          💅
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-2 gap-3 mb-8"
        >
          {products.map((product) => {
            const selected = selectedProducts.includes(product.id);
            return (
              <motion.button
                key={product.id}
                onClick={() => toggleProduct(product.id)}
                className={`p-3 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-3 relative group
                  ${selected ? "border-beauty-rose bg-beauty-rose/20 shadow-lg ring-2 ring-beauty-rose/60 scale-105" : "border-white/20 bg-white/10"}
                  hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-beauty-rose/80`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{ transition: 'box-shadow 0.3s, border-color 0.3s, background 0.3s, transform 0.2s' }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                    ${selected ? "bg-beauty-rose" : "bg-white/20"}`}
                >
                  <span className="text-sm">{product.emoji}</span>
                </div>
                <span
                  className={`text-sm font-nunito font-semibold flex-1 text-left ${
                    selected ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {product.label}
                </span>
                {/* Animated checkmark, only one per selected card */}
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={selected ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md"
                >
                  <span className="text-beauty-rose text-xs font-bold">✓</span>
                </motion.span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Continue Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={onNext}
          disabled={!canContinue}
          className={`w-full py-4 text-lg font-bold font-poppins rounded-2xl shadow-xl transition-all duration-300 ${
            canContinue
              ? "bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-foreground transform hover:scale-105"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ProductsScreen;
