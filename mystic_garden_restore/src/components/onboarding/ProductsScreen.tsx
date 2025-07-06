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
    { id: "foundation", label: t("foundation"), emoji: "🧴" },
    { id: "mascara", label: t("mascara"), emoji: "👁️" },
    { id: "lipProducts", label: t("lipProducts"), emoji: "💋" },
    { id: "eyeliner", label: t("eyeliner"), emoji: "✏️" },
    { id: "highlighter", label: t("highlighter"), emoji: "✨" },
    { id: "skincare", label: t("skincare"), emoji: "🌿" },
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
          className="text-2xl font-bold font-poppins text-white mb-2 text-center leading-tight"
        >
          {t("productsTitle")}
        </motion.h1>

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
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.7 + index * 0.05,
                duration: 0.4,
                type: "spring",
              }}
              onClick={() => toggleProduct(product.id)}
              className={`p-3 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-3 ${
                selectedProducts.includes(product.id)
                  ? "border-beauty-rose bg-beauty-rose/20"
                  : "border-white/20 bg-white/10"
              } hover:bg-white/15`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  selectedProducts.includes(product.id)
                    ? "bg-beauty-rose"
                    : "bg-white/20"
                }`}
              >
                <span className="text-sm">{product.emoji}</span>
              </div>
              <span
                className={`text-sm font-nunito font-semibold flex-1 text-left ${
                  selectedProducts.includes(product.id)
                    ? "text-white"
                    : "text-zinc-200"
                }`}
              >
                {product.label}
              </span>
              {selectedProducts.includes(product.id) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-5 h-5 bg-beauty-rose rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
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
              ? "bg-gradient-to-r from-beauty-rose to-beauty-violet hover:from-beauty-rose/90 hover:to-beauty-violet/90 text-white transform hover:scale-105"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          {t("continue")}
        </motion.button>

        {/* Info note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="text-center text-xs font-nunito text-zinc-400 mt-4 px-4"
        >
          Nur zur besseren Auswertung deiner Scans. Keine Produktempfehlungen.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ProductsScreen;
