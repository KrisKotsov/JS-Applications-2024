import { sellItem } from '../data/items.js'
import { html, render, page } from '../lib.js'
import { createSubmitHandler } from '../util.js'

const sellTemplate = (onSell) => html`
<section id="create">
  <div class="form form-item">
    <h2>Share Your item</h2>
    <form class="create-form" @submit=${onSell}>
      <input type="text" name="item" id="item" placeholder="Item" />
      <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" />
      <input type="text" name="price" id="price" placeholder="Price in Euro" />
      <input type="text" name="availability" id="availability" placeholder="Availability Information" />
      <input type="text" name="type" id="type" placeholder="Item Type" />
      <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50"></textarea>
      <button type="submit">Add</button>
    </form>
  </div>
</section>`

export function showSell() {
    render(sellTemplate(createSubmitHandler(onSell)))
}

async function onSell({ item, imageUrl, price, availability, type, description }) {
    if (!item || !imageUrl || !price || !availability || !type || !description) {
        return alert('All fields are required!')
    }

    await sellItem(item, imageUrl, price, availability, type, description)
    page.redirect('/catalog')
}