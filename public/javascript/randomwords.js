var sentence = [
    'Brain - an organ of soft nervous tissue contained in the skull of vertebrates, functioning as the coordinating center of sensation and intellectual and nervous activity ; Intellectual Capacity',
    'Brave - ready to face and endure danger or pain; showing courage.',
    'Breathtaking - astonishing or awe-inspiring in quality, so as to take ones breath away',
    'Bravo - used to express approval when a performer or other person has done something well.',
    'Badass - a tough, uncompromising, or intimidating person.',
    'Ballsy - tough and courageous.',
    'Beautiful - pleasing the senses or mind aesthetically; of a very high standard; excellent.',
    'Beauty - a combination of qualities, such as shape, color, or form, that pleases the aesthetic senses, especially the sight.',
    'Befriend - act as a friend to (someone) by offering help or support.',
    'Begin - start; perform or undergo the first part of.',
    'Being - the nature or essence of a person.',
    'Believe - accept (something) as true; feel sure of the truth of.',
    'Belong - be a member or part of (a particular group, organization, or class).',
    'Beloved - a much loved person; dearly loved',
    'Benefit - an advantage or profit gained from something.',
    'Better - of a more excellent or effective type or quality.',
    'Beyond - the unknown, especially in references to life after death.',
    'Birth - the process of being being born or born again',
    'Bliss - perfect happiness; great joy.',
    'Blinding - very bright and likely to dazzle or temporarily blind someone.',
    'Blissful - extremely happy; full of joy.',
    'Bold - showing an ability to take risks; confident and courageous.',
    'Boast - talk with excessive pride and self-satisfaction about ones achievements, possessions, or abilities.',
    'Brass -a brave or foolhardy attitude; impudence.',
    'Brazen - bold and without shame.',
    'Brighter - giving out or reflecting a lot of light; shining; intelligent and quick-witted.',
    'Bulletproof - not subject to correction, alteration, or modification; invincible.',
    'Bewitching - enchanting or delightful.',
    'Balanced - taking everything into account; fairly judged or presented.',
    'Best - of the most excellent, effective, or desirable type or quality.',
    'Bitch - express displeasure; grumble; a female dog, wolf, fox, or otter.',
]

var randomDiv = document.getElementById("randomWord");

  function generate() {
    randomSentence = Math.ceil((Math.random() * sentence.length - 1));
    newText = sentence[randomSentence];
    randomDiv.innerHTML = newText;
  }

  generate();