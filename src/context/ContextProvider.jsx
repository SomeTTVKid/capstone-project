// useMemo makes it listen to only state that has changed and not change all state
// Prevents infinite loops
import { createContext, useState, useMemo } from 'react' 

export const Context = createContext()

function ContextProvider(props){ 

  const initState = {
    name: '',
    slug: ''
  }

  const [charInfo, setCharInfo] = useState() 
  const [charAppearance, setCharAppearance] = useState() 
  const [token, setToken] = useState() 
  const [isDataPopulated, setIsDataPopulated] = useState() 
  const [isSearching, setIsSearching] = useState(false)  
  const [formData, setFormData] = useState(initState) 

  const setForm = (value) => { setFormData(value) } 
  const setCharacterInfo = (characterInfo) => { setCharInfo(characterInfo) } 
  const setCharacterAppearance = (value) => { setCharAppearance(value) } 
  const setAccessToken = (access_token) => { setToken(access_token) } 
  const setRenderState = (value) => { setIsDataPopulated(value) } 
  const setSearchingState = (value) => { setIsSearching(value) } 

  const slugNames = [ 
    "Aegwynn", "Aerie-Peak", "Agamaggan", "Aggramar", "Akama",
    "Alexstrasza", "Alleria", "Altar-Of-Storms", "Alterac-Mountains", "Amanthul",
    "Andorhal", "Anetheron", "Antonidas", "Anubarak", "Anvilmar", "Arathor", 
    "Archimonde", "Area-52", "Argent-Dawn", "Arthas", "Arygos", "Auchindoun", 
    "Azgalor", "Azjolnerub", "Azshara", "Azuremyst", "Baelgun", "Balnazzar", 
    "Barthilas", "Black-Dragonflight", "Blackhand", "Blackrock", 
    "Blackwater-Raiders", "Bleeding-Hollow", "Blood-Furnace", "Bloodhoof", 
    "Bloodscalp", "Bonechewer", "Borean-Tundra", "Boulderfist", "Bronzebeard", 
    "Burning-Blade", "Burning-Legion", "Caelestrasz", "Cairne", "Cenarion-Circle", 
    "Cenarius", "Chogall", "Chromaggus", "Crushridge", "Daggerspine", "Dalaran", 
    "Dalvengyr", "Dark-Iron", "Darkspear", "Darrowmere", "Deathwing", "Dentarg", 
    "Destromath", "Dethecus", "Detheroc", "Doomhammer", "Draenor", 
    "Dragonblight", "Dragonmaw", "Draktharon", "Drakthul", "Dreadmaul", 
    "Drenden", "Dunemaul", "Durotan", "Duskwood", "Earthen-Ring", "Echo-Isles", 
    "Elune", "Emerald-Dream", "Eonar", "Eredar", "Executus", "Exodar", 
    "Farstriders", "Feathermoon", "Fenris", "Firetree", "Fizzcrank", "Frostmane", 
    "Frostmourne", "Frostwolf", "Galakrond", "Gallywix", "Garona", "Garrosh", 
    "Goldrinn", "Greymane", "Grizzly-Hills", "Guldan", "Gundrak", "Gurubashi", 
    "Hakkar", "Haomarush", "Hydraxis", "Hyjal", "Icecrown", "Illidan", "Jaedenar", 
    "Jubeithos", "Kaelthas", "Kalecgos", "Kargath", "Kelthuzad", "Khadgar", 
    "Khaz-Modan", "Khazgoroth", "Kiljaeden", "Kilrogg", "Korgath", "Korialstrasz", 
    "Kul-Tiras", "Laughing-Skull", "Lightbringer", "Lightnings-Blade", "Llane", 
    "Lothar", "Madoran", "Maelstrom", "Magtheridon", "Maiev", "Malganis", 
    "Malorne", "Malygos", "Mannoroth", "Medivh", "Misha", "Moknathal", "Moon-Guard", 
    "Moonrunner", "Mugthol", "Muradin", "Nagrand", "Nathrezim", "Nazgrel", 
    "Nazjatar", "Nerzhul", "Norgannon", "Onyxia", "Perenolde", "Proudmoore", 
    "Queldorei", "Quelthalas", "Ragnaros", "Ravenholdt", "Ravencrest", "Rexxar", 
    "Rivendare", "Runetotem", "Sargeras", "Saurfang", "Scarlet-Crusade", 
    "Scilla", "Senjin", "Sentinels", "Shandris", "Shattered-Halls", 
    "Shattered-Hand", "Shuhalo", "Silver-Hand", "Silvermoon", "Skywall", 
    "Smolderthorn", "Spinebreaker", "Spirestone", "Staghelm", 
    "Steamwheedle-Cartel", "Stonemaul", "Stormrage", "Stormscale", "Stormreaver", 
    "Suramar", "Tanaris", "Terenas", "Terokkar", "Thaurissan", "The-Scryers", 
    "The-Underbog", "The-Venture-Co", "Thorium-Brotherhood", "Thrall", 
    "Tichondrius", "Tortheldrin", "Trollbane", "Turalyon", "Twisting-Nether", 
    "Undermine", "Ursin", "Vashj", "Veknilash", "Velen", "Whisperwind", 
    "Wildhammer", "Windrunner", "Winterhoof", "Wyrmrest-Accord", "Ysera", 
    "Ysondre", "Zangarmarsh", "Zuljin", "Zuluhed" 
    ];


  const contextValue = useMemo(() => ({
    charInfo, 
    setCharacterInfo, 
    charAppearance, 
    setCharAppearance, 
    token, 
    setAccessToken, 
    isDataPopulated, 
    setRenderState, 
    isSearching, 
    setSearchingState, 
    formData, 
    setForm,
    slugNames,
    initState
  }), [
    charInfo, 
    charAppearance, 
    token, 
    isDataPopulated, 
    isSearching, 
    formData
  ])

  return ( 
    <Context.Provider value={contextValue}> 
      {props.children} 
    </Context.Provider> 
  ) 
} 

export default ContextProvider
