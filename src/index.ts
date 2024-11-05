
class ColorScheme extends HTMLElement {
  #storageKeyName = 'colorScheme'
  constructor () {
    super()
  }
  connectedCallback () {
    const colorScheme = localStorage.getItem(this.#storageKeyName)
    if (colorScheme) {
      this.#setHtmlMetaElement(colorScheme)
    }
    const htmlSelectElement = document.createElement('select')
    const options = [
      {
        value: 'light dark',
        label: 'Follow System Settings',
        selected: !colorScheme,
      },
      {
        value: 'light',
        label: 'Always Light',
        selected: (colorScheme === 'light'),
      },
      {
        value: 'dark',
        label: 'Always Dark',
        selected: (colorScheme === 'dark'),
      },
    ]
    options.forEach((option) => {
      const htmlOptionElement = document.createElement('option')
      htmlOptionElement.setAttribute('value', option.value)
      htmlOptionElement.setAttribute('label', option.label)
      if (option.selected) {
        htmlOptionElement.setAttribute('selected', '')
      }
      htmlSelectElement.appendChild(htmlOptionElement)
    })
    this.appendChild(htmlSelectElement)
    htmlSelectElement.addEventListener('change', (event) => {
      if (!(event.target instanceof HTMLSelectElement)) {
        return
      }
      this.#setHtmlMetaElement(event.target.value)
      if (event.target.value === 'light dark') {
        localStorage.removeItem(this.#storageKeyName)
      } else {
        localStorage.setItem(this.#storageKeyName, event.target.value)
      }
    })
  }
  #setHtmlMetaElement (colorScheme: string) {
    const htmlMetaElement = document.querySelector('meta[name="color-scheme"]')
    if (htmlMetaElement) {
      htmlMetaElement.setAttribute('content', colorScheme)
    } else {
      const htmlMetaElement = document.createElement('meta')
      htmlMetaElement.setAttribute('name', 'color-scheme')
      htmlMetaElement.setAttribute('content', colorScheme)
      document.head.appendChild(htmlMetaElement)
    }
  }
}

customElements.define('color-scheme', ColorScheme)
