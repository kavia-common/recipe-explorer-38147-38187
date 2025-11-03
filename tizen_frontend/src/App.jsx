import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import { useTizenKeys } from './hooks/useTizenKeys';

// PUBLIC_INTERFACE
const mockRecipes = [
  {
    id: 1,
    title: 'Ocean Salmon Bowl',
    image: 'https://images.unsplash.com/photo-1519860926-343c3eea3542?auto=format&fit=crop&w=600&q=80',
    category: 'Seafood',
    ingredients: [
      'Salmon fillet',
      'Rice',
      'Soy sauce',
      'Avocado',
      'Cucumber',
    ],
    steps: [
      'Cook rice.',
      'Grill salmon.',
      'Slice avocado & cucumber.',
      'Assemble bowl, drizzle soy sauce.'
    ],
  },
  {
    id: 2,
    title: 'Amber Citrus Chicken',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    category: 'Poultry',
    ingredients: [
      'Chicken breast',
      'Orange juice',
      'Honey',
      'Thyme',
      'Salt & Pepper'
    ],
    steps: [
      'Marinate chicken in orange juice & honey.',
      'Pan-sear with thyme.',
      'Cook until golden.',
      'Serve with reduced sauce.'
    ],
  },
  {
    id: 3,
    title: 'Professional Veggie Stir Fry',
    image: 'https://images.unsplash.com/photo-1464306076886-2550b6fae869?auto=format&fit=crop&w=600&q=80',
    category: 'Vegetarian',
    ingredients: [
      'Broccoli',
      'Carrots',
      'Bell Peppers',
      'Soy sauce',
      'Sesame oil'
    ],
    steps: [
      'Chop veggies.',
      'Stir fry on high heat.',
      'Add soy sauce & sesame oil.',
      'Serve hot.'
    ],
  },
  {
    id: 4,
    title: 'Blueberry Pancakes',
    image: 'https://images.unsplash.com/photo-1504674900247-ecf7d6b132da?auto=format&fit=crop&w=600&q=80',
    category: 'Breakfast',
    ingredients: [
      'Flour',
      'Eggs',
      'Milk',
      'Blueberries',
      'Baking Powder'
    ],
    steps: [
      'Mix batter, fold in blueberries.',
      'Pour on griddle.',
      'Flip when bubbles form.',
      'Serve with maple syrup.'
    ],
  },
];

const categoryList = [
  'All',
  'Seafood',
  'Poultry',
  'Vegetarian',
  'Breakfast'
];

const styleGuide = {
  primary: '#2563EB',
  secondary: '#F59E0B',
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  shadow: '0 4px 16px 0 rgba(29, 78, 216, 0.08)',
  borderRadius: '28px'
}

// Utility LocalStorage Favorites
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
}
function setFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}

