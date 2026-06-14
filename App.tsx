import React, { useState, useMemo } from "react";
import { 
  PREPOSITION_EXERCISES, 
  SER_ESTAR_EXERCISES, 
  ExerciseItem, 
  BlankDefinition 
} from "./data";
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  TrendingUp, 
  Sparkles, 
  Search, 
  Eye, 
  Shuffle, 
  ChevronDown, 
  AlertCircle,
  Lightbulb,
  Check,
  Award,
  BookMarked,
  Layers,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Current active tab of the exercise
  const [activeTab, setActiveTab] = useState<"preposiciones" | "ser-estar">("preposiciones");
  
  // Set of answers stored as: { [blankId]: stringSelected }
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Checking mode: "instant" or "manual"
  const [checkMode, setCheckMode] = useState<"instant" | "manual">("instant");
  
  // Explicit checked state for "manual" mode
  const [isManuallySubmitted, setIsManuallySubmitted] = useState<boolean>(false);
  
  // Search query to filter exercises
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter for exercise status: "all" | "incorrect" | "correct" | "unattempted"
  const [statusFilter, setStatusFilter] = useState<"all" | "incorrect" | "correct" | "unattempted">("all");
  
  // Randomized order toggle
  const [isRandomOrder, setIsRandomOrder] = useState(false);
  
  // Show all explanations toggle
  const [showAllExplanations, setShowAllExplanations] = useState(false);

  // Expanded explanations details per sentence ID (manual toggle per card)
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});

  // Active Grammatical Cheat Sheet overlay
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Active Reset confirmation overlay
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Exercises filtered based on current tab, search, status, and order
  const exercises = useMemo(() => {
    const list = activeTab === "preposiciones" ? PREPOSITION_EXERCISES : SER_ESTAR_EXERCISES;
    
    // 1. Apply Search
    let filtered = list.filter(item => 
      item.originalText.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 2. Apply status filter
    filtered = filtered.filter(item => {
      const itemBlanks = item.blanks;
      const statuses = itemBlanks.map(blank => {
        const userValue = answers[blank.id];
        if (!userValue) return "unattempted";
        return userValue.toLowerCase() === blank.correctAnswer.toLowerCase() ? "correct" : "incorrect";
      });

      if (statusFilter === "unattempted") {
        return statuses.some(s => s === "unattempted");
      }
      if (statusFilter === "correct") {
        return statuses.every(s => s === "correct");
      }
      if (statusFilter === "incorrect") {
        return statuses.some(s => s === "incorrect");
      }
      return true; // "all"
    });

    // 3. Apply randomized if enabled
    if (isRandomOrder) {
      return [...filtered].sort((a, b) => ((a.id * 17) % 10) - ((b.id * 17) % 10));
    }

    return filtered;
  }, [activeTab, searchQuery, statusFilter, isRandomOrder, answers]);

  // Handle a single select change
  const handleSelectChange = (blankId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [blankId]: value
    }));

    // Find the blank definition and exercise ID
    const allExercisesList = [...PREPOSITION_EXERCISES, ...SER_ESTAR_EXERCISES];
    const exercise = allExercisesList.find(ex => ex.blanks.some(b => b.id === blankId));
    if (exercise) {
      const blank = exercise.blanks.find(b => b.id === blankId);
      if (blank && value.toLowerCase() === blank.correctAnswer.toLowerCase()) {
        setExpandedExplanations(prev => ({
          ...prev,
          [exercise.id]: true
        }));
      }
    }
  };

  // Helper to determine if a specific blank is correct
  const getBlankStatus = (blank: BlankDefinition): "not-answered" | "correct" | "incorrect" => {
    const userValue = answers[blank.id];
    if (!userValue) return "not-answered";
    
    if (checkMode === "manual" && !isManuallySubmitted) {
      return "not-answered";
    }

    return userValue.toLowerCase() === blank.correctAnswer.toLowerCase() ? "correct" : "incorrect";
  };

  // Helper to verify if an entire exercise sentence is answered correctly
  const getExerciseStatus = (item: ExerciseItem) => {
    const statuses = item.blanks.map(b => getBlankStatus(b));
    if (statuses.some(s => s === "incorrect")) return "incorrect";
    if (statuses.every(s => s === "correct")) return "correct";
    if (item.blanks.some(b => answers[b.id])) return "started";
    return "unattempted";
  };

  // Stats calculation
  const stats = useMemo(() => {
    const currentExercisesList = activeTab === "preposiciones" ? PREPOSITION_EXERCISES : SER_ESTAR_EXERCISES;
    let totalBlanks = 0;
    let correctBlanks = 0;
    let attemptedBlanks = 0;

    currentExercisesList.forEach(item => {
      item.blanks.forEach(b => {
        totalBlanks++;
        const val = answers[b.id];
        if (val) {
          attemptedBlanks++;
          if (val.toLowerCase() === b.correctAnswer.toLowerCase()) {
            correctBlanks++;
          }
        }
      });
    });

    const percent = totalBlanks > 0 ? Math.round((correctBlanks / totalBlanks) * 100) : 0;
    return {
      totalBlanks,
      attemptedBlanks,
      correctBlanks,
      percent,
      isFinished: attemptedBlanks === totalBlanks && correctBlanks === totalBlanks
    };
  }, [activeTab, answers]);

  // Trigger custom confirmation for resetting answers
  const handleReset = () => {
    setShowResetConfirm(true);
  };

  // Show all correct answers (Auto-fill)
  const handleShowAllAnswers = () => {
    const currentList = activeTab === "preposiciones" ? PREPOSITION_EXERCISES : SER_ESTAR_EXERCISES;
    const filled: Record<string, string> = { ...answers };
    currentList.forEach(item => {
      item.blanks.forEach(b => {
        filled[b.id] = b.correctAnswer;
      });
    });
    setAnswers(filled);
    if (checkMode === "manual") {
      setIsManuallySubmitted(true);
    }
  };

  // Reset all tabs
  const handleResetAll = () => {
    setAnswers({});
    setIsManuallySubmitted(false);
    setExpandedExplanations({});
    setSearchQuery("");
    setStatusFilter("all");
    setIsRandomOrder(false);
    setShowAllExplanations(false);
  };

  const toggleExplanation = (exerciseId: number) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 flex flex-col antialiased">
      
      {/* Header Navigation following 'Clean Minimalism' style */}
      <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-xs">
            <GraduationCap className="h-6 w-6" strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">Aula de Español</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Ինտերակտիվ քերականության վարժություններ</p>
          </div>
        </div>

        {/* Navigation Tabs inserted straight in Header exactly like the theme styling */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => {
                setActiveTab("preposiciones");
                setIsManuallySubmitted(false);
              }}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                activeTab === "preposiciones"
                  ? "bg-white shadow-xs text-indigo-700 font-bold"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              2.2 Preposiciones
            </button>
            <button
              onClick={() => {
                setActiveTab("ser-estar");
                setIsManuallySubmitted(false);
              }}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all ${
                activeTab === "ser-estar"
                  ? "bg-white shadow-xs text-indigo-700 font-bold"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              2.5 Ser / Estar
            </button>
          </nav>

          <div className="hidden sm:block h-6 w-px bg-slate-200"></div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-xs font-semibold text-slate-700">Առաջընթաց (Progreso)՝</span>
            <div className="w-28 sm:w-32 h-2 bg-slate-150 rounded-full overflow-hidden border border-slate-200/40 relative">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${stats.percent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-indigo-700 leading-none min-w-[32px]">{stats.percent}%</span>
          </div>
        </div>
      </header>

      {/* Main Exercise Area with grid/flex layout from Clean Minimalism */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Column: List of Exercises */}
        <div className="flex-1 w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col gap-6">
          
          {/* Section title & subtitle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {activeTab === "preposiciones" 
                  ? "2.2. Rellenar con preposiciones" 
                  : "2.5. Selección de verbos Ser >< Estar"}
              </h2>
              <p className="text-xs text-slate-500 italic mt-0.5">
                {activeTab === "preposiciones"
                  ? "Selecciona la preposición correcta para rellenar los espacios, o indica 'X' si no hace falta."
                  : "Escoge la conjugación correcta de los verbos 'ser' y 'estar' según el contexto gramatical."}
              </p>
            </div>

            {/* Micro Controls button */}
            <button
              onClick={() => setShowCheatSheet(true)}
              className="px-3 py-1.5 border border-slate-200 hover:border-slate-350 bg-slate-50 rounded-lg text-xs font-bold text-slate-600 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <BookMarked className="w-3.5 h-3.5 text-indigo-600" />
              <span>Բացել հուշաթերթիկը</span>
            </button>
          </div>

          {/* Search, Filter & Order controls */}
          <div className="flex flex-col sm:flex-row gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Որոնել նախադասություն..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all text-slate-800"
              />
            </div>

            {/* Filter tags inside inline-flex container */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-500">Ցուցադրել՝</span>
              <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
                {[
                  { value: "all", label: "Բոլորը" },
                  { value: "incorrect", label: "Սխալներով" },
                  { value: "unattempted", label: "Չլրացված" }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setStatusFilter(opt.value as any)}
                    className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors ${
                      statusFilter === opt.value
                        ? "bg-slate-800 text-white"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Shuffle button */}
              <button
                onClick={() => setIsRandomOrder(!isRandomOrder)}
                className={`p-1.5 rounded-lg border transition-all ${
                  isRandomOrder 
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700" 
                    : "border-slate-200 bg-white text-slate-500 hover:bg-slate-100/50"
                }`}
                title={isRandomOrder ? "Վերականգնել սկզբնական հերթականությունը" : "Խառնել վարժությունների հերթականությունը"}
              >
                <Shuffle className="w-3.5 h-3.5" />
              </button>

              {/* Clean Reset button with RotateCcw icon */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="p-1.5 rounded-lg border border-slate-250 bg-white text-rose-650 hover:bg-rose-50 hover:border-rose-200 transition-all flex items-center gap-1.5 px-2.5"
                title="Զրոյացնել պատասխանները / Reiniciar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold">Զրոյացնել / Reiniciar</span>
              </button>
            </div>
          </div>

          {/* Instant checking vs Manual mode selection bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/30 px-3 py-2 rounded-lg border border-slate-100 text-[11px] text-slate-600">
            <div className="flex items-center gap-3">
              <span className="font-bold text-slate-500">Ստուգման եղանակը՝</span>
              <label className="inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="checkMode"
                  checked={checkMode === "instant"}
                  onChange={() => {
                    setCheckMode("instant");
                    setIsManuallySubmitted(false);
                  }}
                  className="accent-indigo-600 h-3 w-3"
                />
                <span className={checkMode === "instant" ? "font-bold text-indigo-700" : ""}>Անմիջապես</span>
              </label>
              <label className="inline-flex items-center gap-1 cursor-pointer">
                <input
                  type="radio"
                  name="checkMode"
                  checked={checkMode === "manual"}
                  onChange={() => setCheckMode("manual")}
                  className="accent-indigo-600 h-3 w-3"
                />
                <span className={checkMode === "manual" ? "font-bold text-indigo-700" : ""}>Ձեռքով</span>
              </label>
            </div>

            <button
              onClick={() => setShowAllExplanations(!showAllExplanations)}
              className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline py-0.5 flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showAllExplanations ? "Ծալել բացատրությունները" : "Ցուցադրել բոլոր կանոնները ներքևում"}</span>
            </button>
          </div>

          {/* Celebration Success Banner */}
          {stats.isFinished && (
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-xl text-white shadow-lg flex flex-col items-center text-center gap-2"
            >
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-200" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-wide">¡Excelente trabajo! Ամբողջությամբ լուծված է</h3>
                <p className="text-xs text-emerald-100 mt-0.5">
                  Դուք բոլոր բացթողումները լրացրել եք ճիշտ պատասխաններով։ Ոչ մի սխալ չի հայտնաբերվել։
                </p>
              </div>
            </motion.div>
          )}

          {/* ACTIVE EXERCISE LIST ITEMS */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {exercises.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-10 text-center bg-slate-50 border border-dashed border-slate-250 rounded-xl text-slate-400"
                >
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-350 mb-2" />
                  <p className="font-bold text-sm text-slate-700">Հարցեր չեն գտնվել</p>
                  <p className="text-xs text-slate-400 mt-0.5">Փորձեք մուտքագրել այլ բառեր կամ անցնել հաջորդ բաժնին:</p>
                </motion.div>
              ) : (
                exercises.map((item, index) => {
                  const estatus = getExerciseStatus(item);
                  const isExExpanded = showAllExplanations || expandedExplanations[item.id];
                  
                  return (
                    <motion.div
                      key={`${activeTab}-${item.id}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      layoutId={`card-${activeTab}-${item.id}`}
                      className={`p-4 rounded-xl border transition-all ${
                        estatus === "correct"
                          ? "border-emerald-100 bg-emerald-50/15"
                          : estatus === "incorrect"
                          ? "border-rose-100 bg-rose-50/10"
                          : "border-slate-150 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-extrabold text-slate-400">ՎԱՐԺՈՒԹՅՈՒՆ {item.id}</span>
                          {estatus === "correct" && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-150">
                              <Check className="w-2.5 h-2.5 stroke-[3.5]" /> ¡Correcto!
                            </span>
                          )}
                          {estatus === "incorrect" && (
                            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-150">
                              Error
                            </span>
                          )}
                        </div>

                        {/* Interactive Explanation toggler */}
                        <button
                          onClick={() => toggleExplanation(item.id)}
                          className="text-[11px] text-slate-400 hover:text-slate-600 py-0.5 px-1.5 rounded-sm hover:bg-slate-50 transition-colors flex items-center gap-1 font-bold"
                        >
                          <span>Բացատրություն</span>
                          <ChevronDown className={`w-3 h-3 transform transition-transform ${isExExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {/* Content Sentence text containing the custom dropdown selects */}
                      <div className="pr-2 text-slate-800 font-medium leading-relaxed text-[15px] sm:text-base">
                        <div className="flex flex-wrap items-center gap-y-3.5 gap-x-1">
                          <span className="text-slate-400 font-bold mr-1">{item.id}.</span>
                          {item.parts.map((pText, pIdx) => {
                            const companionBlank = item.blanks[pIdx];
                            return (
                              <React.Fragment key={pIdx}>
                                <span>{pText}</span>
                                {companionBlank && (
                                  <div className="inline-block relative">
                                    <select
                                      id={`select-${companionBlank.id}`}
                                      value={answers[companionBlank.id] || ""}
                                      onChange={(e) => handleSelectChange(companionBlank.id, e.target.value)}
                                      className={`appearance-none font-extrabold text-center pl-3.5 pr-8 py-1 sm:py-1.5 mx-1.5 text-xs sm:text-sm rounded-lg border shadow-xs transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500/15 ${
                                        getBlankStatus(companionBlank) === "correct"
                                          ? "bg-emerald-50 border-emerald-300 text-emerald-800 ring-1 ring-emerald-200"
                                          : getBlankStatus(companionBlank) === "incorrect"
                                          ? "bg-rose-50 border-rose-300 text-rose-800 ring-1 ring-rose-200"
                                          : answers[companionBlank.id]
                                          ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-bold"
                                          : "bg-slate-50 hover:bg-slate-100/60 border-slate-300 text-slate-500 hover:border-slate-400"
                                      }`}
                                      style={{ minWidth: "90px" }}
                                    >
                                      <option value="" disabled className="text-slate-400">
                                        ▼
                                      </option>
                                      {companionBlank.options.map((opt, oIdx) => (
                                        <option key={oIdx} value={opt} className="text-slate-800 bg-white">
                                          {opt === "X" ? "X (առանց նախդիրի)" : opt}
                                        </option>
                                      ))}
                                    </select>
                                    
                                    {/* Small chevron overlay inside raw select box */}
                                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                      <ChevronDown className="w-3 h-3" />
                                    </span>
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>

                      {/* Embed Collapsible Explanations directly into the sentence Card */}
                      {isExExpanded && (
                        <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 flex flex-col gap-2.5 animate-fadeIn">
                          {item.blanks.map((bInfo, bIdx) => (
                            <div key={bIdx} className="p-3 bg-slate-50 rounded-lg border border-slate-150 flex items-start gap-2">
                              {getBlankStatus(bInfo) === "correct" ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              ) : getBlankStatus(bInfo) === "incorrect" ? (
                                <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                              ) : (
                                <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <p className="font-bold text-[11px] text-indigo-800 uppercase tracking-wider">
                                  Բացթողում {item.blanks.length > 1 ? bIdx + 1 : ""} | Պատասխան՝ <span className="bg-indigo-100 text-indigo-900 px-1.5 py-0.5 rounded font-mono text-xs">{bInfo.correctAnswer}</span>
                                </p>
                                <p className="mt-1 text-slate-600 leading-relaxed">
                                  {bInfo.explanation}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>

          {/* Manual Checking submit button container */}
          {checkMode === "manual" && exercises.length > 0 && (
            <div className="mt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-slate-700">Ընտրված է ձեռքով ստուգման եղանակը</p>
                <p className="text-[11px] text-slate-500">Լրացրեք դատարկ դաշտերը և սեղմեք աջ կողմի կոճակը՝ ստուգելու համար։</p>
              </div>
              <button
                onClick={() => setIsManuallySubmitted(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-850 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Ստուգել ({stats.attemptedBlanks} / {stats.totalBlanks})</span>
              </button>
            </div>
          )}

        </div>

         {/* Right Sidebar - Explanations / Help from Clean Minimalism design flow */}
        <aside className="w-full lg:w-80 flex flex-col gap-6 shrink-0 lg:sticky lg:top-24">
          
          {/* Active Explanations Preview widget */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Explicación</h3>
            
            <div className="space-y-4">
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-slate-100">
                <span className="block text-xs font-bold text-indigo-600 mb-1 underline">Regla Integral X</span>
                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                  <strong>X</strong> տարբերակը ցույց է տալիս, որ տվյալ դիրքում անորոշ դերբայներից կամ գոյականներից առաջ որևէ նախդիր չի պահանջվում:
                </p>
              </div>
              
              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-slate-100">
                <span className="block text-xs font-bold text-indigo-600 mb-1 underline">Régimen Verbal 2.2</span>
                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                  Իսպաներենի շատ բայեր պահանջում են հաստատուն նախդրային կառավարում (օրինակ՝ <em>soñar con</em>, <em>atreverse a</em>), իսկ մյուսները միանում են ուղղակիորեն:
                </p>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-lg border border-slate-100">
                <span className="block text-xs font-bold text-indigo-600 mb-1 underline">Ser / Estar 2.5</span>
                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                  Իսպաներենի կարևորագույն խնդիրներից է <strong>Ser</strong> (էություն, մշտական հատկանիշներ, տվյալներ) և <strong>Estar</strong> (ժամանակավոր վիճակ, գտնվելու վայր) բայերի ճիշտ զատումը:
                </p>
              </div>
            </div>
          </div>

          {/* Quick Informational / Help card */}
          <div className="bg-amber-50/75 rounded-2xl border border-amber-100 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4.5 h-4.5 text-amber-500 fill-amber-500/20" />
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Recordatorio</h3>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              Դուք ցանկացած պահի կարող եք լրացնել բոլոր ճիշտ պատասխանները ինքնաստուգման նպատակով՝ սեղմելով <strong>Ավտոլրացում</strong> կոճակը։
            </p>

            <button
              onClick={handleShowAllAnswers}
              className="w-full mt-1.5 py-2 bg-white/90 hover:bg-white text-slate-700 font-bold text-[11px] border border-amber-200 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-3xs"
            >
              <Lightbulb className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>Ավտոլրացնել ճիշտ տարբերակները</span>
            </button>
          </div>

          {/* Educational quotes */}
          <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100/60 text-slate-700">
            <h4 className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">Consejo de estudio</h4>
            <p className="text-[11px] text-slate-600 mt-1 italic leading-relaxed">
              «Իսպաներենի կանոնների ու օրինակների ուշադիր ընթերցումը զարգացնում է լեզվազգացողությունը շատ ավելի արագ, քան մեխանիկական անգիր անելը։»
            </p>
          </div>

        </aside>

      </main>

      {/* Bottom Sticky Menu / Sticky Footer exactly like theme */}
      <footer className="bg-white border-t border-slate-200 px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-3 text-slate-400 text-xs text-center sm:text-left">
          <span className="font-semibold text-slate-500">Nivel: B2 Intermedio Alto</span>
          <span className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
          <span className="font-semibold text-slate-500">Unidad 2: Sintaxis</span>
          <span className="hidden sm:inline w-1.5 h-1.5 bg-slate-200 rounded-full" />
          <span className="hidden sm:inline text-slate-400">Պատրաստված է սիրով դեպի իսպաներենը</span>
        </div>
        <div className="flex gap-2 items-center w-full sm:w-auto">
          <button 
            onClick={handleReset}
            className="flex-1 sm:flex-none px-5 py-2 rounded-lg border border-slate-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 text-slate-650 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reiniciar / Սկսել նորից</span>
          </button>
          <button 
            onClick={() => {
              const otherTab = activeTab === "preposiciones" ? "ser-estar" : "preposiciones";
              setActiveTab(otherTab);
              setIsManuallySubmitted(false);
            }}
            className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all"
          >
            {activeTab === "preposiciones" ? "Siguiente: Ser >< Estar" : "Regresar a Preposiciones"}
          </button>
        </div>
      </footer>

      {/* GRAMMATICAL CHEAT SHEET DIALOG OVERLAY */}
      <AnimatePresence>
        {showCheatSheet && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheatSheet(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            
            {/* Sheet Box container styled with clean minimalist border elements */}
            <motion.div
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 12, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col relative z-10"
            >
              <div className="px-6 py-4.5 border-b border-slate-150 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700">
                    <BookMarked className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Prontuario de Gramática Española</h3>
                    <p className="text-[10px] text-slate-500">Դժվար դեպքերի կիրառման համառոտ կանոններ</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowCheatSheet(false)}
                  className="p-1 px-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
                >
                  Փակել
                </button>
              </div>

              {/* Scrollable sheet body content */}
              <div className="p-6 overflow-y-auto flex flex-col gap-5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                
                {/* section: SER */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                  <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    SER բայը (Լինել, հանդիսանալ)
                  </h4>
                  <p className="text-xs text-slate-500 mb-2.5">Առարկաների և երևույթների ներքին, մշտական կամ բնորոշող հատկանիշներ՝</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li><strong>Ծննդավայր / ծագում</strong>: <em>es de Zaragoza</em> (նա ծագումով Սարագոսայից է)</li>
                    <li><strong>Մասնագիտություն / պաշտոն</strong>: <em>es enfermera</em> (աշխատում է որպես բուժքույր)</li>
                    <li><strong>Ինքնության հաստատում և ազգակցական կապեր</strong>: <em>son mis hermanas</em> (նրանք իմ քույրերն են)</li>
                    <li><strong>Որակական գնահատական կամ էություն</strong>: <em>el trabajo es difícil</em> (աշխատանքը բարդ է ինքնին)</li>
                    <li><strong>Օրացուցային ամսաթվեր, օրվา ժամեր</strong>: <em>ayer fue el 4 de octubre</em></li>
                    <li><strong>Իրադարձությունների կամ հանդիպումների անցկացման վայր</strong>: <em>La reunión será en el despacho</em></li>
                  </ul>
                </div>

                {/* section: ESTAR */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                  <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    ESTAR բայը (Գտնվել, լինել [վիճակում])
                  </h4>
                  <p className="text-xs text-slate-500 mb-2.5">Ֆիզիկական գտնվելու վայր, փոփոխական վիճակներ կամ գործընթացների արդյունքներ՝</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li><strong>Ֆիզիկական դիրք / գտնվելու վայր</strong>: <em>están fuera</em> (դրսում են), <em>está en casa</em></li>
                    <li><strong>Ժամանակավոր վիճակ</strong>: <em>estoy muy cansado</em> (ես շատ հոգնած եմ)</li>
                    <li><strong>Առողջություն / ինքնազգացողություն</strong>: <em>las chicas están malas</em> (աղջիկները հիվանդ են)</li>
                    <li><strong>Ընտանեկան դրություն</strong>: <em>¿estabas casado cuando...?</em></li>
                    <li><strong>Ամսաթվի նշում "a" նախդիրի միջոցով</strong>: <em>estamos a 22 de mayo</em> (մայիսի 22-ն է)</li>
                    <li><strong>Կրավորական վիճակ / գործողության արդյունք</strong>: <em>quiero que esté hecho</em></li>
                  </ul>
                </div>

                {/* section: PREPOSITIONS */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-150">
                  <h4 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Նախդրային կառավարման դժվարություններ (2.2)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
                    <li><strong>Անորոշ դերբայներ առանց նախդիրների ('X' նշումը)</strong>: 
                      <span className="block mt-0.5 pl-3 border-l-2 border-slate-300">
                        <em>decidir X cambiar</em>, <em>pensar X regresar</em>, <em>siento mucho X no poder</em>, <em>te apetece X tomar algo</em>
                      </span>
                    </li>
                    <li><strong>Անձնական "a" նախդիրը</strong> դրվում է շնչավոր ուղիղ խնդիրներից առաջ՝ <em>¿Escuchas a la profesora?</em></li>
                    <li><strong>Կայուն բայական կառավարում</strong>:
                      <ul className="list-circle pl-4 mt-1 space-y-1">
                        <li><em>sueño con ella</em> (երազում եմ նրա մասին)</li>
                        <li><em>no me atrevo a decírselo</em> (չեմ համարձակվում ասել դա)</li>
                        <li><em>estoy harto de trabajar tanto</em> (հոգնել եմ այսքան աշխատելուց)</li>
                        <li><em>nos vamos de fiesta</em> (գնում ենք խնջույքի)</li>
                        <li><em>¡Cuidado con esto!</em> (Զգույշ եղեք սրա հետ:)</li>
                      </ul>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom footer bar within Sheet Modal */}
              <div className="px-6 py-4 border-t border-slate-150 flex items-center justify-end bg-slate-50">
                <button
                  onClick={() => setShowCheatSheet(false)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  ¡Entendido! Սկսել թեստը
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOM CONFIRMATION DIALOG FOR RESET */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 12, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-rose-100 max-w-md w-full overflow-hidden flex flex-col relative z-10"
            >
              <div className="p-6 pb-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Reiniciar progreso / Զրոյացնել պատասխանները
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    Դուք պատրաստվում եք ջնջել ձեր լրացրած պատասխանները և սկսել նորից: Ընտրեք տարբերակներից մեկը.
                  </p>
                </div>
              </div>

              {/* Options to choose reset scope */}
              <div className="px-6 py-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    // Reset current active tab
                    const currentList = activeTab === "preposiciones" ? PREPOSITION_EXERCISES : SER_ESTAR_EXERCISES;
                    const blankIds = currentList.flatMap(item => item.blanks.map(b => b.id));
                    setAnswers(prev => {
                      const next = { ...prev };
                      blankIds.forEach(id => {
                        delete next[id];
                      });
                      return next;
                    });
                    setIsManuallySubmitted(false);
                    setExpandedExplanations({});
                    setShowResetConfirm(false);
                  }}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/15 transition-all flex flex-col gap-0.5"
                >
                  <span className="text-xs font-bold text-indigo-950">
                    Միայն այս բաժինը (Solo este bloque)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Ջնջել միայն {activeTab === "preposiciones" ? "լրացուցիչ նախդիրների" : "Ser / Estar բայերի"} պատասխանները:
                  </span>
                </button>

                <button
                  onClick={() => {
                    // Reset everything
                    setAnswers({});
                    setIsManuallySubmitted(false);
                    setExpandedExplanations({});
                    setShowResetConfirm(false);
                  }}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/15 transition-all flex flex-col gap-0.5"
                >
                  <span className="text-xs font-bold text-rose-700">
                    Ամբողջ առաջընթացը (Todo el progreso)
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Զրոյացնել երկու բաժինների բոլոր պատասխանները և սեթերը:
                  </span>
                </button>
              </div>

              {/* Bottom footer buttons within Modal */}
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-150 flex items-center justify-end gap-2.5 mt-4">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors"
                >
                  Չեղարկել / Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
