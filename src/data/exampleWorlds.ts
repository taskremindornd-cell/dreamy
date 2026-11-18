import type {
  Character,
  DreamWorld,
  RealmTheme,
  StoryChapter,
  StoryChoice,
} from '../types/dream.ts';

interface BranchTemplate {
  title: string;
  narrative: string;
  choices: StoryChoice[];
}

interface PresetScenario {
  worldName: string;
  worldDescription: string;
  settingVibe: string;
  storyMoral: string;
  characters: Character[];
  openingChapter: StoryChapter;
  alternateOpening: StoryChapter;
  branches: Record<string, BranchTemplate>;
  continuationSteps: BranchTemplate[];
}

const PRESET_SCENARIOS: Record<Exclude<RealmTheme, 'custom'>, PresetScenario> = {
  dinosaur: {
    worldName: 'Sunfern Valley',
    worldDescription:
      'A sunlit canyon wrapped in giant spiral ferns and turquoise lagoons, where gentle dinosaurs build wooden tree bridges and celebrate every sunrise with echoing drumbeats.',
    settingVibe: 'Warm amber cliffs, splashing waterfalls, and friendly giant footsteps',
    storyMoral: 'Even the smallest voice can help the biggest friends find harmony.',
    characters: [
      {
        id: 'dino-pip',
        name: 'Pip the Triceratops',
        role: 'Trail Scout',
        personality: 'Boundlessly curious and always sniffs out hidden berry patches',
        specialGift: 'Can hear tiny melodies vibrating through mossy boulders',
        colorTone: 'emerald',
      },
      {
        id: 'dino-bramble',
        name: 'Bramble the Brontosaurus',
        role: 'Treetop Lantern Keeper',
        personality: 'Gentle, patient, and gives the best high-branch piggyback rides',
        specialGift: 'Reaches cloud-high branches to rescue stuck kites and fruit',
        colorTone: 'sky',
      },
      {
        id: 'dino-pebble',
        name: 'Pebble the Pterodactyl',
        role: 'Sky Messenger',
        personality: 'Playful and fast, with a laugh like rattling shells',
        specialGift: 'Draws glowing cloud maps in the morning breeze',
        colorTone: 'amber',
      },
    ],
    openingChapter: {
      chapterNumber: 1,
      title: 'The Whispering Lagoon Mystery',
      narrative:
        'Morning mist curled gently off the turquoise lagoon in Sunfern Valley as Pip nudged a smooth amber stone beside the water. Today was the Great Fern Festival, when every dinosaur played a rhythm on hollow logs—except the Giant Echo Shell had drifted somewhere across the sparkling rapids! Bramble stretched his long neck to scan the far shore while Pebble circled overhead with bright news.',
      illustrationTheme: 'dinosaur',
      choices: [
        {
          id: 'c1-raft',
          label: 'Build a floating fern-leaf raft across the lagoon',
          consequenceHint: 'Team up with Pip and Bramble for a splashy river crossing.',
        },
        {
          id: 'c1-caves',
          label: 'Follow the glowing footprint trail behind the waterfall',
          consequenceHint: 'Discover what secret shortcut Pebble spotted from above.',
        },
        {
          id: 'c1-song',
          label: 'Tap a friendly rhythm on the mossy cliffside drums',
          consequenceHint: 'Send a musical clue to see if the Echo Shell answers back.',
        },
      ],
    },
    alternateOpening: {
      chapterNumber: 1,
      title: 'The Rainbow Hatchling Parade',
      narrative:
        'Soft sunbeams spilled over the amber cliffs just as three tiny speckled eggs began to wiggle inside a cozy nest of soft fern fronds. Pip tiptoed closer with a basket of sweet sunberries, while Bramble gently shaded the nest with a giant palm leaf. Before anyone could blink, a curious baby stegosaurus popped out wearing a crown of dandelion fluff and immediately wanted to explore the valley!',
      illustrationTheme: 'dinosaur',
      choices: [
        {
          id: 'c1-berry',
          label: 'Guide the hatchling to the Singing Berry Meadow',
          consequenceHint: 'Taste sweet glowing berries and meet the meadow crickets.',
        },
        {
          id: 'c1-bridge',
          label: 'Cross the vine bridge to the Crystal Mud Pools',
          consequenceHint: 'Slide safely into warm bubbling turquoise mud.',
        },
        {
          id: 'c1-sky',
          label: 'Ask Pebble to teach a gentle glider hop on the grassy hill',
          consequenceHint: 'Catch a soft morning breeze above the spiral ferns.',
        },
      ],
    },
    branches: {
      'c1-raft': {
        title: 'Sailing the Sparkling Rapids',
        narrative:
          'Using wide woven fern leaves and smooth driftwood, Pip and Bramble crafted a bouncy green raft. As they paddled across the turquoise water, friendly silver fish leaped alongside them like cheerleaders. Halfway to the tiny rocky island, they spotted the Echo Shell tucked inside a cozy otter-moss cradle, gently humming with every ripple!',
        choices: [
          {
            id: 'c2-tune',
            label: 'Listen closely to the tune humming inside the shell',
            consequenceHint: 'Learn a secret melody to share with the whole valley.',
          },
          {
            id: 'c2-share',
            label: 'Invite the lagoon fish and otters to the festival parade',
            consequenceHint: 'Bring new friends back to the sunny clearing.',
          },
          {
            id: 'c2-crown',
            label: 'Decorate the raft with bright river blossoms for the trip back',
            consequenceHint: 'Arrive at the shore in colorful festival style.',
          },
        ],
      },
      'c1-caves': {
        title: 'Behind the Shimmering Curtain',
        narrative:
          'Stepping carefully behind the cool waterfall spray, Pip spotted shiny pebbles arranged like stepping stones into a warm amber cavern. Crystal fireflies blinked awake along the ceiling, lighting up ancient painted spirals on the rock. Right in the center sat the missing Echo Shell, amplifying every joyful drop of water into a gentle xylophone song.',
        choices: [
          {
            id: 'c2-echo',
            label: 'Hum a cheerful duet with the waterfall xylophone',
            consequenceHint: 'Make the entire cavern sparkle with warm golden light.',
          },
          {
            id: 'c2-carry',
            label: 'Carry the Echo Shell out on Bramble’s soft fern saddle',
            consequenceHint: 'Head back safely for the valley celebration.',
          },
          {
            id: 'c2-map',
            label: 'Trace the ancient rock map to find a hidden berry grove',
            consequenceHint: 'Bring a surprise feast for all the dinosaur families.',
          },
        ],
      },
      'c1-song': {
        title: 'The Cliffside Drum Answer',
        narrative:
          'Pip tapped a steady three-beat pattern—thump, tap-tap, thump!—against the hollow canyon boulder. For two quiet heartbeats, only the breeze rustled the leaves. Then, floating across the water from the sunlit reed marsh came a warm, shimmering echo answering right back in tune! Pebble swooped down with a grin, pointing straight toward the singing reeds.',
        choices: [
          {
            id: 'c2-reeds',
            label: 'Wade playfully into the singing reed marsh',
            consequenceHint: 'Find who else was drumming along with the Echo Shell.',
          },
          {
            id: 'c2-parade',
            label: 'Start a marching band along the lagoon path',
            consequenceHint: 'Gather baby dinos from every ridge to join the beat.',
          },
          {
            id: 'c2-lantern',
            label: 'Light floating amber lanterns to guide everyone home',
            consequenceHint: 'Turn the dusk lagoon into a glowing festival stage.',
          },
        ],
      },
    },
    continuationSteps: [
      {
        title: 'The Great Fern Festival Encore',
        narrative:
          'As golden afternoon light painted the cliffs, dinosaurs big and small gathered in a wide mossy circle. Pip led the opening beat, Bramble hung glowing reed lanterns high in the canopy, and the Echo Shell carried their joyful music across every ridge of Sunfern Valley. Everyone cheered as fireflies danced above the lagoon.',
        choices: [
          {
            id: 'c3-feast',
            label: 'Share warm berry scones beneath the starlight canopy',
            consequenceHint: 'Cozy up with friends after a wonderful adventure.',
          },
          {
            id: 'c3-stories',
            label: 'Take turns inventing new constellations in the twilight sky',
            consequenceHint: 'Spot a dinosaur-shaped cloud drifting toward the moon.',
          },
          {
            id: 'c3-plan',
            label: 'Plan tomorrow’s expedition to the Whispering Volcano Springs',
            consequenceHint: 'Keep the spirit of curiosity glowing for another day.',
          },
        ],
      },
      {
        title: 'Starlight Over Sunfern Valley',
        narrative:
          'Under a blanket of silver stars, the valley settled into a peaceful hum. Pip tucked the Echo Shell safely inside its mossy cradle, knowing that anytime friends worked together with patience and kindness, Sunfern Valley would always sing back. With full bellies and happy hearts, the explorers drifted into bright dreams of tomorrow.',
        choices: [
          {
            id: 'c4-dream',
            label: 'Watch the last shooting star glide past the amber ridge',
            consequenceHint: 'Make a wish for your next great world.',
          },
          {
            id: 'c4-jam',
            label: 'Play one gentle lullaby chord on the hollow log drum',
            consequenceHint: 'Send the baby dinos happily to sleep.',
          },
          {
            id: 'c4-new',
            label: 'Sketch a keepsake map of today’s journey',
            consequenceHint: 'Save the memories to share with family.',
          },
        ],
      },
    ],
  },
  space: {
    worldName: 'Starflite Nebula',
    worldDescription:
      'A swirling ribbon of pastel-ringed planets and cozy brass moons, linked by golden comet trails that hum like wind chimes whenever an explorer rocket sails past.',
    settingVibe: 'Velvet starlight, glowing crescent moons, and friendly cosmic neighborhoods',
    storyMoral: 'Curiosity and teamwork light up even the farthest corners of the universe.',
    characters: [
      {
        id: 'space-nova',
        name: 'Captain Nova',
        role: 'Starship Navigator',
        personality: 'Cheerful, brave, and keeps spare cocoa thermoses in her spacesuit',
        specialGift: 'Reads constellation whispers through her brass pocket spyglass',
        colorTone: 'coral',
      },
      {
        id: 'space-beep',
        name: 'Beep-Boop',
        role: 'Clockwork Co-Pilot',
        personality: 'Polite, bouncy, and speaks in friendly musical chimes',
        specialGift: 'Can bounce comet dust into glowing stepping stones',
        colorTone: 'sky',
      },
      {
        id: 'space-luma',
        name: 'Luma the Moon Fox',
        role: 'Stardust Guide',
        personality: 'Calm, clever, with a tail that flickers like warm lantern light',
        specialGift: 'Sniffs out lost satellites and marshmallow asteroid craters',
        colorTone: 'amber',
      },
    ],
    openingChapter: {
      chapterNumber: 1,
      title: 'The Humming Comet Signal',
      narrative:
        'Aboard the painted wooden-and-brass rocket Starflite, Captain Nova adjusted her goggles as a golden comet zoomed past the porthole, leaving a sparkling trail of musical notes. Beep-Boop’s radar screen blinked with a friendly heart shape: a tiny lost moonbeam lantern had floated away from Crescent Harbor! Luma pressed her nose against the glass, pointing toward three shimmering cosmic paths.',
      illustrationTheme: 'space',
      choices: [
        {
          id: 'c1-rings',
          label: 'Surf the pastel ice rings of Planet Sherbet',
          consequenceHint: 'Glide along colorful icy ribbons for a fast look ahead.',
        },
        {
          id: 'c1-moon',
          label: 'Land gently on the Cozy Cheese-Crater Moon',
          consequenceHint: 'Ask the friendly moon owls if they spotted the lantern.',
        },
        {
          id: 'c1-trail',
          label: 'Follow the golden comet crumbs into the Whispering Cloud',
          consequenceHint: 'Track the twinkling notes straight to their source.',
        },
      ],
    },
    alternateOpening: {
      chapterNumber: 1,
      title: 'The Galactic Picnic Delivery',
      narrative:
        'Today was the Orbit Bakery’s hundredth birthday, and the Starflite rocket was packed with starberry tarts that floated gently whenever Beep-Boop turned off gravity! Just as Captain Nova set course for Saturn-Swirl Park, a playful meteor shower sprinkled glitter across the windshield and nudged their compass into a joyful spin.',
      illustrationTheme: 'space',
      choices: [
        {
          id: 'c1-bubble',
          label: 'Launch a giant protective soap-nebula bubble around the ship',
          consequenceHint: 'Bounce harmlessly past the sparkling meteors.',
        },
        {
          id: 'c1-dance',
          label: 'Use thrusters to weave a sky-dance between comet tails',
          consequenceHint: 'Turn the detour into a dazzling light show.',
        },
        {
          id: 'c1-beacon',
          label: 'Tune the brass radio to Crescent Harbor’s lighthouse chime',
          consequenceHint: 'Follow the warm melody safely back on course.',
        },
      ],
    },
    branches: {
      'c1-rings': {
        title: 'Skating the Pastel Rings',
        narrative:
          'Captain Nova tilted the brass rudder, and Starflite skimmed smoothly across Planet Sherbet’s pink and mint ice rings! Sparkling crystals chimed beneath the hull like tiny bells. Right beside a swirling peach-colored snowdrift sat the little moonbeam lantern, bobbing happily while baby star-penguins skated circles around it.',
        choices: [
          {
            id: 'c2-penguins',
            label: 'Invite the star-penguins to help carry the lantern aboard',
            consequenceHint: 'Make new cosmic friends for the journey home.',
          },
          {
            id: 'c2-cocoa',
            label: 'Share warm moon-berry cocoa before lifting off',
            consequenceHint: 'Celebrate the rescue right on the glittering rings.',
          },
          {
            id: 'c2-boost',
            label: 'Use Beep-Boop’s star-confetti booster for a rainbow takeoff',
            consequenceHint: 'Zoom swiftly back toward Crescent Harbor.',
          },
        ],
      },
      'c1-moon': {
        title: 'Tea Time on Crescent Crater',
        narrative:
          'Starflite touched down softly in pillowy silver moon dust. Out popped three sleepy moon owls wearing knitted scarves! They pointed politely toward the highest crater rim, where the moonbeam lantern had perched like a glowing nightlight to help a lost baby comet find its orbit.',
        choices: [
          {
            id: 'c2-owl',
            label: 'Thank the owls with a glowing pocket star-compass',
            consequenceHint: 'Leave Crescent Crater brighter than before.',
          },
          {
            id: 'c2-comet',
            label: 'Escort the baby comet gently back to its family ribbon',
            consequenceHint: 'Earn a shimmering trail of stardust blessings.',
          },
          {
            id: 'c2-jump',
            label: 'Take giant low-gravity moon leaps back to the rocket',
            consequenceHint: 'Bounce joyfully across the silver hills.',
          },
        ],
      },
      'c1-trail': {
        title: 'Inside the Singing Nebula',
        narrative:
          'Following the golden crumbs, Starflite drifted inside a cotton-candy cloud glowing soft lavender and gold. Every star inside hummed a gentle lullaby! Luma spotted the missing lantern floating beside a sleeping crystal whale, casting cozy light so the whale’s little calf could practice swimming through stardust.',
        choices: [
          {
            id: 'c2-spare',
            label: 'Hang a spare lantern for the whale calf and bring the original home',
            consequenceHint: 'Solve both problems with a generous heart.',
          },
          {
            id: 'c2-sing',
            label: 'Play a gentle chime duet with Beep-Boop before departing',
            consequenceHint: 'Send warm echoes rippling across the cloud.',
          },
          {
            id: 'c2-sail',
            label: 'Catch a friendly solar breeze straight to Crescent Harbor',
            consequenceHint: 'Glide effortlessly home with glowing sails.',
          },
        ],
      },
    },
    continuationSteps: [
      {
        title: 'Welcome Home to Crescent Harbor',
        narrative:
          'When Starflite glided back to Crescent Harbor, the whole crescent dock lit up with floating paper stars. Captain Nova hung the moonbeam lantern back on its brass hook, and its warm glow rippled out across seven pastel planets. Every traveler cheered as Beep-Boop played a triumphant celebratory jingle.',
        choices: [
          {
            id: 'c3-name',
            label: 'Name a brand-new star constellation after your crew',
            consequenceHint: 'Leave your mark across the evening sky.',
          },
          {
            id: 'c3-feast',
            label: 'Toast floating star-marshmallows on the observation deck',
            consequenceHint: 'Enjoy sweet zero-gravity treats together.',
          },
          {
            id: 'c3-chart',
            label: 'Pin a golden star onto the next unexplored galaxy',
            consequenceHint: 'Get ready for another skyward story.',
          },
        ],
      },
      {
        title: 'Lullaby of a Thousand Lanterns',
        narrative:
          'With the moonbeam lantern shining bright and steady, Luma curled up beside the warm rocket window while galaxies swirled slowly outside like painted pinwheels. Captain Nova logged the adventure in her leather sky-journal, smiling at how kindness and curiosity always find a way home.',
        choices: [
          {
            id: 'c4-save',
            label: 'Seal the adventure in the keepsake Story Card',
            consequenceHint: 'Create a printable cosmic memory to share.',
          },
          {
            id: 'c4-wave',
            label: 'Wave goodnight to Planet Sherbet’s pastel rings',
            consequenceHint: 'Watch a friendly shooting star wink back.',
          },
          {
            id: 'c4-restart',
            label: 'Dream up another cosmic ship for tomorrow',
            consequenceHint: 'Keep exploring new worlds anytime.',
          },
        ],
      },
    ],
  },
  forest: {
    worldName: 'Ambercap Hollow',
    worldDescription:
      'An enchanted woodland where oak cottages nestle inside mossy roots, glowing apricot mushrooms light winding cobblestone paths, and friendly woodland animals trade acorns for bedtime stories.',
    settingVibe: 'Dappled golden sunbeams, cozy chimney smoke, and twinkling moss paths',
    storyMoral: 'When we slow down and notice small wonders, the whole forest becomes our friend.',
    characters: [
      {
        id: 'forest-rusty',
        name: 'Rusty the Lantern Fox',
        role: 'Pathfinder',
        personality: 'Clever, polite, and always straightens crooked mushroom caps',
        specialGift: 'Follows whispers carried on drifting autumn leaves',
        colorTone: 'coral',
      },
      {
        id: 'forest-fern',
        name: 'Fern the Hedge-Baker',
        role: 'Cottage Chef',
        personality: 'Warm-hearted, cheerful, and smells faintly of cinnamon toast',
        specialGift: 'Bakes glowing honey-acorn muffins that banish grumpy moods',
        colorTone: 'amber',
      },
      {
        id: 'forest-pippin',
        name: 'Pippin the Dew-Sprite',
        role: 'Firefly Conductor',
        personality: 'Tiny, joyful, and wears an upside-down bluebell hat',
        specialGift: 'Conducts firefly orchestras to light up foggy trails',
        colorTone: 'emerald',
      },
    ],
    openingChapter: {
      chapterNumber: 1,
      title: 'The Mystery of the Sleepy Glow-Mushrooms',
      narrative:
        'Golden afternoon light slanted through the tall oaks of Ambercap Hollow, yet something unusual had happened along the mossy stepping stones—the giant apricot mushrooms had tucked their glow away! Without their warm lantern shine, the woodland mail-delivery bunnies wouldn’t be able to see their way back to the oak cottages before tea time. Rusty twitched his fluffy tail, sniffing the sweet pine air for clues.',
      illustrationTheme: 'forest',
      choices: [
        {
          id: 'c1-brook',
          label: 'Follow the silver pebble brook up to the Singing Spring',
          consequenceHint: 'See if the mushrooms just need a splash of sparkling spring water.',
        },
        {
          id: 'c1-bakery',
          label: 'Visit Fern’s cozy oak-root bakery for warm cinnamon clues',
          consequenceHint: 'Maybe the forest fairies gathered near the sweet oven!',
        },
        {
          id: 'c1-tower',
          label: 'Climb the spiral mossy staircase to Owl Watchtower',
          consequenceHint: 'Spot where the missing forest glow drifted from high above.',
        },
      ],
    },
    alternateOpening: {
      chapterNumber: 1,
      title: 'The Lost Acorn Crown',
      narrative:
        'A gentle breeze scattered golden leaves across the mossy cobblestones as Pippin zoomed into the clearing with big news: the Squirrel Mayor’s carved acorn crown had rolled right into a patch of ticklish dandelion fluff! Rusty adjusted his tiny brass lantern while Fern packed a basket of warm clover biscuits for the search.',
      illustrationTheme: 'forest',
      choices: [
        {
          id: 'c1-dandelion',
          label: 'Tiptoe gently into the Whispering Dandelion Meadow',
          consequenceHint: 'Follow the softest giggles beneath the fluffy white seeds.',
        },
        {
          id: 'c1-bridge',
          label: 'Check under the curved willow bridge by the pond',
          consequenceHint: 'Ask the friendly pond frogs if they saw something shiny roll past.',
        },
        {
          id: 'c1-lantern',
          label: 'Light Pippin’s firefly compass to trace the golden trail',
          consequenceHint: 'Let tiny glowing sparks guide every step.',
        },
      ],
    },
    branches: {
      'c1-brook': {
        title: 'The Sparkling Dew-Drop Song',
        narrative:
          'Beside the crystal brook, Rusty discovered a stack of smooth river pebbles blocking the little stone channel that watered the mushroom roots—placed there accidentally by a family of enthusiastic beavers building a slide! Working together, Fern offered the beavers honey-acorn muffins while Pippin guided the sparkling water gently back along the mossy stones.',
        choices: [
          {
            id: 'c2-beavers',
            label: 'Help the beavers move their water slide to the wide sunny pond',
            consequenceHint: 'Make sure everyone gets to splash safely.',
          },
          {
            id: 'c2-splash',
            label: 'Watch the first wave of spring water awaken the apricot mushrooms',
            consequenceHint: 'See the whole hollow bloom in warm peach light.',
          },
          {
            id: 'c2-tea',
            label: 'Invite everyone back to the oak cottage for warm berry tea',
            consequenceHint: 'Celebrate teamwork around the crackling hearth.',
          },
        ],
      },
      'c1-bakery': {
        title: 'A Pinch of Starlight Sugar',
        narrative:
          'Inside Fern’s hollowed-oak kitchen, warm light spilled from diamond-shaped windows and sweet nutmeg swirled in the air. Perched atop the windowsill were three tiny glow-moths nibbling dropped crumbs! They explained in soft wing-flutters that the mushrooms were waiting for Pippin’s twilight chime to wake up for the evening.',
        choices: [
          {
            id: 'c2-chime',
            label: 'Ring the silver bluebell chime from the cottage porch',
            consequenceHint: 'Send a bright wake-up ring across the woodland.',
          },
          {
            id: 'c2-muffins',
            label: 'Pack warm muffins to share with the delivery bunnies',
            consequenceHint: 'Spread cozy cheer along the stepping stones.',
          },
          {
            id: 'c2-moths',
            label: 'Ask the glow-moths to lead a lantern parade down the path',
            consequenceHint: 'Turn twilight into a shimmering golden ribbon.',
          },
        ],
      },
      'c1-tower': {
        title: 'View Above the Emerald Canopy',
        narrative:
          'From the cozy moss balcony of Owl Watchtower, Rusty could see the entire enchanted forest stretching like a velvet quilt. Just past the fern hollow, golden mist had drifted softly over the mushroom grove like a cozy blanket—making them think it was still naptime! Pippin blew a gentle breeze flute to lift the sleepy mist into swirling clouds.',
        choices: [
          {
            id: 'c2-flute',
            label: 'Join Pippin’s breeze song to clear the golden mist',
            consequenceHint: 'Watch the warm sunlight kiss every mushroom cap awake.',
          },
          {
            id: 'c2-slide',
            label: 'Ride the smooth oak-bark spiral slide back down to the clearing',
            consequenceHint: 'Arrive fast and giggling at the mushroom village.',
          },
          {
            id: 'c2-owl',
            label: 'Borrow Grandmother Owl’s crystal prism to bounce extra light',
            consequenceHint: 'Paint rainbows across the mossy cottages.',
          },
        ],
      },
    },
    continuationSteps: [
      {
        title: 'Lanterns Aglow in Ambercap Hollow',
        narrative:
          'One by one, the giant apricot mushrooms popped brightly awake, bathing the cobblestones in cozy golden-peach light! Right on cue, the woodland mail bunnies trotted happily home with their satchels full of friendly letters, thanking Rusty, Fern, and Pippin with warm hugs and extra clover tarts.',
        choices: [
          {
            id: 'c3-dance',
            label: 'Join the firefly circle dance on the mossy village green',
            consequenceHint: 'Twirl under glowing oak branches with all your friends.',
          },
          {
            id: 'c3-letters',
            label: 'Read cheerful postcards sent from neighboring fairy hills',
            consequenceHint: 'Discover new magical corners beyond the woods.',
          },
          {
            id: 'c3-hearth',
            label: 'Gather inside the thatched cottage for a bedtime story',
            consequenceHint: 'Warm your paws beside the glowing fireplace.',
          },
        ],
      },
      {
        title: 'Goodnight, Enchanted Woods',
        narrative:
          'As stars peeked through the oak leaves, chimney smoke curled softly above the cottages like white ribbons. Rusty hung his brass lantern on the porch hook, knowing Ambercap Hollow was safe, bright, and wrapped in kindness—ready for whatever gentle wonder tomorrow morning might bring.',
        choices: [
          {
            id: 'c4-card',
            label: 'Save your forest keepsake on a Story Card',
            consequenceHint: 'Download or share Ambercap Hollow with family.',
          },
          {
            id: 'c4-wish',
            label: 'Leave a sweet acorn treat on the doorstep for the fireflies',
            consequenceHint: 'Say thank you to the tiniest forest helpers.',
          },
          {
            id: 'c4-new',
            label: 'Imagine a brand-new woodland creature for next time',
            consequenceHint: 'Start another magical adventure whenever you like.',
          },
        ],
      },
    ],
  },
  underwater: {
    worldName: 'Coralis Pearl',
    worldDescription:
      'A sparkling underwater city sculpted from pink coral arches and sunlit pearl domes, where jellyfish lanterns drift like warm balloons and friendly sea turtles ferry neighbors across turquoise currents.',
    settingVibe: 'Sunlit turquoise waves, glowing shell windows, and gentle ocean melodies',
    storyMoral: 'Every creature brings a special splash of color to our shared ocean home.',
    characters: [
      {
        id: 'sea-marina',
        name: 'Marina the Coral Weaver',
        role: 'Pearl Dome Architect',
        personality: 'Creative, gentle, and decorates bridges with singing sea-glass',
        specialGift: 'Turns swirling ocean bubbles into sturdy floating stepping stones',
        colorTone: 'teal',
      },
      {
        id: 'sea-shelly',
        name: 'Captain Shelly',
        role: 'Sea Turtle Express',
        personality: 'Cheerful, steady, and never forgets a passenger’s favorite snack',
        specialGift: 'Knows every secret warm-water current in the reef',
        colorTone: 'emerald',
      },
      {
        id: 'sea-pip',
        name: 'Glimmer the Jellyfish',
        role: 'Lantern Keeper',
        personality: 'Dreamy, musical, and glows brighter whenever someone giggles',
        specialGift: 'Lights up deep pearl caves with soft golden warmth',
        colorTone: 'amber',
      },
    ],
    openingChapter: {
      chapterNumber: 1,
      title: 'The Missing Pearl Fountain Chime',
      narrative:
        'Sunbeams danced down through clear turquoise water onto the plazas of Coralis Pearl, illuminating schools of bright clownfish darting around the sea-anemone gardens. In the center square stood the Grand Pearl Fountain, which usually sang a bubbling ocean tune—but today, its golden shell chime had floated off on a playful current! Marina waved to Captain Shelly as Glimmer floated down to help search.',
      illustrationTheme: 'underwater',
      choices: [
        {
          id: 'c1-kelp',
          label: 'Glide through the Rainbow Kelp Maze on Captain Shelly’s shell',
          consequenceHint: 'Ride a gentle turquoise current between swaying ribbon plants.',
        },
        {
          id: 'c1-towers',
          label: 'Check the Spiral Conch Towers where the sea-breeze echoes',
          consequenceHint: 'Listen from the highest pearl balcony for a familiar chime.',
        },
        {
          id: 'c1-garden',
          label: 'Ask the shy seahorses in the Anemone Garden for clues',
          consequenceHint: 'Peek gently among bright pink and coral sea blossoms.',
        },
      ],
    },
    alternateOpening: {
      chapterNumber: 1,
      title: 'The Sea-Glass Regatta',
      narrative:
        'Every doorway in Coralis Pearl glowed warm gold as families gathered for the annual Bubble-Boat Regatta! Marina had carved a gleaming nautilus sailboat out of smooth sea-glass, only to discover a curious baby octopus accidentally tangled the kelp ribbons at the starting arch—with a big happy grin on all eight arms!',
      illustrationTheme: 'underwater',
      choices: [
        {
          id: 'c1-octopus',
          label: 'Turn the tangle into an eight-arm ribbon weaving game',
          consequenceHint: 'Help the baby octopus become the official race starter!',
        },
        {
          id: 'c1-bubble',
          label: 'Weave a giant shimmering bubble sail with Marina’s magic',
          consequenceHint: 'Catch the sunniest ocean current across the plaza.',
        },
        {
          id: 'c1-lantern',
          label: 'Line the race course with Glimmer’s glowing jellyfish lanterns',
          consequenceHint: 'Light up every coral arch along the reef.',
        },
      ],
    },
    branches: {
      'c1-kelp': {
        title: 'Dancing Through Rainbow Kelp',
        narrative:
          'Holding onto Captain Shelly’s smooth shell, Marina swooshed through towering emerald and violet kelp ribbons that swayed like underwater banners. Halfway through the sunlit maze, they heard a cheerful "ding-a-ling!" A little hermit crab had borrowed the golden shell chime as an umbrella while searching for a bigger seashell house!',
        choices: [
          {
            id: 'c2-shell',
            label: 'Help the hermit crab pick a shiny pink spiral shell home',
            consequenceHint: 'Trade kindly so everyone leaves happy.',
          },
          {
            id: 'c2-ride',
            label: 'Give the crab a royal turtle-back ride to the Grand Plaza',
            consequenceHint: 'Turn the return trip into a joyous ocean parade.',
          },
          {
            id: 'c2-bubbles',
            label: 'Blow musical rings of silver bubbles to signal Coralis Pearl',
            consequenceHint: 'Let the whole city know the chime is found!',
          },
        ],
      },
      'c1-towers': {
        title: 'Echoes of the Conch Balcony',
        narrative:
          'Swimming up past glowing pearl windows, Marina and Glimmer reached the top balcony of the Spiral Conch Tower. From up here, the reef sparkled like a jewel box! Glimmer pulsed a warm golden signal, and far below by the Coral Bridge, a tiny mirror-like flash winked right back from inside a basket of singing clams.',
        choices: [
          {
            id: 'c2-dive',
            label: 'Swoop smoothly down through the bubble-ring arches',
            consequenceHint: 'Arrive at the Coral Bridge in seconds.',
          },
          {
            id: 'c2-clams',
            label: 'Teach the singing clams a gentle harmony to return the chime',
            consequenceHint: 'Create a choir across the underwater bridge.',
          },
          {
            id: 'c2-signal',
            label: 'Invite the school of blue tangs to guide Captain Shelly over',
            consequenceHint: 'Team up with bright ocean neighbors.',
          },
        ],
      },
      'c1-garden': {
        title: 'Secrets of the Anemone Blossoms',
        narrative:
          'In the soft pastel Anemone Garden, three tiny turquoise seahorses curled their tails politely and pointed toward a shimmering bubble-stream rising near the Coral Archway. The golden shell chime had floated gently inside a giant iridescent soap-pearl, humming softly as friendly fish danced around it in wonder.',
        choices: [
          {
            id: 'c2-pop',
            label: 'Catch the iridescent bubble gently in Marina’s woven net',
            consequenceHint: 'Float the golden chime safely back to the plaza.',
          },
          {
            id: 'c2-dance',
            label: 'Invite the seahorses and clownfish to lead the fountain ceremony',
            consequenceHint: 'Give the shy garden friends a starring role.',
          },
          {
            id: 'c2-glow',
            label: 'Have Glimmer light a path of warm amber bubbles overhead',
            consequenceHint: 'Make the coral garden shimmer like stars.',
          },
        ],
      },
    },
    continuationSteps: [
      {
        title: 'The Pearl Fountain Sings Again',
        narrative:
          'When Marina clicked the golden shell chime back into place atop the Pearl Fountain, a cascade of sparkling water-notes swirled into the turquoise sky! Sea turtles spun slow happy loops, jellyfish lanterns bobbed to the rhythm, and every pearl dome in Coralis Pearl glowed warm gold like cozy little lanterns beneath the waves.',
        choices: [
          {
            id: 'c3-concert',
            label: 'Host an underwater bubble-choir concert in the plaza',
            consequenceHint: 'Sing along with dolphins, crabs, and sea turtles.',
          },
          {
            id: 'c3-picnic',
            label: 'Share sweet kelp-berry treats beneath the coral arch',
            consequenceHint: 'Relax with friends beside the singing fountain.',
          },
          {
            id: 'c3-explore',
            label: 'Map a new sunken garden beyond the turquoise ridge',
            consequenceHint: 'Discover even more ocean wonders.',
          },
        ],
      },
      {
        title: 'Moonbeams Beneath the Waves',
        narrative:
          'As evening moonlight silvered the ocean surface far above, Coralis Pearl settled into a peaceful shimmer. Captain Shelly tucked his oars in, Glimmer dimmed to a soft nightlight glow, and Marina smiled knowing that with helpful neighbors, every ocean current brings friends closer together.',
        choices: [
          {
            id: 'c4-card',
            label: 'Create your Coralis Pearl keepsake Story Card',
            consequenceHint: 'Download or share this ocean adventure.',
          },
          {
            id: 'c4-shells',
            label: 'Tuck a lucky pearl shell beside the fountain for tomorrow',
            consequenceHint: 'Leave a friendly gift for the next explorer.',
          },
          {
            id: 'c4-new',
            label: 'Imagine another underwater world to explore',
            consequenceHint: 'Jump back anytime for a brand-new tale.',
          },
        ],
      },
    ],
  },
  superhero: {
    worldName: 'Sunharbor Heights',
    worldDescription:
      'A joyful coastal town of sunflower rooftop gardens, winding stone skybridges, and bright lookout towers, where young neighborhood heroes use clever kindness gadgets and teamwork to keep everyone smiling.',
    settingVibe: 'Crisp ocean breeze, colorful rooftops, and heroic neighborly spirit',
    storyMoral: 'Real superpowers grow from listening, helping neighbors, and never giving up.',
    characters: [
      {
        id: 'hero-sunny',
        name: 'Captain Breeze',
        role: 'Skybridge Lookout',
        personality: 'Optimistic, energetic, and wears a bright fluttering red cape',
        specialGift: 'Bounces across rooftop gardens with spring-cloud boots',
        colorTone: 'coral',
      },
      {
        id: 'hero-gizmo',
        name: 'Tinker Belle-Byte',
        role: 'Kindness Inventor',
        personality: 'Thoughtful, clever, and carries tools in a sunflower backpack',
        specialGift: 'Builds solar-powered grapple kites and rainbow repair bubbles',
        colorTone: 'indigo',
      },
      {
        id: 'hero-barkley',
        name: 'Barnaby the Harbor Hound',
        role: 'Rescue Spotter',
        personality: 'Loyal, gentle, and wags his tail like a ship’s flag',
        specialGift: 'Can spot a lost kite or stuck sailboat miles out at sea',
        colorTone: 'amber',
      },
    ],
    openingChapter: {
      chapterNumber: 1,
      title: 'The Runaway Harbor Kite',
      narrative:
        'From the top of Stone Lookout Tower, Captain Breeze watched sunlit sailboats bobbing below the stone arch bridge. Suddenly, Barnaby let out two playful barks—a gust of mischievous sea wind had swept Mrs. Lin’s giant painted dragon kite right off the rooftop garden, carrying her basket of prize cherry tomatoes along with it toward the lighthouse rocks!',
      illustrationTheme: 'superhero',
      choices: [
        {
          id: 'c1-boots',
          label: 'Spring across the flower rooftops in Breeze’s cloud-jump boots',
          consequenceHint: 'Take the high scenic path above the colorful tiled roofs.',
        },
        {
          id: 'c1-gadget',
          label: 'Launch Tinker’s solar wind-net from the curved stone bridge',
          consequenceHint: 'Use clever engineering to catch the swirling breeze.',
        },
        {
          id: 'c1-boat',
          label: 'Dash down to the sunny pier to team up with Harbor Boat #4',
          consequenceHint: 'Intercept the drifting kite safely over the sparkling bay.',
        },
      ],
    },
    alternateOpening: {
      chapterNumber: 1,
      title: 'The Midnight Rooftop Blackout',
      narrative:
        'Right before the Sunharbor Lantern Picnic, a sleepy seagull nudged the solar windmill switch on Rooftop Terrace, turning all the string lights along the stone bridge off! Captain Breeze tied on her bright cape while Tinker opened her sunflower toolkit, ready to bring the warm golden sparkle back before the first music note played.',
      illustrationTheme: 'superhero',
      choices: [
        {
          id: 'c1-windmill',
          label: 'Climb the friendly spiral tower to spin the solar windmill',
          consequenceHint: 'Catch the fresh coastal gust to recharge the bridge lights.',
        },
        {
          id: 'c1-mirrors',
          label: 'Line up shiny brass mirrors from rooftop garden to garden',
          consequenceHint: 'Bounce sunset light across the harbor in a golden chain.',
        },
        {
          id: 'c1-lanterns',
          label: 'Hand out Tinker’s pocket firefly jars to every neighbor',
          consequenceHint: 'Light up the picnic by sharing small sparks together.',
        },
      ],
    },
    branches: {
      'c1-boots': {
        title: 'Leaping Across Sunflower Roofs',
        narrative:
          'Boing! Captain Breeze bounded lightly from a terracotta rooftop bursting with sunflowers onto a lavender balcony, waving cheerfully to neighbors below. Reaching the edge above the arched stone bridge just in time, she tossed Tinker’s soft ribbon lasso, gently guiding both the painted dragon kite and the untouched tomato basket back onto the grass!',
        choices: [
          {
            id: 'c2-deliver',
            label: 'Carry the basket back to Mrs. Lin’s rooftop garden party',
            consequenceHint: 'Share fresh tomato bruschetta with the whole street.',
          },
          {
            id: 'c2-kite',
            label: 'Add a stabilizing rainbow ribbon tail so the kite flies steady',
            consequenceHint: 'Make sure the breeze becomes a friend next time.',
          },
          {
            id: 'c2-flag',
            label: 'Hoist the dragon kite gently atop Lookout Tower for everyone to see',
            consequenceHint: 'Celebrate the rescue above the sunny bay.',
          },
        ],
      },
      'c1-gadget': {
        title: 'The Solar Wind-Net Rescue',
        narrative:
          'Tinker unfolded a shimmering umbrella-shaped glider net powered by two tiny pinwheels! As the gust carried the dragon kite above the bridge arches, Barnaby barked the exact wind angle and Tinker released the net. Softly as catching a falling feather, the wind-net cradled the kite and drifted smoothly down onto the harbor pier.',
        choices: [
          {
            id: 'c2-pinwheel',
            label: 'Gift Mrs. Lin a miniature pinwheel wind-chime for her garden',
            consequenceHint: 'Help neighbors tell which way the harbor breeze blows.',
          },
          {
            id: 'c2-upgrade',
            label: 'Teach the neighborhood kids how the solar wind-net works',
            consequenceHint: 'Inspire a brand-new club of young kindness inventors.',
          },
          {
            id: 'c2-parade',
            label: 'Fly the dragon kite together across the open stone bridge',
            consequenceHint: 'Turn a windy gust into the best afternoon yet.',
          },
        ],
      },
      'c1-boat': {
        title: 'Splash Rescue on Sunharbor Bay',
        narrative:
          'Captain Breeze and Barnaby hopped aboard the cheerful yellow harbor tugboat just as Captain Gus sounded a friendly horn! Steering gently past bobbing buoys, they positioned the boat’s padded deck cushions right beneath the descending kite. Touchdown! Not a single cherry tomato was squished, and the harbor gulls cheered from the pilings.',
        choices: [
          {
            id: 'c2-picnic',
            label: 'Host a dockside picnic with fresh tomatoes and warm bread',
            consequenceHint: 'Celebrate with the harbor sailors and neighbors.',
          },
          {
            id: 'c2-lighthouse',
            label: 'Sail out to wave hello to the friendly lighthouse keeper',
            consequenceHint: 'Enjoy the crisp sea breeze across the bay.',
          },
          {
            id: 'c2-badge',
            label: 'Award Barnaby an honorary Sea-Spotter Captain hat',
            consequenceHint: 'Watch the happiest tail wag in Sunharbor.',
          },
        ],
      },
    },
    continuationSteps: [
      {
        title: 'Sunset Toast on the Stone Bridge',
        narrative:
          'By late afternoon, the string lights along the arched bridge flickered warmly on above the harbor water. Neighbors brought chairs, warm pies, and storybooks out onto the rooftop terraces while Mrs. Lin’s painted dragon kite soared steadily overhead like a cheerful guardian. Everyone agreed the best superpower in Sunharbor Heights was looking out for one another.',
        choices: [
          {
            id: 'c3-signal',
            label: 'Invent a friendly flashlight wave signal between rooftops',
            consequenceHint: 'Help friends say hello from across the bay.',
          },
          {
            id: 'c3-garden',
            label: 'Plant a new box of bright marigolds beside Lookout Tower',
            consequenceHint: 'Make the city even warmer and brighter.',
          },
          {
            id: 'c3-club',
            label: 'Design a Kindness Helper Badge for your family and friends',
            consequenceHint: 'Turn everyday kindness into a real-life adventure.',
          },
        ],
      },
      {
        title: 'Lights Over Sunharbor Bay',
        narrative:
          'As twilight deepened into soft sky-blue, harbor boats rocked gently at the wooden docks and rooftop lanterns glowed like warm stars. Captain Breeze hung her cape over the lookout railing beside Barnaby, proud of a day filled with clever teamwork, laughter, and safe landings.',
        choices: [
          {
            id: 'c4-card',
            label: 'Save your hero story on a Story Card',
            consequenceHint: 'Download or share Sunharbor Heights with family.',
          },
          {
            id: 'c4-sky',
            label: 'Watch the first evening star twinkle above the lighthouse',
            consequenceHint: 'Finish the adventure on a peaceful note.',
          },
          {
            id: 'c4-new',
            label: 'Dream up a brand-new hero universe',
            consequenceHint: 'Start creating your next imagination world.',
          },
        ],
      },
    ],
  },
};

