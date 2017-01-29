/**
 * EventEmitter (copied from https://gist.github.com/mudge/5830382)
 * @constructor
 */
function EventEmitter() {
    this.events = {}
}

EventEmitter.prototype.on = function on(event, listener) {
    if (typeof this.events[event] !== 'object') {
        this.events[event] = []
    }

    this.events[event].push(listener)

    return this
}

EventEmitter.prototype.removeListener = function removeListener(event, listener) {
    var idx

    if (typeof this.events[event] === 'object') {
        idx = indexOf(this.events[event], listener)

        if (idx > -1) {
            this.events[event].splice(idx, 1)
        }
    }

    return this
}

EventEmitter.prototype.emit = function emit(event) {
    var i, listeners, length, args = [].slice.call(arguments, 1)

    if (typeof this.events[event] === 'object') {
        listeners = this.events[event].slice()
        length = listeners.length

        for (i = 0; i < length; i++) {
            listeners[i].apply(this, args)
        }
    }

    return this
}

EventEmitter.prototype.once = function once(event, listener) {
    this.on(event, function g () {
        this.removeListener(event, g)
        listener.apply(this, arguments)
    })

    return this
}

/**
 * Component
 * @constructor
 */
function Component() {
    EventEmitter.call(this)

}
Component.prototype = Object.create(EventEmitter.prototype)
Component.prototype.constructor = Component

Component.prototype.clean = function clean() {
    if (this.$el) {
        this.$el.empty()
        this.$el.off()
    }
}

Component.init = function init() {
    function construct(constructor, args) {
        function F() {
            return constructor.apply(this, args)
        }
        F.prototype = constructor.prototype
        return new F()
    }

    return construct(this.prototype.constructor, arguments)
}

/**
 * Book
 * @param $frame
 * @param store
 * @constructor
 */
function Book($frame, store) {
    this.$charactersListFrame = $('<div id="CharactersList" />').appendTo($frame)
    this.$singleCharacterFrame = $('<div id="SingleCharacter" />').appendTo($frame)

    this.store = store

    this.initCharactersList()
}
Book.init = Component.init
Book.prototype = Object.create(Component.prototype)
Book.prototype.constructor = Book

Book.prototype.initCharactersList = function initCharactersList() {
    var _this = this

    this.charactersList = CharactersList.init()
    this.charactersList.on('CharactersList:singleCharacterSelect', this.handleSingleCharacterSelect.bind(this))

    this.store.getCharacters()
        .then(function(characters) {
            return _this.charactersList
                .setCharacters(characters)
                .selectFirstCharacter()
                .render()
                .$el
        })
        .then(function($charactersList) {
            _this.renderCharactersList($charactersList)
        })
        .catch(function(error) {
            // Some some popup with error
            console.error(error)
        })
}

Book.prototype.initSingleCharacter = function initSingleCharacter(character) {
    var $el = SingleCharacter
        .init(character)
        .on('SingleCharacter:update', this.handleUpdate.bind(this))
        .render()
        .$el

    this.renderSingleCharacter($el)
}

Book.prototype.handleSingleCharacterSelect = function handleSingleCharacterSelect(characterId) {
    var _this = this

    this.selectedCharacterId = characterId

    this.store.getCharacterDetails(characterId)
        .then(function(character) {
            // ES6 Promises does not support canceling
            // that's why we need manually provide simple canceling functionality
            if (_this.selectedCharacterId === character.id) {
                _this.initSingleCharacter(character)
            }
        })
        .catch(function(error) {
            // Some some popup with error
            console.error(error)
        })
}

Book.prototype.handleUpdate = function handleSave(character) {
    var _this = this

    _this.charactersList
        .replaceCharacter(character)
        .render()

    this.store.updateCharacter(character)
        .catch(function (error) {
            // Some some popup with error
            console.error(error)
        })
}

Book.prototype.renderSingleCharacter = function renderSingleCharacter($character) {
    this.$singleCharacterFrame.empty()
    this.$singleCharacterFrame.append($character)

}

Book.prototype.renderCharactersList = function renderCharactersList($charactersList) {
    this.$charactersListFrame.empty()
    this.$charactersListFrame.append($charactersList)
}

/**
 * CharactersList
 * @param characters
 * @constructor
 */
