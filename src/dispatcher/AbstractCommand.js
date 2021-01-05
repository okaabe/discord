class AbstractCommand {
    constructor(name, options) {
        this.name = name;
        this.aliases = options.aliases || [];
        this.examples = options.examples || [];
        this.description = options.description;
        this.permissions = ['SEND_MESSAGES', 'EMBED_LINKS'];

        if (options.permissions) {
            this.permissions.push(...options.permissions);
        }
    }

    run() {
        throw new Error(`${this.constructor.name} doesn't have a name`);
    }
}

module.exports = AbstractCommand;
