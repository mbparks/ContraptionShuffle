/* Authored deck 1.0.0. IDs are permanent; never renumber existing cards. */
(function(root){const decks = {
  "version": "1.0.0",
  "families": {
    "paper": "Paper / cardboard",
    "wood": "Wood",
    "textiles": "Textiles / elastic bands",
    "found": "Found objects",
    "metal": "Metal / wire",
    "plastics": "Plastic / tubing",
    "foam": "Foam / sponges",
    "clay": "Clay / dough"
  },
  "supplies": {
    "axles": "Blunt skewers / pins / simple pivots",
    "weights": "Small contained weights",
    "threaded": "Matching nut and bolt",
    "elastic": "Elastic bands / gentle springs",
    "tubing": "Flexible tubing",
    "syringes": "Needle-free syringes",
    "water": "Clean water",
    "containers": "Watertight containers / spill tray",
    "wick": "Absorbent wick",
    "magnets": "Magnets",
    "balls": "Small rolling ball"
  },
  "materials": [
    {
      "id": "M01",
      "title": "Corrugated cardboard",
      "family": "paper",
      "tags": [
        "rigid",
        "foldable"
      ],
      "description": "Ribs between paper layers make a surprisingly stiff panel. Try turning the flutes in different directions.",
      "phrase": "corrugated cardboard",
      "requirement": "Use corrugated cardboard as the main material in the structure or working parts.",
      "hint": "Which direction bends most easily?",
      "extras": []
    },
    {
      "id": "M02",
      "title": "Paper and paper clips",
      "family": "paper",
      "tags": [
        "foldable",
        "flexible"
      ],
      "description": "Fold paper into beams and use clips as removable joints. A flat sheet becomes stronger when given a section.",
      "phrase": "paper and paper clips",
      "requirement": "Use paper and paper clips as the main material in the structure or working parts.",
      "hint": "Could a folded channel replace a flat strip?",
      "extras": []
    },
    {
      "id": "M03",
      "title": "Scrap wood",
      "family": "wood",
      "tags": [
        "rigid"
      ],
      "description": "Use small, smooth offcuts as beams, bases, or sliding pieces. Let the existing shapes suggest your construction.",
      "phrase": "scrap wood",
      "requirement": "Use scrap wood as the main material in the structure or working parts.",
      "hint": "Which two offcuts already fit together?",
      "extras": []
    },
    {
      "id": "M04",
      "title": "String and drinking straws",
      "family": "found",
      "tags": [
        "flexible",
        "rigid"
      ],
      "description": "Straws provide light compression members while string carries tension. Threading string through a straw can also guide its path.",
      "phrase": "string and drinking straws",
      "requirement": "Use string and drinking straws as the main material in the structure or working parts.",
      "hint": "Where does the string need a guide?",
      "extras": []
    },
    {
      "id": "M05",
      "title": "Clean food containers",
      "family": "found",
      "tags": [
        "rigid",
        "waterproof"
      ],
      "description": "Containers can become frames, chambers, or moving buckets. Start with clean, dry pieces and rounded edges.",
      "phrase": "clean food containers",
      "requirement": "Use clean food containers as the main material in the structure or working parts.",
      "hint": "Can the original opening do useful work?",
      "extras": []
    },
    {
      "id": "M06",
      "title": "Bottle caps and skewers",
      "family": "found",
      "tags": [
        "rigid"
      ],
      "description": "Caps make small wheels, spacers, and cups; blunt-ended skewers make axles. Keep rotating parts free of glue.",
      "phrase": "bottle caps and skewers",
      "requirement": "Use bottle caps and skewers as the main material in the structure or working parts.",
      "hint": "What will keep an axle from wandering sideways?",
      "extras": []
    },
    {
      "id": "M07",
      "title": "Fabric scraps",
      "family": "textiles",
      "tags": [
        "flexible",
        "foldable"
      ],
      "description": "Cloth can form slings, hinges, and flexible skins. Orient the weave to control stretch.",
      "phrase": "fabric scraps",
      "requirement": "Use fabric scraps as the main material in the structure or working parts.",
      "hint": "Where should the cloth bend but not stretch?",
      "extras": []
    },
    {
      "id": "M08",
      "title": "Craft sticks",
      "family": "wood",
      "tags": [
        "rigid"
      ],
      "description": "Repeated wooden strips suit beams and hinged frames. Overlap the ends to make simple pivot joints.",
      "phrase": "craft sticks",
      "requirement": "Use craft sticks as the main material in the structure or working parts.",
      "hint": "Would a triangle stop the frame wobbling?",
      "extras": []
    },
    {
      "id": "M09",
      "title": "Aluminum foil",
      "family": "metal",
      "tags": [
        "foldable",
        "waterproof"
      ],
      "description": "Foil takes a crease and holds a formed shape. Layer or roll it to make ribs rather than relying on a flat sheet.",
      "phrase": "aluminum foil",
      "requirement": "Use aluminum foil as the main material in the structure or working parts.",
      "hint": "What happens when you roll an edge into a rim?",
      "extras": []
    },
    {
      "id": "M10",
      "title": "Thin craft wire",
      "family": "metal",
      "tags": [
        "flexible"
      ],
      "description": "Soft wire can form loops, pivots, and springy outlines. Fold sharp ends inward and use small hand-powered motions.",
      "phrase": "thin craft wire",
      "requirement": "Use thin craft wire as the main material in the structure or working parts.",
      "hint": "Where would a loop work better than a bend?",
      "extras": []
    },
    {
      "id": "M11",
      "title": "Paper bags",
      "family": "paper",
      "tags": [
        "foldable",
        "flexible"
      ],
      "description": "Bag folds offer ready-made gussets and expanding volumes. Use the seams as part of the design.",
      "phrase": "paper bags",
      "requirement": "Use paper bags as the main material in the structure or working parts.",
      "hint": "Can an existing gusset become a moving joint?",
      "extras": []
    },
    {
      "id": "M12",
      "title": "Paperboard tubes",
      "family": "paper",
      "tags": [
        "rigid"
      ],
      "description": "Tubes resist bending along their length and can telescope. Their hollow centers are useful guides.",
      "phrase": "paperboard tubes",
      "requirement": "Use paperboard tubes as the main material in the structure or working parts.",
      "hint": "Which tube can slide inside another?",
      "extras": []
    },
    {
      "id": "M13",
      "title": "Corks",
      "family": "found",
      "tags": [
        "rigid",
        "buoyant"
      ],
      "description": "Corks are light, grippy, and buoyant. They can be plugs, rollers, or handles with little shaping.",
      "phrase": "corks",
      "requirement": "Use corks as the main material in the structure or working parts.",
      "hint": "Does the cork work best floating or gripping?",
      "extras": []
    },
    {
      "id": "M14",
      "title": "Sponges",
      "family": "foam",
      "tags": [
        "flexible",
        "absorbent",
        "buoyant"
      ],
      "description": "Sponges deform, recover, and soak up water. Use those properties as working behavior, not decoration.",
      "phrase": "sponges",
      "requirement": "Use sponges as the main material in the structure or working parts.",
      "hint": "What changes when the sponge is squeezed?",
      "extras": []
    },
    {
      "id": "M15",
      "title": "Rubber bands",
      "family": "textiles",
      "tags": [
        "flexible",
        "elastic"
      ],
      "description": "Rubber bands can provide tension, friction, or gentle stored energy. Use modest stretches and keep them away from faces.",
      "phrase": "rubber bands",
      "requirement": "Use rubber bands as the main material in the structure or working parts.",
      "hint": "How little stretch is enough to make it work?",
      "extras": [
        "elastic"
      ]
    },
    {
      "id": "M16",
      "title": "Wooden clothespins",
      "family": "wood",
      "tags": [
        "rigid",
        "elastic"
      ],
      "description": "Clothespins combine a lever, spring, and useful gripping jaws. Treat the existing assembly as a building module.",
      "phrase": "wooden clothespins",
      "requirement": "Use wooden clothespins as the main material in the structure or working parts.",
      "hint": "What could the jaws hold or release?",
      "extras": []
    },
    {
      "id": "M17",
      "title": "Used envelopes",
      "family": "paper",
      "tags": [
        "foldable"
      ],
      "description": "Envelopes provide pockets, flaps, and layered paper. Keep one seam intact to make a ready-made hinge.",
      "phrase": "used envelopes",
      "requirement": "Use used envelopes as the main material in the structure or working parts.",
      "hint": "Can a flap reveal something without being detached?",
      "extras": []
    },
    {
      "id": "M18",
      "title": "Index cards",
      "family": "paper",
      "tags": [
        "foldable",
        "rigid"
      ],
      "description": "Cards crease cleanly and can become tabs, tracks, or small folded beams. Repeated cards make modular construction easy.",
      "phrase": "index cards",
      "requirement": "Use index cards as the main material in the structure or working parts.",
      "hint": "Which fold would make one card stand up?",
      "extras": []
    },
    {
      "id": "M19",
      "title": "Old magazines",
      "family": "paper",
      "tags": [
        "foldable",
        "flexible"
      ],
      "description": "Magazine pages roll into tubes and fold into colored panels. Their printed patterns can become visible indicators.",
      "phrase": "old magazines",
      "requirement": "Use old magazines as the main material in the structure or working parts.",
      "hint": "Could a rolled page act as a shaft?",
      "extras": []
    },
    {
      "id": "M20",
      "title": "Newspaper",
      "family": "paper",
      "tags": [
        "foldable",
        "absorbent"
      ],
      "description": "Roll, twist, or layer newspaper to give it structure. Its low weight suits large moving surfaces.",
      "phrase": "newspaper",
      "requirement": "Use newspaper as the main material in the structure or working parts.",
      "hint": "How can folds stiffen a lightweight shape?",
      "extras": []
    },
    {
      "id": "M21",
      "title": "Egg cartons",
      "family": "paper",
      "tags": [
        "rigid",
        "foldable"
      ],
      "description": "Repeated cups and ridges already divide space. Use them as pockets, supports, or a sequence of stations.",
      "phrase": "egg cartons",
      "requirement": "Use egg cartons as the main material in the structure or working parts.",
      "hint": "What could move from cup to cup?",
      "extras": []
    },
    {
      "id": "M22",
      "title": "Clean plastic bottles",
      "family": "plastics",
      "tags": [
        "rigid",
        "waterproof",
        "buoyant"
      ],
      "description": "Bottles offer a neck, flexible wall, and hollow chamber. Use intact surfaces where liquid containment matters.",
      "phrase": "clean plastic bottles",
      "requirement": "Use clean plastic bottles as the main material in the structure or working parts.",
      "hint": "Can the neck become a guide or outlet?",
      "extras": []
    },
    {
      "id": "M23",
      "title": "Metal jar lids",
      "family": "metal",
      "tags": [
        "rigid",
        "waterproof"
      ],
      "description": "Lids have stiff rims and broad faces. They can become shallow trays, discs, or sound-making surfaces.",
      "phrase": "metal jar lids",
      "requirement": "Use metal jar lids as the main material in the structure or working parts.",
      "hint": "What does the rim add that a flat disc lacks?",
      "extras": []
    },
    {
      "id": "M24",
      "title": "Small cardboard boxes",
      "family": "paper",
      "tags": [
        "rigid",
        "foldable"
      ],
      "description": "A box is a ready-made frame with corners and folding panels. Preserve useful structure before cutting openings.",
      "phrase": "small cardboard boxes",
      "requirement": "Use small cardboard boxes as the main material in the structure or working parts.",
      "hint": "Which wall could become a door or moving panel?",
      "extras": []
    },
    {
      "id": "M25",
      "title": "Yarn",
      "family": "textiles",
      "tags": [
        "flexible",
        "absorbent"
      ],
      "description": "Yarn makes soft tension members, tassels, and wicks. Bundles behave differently from single strands.",
      "phrase": "yarn",
      "requirement": "Use yarn as the main material in the structure or working parts.",
      "hint": "How many strands keep the line from stretching too far?",
      "extras": []
    },
    {
      "id": "M26",
      "title": "Felt",
      "family": "textiles",
      "tags": [
        "flexible",
        "absorbent"
      ],
      "description": "Felt bends without fraying and adds friction or cushioning. It is useful for soft joints and contact surfaces.",
      "phrase": "felt",
      "requirement": "Use felt as the main material in the structure or working parts.",
      "hint": "Where would a soft contact improve control?",
      "extras": []
    },
    {
      "id": "M27",
      "title": "Mesh produce bags",
      "family": "textiles",
      "tags": [
        "flexible"
      ],
      "description": "Mesh makes lightweight slings, nets, and flexible enclosures. Its openings can pass some objects and retain others.",
      "phrase": "mesh produce bags",
      "requirement": "Use mesh produce bags as the main material in the structure or working parts.",
      "hint": "Which object fits through the mesh?",
      "extras": []
    },
    {
      "id": "M28",
      "title": "Clean beverage cartons",
      "family": "found",
      "tags": [
        "rigid",
        "foldable",
        "waterproof"
      ],
      "description": "Cartons combine crease lines with a coated surface. Test cut edges before relying on them to hold water.",
      "phrase": "clean beverage cartons",
      "requirement": "Use clean beverage cartons as the main material in the structure or working parts.",
      "hint": "Could an original fold become a controlled hinge?",
      "extras": []
    },
    {
      "id": "M29",
      "title": "Fallen twigs",
      "family": "wood",
      "tags": [
        "rigid"
      ],
      "description": "Small fallen twigs supply irregular beams and natural forks. Use lashings to join shapes that do not meet squarely.",
      "phrase": "fallen twigs",
      "requirement": "Use fallen twigs as the main material in the structure or working parts.",
      "hint": "Which fork could support a pivot?",
      "extras": []
    },
    {
      "id": "M30",
      "title": "Pebbles",
      "family": "found",
      "tags": [
        "rigid",
        "weight"
      ],
      "description": "Smooth pebbles provide mass, contact points, and uneven shapes. Contain them so they cannot roll away unexpectedly.",
      "phrase": "pebbles",
      "requirement": "Use pebbles as the main material in the structure or working parts.",
      "hint": "Can a pouch turn loose pebbles into a useful weight?",
      "extras": []
    },
    {
      "id": "M31",
      "title": "Air-dry clay",
      "family": "clay",
      "tags": [
        "moldable",
        "rigid"
      ],
      "description": "Clay can form custom bases, guides, and balanced shapes. Allow pieces to dry before expecting stiff parts to hold alignment.",
      "phrase": "air-dry clay",
      "requirement": "Use air-dry clay as the main material in the structure or working parts.",
      "hint": "What alignment should be fixed while the clay sets?",
      "extras": []
    },
    {
      "id": "M32",
      "title": "Modeling dough",
      "family": "clay",
      "tags": [
        "moldable",
        "weight"
      ],
      "description": "Dough forms adjustable supports and temporary weights. Use its ability to change shape during testing.",
      "phrase": "modeling dough",
      "requirement": "Use modeling dough as the main material in the structure or working parts.",
      "hint": "Where could a movable lump help tune the balance?",
      "extras": []
    },
    {
      "id": "M33",
      "title": "Scrap foam",
      "family": "foam",
      "tags": [
        "flexible",
        "buoyant"
      ],
      "description": "Foam supplies light structure, springy pads, and floats. Compare pieces before choosing one for a working surface.",
      "phrase": "scrap foam",
      "requirement": "Use scrap foam as the main material in the structure or working parts.",
      "hint": "Does this foam recover after being compressed?",
      "extras": []
    },
    {
      "id": "M34",
      "title": "Bubble wrap",
      "family": "plastics",
      "tags": [
        "flexible",
        "buoyant"
      ],
      "description": "Bubble wrap is a lightweight, flexible air-filled sheet. Keep bubbles intact when using it for cushioning or flotation.",
      "phrase": "bubble wrap",
      "requirement": "Use bubble wrap as the main material in the structure or working parts.",
      "hint": "Could a folded layer act as a protective sling?",
      "extras": []
    },
    {
      "id": "M35",
      "title": "Old socks",
      "family": "textiles",
      "tags": [
        "flexible",
        "absorbent"
      ],
      "description": "A clean sock is a stretchy tube with one closed end. It can become a sleeve, puppet skin, or soft container.",
      "phrase": "old socks",
      "requirement": "Use old socks as the main material in the structure or working parts.",
      "hint": "What could the closed end catch or carry?",
      "extras": []
    },
    {
      "id": "M36",
      "title": "Ribbon",
      "family": "textiles",
      "tags": [
        "flexible",
        "foldable"
      ],
      "description": "Ribbon behaves like a flat tension member and can make visible paths. Its width helps resist twisting at a connection.",
      "phrase": "ribbon",
      "requirement": "Use ribbon as the main material in the structure or working parts.",
      "hint": "Where should a flat ribbon replace a round cord?",
      "extras": []
    },
    {
      "id": "M37",
      "title": "Leather offcuts",
      "family": "textiles",
      "tags": [
        "flexible"
      ],
      "description": "Leather makes durable straps and flexible joints. Use existing holes or removable clamps where practical.",
      "phrase": "leather offcuts",
      "requirement": "Use leather offcuts as the main material in the structure or working parts.",
      "hint": "How broad should a strap be to avoid twisting?",
      "extras": []
    },
    {
      "id": "M38",
      "title": "Used gift cards",
      "family": "plastics",
      "tags": [
        "rigid",
        "flexible"
      ],
      "description": "Expired plastic cards are thin, smooth panels with a little spring. They can act as guides, fins, or flexible fingers.",
      "phrase": "used gift cards",
      "requirement": "Use used gift cards as the main material in the structure or working parts.",
      "hint": "Can the card flex without taking a permanent bend?",
      "extras": []
    },
    {
      "id": "M39",
      "title": "Broken umbrella fabric",
      "family": "textiles",
      "tags": [
        "flexible",
        "waterproof"
      ],
      "description": "Detached umbrella fabric is light and sheds water. Use the fabric only, with broken sharp ribs removed.",
      "phrase": "broken umbrella fabric",
      "requirement": "Use broken umbrella fabric as the main material in the structure or working parts.",
      "hint": "Would tension turn the loose cloth into a useful surface?",
      "extras": []
    },
    {
      "id": "M40",
      "title": "Old CDs or DVDs, used intact",
      "family": "plastics",
      "tags": [
        "rigid"
      ],
      "description": "Intact discs offer a central hole, smooth rim, and reflective face. Do not cut or fracture them.",
      "phrase": "old CDs or DVDs, used intact",
      "requirement": "Use old CDs or DVDs, used intact as the main material in the structure or working parts.",
      "hint": "Can the center hole locate a rotating axle?",
      "extras": []
    },
    {
      "id": "M41",
      "title": "Buttons",
      "family": "found",
      "tags": [
        "rigid"
      ],
      "description": "Buttons provide repeatable shapes and ready-made holes. Thread them into moving arrays or use them as small guides.",
      "phrase": "buttons",
      "requirement": "Use buttons as the main material in the structure or working parts.",
      "hint": "Which hole arrangement gives the most useful connection?",
      "extras": []
    },
    {
      "id": "M42",
      "title": "Washers and nuts",
      "family": "metal",
      "tags": [
        "rigid",
        "weight"
      ],
      "description": "Hardware provides compact mass and repeatable holes. Stack, suspend, or space pieces to make the geometry useful.",
      "phrase": "washers and nuts",
      "requirement": "Use washers and nuts as the main material in the structure or working parts.",
      "hint": "How does moving one washer change the balance?",
      "extras": []
    },
    {
      "id": "M43",
      "title": "Flexible tubing",
      "family": "plastics",
      "tags": [
        "flexible",
        "waterproof"
      ],
      "description": "Tubing guides cords or carries air and water. Match connections and avoid kinks at tight bends.",
      "phrase": "flexible tubing",
      "requirement": "Use flexible tubing as the main material in the structure or working parts.",
      "hint": "What is the gentlest bend that still fits?",
      "extras": [
        "tubing"
      ]
    },
    {
      "id": "M44",
      "title": "Balloons",
      "family": "plastics",
      "tags": [
        "flexible",
        "elastic",
        "waterproof"
      ],
      "description": "Balloons can become membranes, soft chambers, or gentle return elements. Keep inflation modest and avoid mouth inflation for shared experiments.",
      "phrase": "balloons",
      "requirement": "Use balloons as the main material in the structure or working parts.",
      "hint": "What changes when the membrane is stretched over a frame?",
      "extras": []
    },
    {
      "id": "M45",
      "title": "Hook-and-loop strips",
      "family": "textiles",
      "tags": [
        "flexible"
      ],
      "description": "Reusable strips can close loops, hold adjustable joints, or act as peel-away releases. Make their fastening behavior do useful work.",
      "phrase": "hook-and-loop strips",
      "requirement": "Use hook-and-loop strips as the main material in the structure or working parts.",
      "hint": "Would peeling require less effort than pulling straight apart?",
      "extras": []
    },
    {
      "id": "M46",
      "title": "Removable adhesive notes",
      "family": "paper",
      "tags": [
        "foldable"
      ],
      "description": "Notes have a reusable adhesive edge and a flexible free edge. Build layered flaps or removable surfaces without permanent glue.",
      "phrase": "removable adhesive notes",
      "requirement": "Use removable adhesive notes as the main material in the structure or working parts.",
      "hint": "What can the unglued edge do?",
      "extras": []
    },
    {
      "id": "M47",
      "title": "A discarded notebook cover",
      "family": "paper",
      "tags": [
        "rigid",
        "foldable"
      ],
      "description": "A cover offers a durable panel and often an existing spine fold. Use its stiffness or hinge as the main structure.",
      "phrase": "a discarded notebook cover",
      "requirement": "Use a discarded notebook cover as the main material in the structure or working parts.",
      "hint": "Can the spine become the central moving joint?",
      "extras": []
    },
    {
      "id": "M48",
      "title": "Clean takeout trays",
      "family": "found",
      "tags": [
        "rigid",
        "waterproof"
      ],
      "description": "Trays provide shallow containers and reinforced edges. Use clean pieces and test how their walls flex.",
      "phrase": "clean takeout trays",
      "requirement": "Use clean takeout trays as the main material in the structure or working parts.",
      "hint": "Could the raised rim guide or retain an object?",
      "extras": []
    },
    {
      "id": "M49",
      "title": "Packing paper",
      "family": "paper",
      "tags": [
        "foldable",
        "absorbent"
      ],
      "description": "Crumpled paper becomes a cushion; rolled paper becomes a beam. Try changing form before adding more layers.",
      "phrase": "packing paper",
      "requirement": "Use packing paper as the main material in the structure or working parts.",
      "hint": "Which shape uses the least paper for enough stiffness?",
      "extras": []
    },
    {
      "id": "M50",
      "title": "Three clean objects headed for the trash",
      "family": "found",
      "tags": [
        "rigid",
        "flexible"
      ],
      "description": "Choose three safe, clean discarded objects and use all three meaningfully. Let their existing shapes become parts of the invention.",
      "phrase": "three clean objects headed for the trash",
      "requirement": "Use all three chosen objects in the structure or working parts.",
      "hint": "What useful property does each object already have?",
      "extras": []
    }
  ],
  "mechanisms": [
    {
      "id": "K01",
      "title": "Lever",
      "extras": [],
      "functions": [
        "move",
        "lift",
        "signal",
        "grip",
        "release",
        "measure"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A rigid arm pivots about a fulcrum. Moving the fulcrum trades travel for force at the other end.",
      "diagram": {
        "input": "hand force",
        "part": "pivoted arm",
        "output": "load moves"
      },
      "requirement": "Use the lever principle to help accomplish the mission.",
      "hint": "Where could the pivot give you more useful travel?",
      "test": "Point out the input, pivoted arm, and resulting output: load moves.",
      "approach": "Balance a stiff strip on a rounded support, then attach the useful output near one end and the hand input near the other."
    },
    {
      "id": "K02",
      "title": "Wheel and axle",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "lift",
        "transport",
        "signal",
        "measure"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A wheel and its axle rotate together. Different radii change the distance traveled by the rim and by a cord wound on the axle.",
      "diagram": {
        "input": "turn rim",
        "part": "shared axle",
        "output": "rotation or winding"
      },
      "requirement": "Use the wheel and axle principle to help accomplish the mission.",
      "hint": "Which part should have the larger radius?",
      "test": "Point out the input, shared axle, and resulting output: rotation or winding.",
      "approach": "Fix a broad wheel to a narrow axle and wind a cord around the axle to create a controlled pull."
    },
    {
      "id": "K03",
      "title": "Fixed pulley",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "lift",
        "transport",
        "release"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A cord runs over a wheel fixed to a support. Pulling one end changes the direction of the force at the other end; a single fixed pulley does not multiply force.",
      "diagram": {
        "input": "pull cord",
        "part": "fixed wheel",
        "output": "redirected pull"
      },
      "requirement": "Use the fixed pulley principle to help accomplish the mission.",
      "hint": "Where can the support take the cord tension?",
      "test": "Point out the input, fixed wheel, and resulting output: redirected pull.",
      "approach": "Run a cord over a freely turning spool fixed above the working area; attach the useful output to its other end."
    },
    {
      "id": "K04",
      "title": "Moving pulley",
      "extras": [
        "axles"
      ],
      "functions": [
        "lift",
        "move",
        "transport"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A pulley travels with the load while two cord sections support it. Ideally the pull is about half the load, but you pull about twice as much cord as the load rises.",
      "diagram": {
        "input": "pull cord",
        "part": "traveling wheel",
        "output": "raised load"
      },
      "requirement": "Use the moving pulley principle to help accomplish the mission.",
      "hint": "Which end of the cord must stay fixed?",
      "test": "Point out the input, traveling wheel, and resulting output: raised load.",
      "approach": "Attach a small pulley to the load, anchor one end of its cord above it, and pull the free end over a second guide."
    },
    {
      "id": "K05",
      "title": "Counterweight",
      "extras": [
        "weights"
      ],
      "functions": [
        "move",
        "lift",
        "hold",
        "release",
        "signal"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A descending mass balances or drives another part through a pivot or cord. Changing its mass or distance from the pivot changes the effect.",
      "diagram": {
        "input": "falling mass",
        "part": "balance or cord",
        "output": "opposing motion"
      },
      "requirement": "Use the counterweight principle to help accomplish the mission.",
      "hint": "Could a smaller mass work farther from the pivot?",
      "test": "Point out the input, balance or cord, and resulting output: opposing motion.",
      "approach": "Hang a contained weight from one side of a pivoted arm so it moves the opposite side when a catch is released."
    },
    {
      "id": "K06",
      "title": "Inclined plane",
      "extras": [],
      "functions": [
        "move",
        "lift",
        "transport",
        "guide",
        "release"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A slope raises or lowers an object over a longer travel distance. Friction and slope angle determine whether it slides by itself.",
      "diagram": {
        "input": "push or gravity",
        "part": "sloping surface",
        "output": "changed height"
      },
      "requirement": "Use the inclined plane principle to help accomplish the mission.",
      "hint": "How shallow can the slope be and still work?",
      "test": "Point out the input, sloping surface, and resulting output: changed height.",
      "approach": "Make a shallow channel on a sloping panel and adjust its height until the test object moves reliably."
    },
    {
      "id": "K07",
      "title": "Wedge",
      "extras": [],
      "functions": [
        "grip",
        "hold",
        "move",
        "release",
        "structure"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A tapered piece converts motion along its length into separation or clamping. A gentler taper changes the travel and force needed.",
      "diagram": {
        "input": "push taper",
        "part": "wedge faces",
        "output": "separation or grip"
      },
      "requirement": "Use the wedge principle to help accomplish the mission.",
      "hint": "What stops the wedge from slipping back out?",
      "test": "Point out the input, wedge faces, and resulting output: separation or grip.",
      "approach": "Slide a tapered folded piece between a fixed frame and a movable contact pad."
    },
    {
      "id": "K08",
      "title": "Screw mechanism",
      "extras": [
        "threaded"
      ],
      "functions": [
        "lift",
        "move",
        "grip",
        "hold",
        "measure"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Turning a threaded part makes another part travel along its axis. Restrain the traveling part from rotating if you want straight motion.",
      "diagram": {
        "input": "turn thread",
        "part": "threaded pair",
        "output": "axial travel"
      },
      "requirement": "Use the screw mechanism principle to help accomplish the mission.",
      "hint": "Which part turns, and which part must not turn?",
      "test": "Point out the input, threaded pair, and resulting output: axial travel.",
      "approach": "Hold a nut against rotation in a frame and turn its matching bolt to move a broad contact plate."
    },
    {
      "id": "K09",
      "title": "Cam and follower",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "animate",
        "signal",
        "release",
        "repeat"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "An uneven rotating profile pushes a follower through a repeating path. A gentle return force keeps the follower touching the cam.",
      "diagram": {
        "input": "rotation",
        "part": "shaped cam",
        "output": "follower rises"
      },
      "requirement": "Use the cam and follower principle to help accomplish the mission.",
      "hint": "What cam profile gives the motion you want?",
      "test": "Point out the input, shaped cam, and resulting output: follower rises.",
      "approach": "Rotate an off-center disc beneath a loosely guided vertical follower; let the follower operate the useful output."
    },
    {
      "id": "K10",
      "title": "Crank and slider",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "animate",
        "repeat",
        "transport"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "An offset crank pin drives a connecting rod and a guided slider. Turning the crank produces back-and-forth motion.",
      "diagram": {
        "input": "turn crank",
        "part": "rod and guide",
        "output": "slider travels"
      },
      "requirement": "Use the crank and slider principle to help accomplish the mission.",
      "hint": "Where does the slider need support against sideways force?",
      "test": "Point out the input, rod and guide, and resulting output: slider travels.",
      "approach": "Attach a rod to an offset pin on a hand-turned disc, with its other end connected to a slider in a straight guide."
    },
    {
      "id": "K11",
      "title": "Four-bar linkage",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "animate",
        "hold",
        "direction",
        "grip"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Four links form a closed loop with four pivots, and one link is held as the base. Link lengths set the path of the moving member.",
      "diagram": {
        "input": "input link",
        "part": "four pivot loop",
        "output": "guided path"
      },
      "requirement": "Use the four-bar linkage principle to help accomplish the mission.",
      "hint": "Which link will be the fixed base?",
      "test": "Point out the input, four pivot loop, and resulting output: guided path.",
      "approach": "Join four strips with loose pivots and hold one strip fixed; use the opposite strip as the moving platform."
    },
    {
      "id": "K12",
      "title": "Scissor linkage",
      "extras": [
        "axles"
      ],
      "functions": [
        "lift",
        "store",
        "structure",
        "move"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Crossed links pivot at their centers and ends. Pulling the ends together extends the assembly in the other direction.",
      "diagram": {
        "input": "squeeze ends",
        "part": "crossed links",
        "output": "extension"
      },
      "requirement": "Use the scissor linkage principle to help accomplish the mission.",
      "hint": "What guides the ends while allowing them to slide?",
      "test": "Point out the input, crossed links, and resulting output: extension.",
      "approach": "Cross two strips at a center pivot and guide their lower ends along a base so they can spread and close."
    },
    {
      "id": "K13",
      "title": "Meshing gears",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "direction",
        "repeat",
        "count",
        "animate"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "Teeth on neighboring wheels push one another. External gears reverse rotation, and different tooth counts trade speed for torque.",
      "diagram": {
        "input": "turn driver",
        "part": "engaged teeth",
        "output": "opposite rotation"
      },
      "requirement": "Use the meshing gears principle to help accomplish the mission.",
      "hint": "How will you hold the centers at a constant distance?",
      "test": "Point out the input, engaged teeth, and resulting output: opposite rotation.",
      "approach": "Make two coarse-toothed wheels and mount them on fixed centers; attach the output to the driven wheel."
    },
    {
      "id": "K14",
      "title": "Belt drive",
      "extras": [
        "elastic",
        "axles"
      ],
      "functions": [
        "move",
        "direction",
        "repeat",
        "transport"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A loop connects two separated pulleys. Belt tension and surface grip transmit rotation without the wheels touching.",
      "diagram": {
        "input": "driver pulley",
        "part": "tensioned belt",
        "output": "follower rotates"
      },
      "requirement": "Use the belt drive principle to help accomplish the mission.",
      "hint": "How can you adjust belt tension without rebuilding the frame?",
      "test": "Point out the input, tensioned belt, and resulting output: follower rotates.",
      "approach": "Loop an elastic belt around two spool-shaped wheels, with one axle mounted in an adjustable slot."
    },
    {
      "id": "K15",
      "title": "Contacting friction wheels",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "direction",
        "repeat",
        "transport"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Two wheel rims press against one another and transfer rotation by friction. Too little contact force allows slipping.",
      "diagram": {
        "input": "turn one rim",
        "part": "pressed contact",
        "output": "second wheel turns"
      },
      "requirement": "Use the contacting friction wheels principle to help accomplish the mission.",
      "hint": "What contact pressure prevents slip without jamming?",
      "test": "Point out the input, pressed contact, and resulting output: second wheel turns.",
      "approach": "Press two grippy wheel rims together and attach the useful output to the second axle."
    },
    {
      "id": "K16",
      "title": "Ratchet and pawl",
      "extras": [
        "axles"
      ],
      "functions": [
        "hold",
        "count",
        "release",
        "repeat",
        "lift"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "A pivoting catch rides over teeth in one direction and blocks motion in the other. Repeated strokes can advance a wheel one step at a time.",
      "diagram": {
        "input": "repeated stroke",
        "part": "teeth and catch",
        "output": "one-way steps"
      },
      "requirement": "Use the ratchet and pawl principle to help accomplish the mission.",
      "hint": "Where will the pawl land after each stroke?",
      "test": "Point out the input, teeth and catch, and resulting output: one-way steps.",
      "approach": "Cut broad teeth into a card wheel and add a flexible catch that drops between them after each stroke."
    },
    {
      "id": "K17",
      "title": "Escapement",
      "extras": [
        "axles",
        "weights"
      ],
      "functions": [
        "time",
        "count",
        "repeat",
        "release",
        "signal"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "An alternating catch releases a driven toothed wheel in measured steps. The drive supplies energy while a repeating motion controls release.",
      "diagram": {
        "input": "steady drive",
        "part": "alternating catches",
        "output": "paced steps"
      },
      "requirement": "Use the escapement principle to help accomplish the mission.",
      "hint": "What prevents more than one tooth escaping at a time?",
      "test": "Point out the input, alternating catches, and resulting output: paced steps.",
      "approach": "Let a small counterweight turn a toothed wheel while a rocking pair of catches releases one tooth at a time."
    },
    {
      "id": "K18",
      "title": "Spring return",
      "extras": [
        "elastic"
      ],
      "functions": [
        "move",
        "release",
        "animate",
        "repeat",
        "grip"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A stretched or bent elastic element stores energy and returns a moving part. Use just enough tension to overcome friction.",
      "diagram": {
        "input": "deflect part",
        "part": "elastic element",
        "output": "return motion"
      },
      "requirement": "Use the spring return principle to help accomplish the mission.",
      "hint": "How little return force will reliably reset it?",
      "test": "Point out the input, elastic element, and resulting output: return motion.",
      "approach": "Add a gently stretched band between the moving part and its frame, with a stop at the ready position."
    },
    {
      "id": "K19",
      "title": "Gravity feed",
      "extras": [],
      "functions": [
        "transport",
        "release",
        "sort",
        "count",
        "guide"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Items move downhill through a guide under their own weight. A gate or narrow opening can regulate their release.",
      "diagram": {
        "input": "raised items",
        "part": "sloped guide",
        "output": "downhill flow"
      },
      "requirement": "Use the gravity feed principle to help accomplish the mission.",
      "hint": "Where are items most likely to bridge or jam?",
      "test": "Point out the input, sloped guide, and resulting output: downhill flow.",
      "approach": "Make a sloping queue with a narrow outlet and a movable gate that regulates the next item."
    },
    {
      "id": "K20",
      "title": "Pendulum",
      "extras": [
        "weights"
      ],
      "functions": [
        "time",
        "signal",
        "animate",
        "repeat",
        "measure"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A suspended mass swings around a pivot. Its length strongly affects its natural period; friction gradually reduces the swing.",
      "diagram": {
        "input": "small displacement",
        "part": "suspended mass",
        "output": "repeated swings"
      },
      "requirement": "Use the pendulum principle to help accomplish the mission.",
      "hint": "How does changing the suspension length change the rhythm?",
      "test": "Point out the input, suspended mass, and resulting output: repeated swings.",
      "approach": "Suspend a small weight on a cord and let its repeated passage move a very light indicator."
    },
    {
      "id": "K21",
      "title": "Flywheel",
      "extras": [
        "axles"
      ],
      "functions": [
        "repeat",
        "move",
        "time",
        "animate"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "A rotating mass stores kinetic energy and smooths changing input. Use a small, hand-turned wheel and keep its rim clear.",
      "diagram": {
        "input": "uneven turning",
        "part": "rotating mass",
        "output": "smoother rotation"
      },
      "requirement": "Use the flywheel principle to help accomplish the mission.",
      "hint": "Would moving mass toward the rim smooth the motion?",
      "test": "Point out the input, rotating mass, and resulting output: smoother rotation.",
      "approach": "Add evenly distributed mass to a hand-turned wheel and use its axle to keep a light output moving between pushes."
    },
    {
      "id": "K22",
      "title": "Toggle mechanism",
      "extras": [
        "axles"
      ],
      "functions": [
        "grip",
        "hold",
        "move",
        "release"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Two hinged links approach a straight line and create large force with little output travel. Stops keep the linkage from locking unexpectedly.",
      "diagram": {
        "input": "move knee",
        "part": "aligned links",
        "output": "short strong travel"
      },
      "requirement": "Use the toggle mechanism principle to help accomplish the mission.",
      "hint": "Where should the stop limit the straightening motion?",
      "test": "Point out the input, aligned links, and resulting output: short strong travel.",
      "approach": "Join two links at a knee joint and straighten them between a fixed support and a moving contact pad."
    },
    {
      "id": "K23",
      "title": "Over-center latch",
      "extras": [
        "elastic",
        "axles"
      ],
      "functions": [
        "hold",
        "release",
        "grip",
        "store"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A tensioned linkage passes beyond its straight-line position and rests against a stop. The load then helps hold it closed until pulled back over center.",
      "diagram": {
        "input": "push linkage",
        "part": "cross center",
        "output": "latched state"
      },
      "requirement": "Use the over-center latch principle to help accomplish the mission.",
      "hint": "Which side of center makes the closing force stable?",
      "test": "Point out the input, cross center, and resulting output: latched state.",
      "approach": "Stretch a band across a two-link latch and arrange a stop just beyond the straightened position."
    },
    {
      "id": "K24",
      "title": "Detent",
      "extras": [
        "elastic"
      ],
      "functions": [
        "hold",
        "signal",
        "count",
        "measure",
        "release"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A sprung bump or catch settles into a notch. It gives a repeatable position that can be overcome with a deliberate force.",
      "diagram": {
        "input": "move part",
        "part": "notch and catch",
        "output": "indexed position"
      },
      "requirement": "Use the detent principle to help accomplish the mission.",
      "hint": "How deep should the notch be for a clear but gentle click?",
      "test": "Point out the input, notch and catch, and resulting output: indexed position.",
      "approach": "Press a flexible tab into shallow notches along a moving strip to create repeatable stopping positions."
    },
    {
      "id": "K25",
      "title": "Friction brake",
      "extras": [],
      "functions": [
        "hold",
        "release",
        "move",
        "time",
        "grip"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Pressing a pad against a moving surface converts motion into heat and slows it. Use only small hand-powered motions.",
      "diagram": {
        "input": "press pad",
        "part": "surface friction",
        "output": "slower motion"
      },
      "requirement": "Use the friction brake principle to help accomplish the mission.",
      "hint": "How can you adjust contact pressure predictably?",
      "test": "Point out the input, surface friction, and resulting output: slower motion.",
      "approach": "Add an adjustable soft pad against a moving disc, allowing a small control lever to change the braking force."
    },
    {
      "id": "K26",
      "title": "Slip clutch",
      "extras": [],
      "functions": [
        "move",
        "hold",
        "release",
        "repeat"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Two surfaces transmit motion until their friction limit is exceeded. Allowing intentional slip can limit force on a fragile load.",
      "diagram": {
        "input": "turn input",
        "part": "limited friction",
        "output": "drive or slip"
      },
      "requirement": "Use the slip clutch principle to help accomplish the mission.",
      "hint": "What should slip before the load is damaged?",
      "test": "Point out the input, limited friction, and resulting output: drive or slip.",
      "approach": "Sandwich a driven disc between lightly pressed contact surfaces so the input can slip when the output is blocked."
    },
    {
      "id": "K27",
      "title": "Universal joint",
      "extras": [
        "axles"
      ],
      "functions": [
        "direction",
        "move",
        "repeat"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "Two yokes connected by perpendicular pivots transmit rotation between angled shafts. Keep the angle modest in a simple model.",
      "diagram": {
        "input": "angled input",
        "part": "crossed pivots",
        "output": "angled rotation"
      },
      "requirement": "Use the universal joint principle to help accomplish the mission.",
      "hint": "Do both pivots have enough clearance through a full turn?",
      "test": "Point out the input, crossed pivots, and resulting output: angled rotation.",
      "approach": "Connect two small yokes with perpendicular pivots, then turn one shaft while holding the other at a modest angle."
    },
    {
      "id": "K28",
      "title": "Spool and cord",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "lift",
        "transport",
        "release",
        "measure"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A rotating drum winds and unwinds a cord. Flanges or a guide keep the cord from falling off the edge.",
      "diagram": {
        "input": "turn drum",
        "part": "winding cord",
        "output": "linear pull"
      },
      "requirement": "Use the spool and cord principle to help accomplish the mission.",
      "hint": "Where should the cord enter the spool?",
      "test": "Point out the input, winding cord, and resulting output: linear pull.",
      "approach": "Wind a cord around a flanged spool and attach its free end to the working part through a smooth guide."
    },
    {
      "id": "K29",
      "title": "Rack and pinion",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "lift",
        "measure",
        "direction",
        "repeat"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "A rotating toothed wheel engages a straight toothed strip. This converts rotation into linear travel or reverses that conversion.",
      "diagram": {
        "input": "turn pinion",
        "part": "straight tooth rack",
        "output": "linear travel"
      },
      "requirement": "Use the rack and pinion principle to help accomplish the mission.",
      "hint": "How will the rack stay meshed while it travels?",
      "test": "Point out the input, straight tooth rack, and resulting output: linear travel.",
      "approach": "Engage a coarse-toothed wheel with a straight toothed strip held in a guide beside it."
    },
    {
      "id": "K30",
      "title": "Geneva indexing mechanism",
      "extras": [
        "axles"
      ],
      "functions": [
        "count",
        "repeat",
        "release",
        "signal",
        "animate"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "A driver pin enters one slot of a wheel, turns it a step, then leaves. Between engagements the output pauses.",
      "diagram": {
        "input": "rotating pin",
        "part": "slotted wheel",
        "output": "step then dwell"
      },
      "requirement": "Use the geneva indexing mechanism principle to help accomplish the mission.",
      "hint": "How will you hold the output still during the dwell?",
      "test": "Point out the input, slotted wheel, and resulting output: step then dwell.",
      "approach": "Use an offset pin on a slowly turned driver to enter successive radial slots in a second wheel, with a separate stop for the pauses."
    },
    {
      "id": "K31",
      "title": "Pin-and-slot mechanism",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "guide",
        "direction",
        "animate",
        "repeat"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "A pin travels within a slot, constraining relative movement. The slot shape sets the permitted path.",
      "diagram": {
        "input": "moving pin",
        "part": "shaped slot",
        "output": "constrained motion"
      },
      "requirement": "Use the pin-and-slot mechanism principle to help accomplish the mission.",
      "hint": "What path should the slot allow and what motion should it block?",
      "test": "Point out the input, shaped slot, and resulting output: constrained motion.",
      "approach": "Guide a pin attached to the output through a slot cut in a fixed panel, testing the path before applying load."
    },
    {
      "id": "K32",
      "title": "Eccentric rotating weight",
      "extras": [
        "axles",
        "weights"
      ],
      "functions": [
        "animate",
        "signal",
        "move",
        "repeat",
        "sound"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "A mass mounted away from a rotation axis produces changing forces as it turns. Turn it slowly by hand to explore a controlled wobble.",
      "diagram": {
        "input": "slow rotation",
        "part": "offset mass",
        "output": "changing force"
      },
      "requirement": "Use the eccentric rotating weight principle to help accomplish the mission.",
      "hint": "Where should the frame flex enough to show the wobble?",
      "test": "Point out the input, offset mass, and resulting output: changing force.",
      "approach": "Mount a small contained weight off-center on a hand-turned disc attached to a slightly flexible frame."
    },
    {
      "id": "K33",
      "title": "Compliant flexure",
      "extras": [],
      "functions": [
        "move",
        "grip",
        "animate",
        "hold",
        "release"
      ],
      "materialNeeds": [
        "flexible",
        "foldable",
        "elastic"
      ],
      "description": "A thin flexible region bends instead of using a separate pin joint. Shape it so the motion stays small and repeatable.",
      "diagram": {
        "input": "small force",
        "part": "flexible region",
        "output": "guided bend"
      },
      "requirement": "Use the compliant flexure principle to help accomplish the mission.",
      "hint": "Can you spread bending over a longer flexible section?",
      "test": "Point out the input, flexible region, and resulting output: guided bend.",
      "approach": "Leave a long, thin flexible neck between a fixed region and a working pad, using small deflections."
    },
    {
      "id": "K34",
      "title": "Living hinge",
      "extras": [],
      "functions": [
        "store",
        "move",
        "hold",
        "release",
        "structure"
      ],
      "materialNeeds": [
        "foldable",
        "flexible"
      ],
      "description": "A thin integral strip joins two stiffer regions and lets them fold. Choose a material that tolerates the required repeated bending.",
      "diagram": {
        "input": "fold panel",
        "part": "thin hinge",
        "output": "relative rotation"
      },
      "requirement": "Use the living hinge principle to help accomplish the mission.",
      "hint": "Which way should the material fold to avoid tearing?",
      "test": "Point out the input, thin hinge, and resulting output: relative rotation.",
      "approach": "Join stiff panels with an integral flexible strip and use that strip as the folding line."
    },
    {
      "id": "K35",
      "title": "Tensioned membrane",
      "extras": [],
      "functions": [
        "hold",
        "animate",
        "sound",
        "signal",
        "structure"
      ],
      "materialNeeds": [
        "flexible",
        "elastic"
      ],
      "description": "A flexible sheet carries loads mainly through tension when stretched across a boundary. Changing tension changes its deflection and vibration.",
      "diagram": {
        "input": "load or pluck",
        "part": "stretched sheet",
        "output": "deflection or vibration"
      },
      "requirement": "Use the tensioned membrane principle to help accomplish the mission.",
      "hint": "What boundary shape keeps the membrane evenly tensioned?",
      "test": "Point out the input, stretched sheet, and resulting output: deflection or vibration.",
      "approach": "Stretch a sheet evenly over a frame and connect a light indicator to its center to show deflection."
    },
    {
      "id": "K36",
      "title": "Bellows",
      "extras": [
        "tubing"
      ],
      "functions": [
        "move",
        "signal",
        "sound",
        "animate",
        "fluid"
      ],
      "materialNeeds": [
        "foldable",
        "flexible"
      ],
      "description": "A folded chamber changes volume when squeezed or pulled. Sealed seams and a connected air path direct the resulting airflow.",
      "diagram": {
        "input": "squeeze chamber",
        "part": "changing volume",
        "output": "air moves"
      },
      "requirement": "Use the bellows principle to help accomplish the mission.",
      "hint": "Where is air escaping before it reaches the outlet?",
      "test": "Point out the input, changing volume, and resulting output: air moves.",
      "approach": "Fold a chamber like a small accordion, seal its seams, and connect its outlet to a tube leading to a light working element."
    },
    {
      "id": "K37",
      "title": "Pneumatic piston",
      "extras": [
        "tubing",
        "syringes"
      ],
      "functions": [
        "move",
        "lift",
        "grip",
        "release",
        "signal",
        "direction"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Two needle-free syringes connected with air-filled tubing transfer pressure. Air compresses, so the response feels springy.",
      "diagram": {
        "input": "push plunger",
        "part": "compressed air",
        "output": "remote plunger moves"
      },
      "requirement": "Use the pneumatic piston principle to help accomplish the mission.",
      "hint": "How does trapped air change the feel of the movement?",
      "test": "Point out the input, compressed air, and resulting output: remote plunger moves.",
      "approach": "Connect two needle-free syringes with airtight tubing, fixing one body at the control and the other at the working end."
    },
    {
      "id": "K38",
      "title": "Hydraulic piston",
      "extras": [
        "tubing",
        "syringes",
        "water",
        "containers"
      ],
      "functions": [
        "move",
        "lift",
        "grip",
        "release",
        "signal",
        "direction"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Water-filled tubing connects two needle-free syringes. Remove air bubbles to transfer displacement more directly; mismatched piston areas trade force for travel.",
      "diagram": {
        "input": "push plunger",
        "part": "water pressure",
        "output": "remote displacement"
      },
      "requirement": "Use the hydraulic piston principle to help accomplish the mission.",
      "hint": "Can you remove bubbles before comparing input and output travel?",
      "test": "Point out the input, water pressure, and resulting output: remote displacement.",
      "approach": "Fill two needle-free syringes and their connecting tube with water, remove bubbles, and mount the bodies so the plungers move freely."
    },
    {
      "id": "K39",
      "title": "Siphon",
      "extras": [
        "tubing",
        "water",
        "containers"
      ],
      "functions": [
        "fluid",
        "time",
        "release",
        "signal"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A primed tube can transfer water from a higher surface to a lower outlet. Keep the intake submerged; prime with water, never by mouth.",
      "diagram": {
        "input": "higher water",
        "part": "primed tube",
        "output": "lower outlet flow"
      },
      "requirement": "Use the siphon principle to help accomplish the mission.",
      "hint": "Is the outlet lower than the source water surface?",
      "test": "Point out the input, primed tube, and resulting output: lower outlet flow.",
      "approach": "Prime a water-filled tube between a higher cup and a lower receiving cup, with a clip or raised outlet controlling the start."
    },
    {
      "id": "K40",
      "title": "Capillary action",
      "extras": [
        "water",
        "containers",
        "wick"
      ],
      "functions": [
        "fluid",
        "signal",
        "time",
        "measure"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Water moves through fine pores in an absorbent wick by surface forces. The effect is slow and depends on the wick and height difference.",
      "diagram": {
        "input": "water contact",
        "part": "fine pores",
        "output": "wetting front advances"
      },
      "requirement": "Use the capillary action principle to help accomplish the mission.",
      "hint": "Which wick carries water farther in the same interval?",
      "test": "Point out the input, fine pores, and resulting output: wetting front advances.",
      "approach": "Place an absorbent strip between a water source and a visible destination; use the advancing wet edge as the working effect."
    },
    {
      "id": "K41",
      "title": "Float and buoyancy",
      "extras": [
        "water",
        "containers"
      ],
      "functions": [
        "signal",
        "measure",
        "hold",
        "transport",
        "fluid"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A floating part settles where displaced water balances its weight. Link its rising and falling motion to another part.",
      "diagram": {
        "input": "water level",
        "part": "buoyant float",
        "output": "vertical position"
      },
      "requirement": "Use the float and buoyancy principle to help accomplish the mission.",
      "hint": "What keeps the float free to move without tipping?",
      "test": "Point out the input, buoyant float, and resulting output: vertical position.",
      "approach": "Put a light float in a water container and guide an attached pointer beside a stationary scale."
    },
    {
      "id": "K42",
      "title": "Airflow-driven rotor",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "signal",
        "animate",
        "repeat",
        "sound"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Angled blades turn when moving air pushes them. A paper fan can provide the airflow without powered equipment.",
      "diagram": {
        "input": "moving air",
        "part": "angled blades",
        "output": "rotor turns"
      },
      "requirement": "Use the airflow-driven rotor principle to help accomplish the mission.",
      "hint": "Which blade angle turns most readily in a gentle breeze?",
      "test": "Point out the input, angled blades, and resulting output: rotor turns.",
      "approach": "Fold angled blades around a light hub on a low-friction axle and direct air from a hand-held paper fan across them."
    },
    {
      "id": "K43",
      "title": "Magnetic attraction",
      "extras": [
        "magnets"
      ],
      "functions": [
        "move",
        "hold",
        "grip",
        "release",
        "signal",
        "sort"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Opposite magnetic poles attract, and magnets attract some ferrous objects. Test the actual materials; not all metals respond.",
      "diagram": {
        "input": "bring magnet near",
        "part": "attractive field",
        "output": "pull or capture"
      },
      "requirement": "Use the magnetic attraction principle to help accomplish the mission.",
      "hint": "How does increasing the gap change the pull?",
      "test": "Point out the input, attractive field, and resulting output: pull or capture.",
      "approach": "Attach a magnet to a moving part and bring it toward a second magnet or a tested ferrous target through a thin barrier."
    },
    {
      "id": "K44",
      "title": "Magnetic repulsion",
      "extras": [
        "magnets"
      ],
      "functions": [
        "move",
        "hold",
        "release",
        "signal",
        "animate"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "Like poles of two magnets repel. Guides are usually needed to keep the magnets aligned instead of flipping over.",
      "diagram": {
        "input": "approach like poles",
        "part": "repulsive field",
        "output": "push apart"
      },
      "requirement": "Use the magnetic repulsion principle to help accomplish the mission.",
      "hint": "What guide prevents one magnet turning around?",
      "test": "Point out the input, repulsive field, and resulting output: push apart.",
      "approach": "Put two magnets with like poles facing in a straight guide so they push apart without flipping."
    },
    {
      "id": "K45",
      "title": "Rolling ball trigger",
      "extras": [
        "balls"
      ],
      "functions": [
        "release",
        "signal",
        "count",
        "animate",
        "time"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A small ball rolls along a track and pushes or releases a catch. The ball needs only enough energy to operate the trigger.",
      "diagram": {
        "input": "release ball",
        "part": "track and catch",
        "output": "event starts"
      },
      "requirement": "Use the rolling ball trigger principle to help accomplish the mission.",
      "hint": "Can a lighter catch make the trigger more reliable?",
      "test": "Point out the input, track and catch, and resulting output: event starts.",
      "approach": "Send a small ball down a shallow track into a very light catch that frees the useful output."
    },
    {
      "id": "K46",
      "title": "Domino cascade",
      "extras": [],
      "functions": [
        "release",
        "signal",
        "count",
        "animate",
        "repeat"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "One falling upright piece tips the next and passes an event down a sequence. Spacing and stable starting positions matter.",
      "diagram": {
        "input": "tip first piece",
        "part": "successive impacts",
        "output": "traveling event"
      },
      "requirement": "Use the domino cascade principle to help accomplish the mission.",
      "hint": "What is the largest spacing that still works reliably?",
      "test": "Point out the input, successive impacts, and resulting output: traveling event.",
      "approach": "Set upright pieces at tested intervals, with the final piece touching a lightweight release or indicator."
    },
    {
      "id": "K47",
      "title": "Snap-through action",
      "extras": [],
      "functions": [
        "release",
        "signal",
        "animate",
        "sound",
        "hold"
      ],
      "materialNeeds": [
        "flexible",
        "elastic",
        "foldable"
      ],
      "description": "A curved elastic shape can suddenly switch between two configurations. Keep forces small and study what makes the transition repeatable.",
      "diagram": {
        "input": "gradual pressure",
        "part": "unstable curved shape",
        "output": "sudden change"
      },
      "requirement": "Use the snap-through action principle to help accomplish the mission.",
      "hint": "Can a shallow curve snap with less force?",
      "test": "Point out the input, unstable curved shape, and resulting output: sudden change.",
      "approach": "Bow a flexible strip between two supports and adjust the span until a gentle push reverses its curve."
    },
    {
      "id": "K48",
      "title": "Gravity-powered rolling motion",
      "extras": [
        "axles"
      ],
      "functions": [
        "move",
        "transport",
        "guide",
        "measure"
      ],
      "materialNeeds": [
        "*"
      ],
      "description": "A rolling body trades height for movement along a slope. Wheel alignment and rolling resistance determine how far it travels.",
      "diagram": {
        "input": "raised start",
        "part": "rolling contact",
        "output": "downhill motion"
      },
      "requirement": "Use the gravity-powered rolling motion principle to help accomplish the mission.",
      "hint": "What changes if you make the starting slope gentler?",
      "test": "Point out the input, rolling contact, and resulting output: downhill motion.",
      "approach": "Make a rolling carrier with aligned wheels, then use a small starting slope to supply its motion."
    },
    {
      "id": "K49",
      "title": "Sliding dovetail",
      "extras": [],
      "functions": [
        "hold",
        "guide",
        "store",
        "structure",
        "grip"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "A flared tongue slides in a matching channel while resisting sideways separation. Leave enough clearance for smooth travel.",
      "diagram": {
        "input": "push tongue",
        "part": "flared guide",
        "output": "retained sliding joint"
      },
      "requirement": "Use the sliding dovetail principle to help accomplish the mission.",
      "hint": "Where does the fit need clearance without losing retention?",
      "test": "Point out the input, flared guide, and resulting output: retained sliding joint.",
      "approach": "Fold or assemble a flared tongue and matching channel, leaving enough clearance for the output to slide without pulling sideways out of the guide."
    },
    {
      "id": "K50",
      "title": "Tensegrity",
      "extras": [],
      "functions": [
        "structure",
        "hold",
        "animate",
        "signal"
      ],
      "materialNeeds": [
        "rigid"
      ],
      "description": "Separated compression members are stabilized by a continuous tension network. Pretension and geometry keep the structure in balance.",
      "diagram": {
        "input": "applied load",
        "part": "struts and tension",
        "output": "balanced support"
      },
      "requirement": "Use the tensegrity principle to help accomplish the mission.",
      "hint": "Which string going slack makes the structure collapse?",
      "test": "Point out the input, struts and tension, and resulting output: balanced support.",
      "approach": "Connect separated short struts with taut cords, adjusting one cord at a time until the structure supports a light test load."
    }
  ],
  "missions": [
    {
      "id": "G01",
      "title": "Move an object across a gap",
      "functions": [
        "move",
        "transport"
      ],
      "description": "Carry a small object from one side of a visible gap to the other. A working small-scale model counts.",
      "requirement": "Carry a small object from one side of a visible gap to the other.",
      "test": "The object reaches the far side without a hand carrying it across.",
      "hint": "What supports the object while it is over the gap?",
      "approach": "Try a guided carrier with a clear departure and arrival point.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G02",
      "title": "Lift a small load",
      "functions": [
        "lift",
        "move"
      ],
      "description": "Raise a small load above its starting level. A working small-scale model counts.",
      "requirement": "Raise a small load above its starting level.",
      "test": "The load rises to a marked height through operation of the mechanism.",
      "hint": "What keeps the load from swinging out of alignment?",
      "approach": "Try a light platform with a marked upper stop.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G03",
      "title": "Deliver a message",
      "functions": [
        "move",
        "transport",
        "release",
        "signal"
      ],
      "description": "Make a readable message reach or become available to its recipient. A working small-scale model counts.",
      "requirement": "Make a readable message reach or become available to its recipient.",
      "test": "Another person receives the message by operating or observing the contraption.",
      "hint": "Does the message travel, unfold, or become visible?",
      "approach": "Try carrying a folded note to a receiving pocket.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G04",
      "title": "Reveal a hidden object",
      "functions": [
        "release",
        "move",
        "signal"
      ],
      "description": "Keep an object concealed until the mechanism operates. A working small-scale model counts.",
      "requirement": "Keep an object concealed until the mechanism operates.",
      "test": "A person reveals the object without lifting the cover directly by hand.",
      "hint": "What motion would uncover just enough of the object?",
      "approach": "Try a shutter above a small viewing window.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G05",
      "title": "Sort objects by size",
      "functions": [
        "sort",
        "guide",
        "move"
      ],
      "description": "Separate at least two sizes of safe small objects into different destinations. A working small-scale model counts.",
      "requirement": "Separate at least two sizes of safe small objects into different destinations.",
      "test": "A mixed handful ends up sorted into the intended groups.",
      "hint": "Which dimension should decide where an object goes?",
      "approach": "Try a guide with two differently sized openings.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G06",
      "title": "Dispense one item at a time",
      "functions": [
        "release",
        "count",
        "transport"
      ],
      "description": "Release only one item during each complete operating cycle. A working small-scale model counts.",
      "requirement": "Release only one item during each complete operating cycle.",
      "test": "Three successive cycles each deliver one item, without a second following.",
      "hint": "What holds back the next item while one leaves?",
      "approach": "Try two gates that take turns holding the queue.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G07",
      "title": "Hold a book open",
      "functions": [
        "hold",
        "grip",
        "structure"
      ],
      "description": "Keep a lightweight book open without damaging its pages. A working small-scale model counts.",
      "requirement": "Keep a lightweight book open without damaging its pages.",
      "test": "The book stays at the chosen spread after hands are removed.",
      "hint": "Where can gentle pressure act without covering the text?",
      "approach": "Try two broad soft contacts near the page edges.",
      "extras": [],
      "supplies": [
        "A lightweight book"
      ]
    },
    {
      "id": "G08",
      "title": "Protect something fragile",
      "functions": [
        "hold",
        "structure",
        "grip"
      ],
      "description": "Use the mechanism to reduce movement or impact reaching a fragile stand-in. A working small-scale model counts.",
      "requirement": "Use the mechanism to reduce movement or impact reaching a fragile stand-in.",
      "test": "A paper stand-in remains undamaged through a small, controlled handling test.",
      "hint": "What movement needs absorbing or limiting?",
      "approach": "Try a suspended cradle and test with crumpled paper first.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G09",
      "title": "Draw a repeating pattern",
      "functions": [
        "repeat",
        "move",
        "animate"
      ],
      "description": "Guide a marker through a pattern that repeats visibly. A working small-scale model counts.",
      "requirement": "Guide a marker through a pattern that repeats visibly.",
      "test": "Several operating cycles leave recognizable repeated marks.",
      "hint": "Which part determines the repeating path?",
      "approach": "Try a fixed pen holder above a moving paper strip.",
      "extras": [],
      "supplies": [
        "A marker or pencil and paper"
      ]
    },
    {
      "id": "G10",
      "title": "Make a creature appear alive",
      "functions": [
        "animate",
        "move",
        "repeat"
      ],
      "description": "Give a model creature a recognizable action driven by the mechanism. A working small-scale model counts.",
      "requirement": "Give a model creature a recognizable action driven by the mechanism.",
      "test": "An observer can identify the action without being told what it is.",
      "hint": "Would one expressive moving part be enough?",
      "approach": "Try a single nodding head or waving appendage.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G11",
      "title": "Give a visible signal",
      "functions": [
        "signal",
        "move",
        "release"
      ],
      "description": "Make two states visually distinct when the mechanism operates. A working small-scale model counts.",
      "requirement": "Make two states visually distinct when the mechanism operates.",
      "test": "Someone across the table can tell whether the signal is on or off.",
      "hint": "What contrast is visible without relying only on color?",
      "approach": "Try a flag that rises above a fixed outline.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G12",
      "title": "Make a sound on demand",
      "functions": [
        "sound",
        "release",
        "repeat",
        "move"
      ],
      "description": "Produce a modest audible sound when deliberately operated. A working small-scale model counts.",
      "requirement": "Produce a modest audible sound when deliberately operated.",
      "test": "A person can trigger the sound and leave it quiet between operations.",
      "hint": "Which surface could vibrate or strike another gently?",
      "approach": "Try a small tapping arm aimed at a resonant lid.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G13",
      "title": "Measure a distance",
      "functions": [
        "measure",
        "move",
        "guide"
      ],
      "description": "Translate a physical distance into a readable indication. A working small-scale model counts.",
      "requirement": "Translate a physical distance into a readable indication.",
      "test": "The device distinguishes two known distances in the correct order.",
      "hint": "What fixed reference will make readings comparable?",
      "approach": "Try a moving pointer beside a hand-marked scale.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G14",
      "title": "Compare two weights",
      "functions": [
        "measure",
        "lift",
        "hold"
      ],
      "description": "Indicate which of two small loads is heavier. A working small-scale model counts.",
      "requirement": "Indicate which of two small loads is heavier.",
      "test": "Swapping the loads reverses or predictably changes the indication.",
      "hint": "How will you keep the comparison fair on both sides?",
      "approach": "Try identical load holders attached at equal reference points.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G15",
      "title": "Indicate a change in position",
      "functions": [
        "signal",
        "measure",
        "move"
      ],
      "description": "Make movement from a starting position visibly detectable. A working small-scale model counts.",
      "requirement": "Make movement from a starting position visibly detectable.",
      "test": "An observer notices a small position change through the indicator.",
      "hint": "Could a small input produce a larger visible output?",
      "approach": "Try a pointer that moves past a stationary reference mark.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G16",
      "title": "Keep an object upright",
      "functions": [
        "hold",
        "structure",
        "guide"
      ],
      "description": "Resist tipping of a small object during gentle disturbance. A working small-scale model counts.",
      "requirement": "Resist tipping of a small object during gentle disturbance.",
      "test": "The object remains upright through the same small disturbance twice.",
      "hint": "Where is the center of mass relative to the support?",
      "approach": "Try a guided cradle with a broad, stable base.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G17",
      "title": "Carry something without dropping it",
      "functions": [
        "transport",
        "hold",
        "grip"
      ],
      "description": "Retain a small item while the carrier moves along a short route. A working small-scale model counts.",
      "requirement": "Retain a small item while the carrier moves along a short route.",
      "test": "The item arrives in the carrier after the route is completed.",
      "hint": "What direction is the item most likely to escape?",
      "approach": "Try a shallow cup with a controlled opening at the destination.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G18",
      "title": "Launch a soft paper projectile at a target",
      "functions": [
        "move",
        "release"
      ],
      "description": "Send a loose crumpled paper ball toward a nearby empty tabletop target. A working small-scale model counts.",
      "requirement": "Send a loose crumpled paper ball toward a nearby empty tabletop target.",
      "test": "The paper reaches the target zone through mechanism operation, with no hard projectile or aimed person.",
      "hint": "What is the lowest energy that reaches the target?",
      "approach": "Try a short guided release into a broad paper target.",
      "extras": [],
      "supplies": [
        "A soft paper ball and a tabletop target"
      ]
    },
    {
      "id": "G19",
      "title": "Slow a falling object",
      "functions": [
        "hold",
        "move",
        "time"
      ],
      "description": "Reduce the descent speed of a soft, light object over a short distance. A working small-scale model counts.",
      "requirement": "Reduce the descent speed of a soft, light object over a short distance.",
      "test": "Its controlled descent takes visibly longer than an equal unrestrained drop.",
      "hint": "Where could friction or a longer path absorb the motion?",
      "approach": "Try a short descent guide with an adjustable resistance point.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G20",
      "title": "Cross a small obstacle",
      "functions": [
        "move",
        "transport",
        "guide"
      ],
      "description": "Help a small carrier pass over a low obstacle. A working small-scale model counts.",
      "requirement": "Help a small carrier pass over a low obstacle.",
      "test": "The carrier reaches the other side with its load still in place.",
      "hint": "What is the first part to meet the obstacle?",
      "approach": "Try a leading guide that lifts or redirects the carrier.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G21",
      "title": "Bridge two surfaces",
      "functions": [
        "structure",
        "hold",
        "store"
      ],
      "description": "Create a supported route between two nearby tabletop surfaces. A working small-scale model counts.",
      "requirement": "Create a supported route between two nearby tabletop surfaces.",
      "test": "A light test object crosses while the bridge stays attached and stable.",
      "hint": "Where do loads travel from the center to the supports?",
      "approach": "Try a short deployable span with positive end stops.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G22",
      "title": "Store something compactly",
      "functions": [
        "store",
        "hold",
        "grip"
      ],
      "description": "Change an item or its holder from a working form into a smaller storage form. A working small-scale model counts.",
      "requirement": "Change an item or its holder from a working form into a smaller storage form.",
      "test": "The storage form fits a smaller marked footprint than the working form.",
      "hint": "Which empty space can disappear during storage?",
      "approach": "Try nested or folding sections that retain the stored item.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G23",
      "title": "Expand to hold more",
      "functions": [
        "store",
        "structure",
        "move"
      ],
      "description": "Increase usable capacity through a deliberate mechanical change. A working small-scale model counts.",
      "requirement": "Increase usable capacity through a deliberate mechanical change.",
      "test": "The expanded form holds more identical items than the compact form.",
      "hint": "What dimension should change without weakening the base?",
      "approach": "Try an expanding tray with guided sides.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G24",
      "title": "Fold flat for storage",
      "functions": [
        "store",
        "structure",
        "move"
      ],
      "description": "Make the working model collapse into a substantially flatter form. A working small-scale model counts.",
      "requirement": "Make the working model collapse into a substantially flatter form.",
      "test": "The flattened model fits between two nearby parallel surfaces and can be reopened.",
      "hint": "Which joints need to move together to avoid a collision?",
      "approach": "Try panels with a clear folding order and one final stop.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G25",
      "title": "Help someone grip an object",
      "functions": [
        "grip",
        "hold"
      ],
      "description": "Make a small object easier to hold with gentle contact. A working small-scale model counts.",
      "requirement": "Make a small object easier to hold with gentle contact.",
      "test": "A person lifts the object using the aid without pinching the object directly.",
      "hint": "Where would a broader contact reduce effort?",
      "approach": "Try padded jaws and a handle that limits closing force.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G26",
      "title": "Reach into a narrow space",
      "functions": [
        "move",
        "guide",
        "grip"
      ],
      "description": "Transmit useful action into a slot that fingers cannot easily enter. A working small-scale model counts.",
      "requirement": "Transmit useful action into a slot that fingers cannot easily enter.",
      "test": "The mechanism acts on a marked item inside the slot while the hand stays outside.",
      "hint": "What motion can travel through the narrowest section?",
      "approach": "Try a slim guided member with a working tip.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G27",
      "title": "Retrieve a dropped object",
      "functions": [
        "grip",
        "move",
        "lift"
      ],
      "description": "Recover a small object from a reachable but awkward tabletop recess. A working small-scale model counts.",
      "requirement": "Recover a small object from a reachable but awkward tabletop recess.",
      "test": "The object comes out of the recess through operation of the device.",
      "hint": "Does the object offer a hole, edge, or surface to catch?",
      "approach": "Try a guided retrieval tip with a receiving tray.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G28",
      "title": "Open something without touching it directly",
      "functions": [
        "move",
        "release",
        "direction"
      ],
      "description": "Open a light lid or flap using an input located away from it. A working small-scale model counts.",
      "requirement": "Open a light lid or flap using an input located away from it.",
      "test": "The flap opens while the operator touches only the remote input.",
      "hint": "Where should force act to overcome the hinge resistance?",
      "approach": "Try a lightweight hinged door with an attached control point.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G29",
      "title": "Close automatically",
      "functions": [
        "release",
        "move",
        "hold"
      ],
      "description": "Arrange for a light opening to close after a deliberate release. A working small-scale model counts.",
      "requirement": "Arrange for a light opening to close after a deliberate release.",
      "test": "The opening closes without a second closing push.",
      "hint": "Where can you store the energy needed for closing?",
      "approach": "Try a flap held open by a removable catch.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G30",
      "title": "Release something after a delay",
      "functions": [
        "time",
        "release"
      ],
      "description": "Introduce an observable interval between starting and releasing a small item. A working small-scale model counts.",
      "requirement": "Introduce an observable interval between starting and releasing a small item.",
      "test": "The release occurs after the start, without another touch, in two trials.",
      "hint": "What change can accumulate until a release threshold is reached?",
      "approach": "Try a slow-moving indicator that eventually frees a catch.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G31",
      "title": "Count repeated actions",
      "functions": [
        "count",
        "repeat",
        "signal"
      ],
      "description": "Advance an indicator once per complete input action. A working small-scale model counts.",
      "requirement": "Advance an indicator once per complete input action.",
      "test": "Five deliberate actions produce five distinguishable increments.",
      "hint": "What prevents the return stroke from being counted again?",
      "approach": "Try a stepped pointer with a clear home position.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G32",
      "title": "Show elapsed time",
      "functions": [
        "time",
        "repeat",
        "measure"
      ],
      "description": "Produce an indication that changes as time passes after a start. A working small-scale model counts.",
      "requirement": "Produce an indication that changes as time passes after a start.",
      "test": "A later observation can be distinguished from an earlier one without touching the model.",
      "hint": "What process progresses at a roughly repeatable rate?",
      "approach": "Try a moving marker and compare its travel with a separate clock.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G33",
      "title": "Follow a winding path",
      "functions": [
        "guide",
        "direction",
        "move"
      ],
      "description": "Guide a moving item around at least two changes in direction. A working small-scale model counts.",
      "requirement": "Guide a moving item around at least two changes in direction.",
      "test": "The item completes the path without being lifted over a bend.",
      "hint": "Which bend puts the greatest side load on the guide?",
      "approach": "Try a wide, smooth guide first, then narrow it gradually.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G34",
      "title": "Change direction at an obstacle",
      "functions": [
        "direction",
        "release",
        "move"
      ],
      "description": "Make contact with a small obstacle alter a moving part's path. A working small-scale model counts.",
      "requirement": "Make contact with a small obstacle alter a moving part's path.",
      "test": "The part leaves the obstacle in a different direction without a manual correction.",
      "hint": "What contact point should initiate the change?",
      "approach": "Try a pivoting leading feeler connected to the moving guide.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G35",
      "title": "Turn one movement into several",
      "functions": [
        "repeat",
        "direction",
        "move"
      ],
      "description": "Make one continuous input cause at least two distinct output motions. A working small-scale model counts.",
      "requirement": "Make one continuous input cause at least two distinct output motions.",
      "test": "An observer can identify both outputs during one input stroke.",
      "hint": "Should the outputs happen together or one after another?",
      "approach": "Try one input connected to two separately visible followers.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G36",
      "title": "Turn repeated movements into one result",
      "functions": [
        "count",
        "repeat",
        "release"
      ],
      "description": "Accumulate several inputs before producing a final event. A working small-scale model counts.",
      "requirement": "Accumulate several inputs before producing a final event.",
      "test": "A single input does not finish the mission, but repeated inputs do.",
      "hint": "What state can remain changed between strokes?",
      "approach": "Try a stepped accumulator that eventually reaches a release point.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G37",
      "title": "Move two things in opposite directions",
      "functions": [
        "direction",
        "move",
        "lift"
      ],
      "description": "Couple two visible outputs so one moves oppositely to the other. A working small-scale model counts.",
      "requirement": "Couple two visible outputs so one moves oppositely to the other.",
      "test": "One input moves both outputs in opposing directions.",
      "hint": "What common reference makes the opposing motions obvious?",
      "approach": "Try paired pointers on either side of a fixed center mark.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G38",
      "title": "Transfer motion around a corner",
      "functions": [
        "direction",
        "move"
      ],
      "description": "Carry an input action through a change in direction to a remote output. A working small-scale model counts.",
      "requirement": "Carry an input action through a change in direction to a remote output.",
      "test": "An output beyond the corner moves while the input stays on its original side.",
      "hint": "Where does the path need a guide or pivot?",
      "approach": "Try a right-angle layout with a visible input and output.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G39",
      "title": "Operate from a distance",
      "functions": [
        "direction",
        "move",
        "signal",
        "release"
      ],
      "description": "Place the control at a noticeable distance from the working end. A working small-scale model counts.",
      "requirement": "Place the control at a noticeable distance from the working end.",
      "test": "The user operates the working end without reaching across to touch it.",
      "hint": "How will the control path stay clear of surrounding objects?",
      "approach": "Try a control station separated from the output by a tabletop gap.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G40",
      "title": "Transport a small amount of water",
      "functions": [
        "fluid",
        "transport",
        "lift"
      ],
      "description": "Move a small amount of clean water between two containers. A working small-scale model counts.",
      "requirement": "Move a small amount of clean water between two containers.",
      "test": "Water arrives in the receiving container through the mechanism, with a tray catching spills.",
      "hint": "Does water flow directly or travel in a carrier?",
      "approach": "Try two shallow containers inside a larger catch tray.",
      "extras": [
        "containers",
        "water"
      ],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G41",
      "title": "Indicate a liquid level",
      "functions": [
        "fluid",
        "measure",
        "signal"
      ],
      "description": "Show a visible change when the level of clean water changes. A working small-scale model counts.",
      "requirement": "Show a visible change when the level of clean water changes.",
      "test": "Adding and removing water changes the indication in opposite directions.",
      "hint": "Which part should follow the surface rather than the bottom?",
      "approach": "Try a visible pointer beside a fixed scale on the container.",
      "extras": [
        "containers",
        "water"
      ],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G42",
      "title": "Catch something moving",
      "functions": [
        "grip",
        "hold",
        "release",
        "move"
      ],
      "description": "Capture a slow-moving soft object without a hand intercepting it. A working small-scale model counts.",
      "requirement": "Capture a slow-moving soft object without a hand intercepting it.",
      "test": "The object enters the catcher and stays there after motion stops.",
      "hint": "How can the catcher absorb motion before closing?",
      "approach": "Try a soft receiving pocket with a retaining flap.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G43",
      "title": "Separate mixed materials",
      "functions": [
        "sort",
        "guide",
        "move"
      ],
      "description": "Separate a safe mixture into at least two useful groups. A working small-scale model counts.",
      "requirement": "Separate a safe mixture into at least two useful groups.",
      "test": "One operating sequence produces visibly different output groups.",
      "hint": "Which property differs: size, shape, weight, or magnetic response?",
      "approach": "Try a guide that sends unlike objects to different exits.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G44",
      "title": "Create a changing shadow",
      "functions": [
        "animate",
        "move",
        "repeat",
        "signal"
      ],
      "description": "Move a shape relative to a cool light source so its shadow changes. A working small-scale model counts.",
      "requirement": "Move a shape relative to a cool light source so its shadow changes.",
      "test": "An observer sees a repeatable change in the projected shadow.",
      "hint": "Does moving the shape or changing its angle produce a stronger effect?",
      "approach": "Try a cutout between a cool lamp and a sheet of paper.",
      "extras": [],
      "supplies": [
        "Cool LED light or daylight; a paper screen"
      ]
    },
    {
      "id": "G45",
      "title": "Produce an optical illusion",
      "functions": [
        "repeat",
        "animate",
        "move"
      ],
      "description": "Use movement or changing alignment to alter what an observer perceives. A working small-scale model counts.",
      "requirement": "Use movement or changing alignment to alter what an observer perceives.",
      "test": "A viewer reports a visual effect different from a stationary view.",
      "hint": "Which two patterns might interact when their alignment changes?",
      "approach": "Try overlapping striped panels with one moving slowly.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G46",
      "title": "Make a small surprise appear",
      "functions": [
        "release",
        "animate",
        "move",
        "signal"
      ],
      "description": "Conceal a benign surprise and reveal it through mechanism operation. A working small-scale model counts.",
      "requirement": "Conceal a benign surprise and reveal it through mechanism operation.",
      "test": "An unfamiliar user can trigger the reveal without opening the cover manually.",
      "hint": "What should remain hidden until the very last moment?",
      "approach": "Try a small flag that emerges from behind a panel.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G47",
      "title": "Respond when an object is removed",
      "functions": [
        "release",
        "signal",
        "hold"
      ],
      "description": "Use removal of a resting object to change the mechanism's state. A working small-scale model counts.",
      "requirement": "Use removal of a resting object to change the mechanism's state.",
      "test": "Taking the object away causes a visible response without another touch.",
      "hint": "What force is being balanced while the object is present?",
      "approach": "Try a supported indicator that is freed when its load is removed.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G48",
      "title": "Support a load using little material",
      "functions": [
        "structure",
        "hold"
      ],
      "description": "Use the mechanism or physical principle to stabilize a light load efficiently. A working small-scale model counts.",
      "requirement": "Use the mechanism or physical principle to stabilize a light load efficiently.",
      "test": "The chosen test load stays supported, and removing a critical member visibly weakens the model.",
      "hint": "Where can material be removed without interrupting the load path?",
      "approach": "Try a sparse frame and mark which members carry tension or compression.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G49",
      "title": "Make a repetitive task easier",
      "functions": [
        "repeat",
        "grip",
        "move",
        "guide"
      ],
      "description": "Choose a small repeated tabletop task and reduce the effort or coordination it needs. A working small-scale model counts.",
      "requirement": "Choose a small repeated tabletop task and reduce the effort or coordination it needs.",
      "test": "A user completes three repetitions using the aid and can describe the improvement.",
      "hint": "Which single step causes the most fumbling?",
      "approach": "Try a guide or fixture that puts the next item in the same place.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    },
    {
      "id": "G50",
      "title": "Invite two people to cooperate",
      "functions": [
        "move",
        "signal",
        "hold",
        "release",
        "direction"
      ],
      "description": "Give two participants distinct controls that both contribute to the result. A working small-scale model counts.",
      "requirement": "Give two participants distinct controls that both contribute to the result.",
      "test": "The mission succeeds through coordinated action from both people.",
      "hint": "What information or action must each person supply?",
      "approach": "Try one person controlling alignment while the other operates the working motion.",
      "extras": [],
      "supplies": [
        "Small safe test objects suited to the mission"
      ]
    }
  ],
  "twists": [
    {
      "id": "T01",
      "title": "Make it fold flat",
      "description": "The finished model must fold into a flatter storage form and reopen.",
      "exclude": []
    },
    {
      "id": "T02",
      "title": "Use no glue",
      "description": "Use mechanical joints, folds, knots, or clips; no glue or adhesive tape.",
      "exclude": [
        "M45",
        "M46"
      ]
    },
    {
      "id": "T03",
      "title": "Make it fit in your pocket",
      "description": "Choose a pocket-sized envelope and make the stored model fit inside it.",
      "exclude": []
    },
    {
      "id": "T04",
      "title": "Make it reset itself",
      "description": "After each operation, the mechanism must return to a ready state without being rearranged by hand.",
      "exclude": [
        "K46"
      ]
    },
    {
      "id": "T05",
      "title": "Operate it with one hand",
      "description": "One hand must be sufficient to complete the operating cycle.",
      "exclude": [
        "G50"
      ]
    },
    {
      "id": "T06",
      "title": "Make it unnecessarily dramatic",
      "description": "Add a visible flourish, pause, or reveal that amplifies the experience without hiding the mechanism's purpose.",
      "exclude": []
    },
    {
      "id": "T07",
      "title": "Make the mechanism visible",
      "description": "Keep the working parts in view so another maker can follow the action.",
      "exclude": []
    },
    {
      "id": "T08",
      "title": "Make it work upside down",
      "description": "Demonstrate the mission again after inverting the whole model.",
      "exclude": [
        "K04",
        "K05",
        "K06",
        "K19",
        "K20",
        "K39",
        "K41",
        "K45",
        "K46",
        "K48",
        "G19",
        "G40",
        "G41"
      ]
    },
    {
      "id": "T09",
      "title": "Use only reusable connections",
      "description": "Assemble with joints that can be opened and reused; omit permanent glue and adhesive tape.",
      "exclude": []
    },
    {
      "id": "T10",
      "title": "Make it easy to repair",
      "description": "Make the most likely wear part replaceable without dismantling the whole model.",
      "exclude": []
    },
    {
      "id": "T11",
      "title": "Make it almost silent",
      "description": "Choose soft contacts and demonstrate the mission with as little incidental sound as possible.",
      "exclude": [
        "G12"
      ]
    },
    {
      "id": "T12",
      "title": "Give it a personality",
      "description": "Add an expressive gesture or visual character while keeping the mission easy to recognize.",
      "exclude": []
    },
    {
      "id": "T13",
      "title": "Make it work in two different ways",
      "description": "Provide two distinct inputs or operating sequences that accomplish the same mission.",
      "exclude": []
    },
    {
      "id": "T14",
      "title": "Pack it into its own container",
      "description": "Make part of the model become the container that holds the rest for storage.",
      "exclude": []
    },
    {
      "id": "T15",
      "title": "Use no written instructions",
      "description": "Make the controls understandable through shape, symbols, and a first-time trial.",
      "exclude": []
    }
  ]
};if(typeof module!=="undefined"&&module.exports)module.exports=decks;else root.CONTRAPTION_DECKS=decks;})(typeof globalThis!=="undefined"?globalThis:this);
