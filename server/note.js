export default class Note {
	constructor(id, title, content, modified = Date.now(), created = Date.now()) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.modified = modified;
		this.created = created;
	}
}