// PUBLIC_INTERFACE
function App() {
  // Main app state
  const [recipes, setRecipes] = useState(mockRecipes);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [screen, setScreen] = useState('list'); // list | detail | favorites
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavState] = useState(getFavorites());
  const [focusIdx, setFocusIdx] = useState(0);
  const [categoriesFocusIdx, setCategoriesFocusIdx] = useState(0);

  // Filter recipes by search and category
  const filteredRecipes = recipes.filter(r => {
    const matchCategory = category === 'All' || r.category === category;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Add/remove favorite
  function toggleFavorite(id) {
    let favs;
    if (favorites.includes(id)) {
      favs = favorites.filter(fid => fid !== id);
    } else {
      favs = [...favorites, id];
    }
    setFavState(favs);
    setFavorites(favs);
  }

  // Navigation logic for remote keys
  useTizenKeys({
    onLeft: () => {
      if (screen === 'list' && filteredRecipes.length > 0 && focusIdx % 3 !== 0) setFocusIdx(Math.max(0, focusIdx - 1));
      if (screen === 'favorites' && favorites.length > 0 && focusIdx % 3 !== 0) setFocusIdx(Math.max(0, focusIdx - 1));
      if (screen === 'list' && focusIdx === -1) setCategoriesFocusIdx(Math.max(0, categoriesFocusIdx - 1));
    },
    onRight: () => {
      if (screen === 'list' && filteredRecipes.length > 0 && focusIdx < filteredRecipes.length - 1 && (focusIdx+1)%3 !== 0) setFocusIdx(Math.min(filteredRecipes.length - 1, focusIdx + 1));
      if (screen === 'favorites' && favorites.length > 0 && focusIdx < favorites.length - 1 && (focusIdx+1)%3 !== 0) setFocusIdx(Math.min(favorites.length - 1, focusIdx + 1));
      if (screen === 'list' && focusIdx === -1) setCategoriesFocusIdx(Math.min(categoryList.length - 1, categoriesFocusIdx + 1));
    },
    onUp: () => {
      if (screen === 'list' && filteredRecipes.length > 0) {
        if (focusIdx >= 3) setFocusIdx(focusIdx - 3);
        else setFocusIdx(-1); // Move focus to category chips
      }
      if (screen === 'favorites' && favorites.length > 0 && focusIdx >= 3) setFocusIdx(focusIdx - 3);
    },
    onDown: () => {
      if (screen === 'list' && filteredRecipes.length > 0) {
        if (focusIdx < filteredRecipes.length - 3) setFocusIdx(focusIdx + 3);
      }
      if (screen === 'favorites' && favorites.length > 0) {
        if (focusIdx < favorites.length - 3) setFocusIdx(focusIdx + 3);
      }
      if (screen === 'list' && focusIdx === -1) setFocusIdx(0); // Move to first recipe card
    },
    onEnter: () => {
      if (screen === 'list' && focusIdx === -1) {
        setCategory(categoryList[categoriesFocusIdx]);
      } else if (screen === 'list' && filteredRecipes[focusIdx]) {
        setSelectedRecipe(filteredRecipes[focusIdx]);
        setScreen('detail');
      } else if (screen === 'favorites' && favorites.length > 0 && mockRecipes.find(r => r.id === favorites[focusIdx])) {
        setSelectedRecipe(mockRecipes.find(r => r.id === favorites[focusIdx]));
        setScreen('detail');
      }
    },
    onBack: () => {
      if (screen === 'detail') setScreen('list');
      else if (screen === 'favorites') setScreen('list');
      // else: optionally implement exit prompt
    }
  });

  // Responsive focus index on category change
  useEffect(() => {
    setFocusIdx(0);
  }, [category, search]);

  // UI Components
  return (
    <div className="tv-app ocean-theme" style={{
      width: 1920,
      height: 1080,
      background: styleGuide.background,
      color: styleGuide.text,
      fontFamily: 'Samsung Sharp Sans, Arial, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <TopBar
        search={search}
        setSearch={setSearch}
        showFavorites={() => { setScreen('favorites'); setFocusIdx(0); }}
        styleGuide={styleGuide}
      />
      {/* Category Chips (focusIdx=-1) */}
      {screen === 'list' && (
        <div className="categories-bar" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 36,
          width: '90%',
          margin: '32px auto 12px auto',
          zIndex: 10
        }}>
          {categoryList.map((cat, idx) => (
            <button
              key={cat}
              className="category-chip"
              style={{
                background: category === cat ?
                  `linear-gradient(90deg, #2563EB33 0%, #F59E0B22 100%)`
                  : styleGuide.surface,
                color: category === cat ? styleGuide.primary : styleGuide.text,
                border: category === cat ? `2px solid ${styleGuide.primary}` : `2px solid #ddd`,
                boxShadow: category === cat ? styleGuide.shadow : 'none',
                borderRadius: styleGuide.borderRadius,
                padding: '16px 48px',
                fontSize: 38,
                fontWeight: 600,
                transition: 'all .22s',
                outline: categoriesFocusIdx === idx && focusIdx === -1 ? `3px solid ${styleGuide.primary}` : 'none',
                opacity: categoriesFocusIdx === idx ? 1 : 0.92
              }}
              tabIndex={-1}
              onClick={() => {
                setCategory(cat);
                setCategoriesFocusIdx(idx);
                setFocusIdx(0);
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Recipe Grid/List View */}
      {screen === 'list' && (
        <div className="recipes-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '370px',
          gap: '44px',
          justifyItems: 'center',
          width: '90%',
          margin: '24px auto',
        }}>
          {filteredRecipes.length === 0 &&
            <div style={{
              gridColumn: 'span 3',
              textAlign: 'center',
              color: styleGuide.error,
              fontSize: 48,
              fontWeight: 500,
              marginTop: 80
            }}>
              No recipes found.
            </div>
          }
          {filteredRecipes.map((r, idx) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              selected={focusIdx === idx}
              isFav={favorites.includes(r.id)}
              onFavToggle={() => toggleFavorite(r.id)}
              onClick={() => { setSelectedRecipe(r); setScreen('detail'); }}
              styleGuide={styleGuide}
            />
          ))}
        </div>
      )}

      {/* Recipe Detail Modal/View */}
      {screen === 'detail' && selectedRecipe && (
        <div className="recipe-detail-modal" style={{
          position: 'absolute',
          left: 0, top: 0, width: '100%', height: '100%',
          background: 'rgba(249,250,251,0.92)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 200,
          overflowY: 'auto',
          justifyContent: 'center',
          transition: 'all .23s',
        }}>
          <div style={{
            background: styleGuide.surface,
            borderRadius: styleGuide.borderRadius,
            boxShadow: styleGuide.shadow,
            width: 1220,
            maxWidth: '94%',
            padding: '54px 72px 44px 72px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: styleGuide.text,
            position: 'relative',
            border: `1.5px solid ${styleGuide.primary}22`,
            transition: 'all .24s',
          }}>
            <img src={selectedRecipe.image}
              alt={selectedRecipe.title}
              style={{
                width: 410,
                height: 306,
                objectFit: 'cover',
                borderRadius: styleGuide.borderRadius,
                boxShadow: styleGuide.shadow,
                marginBottom: 28
              }}
            />
            <div style={{
              fontSize: 64,
              fontWeight: 700,
              marginBottom: 18,
              color: styleGuide.primary,
              textAlign: 'center'
            }}>{selectedRecipe.title}</div>
            <div style={{
              color: styleGuide.secondary,
              fontWeight: 600,
              fontSize: 34,
              marginBottom: 22
            }}>{selectedRecipe.category}</div>
            <div style={{ width: '100%' }}>
              <div style={{
                fontSize: 36,
                fontWeight: 600,
                color: styleGuide.primary,
                marginBottom: 16,
              }}>Ingredients:</div>
              <ul style={{
                padding: '0 0 0 28px',
                fontSize: 32,
                marginBottom: 18
              }}>
                {selectedRecipe.ingredients.map((ing, i) =>
                  <li key={i} style={{ marginBottom: 4 }}>{ing}</li>
                )}
              </ul>
              <div style={{
                fontSize: 36,
                fontWeight: 600,
                color: styleGuide.primary,
                marginBottom: 10,
                marginTop: 22
              }}>Steps:</div>
              <ol style={{
                padding: '0 0 0 28px',
                fontSize: 32,
              }}>
                {selectedRecipe.steps.map((step, i) =>
                  <li key={i} style={{ marginBottom: 10 }}>{step}</li>
                )}
              </ol>
            </div>
            <div style={{
              marginTop: 30,
              display: 'flex',
              gap: 30,
              alignItems: 'center'
            }}>
              <button
                onClick={() => { toggleFavorite(selectedRecipe.id); }}
                style={{
                  background: favorites.includes(selectedRecipe.id) ?
                    styleGuide.primary : styleGuide.surface,
                  color: favorites.includes(selectedRecipe.id) ?
                    styleGuide.surface : styleGuide.primary,
                  border: `2.5px solid ${styleGuide.primary}`,
                  borderRadius: styleGuide.borderRadius,
                  boxShadow: favorites.includes(selectedRecipe.id) ? styleGuide.shadow : 'none',
                  fontSize: 34,
                  fontWeight: 600,
                  padding: '18px 40px',
                  cursor: 'pointer',
                  transition: 'all .2s',
                  outline: favorites.includes(selectedRecipe.id) ? `2px solid ${styleGuide.primary}` : 'none'
                }}
              >
                {favorites.includes(selectedRecipe.id) ? 'Unfavorite' : 'Add to Favorites'}
              </button>
              <button
                onClick={() => setScreen('list')}
                style={{
                  background: styleGuide.surface,
                  color: styleGuide.primary,
                  border: `2px solid ${styleGuide.primary}`,
                  borderRadius: styleGuide.borderRadius,
                  fontSize: 34,
                  fontWeight: 600,
                  padding: '18px 40px',
                  cursor: 'pointer',
                  boxShadow: styleGuide.shadow,
                  marginLeft: 18,
                  transition: 'all .2s'
                }}
              >
                Back to Recipes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Screen */}
      {screen === 'favorites' && (
        <div style={{
          width: '90%',
          margin: '46px auto',
          minHeight: '670px',
          background: styleGuide.surface,
          borderRadius: styleGuide.borderRadius,
          boxShadow: styleGuide.shadow,
          border: `2px solid ${styleGuide.primary}22`,
          padding: '38px 46px 50px 46px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: styleGuide.text,
        }}>
          <div style={{
            fontSize: 56,
            fontWeight: 800,
            color: styleGuide.primary,
            marginBottom: 12,
            letterSpacing: '-1.6px',
            textAlign: 'center'
          }}>
            Favorites
          </div>
          {favorites.length === 0 &&
            <div style={{
              color: styleGuide.error,
              fontSize: 38,
              fontWeight: 500,
              margin: '40px auto'
            }}>
              You haven't favorited any recipes yet.
            </div>
          }
          <div className="favorites-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridAutoRows: '370px',
            gap: '44px',
            justifyItems: 'center',
            width: '100%',
            marginTop: 30,
          }}>
            {favorites.map((fid, idx) => {
              const r = mockRecipes.find(r => r.id === fid);
              if (!r) return null;
              return (
                <RecipeCard
                  key={r.id}
                  recipe={r}
                  selected={focusIdx === idx}
                  isFav={true}
                  onFavToggle={() => toggleFavorite(r.id)}
                  onClick={() => { setSelectedRecipe(r); setScreen('detail'); }}
                  styleGuide={styleGuide}
                />
              );
            })}
          </div>
          <button
            onClick={() => setScreen('list')}
            style={{
              marginTop: 40,
              background: styleGuide.primary,
              color: styleGuide.surface,
              border: `2px solid ${styleGuide.primary}`,
              borderRadius: styleGuide.borderRadius,
              fontSize: 34,
              fontWeight: 600,
              padding: '18px 44px',
              cursor: 'pointer',
              boxShadow: styleGuide.shadow,
              transition: 'all .22s'
            }}>Back to Recipes</button>
        </div>
      )}

      {/* Ocean theme global gradient overlay for visual depth */}
      <div style={{
        position: 'absolute',
        pointerEvents: 'none',
        inset: 0,
        background: 'linear-gradient(90deg, #2563EB0A 0%, #F59E0B1A 100%)',
        opacity: '.52',
        zIndex: 1,
      }}></div>
    </div>
  );
}

// Top navigation bar component
function TopBar({ search, setSearch, showFavorites, styleGuide }) {
  return (
    <div className="top-bar"
      style={{
        width: '100%',
        height: 120,
        background: styleGuide.surface,
        boxShadow: styleGuide.shadow,
        borderRadius: `0 0 ${styleGuide.borderRadius} ${styleGuide.borderRadius}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 70px',
        position: 'relative',
        zIndex: 20,
        borderBottom: `2px solid ${styleGuide.primary}18`,
      }}
    >
      <div style={{
        fontSize: 58,
        fontWeight: 800,
        color: styleGuide.primary,
        letterSpacing: '-1.4px',
        textShadow: '1px 2px 14px #2563EB22'
      }}>
        Recipe Explorer
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 34 }}>
        {/* Search input */}
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: styleGuide.background,
            color: styleGuide.text,
            border: `2px solid ${styleGuide.primary}`,
            borderRadius: styleGuide.borderRadius,
            fontSize: 34,
            fontWeight: 400,
            padding: '14px 32px',
            width: 370,
            marginRight: 30,
            boxShadow: '0 2px 12px 0 #2563EB11',
            outline: 'none',
            transition: 'all .19s'
          }}
          placeholder="Search recipes…"
        />
        {/* Favorites button */}
        <button
          onClick={showFavorites}
          style={{
            background: styleGuide.success,
            color: styleGuide.surface,
            border: 'none',
            borderRadius: styleGuide.borderRadius,
            padding: '14px 44px',
            fontSize: 34,
            fontWeight: 600,
            boxShadow: styleGuide.shadow,
            cursor: 'pointer',
            transition: 'all .19s'
          }}>
          Favorites
        </button>
      </div>
    </div>
  );
}

// Recipe card component
function RecipeCard({ recipe, selected, isFav, onFavToggle, onClick, styleGuide }) {
  return (
    <div
      tabIndex={-1}
      className="recipe-card"
      style={{
        background: styleGuide.surface,
        borderRadius: styleGuide.borderRadius,
        boxShadow: selected ? styleGuide.shadow : '0 1px 5px 0 #1111110A',
        border: selected ? `3.2px solid ${styleGuide.primary}` : `2px solid #e5e7eb`,
        width: '96%',
        height: '97%',
        padding: '24px 18px 22px 18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        outline: selected ? `3.5px solid ${styleGuide.primary}` : 'none',
        zIndex: selected ? 100 : 2,
        position: 'relative',
        transition: 'all .2s',
      }}
      onClick={onClick}
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{
          width: 260, height: 160,
          objectFit: 'cover',
          borderRadius: styleGuide.borderRadius,
          marginBottom: 22,
          boxShadow: selected ? styleGuide.shadow : 'none',
        }}
      />
      <div style={{
        fontSize: 38,
        fontWeight: 700,
        color: styleGuide.primary,
        marginBottom: 11,
        textAlign: 'center',
        textShadow: selected ? '0px 2px 14px #2563EB11' : 'none'
      }}>
        {recipe.title}
      </div>
      <div style={{
        color: styleGuide.secondary,
        fontWeight: 500,
        fontSize: 28,
        marginBottom: 13,
      }}>{recipe.category}</div>
      <button
        onClick={e => { e.stopPropagation(); onFavToggle(); }}
        style={{
          background: isFav ? styleGuide.primary : styleGuide.surface,
          color: isFav ? styleGuide.surface : styleGuide.primary,
          border: `2px solid ${styleGuide.primary}`,
          borderRadius: styleGuide.borderRadius,
          fontSize: 25,
          fontWeight: 600,
          padding: '9px 28px',
          cursor: 'pointer',
          boxShadow: isFav ? styleGuide.shadow : 'none',
          position: 'absolute',
          bottom: 24,
          right: 28,
          outline: isFav ? `2px solid ${styleGuide.primary}` : 'none',
          transition: 'all .15s'
        }}
      >
        {isFav ? 'Favorited' : 'Favorite'}
      </button>
    </div>
  );
}

export default App;