function CharactersList() {
    Component.apply(this)
    this.$el = $('<section class="list" />')

    this.characters = []
    this.selectedCharacterId = null
}
CharactersList.init = Component.init
CharactersList.prototype = Object.create(Component.prototype)
CharactersList.prototype.constructor = CharactersList

CharactersList.prototype.render = function render() {
    this.clean()

    this.$el
        .append(this.characters.map(this.renderSingleCharacter.bind(this, this.selectedCharacterId)))

    return this
}

CharactersList.prototype.renderSingleCharacter = function renderSingleCharacter(selectedCharacterId, character) {
    var $el = $(this.renderSingleCharacterHtml(selectedCharacterId, character))

    this.singleCharacterDomEvents(character)
        .forEach(function (events) {
            $el.on.apply($el, events)
        })

    return $el
}

CharactersList.prototype.renderSingleCharacterHtml = function renderSingleCharacterHtml(selectedCharacterId, character) {
    var linkClass = character.id === selectedCharacterId ? 'item item-selected' : 'item'

    return '<a class="' + linkClass + '">' +
               '<h2 class="name">' + character.name + '</h2>' +
               '<p class="species">' + character.species + '</p>' +
           '</a>'
}

CharactersList.prototype.singleCharacterDomEvents = function singleCharacterDomEvents(character) {
    return [
        ['click', this.emitSingleCharacterSelect.bind(this, character.id)]
    ]
}

CharactersList.prototype.emitSingleCharacterSelect = function emitSingleCharacterSelect(characterId) {
    this.selectedCharacterId = characterId

    this.emit('CharactersList:singleCharacterSelect', characterId)

    this.render()
}

CharactersList.prototype.selectFirstCharacter = function selectFirstCharacter() {
    this.selectCharacter(this.characters[0])

    return this
}

CharactersList.prototype.selectCharacter = function selectCharacter(character) {
    if (character) {
        this.emitSingleCharacterSelect(character.id)
    }

    return this
}

CharactersList.prototype.setCharacters = function setCharacters(characters) {
    function sortByName(a, b) {
        return a.name > b.name
    }

    this.characters = characters.sort(sortByName)

    return this
}

CharactersList.prototype.replaceCharacter = function replaceCharacter(character) {
    var characters = this.characters
        .filter(function (c) { return c.id !== character.id })
        .concat(character)

    this.setCharacters(characters)

    return this
}

/**
 * SingleCharacter
 * @param character
 * @constructor
 */
function SingleCharacter(character) {
    Component.apply(this)

    this.$el = $('<div/>')
    this.editMode = false

    this.showSingleCharacter = new ShowSingleCharacter(character)
    this.showSingleCharacter.on('ShowSingleCharacter:edit', this.handleToggleEdit.bind(this))

    this.editSingleCharacter = new EditSingleCharacter(character)
    this.editSingleCharacter.on('EditSingleCharacter:cancel', this.handleToggleEdit.bind(this))
    this.editSingleCharacter.on('EditSingleCharacter:update', this.handleUpdate.bind(this))

}
SingleCharacter.init = Component.init
SingleCharacter.prototype = Object.create(Component.prototype)
SingleCharacter.prototype.constructor = SingleCharacter

SingleCharacter.prototype.render = function render() {
    this.clean();

    this.$el.append(this.editMode ?
        this.renderEditCharactersList() : this.renderShowSingleCharacter())

    return this
}

SingleCharacter.prototype.handleToggleEdit = function handleToggleEdit() {
    this.editMode = !this.editMode
    this.render()
}

SingleCharacter.prototype.handleUpdate = function handleUpdate(character) {
    this.emitUpdate(character)

    this.showSingleCharacter.setCharacter(character)

    this.handleToggleEdit();
}

SingleCharacter.prototype.emitUpdate = function emitSave(newCustomer) {
    this.emit('SingleCharacter:update', newCustomer)
}

SingleCharacter.prototype.renderShowSingleCharacter = function renderShowSingleCharacter() {
   return this.showSingleCharacter.render().$el

}

SingleCharacter.prototype.renderEditCharactersList = function renderEditCharactersList() {
    return this.editSingleCharacter.render().$el

}

/**
 * ShowSingleCharacter
 * @param character
 * @constructor
 */
