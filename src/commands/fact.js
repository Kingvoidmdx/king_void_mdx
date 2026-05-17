const facts = [
  "*_Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs that was still edible!_*",
  "*_A group of flamingos is called a 'flamboyance'._*",
  "*_Octopuses have three hearts._*",
  "*_Bananas are berries, but strawberries aren't._*",
  "*_The Eiffel Tower can be 15 cm taller during summer due to thermal expansion._*",
];

module.exports = {
  name: 'fact',
  description: 'Get a random fact',
  category: 'fun',
  execute: async () => {
    const f = facts[Math.floor(Math.random() * facts.length)];
    return { success: true, message: `*_🧠 RANDOM FACT_*\n\n${f}` };
  }
};
