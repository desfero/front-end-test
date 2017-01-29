// (c) BaseCase 2016


window.Store = {
  create: function() {
    var self = {};

    var props = {
      name: 'string',
      species: 'string',
      picture: 'string',
      description: 'string'
    };

    var listProps = ['name', 'species'];
    var detailProps = ['name', 'species', 'picture', 'description'];

    var characters = [
      {
        id: makeID(),
        name: 'Chewbacca',
        species: 'Wookie',
        picture: 'store/img/chewbacca.png',
        description: 'A legendary Wookiee warrior and Han Solo’s co-pilot aboard the Millennium Falcon, Chewbacca was part of a core group of Rebels who restored freedom to the galaxy. Known for his short temper and accuracy with a bowcaster, Chewie also has a big heart -- and is unwavering in his loyalty to his friends. He has stuck with Han through years of turmoil that have changed both the galaxy and their lives.',
        _delay: 500
      },
      {
        id: makeID(),
        name: 'BB-8',
        species: 'Droid',
        picture: 'store/img/bb8.png',
        description: 'A skittish but loyal astromech, BB-8 accompanied Poe Dameron on many missions for the Resistance, helping keep his X-wing in working order. When Poe’s mission to Jakku ended with his capture by the First Order, BB-8 fled into the desert with a vital clue to the location of Jedi Master Luke Skywalker.',
        _delay: 500
      },
      {
        id: makeID(),
        name: 'Darth Vader',
        species: 'Cyborg',
        picture: 'store/img/vader.png',
        description: 'Once a heroic Jedi Knight, Darth Vader was seduced by the dark side of the Force, became a Sith Lord, and led the Empire’s eradication of the Jedi Order. He remained in service of the Emperor -- the evil Darth Sidious -- for decades, enforcing his Master’s will and seeking to crush the fledgling Rebel Alliance. But there was still good in him…',
        //episodes: [3, 4, 5, 6],
        _delay: 500
      },
      {
        id: makeID(),
        name: 'Darth Bane',
        species: 'Human',
        picture: '',
        description: 'An ancient and legendary Sith Lord, it was Darth Bane who saw that the Sith traditions of old were ultimately a dead end. All too often, squabbling Sith in their bid for power upended carefully laid plans. After the Sith were decimated by the Jedi Knights of a thousand years ago, Bane enacted the Sith rule of two: there would be only two active Sith at one time -- a Dark Lord to embody the power, and an apprentice to crave it. These Sith would operate in the shadows, favoring guile and conspiracy to bring down their opponents rather than brute force -- that is, until it was time to rise and subjugate the galaxy.',
        episodes: [],
        _delay: 2000
      },
      {
        id: makeID(),
        name: 'R2-D2',
        species: 'Droid',
        picture: 'store/img/r2d2.png',
        description: 'A resourceful astromech droid, R2-D2 served Padmé Amidala, Anakin Skywalker and Luke Skywalker in turn, showing great bravery in rescuing his masters and their friends from many perils. A skilled starship mechanic and fighter pilot\'s assistant, he formed an unlikely but enduring friendship with the fussy protocol droid C-3PO.',
        _delay: 500
      },
      {
        id: makeID(),
        name: 'Yoda',
        species: 'Triclorophite',
        picture: 'store/img/yoda.png',
        description: 'Yoda was a legendary Jedi Master and stronger than most in his connection with the Force. Small in size but wise and powerful, he trained Jedi for over 800 years, playing integral roles in the Clone Wars, the instruction of Luke Skywalker, and unlocking the path to immortality.',
        _delay: 500
      },
      {
        id: makeID(),
        name: 'Luke Skywalker',
        species: 'Human',
        picture: 'store/img/luke.png',
        description: 'Luke Skywalker was a Tatooine farmboy who rose from humble beginnings to become one of the greatest Jedi the galaxy has ever known. Along with his friends Princess Leia and Han Solo, Luke battled the evil Empire, discovered the truth of his parentage, and ended the tyranny of the Sith. A generation later, the location of the famed Jedi master was one of the galaxy’s greatest mysteries.',
        _delay: 500
      },
      {
        id: makeID(),
        name: 'Darth Sidious',
        species: 'Human',
        picture: 'store/img/palpatine.png',
        description: 'Scheming, powerful, and evil to the core, Darth Sidious restored the Sith and destroyed the Jedi Order. Living a double life, Sidious was in fact Palpatine, a Naboo Senator and phantom menace. He slowly manipulated the political system of the Galactic Republic until he was named Supreme Chancellor -- and eventually Emperor -- ruling the galaxy through fear and tyranny.',
        //episodes: [1, 2, 3, 5, 6],
        _delay: 500
      },
      {
        id: makeID(),
        name: 'Leia Organa',
        species: 'Human',
        picture: 'store/img/leia.png',
        description: 'Princess Leia Organa was one of the Rebel Alliance’s greatest leaders, fearless on the battlefield and dedicated to ending the tyranny of the Empire. Daughter of Padmé Amidala and Anakin Skywalker, sister of Luke Skywalker, and with a soft spot for scoundrels, Leia ranks among the galaxy’s great heroes. But life under the New Republic has not been easy for Leia. Sidelined by a new generation of political leaders, and struck out on her own to oppose the First Order as founder of the Resistance. These setbacks in her political career have been accompanied by more personal losses.',
        _delay: 500
      },
      {
        id: makeID(),
        name: 'Boba Fett',
        species: 'Human',
        picture: 'store/img/boba-fett.png',
        description: 'With his customized Mandalorian armor, deadly weaponry, and silent demeanor, Boba Fett was one of the most feared bounty hunters in the galaxy. A genetic clone of his “father,” bounty hunter Jango Fett, Boba learned combat and martial skills from a young age. Over the course of his career, which included contracts for the Empire and the criminal underworld, he became a legend.',
        _delay: 500
      }
    ];


    // Utilities

    function makeID() {
      makeID.__cnt = (makeID.__cnt || 0) + 1;
      return makeID.__cnt;
    }

    function delay(ms) {
      return new Promise(function(resolve, reject) {
        setTimeout(resolve, ms);
      });
    }


    // Assertions

    function assert(b, message) {
      if (!b) {
        throw new Error(message);
      }
    }
    function assertType(type, v, message) {
      assert(typeof v === type, message);
    }
    function assertUndefined(v, message) {
      assert(typeof v === 'undefined', message);
    }
    function assertObject(v, message) {
      assert(typeof v === 'object', message);
    }
    function assertNumber(v, message) {
      assert(typeof v === 'number', message);
    }
    function assertCharacter(character) {
      assertObject(character, 'Invalid character object');
      Object.keys(props).forEach(function(prop) {
        assertType(props[prop], character[prop], 'Invalid ' + prop);
        if (prop === 'name') {
          assert(character[prop].trim() !== '', 'Name must not be empty');
        }
      });
    }
    function assertCreateCharacter(character) {
      assertCharacter(character);
      assertUndefined(character.id, 'The character already has an ID');
    }
    function assertUpdateCharacter(character) {
      assertCharacter(character);
      assertNumber(character.id, 'Invalid character ID');
    }


    // Datastore

    function copyObject(o, keys) {
      var copy = {};
      var properties = keys || Object.keys(o);
      properties.forEach(function(prop) {
        copy[prop] = o[prop];
      });
      return copy;
    }

    function getCharacterIndex(id) {
      for (var i=0; i<characters.length; i++) {
        if (characters[i].id === id) {
          return i;
        }
      }
      return -1;
    }

    function findCharacter(id) {
      for (var i=0; i<characters.length; i++) {
        if (characters[i].id === id) {
          return characters[i];
        }
      }
    }


    // Public API


    self.getCharacters = function() {
      return delay(1000).then(function() {
        return characters.map(function(character) {
          var _character = copyObject(character, listProps);
          _character.id = character.id;
          return _character;
        });
      });
    }


    self.getCharacterDetails = function(id) {
      var character = findCharacter(id);
      if (character === undefined) {
        return delay(1000).then(function() {
          throw new Error('Character not found');
        });
      }
      return delay(character._delay).then(function() {
        var _character = copyObject(character);
        delete _character._delay;
        return _character;
      });
    }


    self.createCharacter = function(character) {
      return delay(1000).then(function() {
        assertCreateCharacter(character);
        var _character = {};
        _character.id = makeID();
        Object.keys(props).forEach(function(prop) {
          _character[prop] = character[prop];
        });
        _character._delay = 200;
        characters.push(_character);
        return character.id;
      });
    }


    self.updateCharacter = function(character) {
      return delay(1000).then(function() {
        assertUpdateCharacter(character);
        var _character = findCharacter(character.id);
        if (_character === undefined) {
          throw new Error('Character not found');
        }
        Object.keys(props).forEach(function(prop) {
          _character[prop] = character[prop];
        });
      });
    }


    self.deleteCharacter = function(id) {
      return delay(1000).then(function() {
        var index = getCharacterIndex(id);
        if (index === -1) {
          throw new Error('Character not found');
        }
        characters.splice(index, 1);
      });
    }


    return self;
  }
};