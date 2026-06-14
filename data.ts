export interface BlankDefinition {
  id: string; // unique identifier for the blank
  correctAnswer: string;
  options: string[]; // options to display inside select dropdown
  explanation: string; // Armenian explanation for this specific blank
}

export interface ExerciseItem {
  id: number;
  originalText: string;
  parts: string[]; // parts of sentences split by the blanks
  blanks: BlankDefinition[];
}

export const PREPOSITION_EXERCISES: ExerciseItem[] = [
  {
    id: 1,
    originalText: "Hemos decidido………………… cambiar de coche.",
    parts: ["Hemos decidido ", " cambiar de coche."],
    blanks: [
      {
        id: "prep-1-1",
        correctAnswer: "X",
        options: ["X", "a", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "**decidir** բայը անորոշ դերբայից առաջ գործածվում է առանց որևէ նախդիրի (*decidir + infinitivo*): Այդ պատճառով ճիշտ տարբերակն է **X**:"
      }
    ]
  },
  {
    id: 2,
    originalText: "El informe está………………… la mesa. Es importante………………… saberlo.",
    parts: ["El informe está ", " la mesa. Es importante ", " saberlo."],
    blanks: [
      {
        id: "prep-2-1",
        correctAnswer: "sobre",
        options: ["sobre", "en", "X", "a", "de", "con", "por", "para", "entre"],
        explanation: "Սեղանի մակերևույթին առարկայի գտնվելու վայրը նշելու համար օգտագործվում է **sobre** (վրա) կամ **en** (վրա/մեջ) նախդիրը:"
      },
      {
        id: "prep-2-2",
        correctAnswer: "X",
        options: ["X", "a", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "*es importante + infinitivo* անդեմ կառույցն արտահայտում է ընդհանուր դատողություն և անորոշ դերբայից առաջ նախդիր չի պահանջում:"
      }
    ]
  },
  {
    id: 3,
    originalText: "…………………ellos, ¿cuál es el más valiente? ¿El que está…………………tu derecha?",
    parts: ["", " ellos, ¿cuál es el más valiente? ¿El que está ", " tu derecha?"],
    blanks: [
      {
        id: "prep-3-1",
        correctAnswer: "Entre",
        options: ["Entre", "X", "A", "De", "En", "Con", "Por", "Para", "Sobre"],
        explanation: "**Entre** (միջև/մեջից) նախդիրն օգտագործվում է որոշակի խմբից կամ բազմությունից որևէ մեկին առանձնացնելու համար («Նրանց միջից...»):"
      },
      {
        id: "prep-3-2",
        correctAnswer: "a",
        options: ["a", "X", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "Գտնվելու վայր արտահայտող կայուն **a tu derecha** (քո աջ կողմում / քեզնից աջ) կառույցը միշտ պահանջում է **a** նախդիրը:"
      }
    ]
  },
  {
    id: 4,
    originalText: "¿Escuchas…………………la professora? Propone…………………otros ejercicios.",
    parts: ["¿Escuchas ", " la profesora? Propone ", " otros ejercicios."],
    blanks: [
      {
        id: "prep-4-1",
        correctAnswer: "a",
        options: ["a", "X", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "Եթե ուղիղ խնդիրը (objeto directo) կոնկրետ շնչավոր անձ է, ապա դրանից առաջ պարտադիր դրվում է անձնական **a** նախդիրը (*¿Escuchas a la profesora?*):"
      },
      {
        id: "prep-4-2",
        correctAnswer: "X",
        options: ["X", "a", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "**proponer** (առաջարկել) բայը պահանջում է ուղիղ խնդիր հայցական հոլովով՝ առանց նախդիրի անշունչ գոյականների դեպքում (*proponer otros ejercicios*):"
      }
    ]
  },
  {
    id: 5,
    originalText: "Nos vamos…………………fiesta. ¿Te apetece…………………tomar algo con nosotros?",
    parts: ["Nos vamos ", " fiesta. ¿Te apetece ", " tomar algo con nosotros?"],
    blanks: [
      {
        id: "prep-5-1",
        correctAnswer: "de",
        options: ["de", "X", "a", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "Ժամանցի/խնջույքի գնալու համար օգտագործվում է **irse de fiesta** կայուն դարձվածքը:"
      },
      {
        id: "prep-5-2",
        correctAnswer: "X",
        options: ["X", "a", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "**apetecer** (ցանկանալ / դուր գալ) բայը անորոշ դերբային միանում է անմիջապես՝ առանց նախդիրի (*¿Te apetece tomar...?*):"
      }
    ]
  },
  {
    id: 6,
    originalText: "Todas las noches sueño ………………… ella. No me atrevo…………………decírselo.",
    parts: ["Todas las noches sueño ", " ella. No me atrevo ", " decírselo."],
    blanks: [
      {
        id: "prep-6-1",
        correctAnswer: "con",
        options: ["con", "X", "a", "de", "en", "por", "para", "sobre", "entre"],
        explanation: "**soñar** (երազել / երազում տեսնել) բայը «ինչ-որ մեկին երազում տեսնել կամ ինչ-որ բանի մասին երազել» նշանակությամբ միշտ պահանջում է **con** նախդիրով խնդրառություն (*soñar con alguien*):"
      },
      {
        id: "prep-6-2",
        correctAnswer: "a",
        options: ["a", "X", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "**atreverse** (համարձակվել) անդրադարձ բայը անորոշ դերբայից առաջ պահանջում է **a** նախդիրի կիրառումը (*atreverse a hacer algo*):"
      }
    ]
  },
  {
    id: 7,
    originalText: "Siento mucho ………………… no poder ir………………… Provenza. Estoy harto………………… trabajar tanto.",
    parts: ["Siento mucho ", " no poder ir ", " Provenza. Estoy harto ", " trabajar tanto."],
    blanks: [
      {
        id: "prep-7-1",
        correctAnswer: "X",
        options: ["X", "a", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "**sentir** (ցավել, ափսոսալ) բայը միանում է հաջորդող անորոշ դերբային անմիջապես՝ առանց նախդիրի (*siento mucho no poder...*):"
      },
      {
        id: "prep-7-2",
        correctAnswer: "a",
        options: ["a", "X", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "Ուղղություն ցույց տվող **a** նախդիրն օգտագործվում է շարժում արտահայտող բայերից հետո (ինչպես օրինակ՝ **ir**-ը)՝ վերջնակետը նշելու համար (*ir a un lugar*):"
      },
      {
        id: "prep-7-3",
        correctAnswer: "de",
        options: ["de", "X", "a", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "**estar harto de + infinitivo** կայուն կառույցը նշանակում է «կոկորդին հասնել / հոգնել ինչ-որ բանից» և պահանջում է **de** նախդիրը:"
      }
    ]
  },
  {
    id: 8,
    originalText: "…………………ti, no estoy a gusto. ¿Cuándo piensas…………………regresar?",
    parts: ["", " ti, no estoy a gusto. ¿Cuándo piensas ", " regresar?"],
    blanks: [
      {
        id: "prep-8-1",
        correctAnswer: "Para",
        options: ["Para", "Sin", "X", "A", "De", "En", "Con", "Por", "Sobre"],
        explanation: "Այս համատեքստում, համաձայն բնօрինակ առաջադրանքի, օգտագործվում է **Para** նախդիրը («Քեզ համար / քո կարծիքով ես հարմարավետ չեմ զգում»):"
      },
      {
        id: "prep-8-2",
        correctAnswer: "X",
        options: ["X", "a", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "**pensar** բայը ապագայում ինչ-որ բան անելու մտադրության իմաստով (*pensar + infinitivo*) անմիջապես միանում է անորոշ դերբային առանց նախդիրի (*¿Cuándo piensas regresar?*):"
      }
    ]
  },
  {
    id: 9,
    originalText: "¡Cuidado…………………esto! Es peligroso.",
    parts: ["¡Cuidado ", " esto! Es peligroso."],
    blanks: [
      {
        id: "prep-9-1",
        correctAnswer: "con",
        options: ["con", "X", "a", "de", "en", "por", "para", "sobre", "entre"],
        explanation: "Զգուշացնող **¡Cuidado con...!** (Զգույշ եղիր... / Զգուշացիր...) արտահայտությունը միշտ պահանջում է **con** նախդիրը:"
      }
    ]
  },
  {
    id: 10,
    originalText: "…………………mí, no me da miedo…………………conducir…………………el centro.",
    parts: ["", " mí, no me da miedo ", " conducir ", " el centro."],
    blanks: [
      {
        id: "prep-10-1",
        correctAnswer: "A",
        options: ["A", "X", "De", "En", "Con", "Por", "Para", "Sobre", "Entre"],
        explanation: "*mí* դերանվան հետ անուղղակի խնդրի ընդգծման դեպքում նախադասության սկզբում պարտադիր դրվում է **a** նախդիրը (*A mí no me da miedo*):"
      },
      {
        id: "prep-10-2",
        correctAnswer: "X",
        options: ["X", "a", "de", "en", "con", "por", "para", "sobre", "entre"],
        explanation: "**dar miedo + infinitivo** (վախեցնել / վախ առաջացնել) կառույցը միանում է անորոշ դերբային առանց նախդիրի:"
      },
      {
        id: "prep-10-3",
        correctAnswer: "por",
        options: ["por", "en", "X", "a", "de", "con", "para", "sobre", "entre"],
        explanation: "**por** նախդիրն օգտագործվում է որոշակի տարածքով կամ տարածքի միջով շարժումն արտահատելու համար (*conducir por el centro* — վարել կենտրոնով / կենտրոնի տարածքում):"
      }
    ]
  }
];

export const SER_ESTAR_EXERCISES: ExerciseItem[] = [
  {
    id: 1,
    originalText: "Mis vecinos ........................ fuera.",
    parts: ["Mis vecinos ", " fuera."],
    blanks: [
      {
        id: "se-1-1",
        correctAnswer: "están",
        options: ["están", "son", "estuvieron", "fueron", "estaban", "eran"],
        explanation: "Օգտագործվում է **estar** (*están*) բայը, քանի որ խոսքը մարդկանց ընթացիկ ֆիզիկական գտնվելու վայրի մասին է (*fuera* — դրսում):"
      }
    ]
  },
  {
    id: 2,
    originalText: "Miguel ........................ en Suecia el año pasado.",
    parts: ["Miguel ", " en Suecia el año pasado."],
    blanks: [
      {
        id: "se-2-1",
        correctAnswer: "estuvo",
        options: ["estuvo", "fue", "estaba", "era", "está", "es"],
        explanation: "Օգտագործվում է **estar** բայը անցյալ կատարյալ ժամանակում (Pretérito Indefinido: *estuvo*)՝ անցյալի կոնկրետ ավարտված պահին (*el año pasado*) աշխարհագրական վայրում (*en Suecia*) գտնվելը փաստելու համար:"
      }
    ]
  },
  {
    id: 3,
    originalText: "Ayer ........................ el 4 de octubre.",
    parts: ["Ayer ", " el 4 de octubre."],
    blanks: [
      {
        id: "se-3-1",
        correctAnswer: "fue",
        options: ["fue", "estuvo", "era", "estaba", "es", "está"],
        explanation: "Օգտագործվում է **ser** բայը անցյալ կատարյալ ժամանակում (*fue*), քանի որ իսպաներենում օրացուցային ամսաթվերը միշտ արտահատվում են **ser** բայով:"
      }
    ]
  },
  {
    id: 4,
    originalText: "Buenos Aires ........................ en Argentina.",
    parts: ["Buenos Aires ", " en Argentina."],
    blanks: [
      {
        id: "se-4-1",
        correctAnswer: "está",
        options: ["está", "es", "estará", "será", "estuvo", "fue"],
        explanation: "Օգտագործվում է **estar** բայը, քանի որ մայրցամաքների, երկրների, քաղաքների և շենքերի աշխարհագրական դիրքը միշտ արտահայտվում է **estar**-ով՝ անկախ դրանց մշտական բնույթից:"
      }
    ]
  },
  {
    id: 5,
    originalText: "Pablo ........................ de Zaragoza, pero ........................ de viaje en Madrid.",
    parts: ["Pablo ", " de Zaragoza, pero ", " de viaje en Madrid."],
    blanks: [
      {
        id: "se-5-1",
        correctAnswer: "es",
        options: ["es", "está", "fue", "estuvo", "era", "estaba"],
        explanation: "Օգտագործվում է **ser** բայը (*es de Zaragoza*), քանի որ մարդկանց ծագումը, քաղաքացիությունը կամ ծննդավայրը միշտ արտահայտվում են **ser** բայով:"
      },
      {
        id: "se-5-2",
        correctAnswer: "está",
        options: ["está", "es", "estuvo", "fue", "estaba", "era"],
        explanation: "Օգտագործվում է **estar** բայը (*está de viaje*), քանի որ այն կիրառվում է տվյալ պահին տեղի ունեցող ժամանակավոր վիճակների և գործունեության համար:"
      }
    ]
  },
  {
    id: 6,
    originalText: "La reunión ........................ mañana en el despacho del abogado.",
    parts: ["La reunión ", " mañana en el despacho del abogado."],
    blanks: [
      {
        id: "se-6-1",
        correctAnswer: "será",
        options: ["será", "estará", "es", "está", "fue", "estuvo"],
        explanation: "Օգտագործվում է **ser** բայը (ապառնի ժամանակում՝ *será*), քանի որ ժողովների, միջոցառումների և տոների անցկացման/կայացման վայրը բացառապես արտահայտվում է **ser** բայով, այլ ոչ թե *estar*-ով:"
      }
    ]
  },
  {
    id: 7,
    originalText: "Mi madre ........................ enfermera. Dice que su trabajo ........................ difícil.",
    parts: ["Mi madre ", " enfermera. Dice que su trabajo ", " difícil."],
    blanks: [
      {
        id: "se-7-1",
        correctAnswer: "es",
        options: ["es", "está", "era", "estaba", "fue", "estuvo"],
        explanation: "Մարդու մասնագիտությունն ու զբաղմունքը միշտ արտահայտվում են **ser** բայով (*es enfermera*):"
      },
      {
        id: "se-7-2",
        correctAnswer: "es",
        options: ["es", "está", "será", "estará", "fue", "estuvo"],
        explanation: "Աշխատանքի բնույթի հատկանիշներն ու իրերի ներքին անփոփոխ որակները արտահայտվում են **ser** բայով (*su trabajo es difícil* — աշխատանքն ինքնին դժվար է):"
      }
    ]
  },
  {
    id: 8,
    originalText: "........................ muy cansado porque he dormido poco.",
    parts: ["", " muy cansado porque he dormido poco."],
    blanks: [
      {
        id: "se-8-1",
        correctAnswer: "Estoy",
        options: ["Estoy", "Soy", "Estaba", "Era", "Estuve", "Fui"],
        explanation: "Օգտագործվում է **estar** բայը (*Estoy*), քանի որ ֆիզիկական կամ հոգեկան վիճակը (հոգնածությունը), որն առաջացել է վերջին գործողության արդյունքում, ժամանակավոր կարգավիճակ է:"
      }
    ]
  },
  {
    id: 9,
    originalText: "El viernes pasado ........................ su día de descanso. Por eso no ........................ aquí.",
    parts: ["El viernes pasado ", " su día de descanso. Por eso no ", " aquí."],
    blanks: [
      {
        id: "se-9-1",
        correctAnswer: "fue",
        options: ["fue", "estuvo", "era", "estaba", "es", "está"],
        explanation: "**ser** բայը անցյալ ժամանակում (*fue*) օգտագործվում է որոշելու համար, թե օրացույցում ինչ օր էր տվյալ շաբաթվա օրը:"
      },
      {
        id: "se-9-2",
        correctAnswer: "estuvo",
        options: ["estuvo", "fue", "estaba", "era", "está", "es"],
        explanation: "**estar** բայը անցյալ ժամանակում (*estuvo*) օգտագործվում է նշելու համար որոշակի վայրում որևէ մեկի ներկայությունը կամ ֆիզիկական բացակայությունը:"
      }
    ]
  },
  {
    id: 10,
    originalText: "Las chicas que hoy ........................ malas ........................ mis hermanas.",
    parts: ["Las chicas que hoy ", " malas ", " mis hermanas."],
    blanks: [
      {
        id: "se-10-1",
        correctAnswer: "están",
        options: ["están", "son", "estuvieron", "fueron", "estaban", "eran"],
        explanation: "**estar malo/a** արտահայտությունը թարգմանվում է որպես «հիվանդ լինել / վատ զգալ» (ժամանակավոր վիճակ): Ի տարբերություն դրա, *ser malo* նշանակում է «վատ / չար լինել»:"
      },
      {
        id: "se-10-2",
        correctAnswer: "son",
        options: ["son", "están", "fueron", "estuvieron", "eran", "estaban"],
        explanation: "Ազգակցական կապերը, ընտանեկան կապերը և անձնական նույնականացումը միշտ փոխանցվում են **ser** բայով (*son mis hermanas*):"
      }
    ]
  },
  {
    id: 11,
    originalText: "¿Cuándo ........................ tu cumpleaños?",
    parts: ["¿Cuándo ", " tu cumpleaños?"],
    blanks: [
      {
        id: "se-11-1",
        correctAnswer: "es",
        options: ["es", "está", "será", "estará", "fue", "estuvo"],
        explanation: "Տոների և ծննդյան օրերի ամսաթվերը որոշվում են **ser** բայով (*¿Cuándo es tu cumpleaños?*):"
      }
    ]
  },
  {
    id: 12,
    originalText: "........................ bien, pero la verdad ........................ que no ........................ muy importante.",
    parts: ["", " bien, pero la verdad ", " que no ", " muy importante."],
    blanks: [
      {
        id: "se-12-1",
        correctAnswer: "Está",
        options: ["Está", "Es", "Estuvo", "Fue", "Estaba", "Era"],
        explanation: "Գնահատական կամ համաձայնություն արտահատելու համար («ամեն ինչ կարգին է», «դա լավ է») *bien* մակբայի հետ միշտ օգտագործվում է **estar** բայը (*está bien*):"
      },
      {
        id: "se-12-2",
        correctAnswer: "es",
        options: ["es", "está", "será", "estará", "fue", "estuvo"],
        explanation: "**la verdad es que** ներածական դարձվածքը («իրականում, ճշմարտությունն այն է, որ») խիստ կապված է **ser** բայի հետ:"
      },
      {
        id: "se-12-3",
        correctAnswer: "es",
        options: ["es", "está", "será", "estará", "fue", "estuvo"],
        explanation: "Որևէ բանի կարևորության աստիճանի գնահատումը (կարևոր լինելը) էական հատկանիշ է և պահանջում է **ser** բայը (*ser importante*):"
      }
    ]
  },
  {
    id: 13,
    originalText: "¿........................ casado cuando conociste a Carmen?",
    parts: ["¿", " casado cuando conociste a Carmen?"],
    blanks: [
      {
        id: "se-13-1",
        correctAnswer: "Estabas",
        options: ["Estabas", "Eras", "Estuviste", "Fuiste", "Estás", "Eres"],
        explanation: "Ընտանեկան դրությունը (ամուսնացած լինելը) իսպաներենում փոխանցվում է **estar** բայով: Քանի որ խոսքը անցյալում մեկ այլ գործողության կատարման պահին առկա վիճակի նկարագրության մասին է, ընտրվում է անցյալ անկատար ժամանակը (Pretérito Imperfecto: *estabas*):"
      }
    ]
  },
  {
    id: 14,
    originalText: "Vosotros ........................ simpáticos.",
    parts: ["Vosotros ", " simpáticos."],
    blanks: [
      {
        id: "se-14-1",
        correctAnswer: "sois",
        options: ["sois", "estáis", "seréis", "estaréis", "eran", "estaban"],
        explanation: "Մարդկանց ներքին անձնային որակներն ու բնավորության գծերը (համակրելի, հաճելի լինելը) արտահայտվում են **ser** բայով (համապատասխանեցնելով *vosotros* դերանվանը՝ *sois simpáticos*):"
      }
    ]
  },
  {
    id: 15,
    originalText: "Quiero que ........................ hecho antes de que ........................ las dos.",
    parts: ["Quiero que ", " hecho antes de que ", " las dos."],
    blanks: [
      {
        id: "se-15-1",
        correctAnswer: "esté",
        options: ["esté", "sea", "estará", "será", "estuvo", "fue"],
        explanation: "Ավարտված գործընթացի արդյունք հանդիսացող վիճակի արտահայտման համար օգտագործվում է **estar + participio** կառույցը: Կամքի արտահայտումից հետո (*quiero que*) պահանջվում է ըղձական եղանակ (Subjuntivo: *esté*):"
      },
      {
        id: "se-15-2",
        correctAnswer: "sean",
        options: ["sean", "estén", "son", "están", "serán", "estarán"],
        explanation: "Ժամային ցուցանիշները միշտ արտահայտվում են **ser** բայով (*son las dos*): *antes de que* ժամանակի շաղկապից հետո օգտագործվում է ըղձական եղանակի հոգնակի ձևը՝ *sean*:"
      }
    ]
  },
  {
    id: 16,
    originalText: "Hoy ........................ 48 personas. Mañana ........................ más numerosos.",
    parts: ["Hoy ", " personas. Mañana ", " más numerosos."],
    blanks: [
      {
        id: "se-16-1",
        correctAnswer: "somos",
        options: ["somos", "estamos", "fueron", "estuvieron", "seremos", "estaremos"],
        explanation: "Խմբի ընթացիկ քանակական կազմը նշելիս, երբ խոսողը ներառված է խմբում, օգտագործվում է **ser** բայը 1-ին դեմքի հոգնակի ձևով («այսօր մենք [այսքան] հոգի ենք» — *somos 48 personas*):"
      },
      {
        id: "se-16-2",
        correctAnswer: "seremos",
        options: ["seremos", "estaremos", "somos", "estamos", "serán", "estarán"],
        explanation: "Ապագայում խմբի քանակական հատկանիշն արտահայտվում է **ser** բայով ապառնի ժամանակում (*seremos más numerosos*):"
      }
    ]
  },
  {
    id: 17,
    originalText: "¿La chaqueta esa ........................ de alguien?",
    parts: ["¿La chaqueta esa ", " de alguien?"],
    blanks: [
      {
        id: "se-17-1",
        correctAnswer: "es",
        options: ["es", "está", "fue", "estuvo", "era", "estaba"],
        explanation: "Իրերի պատկանելությունը, տիրապետումը կամ սեփականությունը նշելու համար միշտ օգտագործվում է **ser** բայը (*es de alguien*):"
      }
    ]
  },
  {
    id: 18,
    originalText: "Hoy ........................ a 22 de mayo y ........................ el examen de español. ¿Cuándo ........................ el de contabilidad?",
    parts: ["Hoy ", " a 22 de mayo y ", " el examen de español. ¿Cuándo ", " el de contabilidad?"],
    blanks: [
      {
        id: "se-18-1",
        correctAnswer: "estamos",
        options: ["estamos", "somos", "estuvimos", "fuimos", "están", "son"],
        explanation: "Մարդկանց խմբի անունից ընթացիկ ամսաթիվը նշելու համար օգտագործվում է **estar a + fecha** կառույցը (*estamos a 22 de mayo*):"
      },
      {
        id: "se-18-2",
        correctAnswer: "es",
        options: ["es", "está", "fue", "estuvo", "será", "estará"],
        explanation: "**ser** բայը (*es*) օգտագործվում է կոնկրետ կարևոր իրադարձության, տոնի կամ քննության անցկացման օրը կամ ժամը նշելու համար:"
      },
      {
        id: "se-18-3",
        correctAnswer: "será",
        options: ["será", "estará", "es", "está", "fue", "estuvo"],
        explanation: "Ապագայում կայանալիք իրադարձության կամ քննության անցկացման ժամանակն արտահայտելու համար օգտագործվում է **ser** բայը ապառնի ժամանակում (*será*):"
      }
    ]
  },
  {
    id: 19,
    originalText: "Mi abuela ........................ siempre en casa porque ........................ ama de casa.",
    parts: ["Mi abuela ", " siempre en casa porque ", " ama de casa."],
    blanks: [
      {
        id: "se-19-1",
        correctAnswer: "está",
        options: ["está", "es", "estuvo", "fue", "estaba", "era"],
        explanation: "Մարդու ֆիզիկական վայրում գտնվելը (*en casa*) միշտ փոխանցվում է **estar** բայով (*está en casa*):"
      },
      {
        id: "se-19-2",
        correctAnswer: "es",
        options: ["es", "está", "era", "estaba", "fue", "estuvo"],
        explanation: "Մարդու սոցիալական կամ մասնագիտական կարգավիճակը, օրինակ՝ տնային տնտեսությամբ զբաղվելը (*ama de casa* — տնային տնտեսուհի), փոխանցվում է **ser** բայով (*es ama de casa*):"
      }
    ]
  }
];