export function matchThemeFromPrompt(prompt: string): RealmTheme {
  const lower = prompt.toLowerCase();
  if (/(dino|t-rex|triceratops|jurassic|fossil|prehistoric|raptor|stegosaurus)/.test(lower)) {
    return 'dinosaur';
  }
  if (/(space|star|planet|moon|rocket|astronaut|galaxy|comet|alien|mars|nebula)/.test(lower)) {
    return 'space';
  }
  if (/(forest|tree|fairy|fox|mushroom|wood|owl|elf|oak|enchanted|dragon|magic)/.test(lower)) {
    return 'forest';
  }
  if (/(water|ocean|sea|mermaid|fish|whale|dolphin|coral|turtle|submarine|pirate|island)/.test(lower)) {
    return 'underwater';
  }
  if (/(hero|cape|super|city|robot|gadget|rescue|sky|fly|power|knight|castle)/.test(lower)) {
    return 'superhero';
  }
  return 'custom';
}

function titleCaseSnippet(raw: string): string {
  const cleaned = raw
    .replace(/[^\w\s'-]/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 4)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  return cleaned || 'Wonderland';
}

export function createExampleWorld(
  prompt: string,
  preferredTheme?: RealmTheme,
  variant = 0
): DreamWorld {
  const detectedTheme =
    preferredTheme && preferredTheme !== 'custom'
      ? preferredTheme
      : matchThemeFromPrompt(prompt);

  if (detectedTheme !== 'custom') {
    const scenario = PRESET_SCENARIOS[detectedTheme];
    const isCustomIdea =
      prompt.trim().length > 0 &&
      !prompt.toLowerCase().includes(scenario.worldName.toLowerCase());
    const opening =
      variant % 2 === 1 ? scenario.alternateOpening : scenario.openingChapter;

    return {
      id: `world-${Date.now()}`,
      prompt: prompt.trim(),
      worldName: scenario.worldName,
      worldDescription: isCustomIdea
        ? `Inspired by "${prompt.trim()}" — ${scenario.worldDescription}`
        : scenario.worldDescription,
      settingVibe: scenario.settingVibe,
      theme: detectedTheme,
      source: 'example',
      characters: scenario.characters,
      chapters: [opening],
      storyMoral: scenario.storyMoral,
      createdAt: new Date().toISOString(),
    };
  }

  // Custom prompt in Example Mode: build an original Wonder-Island story honoring the child's exact prompt!
  const snippet = titleCaseSnippet(prompt);
  const customOpening: StoryChapter =
    variant % 2 === 1
      ? {
          chapterNumber: 1,
          title: `The Floating Lanterns of ${snippet}`,
          narrative: `High above cotton-candy clouds drifted the Floating Island of ${snippet}, where paper lanterns floated gently beside a cozy wooden treehouse. Today, a curious young turquoise dragon named Sparkle-Puff discovered a glowing crystal message bottle shimmering at the edge of the waterfall—inspired directly by "${prompt.trim()}"! With two loyal companions beside her, Sparkle-Puff unpacked her tiny explorer satchel to begin.`,
          illustrationTheme: 'custom',
          choices: [
            {
              id: 'custom-1-waterfall',
              label: 'Peek behind the sparkling crystal waterfall',
              consequenceHint: 'Discover a hidden rainbow workshop carved inside the mist.',
            },
            {
              id: 'custom-1-lantern',
              label: 'Follow the line of warm paper lanterns into the clouds',
              consequenceHint: 'Meet the sky-bakers who live on the neighboring floating island.',
            },
            {
              id: 'custom-1-treehouse',
              label: 'Climb the wooden treehouse spyglass deck',
              consequenceHint: 'Spot three friendly clues across the morning sky.',
            },
          ],
        }
      : {
          chapterNumber: 1,
          title: `Welcome to ${snippet} Island`,
          narrative: `In a sunlit corner of the sky floated a magical storybook island shaped around a single wonderful idea: "${prompt.trim()}". Morning light shimmered across crystal waterfalls while a cheerful little turquoise dragon named Pippin waved from the crooked wooden treehouse porch. Something exciting was twinkling down by the garden path, waiting for an explorer to choose the very first step!`,
          illustrationTheme: 'custom',
          choices: [
            {
              id: 'custom-1-waterfall',
              label: 'Follow the glowing crystals down the stepping-stone path',
              consequenceHint: 'See where the shimmering waterfall melody leads.',
            },
            {
              id: 'custom-1-lantern',
              label: 'Tie a wish ribbon onto a floating paper lantern',
              consequenceHint: 'Watch your wish guide new friends right to the treehouse.',
            },
            {
              id: 'custom-1-treehouse',
              label: 'Open the crooked wooden treehouse’s secret map drawer',
              consequenceHint: 'Uncover an ancient storybook riddle left by sky explorers.',
            },
          ],
        };

  return {
    id: `world-${Date.now()}`,
    prompt: prompt.trim(),
    worldName: `The Realm of ${snippet}`,
    worldDescription: `A bright floating storybook island brought to life from your idea: "${prompt.trim()}". Cozy oak treehouses, warm paper lanterns, and crystal waterfalls invite curious explorers to invent their own adventure.`,
    settingVibe: 'Golden morning clouds, lantern paths, and cozy treehouse magic',
    theme: 'custom',
    source: 'example',
    characters: [
      {
        id: 'cust-pippin',
        name: 'Pippin the Cloud Dragon',
        role: 'Island Greeter',
        personality: 'Playful, kind, and carries spare crayons inside his leather satchel',
        specialGift: 'Breathes tiny warm sparks that light paper lanterns without smoke',
        colorTone: 'teal',
      },
      {
        id: 'cust-clover',
        name: 'Clover the Sky Gardener',
        role: 'Lantern & Blossom Keeper',
        personality: 'Gentle, observant, and knows every flower’s favorite song',
        specialGift: 'Grows glowing moon-tulips that point toward friendly surprises',
        colorTone: 'emerald',
      },
      {
        id: 'cust-bramble',
        name: 'Barnaby Breeze',
        role: 'Treehouse Mapmaker',
        personality: 'Imaginative, cheerful, and loves folding paper airplanes',
        specialGift: 'Turns daydream doodles into real floating sky-bridges',
        colorTone: 'amber',
      },
    ],
    chapters: [customOpening],
    storyMoral: 'A single kind idea can grow into an entire world worth sharing.',
    createdAt: new Date().toISOString(),
  };
}

export function createExampleChapter(params: {
  world: DreamWorld;
  chosenLabel: string;
  choiceId?: string;
  regenerate?: boolean;
  targetChapterNumber: number;
}): StoryChapter {
  const { world, chosenLabel, choiceId, regenerate, targetChapterNumber } = params;
  const theme = world.theme;

  if (theme !== 'custom') {
    const scenario = PRESET_SCENARIOS[theme];
    if (targetChapterNumber === 2 && choiceId && scenario.branches[choiceId] && !regenerate) {
      const branch = scenario.branches[choiceId];
      return {
        chapterNumber: 2,
        title: branch.title,
        narrative: branch.narrative,
        chosenAction: chosenLabel,
        illustrationTheme: theme,
        choices: branch.choices,
      };
    }

    const pool = [
      ...Object.values(scenario.branches),
      ...scenario.continuationSteps,
    ];
    const index =
      (targetChapterNumber + (regenerate ? 1 : 0) + chosenLabel.length) % pool.length;
    const picked = pool[index];

    return {
      chapterNumber: targetChapterNumber,
      title: picked.title,
      narrative: `Choosing to "${chosenLabel}" led ${world.characters[0]?.name ?? 'our explorers'} into a bright new moment in ${world.worldName}! ${picked.narrative}`,
      chosenAction: chosenLabel,
      illustrationTheme: theme,
      choices: picked.choices,
    };
  }

  const hero = world.characters[0]?.name ?? 'Pippin';
  const partner = world.characters[1]?.name ?? 'Clover';
  const chapterVariations: BranchTemplate[] = [
    {
      title: `Across the Crystal Bridge`,
      narrative: `Deciding to "${chosenLabel}" filled the floating island with twinkling chimes! ${hero} and ${partner} stepped carefully across a glowing mist-bridge formed right over the crystal waterfall. Waiting on the grassy terrace were friendly cloud-bunnies carrying a painted wooden telescope, eager to show the explorers a brand-new surprise inspired by "${world.prompt}".`,
      choices: [
        {
          id: `ch${targetChapterNumber}-look`,
          label: 'Peer through the painted telescope toward the rainbow clouds',
          consequenceHint: 'Spot another floating island ready to explore.',
        },
        {
          id: `ch${targetChapterNumber}-picnic`,
          label: 'Share warm honey-cloud pastries with the cloud-bunnies',
          consequenceHint: 'Celebrate friendship beside the crystal waterfall.',
        },
        {
          id: `ch${targetChapterNumber}-build`,
          label: 'Use Barnaby’s paper wings to glide to the Golden Lantern Arch',
          consequenceHint: 'Catch a gentle sunset breeze above the valley.',
        },
      ],
    },
    {
      title: `The Treehouse Celebration`,
      narrative: `As soon as they chose to "${chosenLabel}", every paper lantern swaying from the oak branches glowed twice as warm! ${partner} plucked three musical blossoms that hummed in sweet harmony, while ${hero} opened the treehouse balcony doors so the whole sky could join in the celebration of ${world.worldName}.`,
      choices: [
        {
          id: `ch${targetChapterNumber}-song`,
          label: 'Compose a joyful island theme song with the humming blossoms',
          consequenceHint: 'Let music echo from cloud to cloud.',
        },
        {
          id: `ch${targetChapterNumber}-sketch`,
          label: 'Paint a keepsake mural of today’s journey on the porch',
          consequenceHint: 'Remember every wonderful friend you met.',
        },
        {
          id: `ch${targetChapterNumber}-star`,
          label: 'Watch the evening stars light up around the treehouse chimney',
          consequenceHint: 'Bring the story to a cozy, magical close.',
        },
      ],
    },
  ];

  const picked =
    chapterVariations[
      (targetChapterNumber + (regenerate ? 1 : 0)) % chapterVariations.length
    ];

  return {
    chapterNumber: targetChapterNumber,
    title: picked.title,
    narrative: picked.narrative,
    chosenAction: chosenLabel,
    illustrationTheme: 'custom',
    choices: picked.choices,
  };
}
