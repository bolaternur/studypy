import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag, Star, Coins, CheckCircle2, Users, Tag, Trash2, Plus,
  ArrowRightLeft, Package, Sparkles, Zap, Lock as LockIcon,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { playSound } from '../utils/sounds';
import { TextReveal } from '../components/TextReveal';
import { ALL_ITEMS, SHOP_ITEMS, type ShopItem } from '../constants/items';

// Re-exported so modules that imported the catalogue from this page
// before it moved keep working.
export { ALL_ITEMS } from '../constants/items';

export function Shop() {
  const { userProfile, buyItem, payShopRefresh, quickSellItem, listMarketplaceItem, buyMarketplaceItem, getMarketplaceListings, updateQuestProgress } = useAuth();
  const [activeTab, setActiveTab] = useState<'shop' | 'marketplace' | 'inventory'>('shop');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
  const [items, setItems] = useState<ShopItem[]>(SHOP_ITEMS);
  const [refreshCount, setRefreshCount] = useState(0);
  const [marketplaceListings, setMarketplaceListings] = useState<any[]>([]);
  const [isListing, setIsListing] = useState(false);
  const [listPrice, setListPrice] = useState(100);
  const [selectedItemToList, setSelectedItemToList] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'marketplace') {
      loadMarketplace();
    }
  }, [activeTab]);

  const loadMarketplace = async () => {
    const listings = await getMarketplaceListings();
    setMarketplaceListings(listings);
  };

  const handleBuy = async (item: ShopItem) => {
    if (processingId) return;
    if (!userProfile) {
      playSound('error');
      setMessage({ text: 'Только зарегистрированные пользователи могут совершать покупки.', type: 'error' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setProcessingId(item.id);
    playSound('click');
    
    try {
      const success = await buyItem(item.id, item.price);
      
      if (success) {
        updateQuestProgress('buy_item');
        updateQuestProgress('spend', item.price);
        setMessage({ text: `Вы успешно купили ${item.name}!`, type: 'success' });
      } else {
        setMessage({ text: 'Недостаточно монет или предмет уже куплен.', type: 'error' });
      }
    } finally {
      setProcessingId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleQuickSell = async (itemId: string) => {
    if (processingId) return;
    setProcessingId(itemId);
    try {
      const success = await quickSellItem(itemId);
      if (success) {
        setMessage({ text: 'Предмет успешно продан!', type: 'success' });
      } else {
        setMessage({ text: 'Ошибка при продаже.', type: 'error' });
      }
    } finally {
      setProcessingId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleListToMarketplace = async () => {
    if (!selectedItemToList || processingId) return;
    setProcessingId('list');
    try {
      const success = await listMarketplaceItem(selectedItemToList, listPrice);
      if (success) {
        setMessage({ text: 'Предмет выставлен на рынок!', type: 'success' });
        setIsListing(false);
        setSelectedItemToList(null);
      } else {
        setMessage({ text: 'Ошибка при выставлении.', type: 'error' });
      }
    } finally {
      setProcessingId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleBuyMarketplace = async (listing: any) => {
    if (processingId) return;
    if (listing.sellerId === userProfile?.uid) {
      setMessage({ text: 'Вы не можете купить свой собственный предмет!', type: 'error' });
      return;
    }
    setProcessingId(listing.id);
    try {
      const success = await buyMarketplaceItem(listing);
      if (success) {
        updateQuestProgress('buy_item');
        updateQuestProgress('spend', listing.price);
        setMessage({ text: 'Предмет куплен на рынке!', type: 'success' });
        loadMarketplace();
      } else {
        setMessage({ text: 'Недостаточно монет или предмет уже продан.', type: 'error' });
      }
    } finally {
      setProcessingId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleRefresh = async () => {
    if (processingId) return;
    if (!userProfile) {
      playSound('error');
      setMessage({ text: 'Только зарегистрированные пользователи могут обновлять магазин.', type: 'error' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const cost = refreshCount === 0 ? 0 : 50;
    if (refreshCount > 0 && (userProfile?.coins || 0) < cost) {
      setMessage({ text: 'Недостаточно монет для обновления.', type: 'error' });
      return;
    }
    
    setProcessingId('refresh');
    try {
      if (refreshCount > 0) {
        const paid = await payShopRefresh();
        if (!paid) return;
      }
      
      playSound('click');
      const shuffled = [...ALL_ITEMS].sort(() => 0.5 - Math.random());
      setItems(shuffled.slice(0, 4));
      setRefreshCount(prev => prev + 1);
      setMessage({ text: refreshCount === 0 ? 'Магазин обновлен бесплатно!' : 'Магазин обновлен за 50 монет!', type: 'success' });
    } finally {
      setProcessingId(null);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-4"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-medium uppercase tracking-wider">Экономика StudyPy</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            <TextReveal text="Торговля и" delay={0.1} /> <span className="text-amber-500 italic serif"><TextReveal text="арсенал" delay={0.3} /></span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center items-center gap-6"
          >
            <div className="flex items-center gap-2 bg-amber-500/20 px-6 py-3 rounded-2xl border border-amber-500/30">
              <Coins className="w-6 h-6 text-amber-500" />
              <span className="text-2xl font-bold text-amber-500">{userProfile?.coins || 0}</span>
              <span className="text-amber-500/60 text-sm font-medium ml-1">монет</span>
            </div>

            <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('shop')}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'shop' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
              >
                Магазин
              </button>
              <button
                onClick={() => setActiveTab('marketplace')}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'marketplace' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
              >
                Рынок
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-6 py-2 rounded-xl font-bold transition-all ${activeTab === 'inventory' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
              >
                Инвентарь
              </button>
            </div>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl border flex items-center gap-3 shadow-2xl backdrop-blur-xl ${
                message.type === 'success' 
                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' 
                  : 'bg-red-500/20 border-red-500/30 text-red-400'
              }`}
            >
              {message.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
              <span className="font-medium">{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'shop' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-amber-500" />
                  <TextReveal text="Предметы недели" delay={0.1} />
                </h2>
                <button
                  onClick={handleRefresh}
                  disabled={!!processingId}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-sm font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {processingId === 'refresh' && <div className="w-4 h-4 border-2 border-white/40 border-t-white bg-transparent rounded-full animate-spin" />}
                  {refreshCount === 0 ? 'Бесплатное обновление' : 'Обновить (50 монет)'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, index) => {
                  const isOwned = userProfile?.inventory?.some(i => i.itemId === item.id);
                  const canAfford = (userProfile?.coins || 0) >= item.price;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="group relative bg-[#080d10] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all duration-500"
                    >
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                      <p className="text-white/40 text-sm mb-8">{item.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-1.5">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span className="text-lg font-bold text-white">{item.price}</span>
                        </div>
                        <button
                          onClick={() => handleBuy(item)}
                          disabled={isOwned || !canAfford || !!processingId}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-center min-w-[100px] ${
                            isOwned ? 'bg-white/5 text-white/55' : !canAfford ? 'bg-red-500/10 text-red-500/50' : 'bg-white text-black hover:bg-amber-500 disabled:opacity-50'
                          }`}
                        >
                          {processingId === item.id ? (
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black bg-transparent rounded-full animate-spin" />
                          ) : (
                            isOwned ? 'Куплено' : 'Купить'
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-amber-500" />
                  <TextReveal text="Рынок игроков" delay={0.1} />
                </h2>
                <button
                  onClick={loadMarketplace}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-sm font-bold transition-all"
                >
                  Обновить список
                </button>
              </div>
              
              {marketplaceListings.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <Tag className="w-12 h-12 text-white/45 mx-auto mb-4" />
                  <p className="text-white/40">На рынке пока пусто. Будьте первым, кто выставит товар!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketplaceListings.map((listing, index) => (
                    <motion.div
                      key={listing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-[#080d10] border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-amber-500">
                          <Tag className="w-6 h-6" />
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-white/40">Продавец</p>
                          <p className="text-sm font-bold text-white">{listing.sellerName}</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-4">{listing.itemName}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span className="text-lg font-bold text-white">{listing.price}</span>
                        </div>
                        <button
                          onClick={() => handleBuyMarketplace(listing)}
                          disabled={!!processingId}
                          className="px-4 py-2 bg-amber-500 text-black rounded-xl text-sm font-bold hover:bg-amber-400 transition-all disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                        >
                          {processingId === listing.id ? (
                            <div className="w-4 h-4 border-2 border-black/20 border-t-black bg-transparent rounded-full animate-spin" />
                          ) : (
                            'Купить'
                          )}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-12">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-amber-500" />
                <TextReveal text="Ваш инвентарь" delay={0.1} />
              </h2>
              
              {!userProfile?.inventory || userProfile.inventory.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <ShoppingBag className="w-12 h-12 text-white/45 mx-auto mb-4" />
                  <p className="text-white/40">Ваш инвентарь пуст. Время что-нибудь купить!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {userProfile.inventory.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-[#080d10] border border-white/5 rounded-3xl p-6"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white mb-4">
                        <Star className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-6">{item.name.toUpperCase()}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleQuickSell(item.id)}
                          disabled={!!processingId}
                          className="flex items-center justify-center gap-2 p-2 bg-red-500/10 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500/20 transition-all disabled:opacity-50"
                        >
                          {processingId === item.id ? (
                            <div className="w-3 h-3 border-2 border-red-500/40 border-t-red-500 bg-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-3 h-3" />
                          )}
                          Продать
                        </button>
                        <button
                          onClick={() => {
                            setSelectedItemToList(item.id);
                            setIsListing(true);
                          }}
                          className="flex items-center justify-center gap-2 p-2 bg-teal-500/10 text-teal-500 rounded-xl text-xs font-bold hover:bg-teal-500/20 transition-all"
                        >
                          <ArrowRightLeft className="w-3 h-3" />
                          На рынок
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {}
        <AnimatePresence>
          {isListing && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#080d10] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  <TextReveal text="Выставить на рынок" delay={0.1} />
                </h3>
                <p className="text-white/40 mb-6">Укажите цену для {selectedItemToList?.replace(/_/g, ' ').toUpperCase()}</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <Coins className="w-6 h-6 text-amber-500" />
                    <input aria-label="Цена"
                      type="number"
                      value={listPrice}
                      onChange={(e) => setListPrice(parseInt(e.target.value) || 0)}
                      className="bg-transparent text-white text-2xl font-bold outline-none w-full"
                    />
                  </div>
                  <p className="text-xs text-white/50 italic">Примечание: Предмет будет удален из вашего инвентаря и станет доступен другим игрокам.</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setIsListing(false)}
                    className="flex-1 py-3 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-all"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleListToMarketplace}
                    disabled={!!processingId}
                    className="flex-1 py-3 bg-amber-500 text-black rounded-2xl font-bold hover:bg-amber-400 transition-all disabled:opacity-50 flex justify-center items-center h-12"
                  >
                    {processingId === 'list' ? (
                      <div className="w-5 h-5 border-2 border-black/20 border-t-black bg-transparent rounded-full animate-spin" />
                    ) : (
                      'Выставить'
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-amber-500/5 to-amber-500/5 border border-white/5 text-center"
        >
          <p className="text-white/40 text-sm">
            Торгуйте с умом! Цены на рынке устанавливаются игроками.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
