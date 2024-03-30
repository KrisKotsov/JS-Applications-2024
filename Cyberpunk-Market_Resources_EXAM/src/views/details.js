import { getUserData } from "../util.js";
import { html, render, page } from '../lib.js'
import { deleteItem, getItemById } from "../data/items.js";

const detailsTemplate = (data, hasUser, isOwner, onDelete) => html`
<section id="details">
  <div id="details-wrapper">
    <div>
      <img id="details-img" src=${data.imageUrl} alt="example1" />
      <p id="details-title">${data.item}</p>
    </div>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="details-price">${data.price}</p>
        <p class="details-availability">${data.availability}</p>
        <p class="type">${data.type}</p>
        <p id="item-description">${data.description}</p>
      </div>
      <!--Edit and Delete are only for creator-->
      ${hasUser ? html`
      <div id="action-buttons">
        ${isOwner ? html`
        <a href="/edit/${data._id}" id = "edit-btn" > Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : null}
      </div>` : null}
    </div>
  </div>
</section>`

export async function showDetails(ctx) {
    const id = ctx.params.id
    const item = await getItemById(id)

    const user = getUserData()
    const hasUser = !!user
    const isOwner = hasUser && user._id == item._ownerId

    render(detailsTemplate(item, hasUser, isOwner, onDelete))

    async function onDelete() {
        const choice = confirm("are you sure?")
        if (choice) {
            await deleteItem(id)
        }
        page.redirect('/catalog')
    }
}

