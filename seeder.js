require('dotenv').config();
var seeder = require('mongoose-seed');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.jubm8.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Connect to MongoDB via Mongoose
seeder.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function() {

  // Load Mongoose models
  seeder.loadModels([
    'src/models/Breed.js',
  ]);

  // Clear specified collections
  seeder.clearModels(['Breed'], function() {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});

// Data array containing seed data - documents organized by Model
var data = [
  {
    'model': 'Breed',
    'documents': [
      {
        "name": "Abyssinian",
        "description": "The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.",
        "temperament": "Active, Energetic, Independent, Intelligent, Gentle",
        "origin": "Egypt",
        "lifeSpan": "14 - 15",
        "metaData": {
          "adaptability": 5,
          "affectionLevel": 5,
          "childFriendly": 3,
          "intelligence": 5,
          "grooming": 1,
          "healthIssues": 2,
          "socialNeeds": 5,
          "strangerFriendly": 5
        }
      },
      {
        "name": "Balinese",
        "description": "Balinese are curious, outgoing, intelligent cats with excellent communication skills. They are known for their chatty personalities and are always eager to tell you their views on life, love, and what you’ve served them for dinner.",
        "temperament": "Affectionate, Intelligent, Playful",
        "origin": "United States",
        "lifeSpan": "10 - 15",
        "metaData": {
          "adaptability": 5,
          "affectionLevel": 5,
          "childFriendly": 4,
          "intelligence": 5,
          "grooming": 3,
          "healthIssues": 3,
          "socialNeeds": 5,
          "strangerFriendly": 5
        }
      },
      {
        "name": "Bengal",
        "description": "Bengals are a lot of fun to live with, but they're definitely not the cat for everyone, or for first-time cat owners. Extremely intelligent, curious and active, they demand a lot of interaction and woe betide the owner who doesn't provide it.",
        "temperament": "Alert, Agile, Energetic, Demanding, Intelligent",
        "origin": "United States",
        "lifeSpan": "12 - 15",
        "metaData": {
          "adaptability": 5,
          "affectionLevel": 5,
          "childFriendly": 4,
          "intelligence": 5,
          "grooming": 1,
          "healthIssues": 3,
          "socialNeeds": 5,
          "strangerFriendly": 3
        }
      },
      {
        "name": "Chartreux",
        "description": "The Chartreux is generally silent but communicative. Short play sessions, mixed with naps and meals are their perfect day. Whilst appreciating any attention you give them, they are not demanding, content instead to follow you around devotedly, sleep on your bed and snuggle with you if you’re not feeling well.",
        "temperament": "Affectionate, Loyal, Intelligent, Social, Lively, Playful",
        "origin": "France",
        "lifeSpan": "12 - 15",
        "metaData": {
          "adaptability": 5,
          "affectionLevel": 5,
          "childFriendly": 4,
          "intelligence": 5,
          "grooming": 1,
          "healthIssues": 2,
          "socialNeeds": 5,
          "strangerFriendly": 5
        }
      },
      {
        "name": "Chausie",
        "description": "For those owners who desire a feline capable of evoking the great outdoors, the strikingly beautiful Chausie retains a bit of the wild in its appearance but has the house manners of our friendly, familiar moggies. Very playful, this cat needs a large amount of space to be able to fully embrace its hunting instincts.",
        "temperament": "Affectionate, Intelligent, Playful, Social",
        "origin": "Egypt",
        "lifeSpan": "12 - 14",
        "metaData": {
          "adaptability": 5,
          "affectionLevel": 5,
          "childFriendly": 4,
          "intelligence": 5,
          "grooming": 3,
          "healthIssues": 1,
          "socialNeeds": 3,
          "strangerFriendly": 4
        }
      },
      {
        "name": "Donskoy",
        "description": "Donskoy are affectionate, intelligent, and easy-going. They demand lots of attention and interaction. The Donskoy also gets along well with other pets. It is now thought the same gene that causes degrees of hairlessness in the Donskoy also causes alterations in cat personality, making them calmer the less hair they have.",
        "temperament": "Playful, affectionate, loyal, social",
        "origin": "Russia",
        "lifeSpan": "12 - 15",
        "metaData": {
          "adaptability": 4,
          "affectionLevel": 4,
          "childFriendly": 3,
          "intelligence": 3,
          "grooming": 2,
          "healthIssues": 3,
          "socialNeeds": 5,
          "strangerFriendly": 5
        }
      },
      {
        "name": "Himalayan",
        "description": "Calm and devoted, Himalayans make excellent companions, though they prefer a quieter home. They are playful in a sedate kind of way and enjoy having an assortment of toys. The Himalayan will stretch out next to you, sleep in your bed and even sit on your lap when she is in the mood.",
        "temperament": "Dependent, Gentle, Intelligent, Quiet, Social",
        "origin": "United States",
        "lifeSpan": "9 - 15",
        "metaData": {
          "adaptability": 5,
          "affectionLevel": 5,
          "childFriendly": 2,
          "intelligence": 3,
          "grooming": 5,
          "healthIssues": 3,
          "socialNeeds": 4,
          "strangerFriendly": 2
        }
      },
      {
        "name": "Javanese",
        "description": "Javanese are endlessly interested, intelligent and active. They tend to enjoy jumping to great heights, playing with fishing pole-type or other interactive toys and just generally investigating their surroundings. He will attempt to copy things you do, such as opening doors or drawers.",
        "temperament": "Active, Devoted, Intelligent, Playful",
        "origin": "United States",
        "lifeSpan": "10 - 12",
        "metaData": {
          "adaptability": 4,
          "affectionLevel": 5,
          "childFriendly": 4,
          "intelligence": 5,
          "grooming": 1,
          "healthIssues": 3,
          "socialNeeds": 5,
          "strangerFriendly": 3
        }
      },
      {
        "name": "Korat",
        "description": "The Korat is a natural breed, and one of the oldest stable cat breeds. They are highly intelligent and confident cats that can be fearless, although they are startled by loud sounds and sudden movements. Korats form strong bonds with their people and like to cuddle and stay nearby.",
        "temperament": "Active, Loyal, highly intelligent, Expressive, Trainable",
        "origin": "Thailand",
        "lifeSpan": "10 - 15",
        "metaData": {
          "adaptability": 5,
          "affectionLevel": 5,
          "childFriendly": 4,
          "intelligence": 5,
          "grooming": 1,
          "healthIssues": 1,
          "socialNeeds": 5,
          "strangerFriendly": 2
        }
      },
      {
        "name": "Kurilian",
        "description": "The character of the Kurilian Bobtail is independent, highly intelligent, clever, inquisitive, sociable, playful, trainable, absent of aggression and very gentle. They are devoted to their humans and when allowed are either on the lap of or sleeping in bed with their owners.",
        "temperament": "Independent, highly intelligent, clever, inquisitive, sociable, playful, trainable",
        "origin": "Russia",
        "lifeSpan": "15 - 20",
        "metaData": {
          "adaptability": 5,
          "affectionLevel": 5,
          "childFriendly": 5,
          "intelligence": 5,
          "grooming": 1,
          "healthIssues": 1,
          "socialNeeds": 5,
          "strangerFriendly": 5
        }
      },
    ],
  },
];