function ShowSingleCharacter(character) {
    Component.call(this)

    this.$el = $('<section class="details" >')

    this.character = character
}
ShowSingleCharacter.init = Component.init
ShowSingleCharacter.prototype = Object.create(Component.prototype)
ShowSingleCharacter.prototype.constructor = EditSingleCharacter

ShowSingleCharacter.prototype.render = function render() {
    this.renderCharacter(this.character)

    return this
}

ShowSingleCharacter.prototype.renderCharacter = function renderCharacter(character) {
    var _this = this
    this.clean()

    this.$el.append(this.renderCharacterHtml(character))

    this.characterDomEvents(character)
        .forEach(function (events) {
            _this.$el.on.apply(_this.$el, events)
        })

    return this
}

ShowSingleCharacter.prototype.renderCharacterHtml = function renderCharacterHtml(character) {
    return  [
        '<img src="' + character.picture + '" alt="' + character.name +'" width="100" height="100">',
        '<h1 class="name">' + character.name + '</h1>',
        '<span class="species">' + character.species + '</span>',
        '<p class="description">' + character.description +'</p>',
        '<button type="button" id="editCharacter" class="edit">Edit</button>',
        '</section>'
    ]
}

ShowSingleCharacter.prototype.characterDomEvents = function characterDomEvents(character) {
    return [
        ['click', '#editCharacter', this.emitSingleCharacterEdit.bind(this, character.id)]
    ]
}

ShowSingleCharacter.prototype.emitSingleCharacterEdit = function emitSingleCharacterEdit(characterId) {
    this.emit('ShowSingleCharacter:edit', characterId)
}

ShowSingleCharacter.prototype.setCharacter = function setCharacter(character) {
    this.character = character

    return this;
}

/**
 * EditSingleCharacter
 * @param character
 * @constructor
 */
function EditSingleCharacter(character) {
    Component.call(this)
    this.$el = $('<form />')

    this.character = character
}
EditSingleCharacter.init = Component.init
EditSingleCharacter.prototype = Object.create(Component.prototype)
EditSingleCharacter.prototype.constructor = EditSingleCharacter

EditSingleCharacter.prototype.render = function render() {
    this.clean()

    this.$el
        .append(this.renderCharacter(this.character))

    return this
}

EditSingleCharacter.prototype.renderCharacter = function renderCharacter(character) {
    var $el = $(this.renderCharacterHtml(character))

    this.characterDomEvents(character).forEach(function (events) {
        $el.on.apply($el, events)
    })

    return $el
}

EditSingleCharacter.prototype.characterDomEvents = function characterDomEvents(character) {
    return [
        ['click', '#cancelCharacter', this.emitSingleCharacterEditCancel.bind(this)],
        ['click', '#saveCharacter', this.emitSingleCharacterUpdate.bind(this)]
    ]
}

EditSingleCharacter.prototype.emitSingleCharacterEditCancel = function emitSingleCharacterEditCancel() {
    this.emit('EditSingleCharacter:cancel')
}

EditSingleCharacter.prototype.emitSingleCharacterUpdate = function emitSingleCharacterEditCancel() {
    var updatedCharacter = this.$el
        .serializeArray()
        .reduce(function (p, c) {
            p[c.name] = c.value
            return p
        }, {})

    this.character = {
        id: Number(updatedCharacter.id),
        picture: updatedCharacter.picture,
        description: updatedCharacter.description,
        name: updatedCharacter.name,
        species: updatedCharacter.species
    }

    this.emit('EditSingleCharacter:update', this.character)
}

EditSingleCharacter.prototype.renderCharacterHtml = function renderCharacterHtml(character) {
    return '<section class="editor" >' +
               '<img src="' + character.picture + '" alt="' + character.name +'" width="100" height="100">' +
               '<input type="text" name="name" value="'+ character.name +'"/>' +
               '<input type="text" name="species" value="'+ character.species +'"/>' +
               '<textarea name="description">' + character.description +'</textarea>' +
               '<input type="hidden" name="id" value="'+ character.id +'"/>' +
               '<input type="hidden" name="picture" value="'+ character.picture +'"/>' +
               '<button type="button" id="saveCharacter" class="save">Save</button>' +
               '<button type="button" id="cancelCharacter" class="cancel">Cancel</button>' +
           '</section>'
}
