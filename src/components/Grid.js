class Riddle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}
	connectedCallback() {
		this.shadowRoot.appendChild(this.DOM.main());
		// this.shadowRoot.appendChild(document.createElement('slot'));
	}
	DOM = {
		main() {
			const result = document.createDocumentFragment();
			result.appendChild(this.header());
			result.appendChild(this.intro());
			return result;
		},
		header(title = '') {
			const result = document.createElement('header');
			const h1 = result.appendChild(document.createElement('h1'));
			h1.textContent = title;
			return result;
		},
		intro() {
			const result = document.createElement('section');
			result.classList.add('intro');
			return result;
		},
	};
	async loadXML(href) {
		if (!href) return;
		let response = await fetch(href);
		let text = await response.text();
		let parser = new DOMParser();
		let xml = parser.parseFromString(text, 'text/xml');
		return xml.documentElement;
	}
}
customElements.define('r-grid', Grid);