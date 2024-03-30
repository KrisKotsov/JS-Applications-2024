import { deleteCar, getCarById } from "../data/cars.js";
import { html, render, page } from '../lib.js';
import { getUserData } from "../util.js";

const detailsTemplate = (data, hasUser, isOwner, onDelete) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${data.imageUrl}" alt="example1" />
        <p id="details-title">${data.model}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p class="price">${data.price}</p>
                <p class="weight">${data.weight}</p>
                <p class="top-speed">${data.speed}</p>
                <p id="car-description">${data.about}</p>
            </div>
            <!--Edit and Delete are only for creator-->
            ${hasUser ? html`
            <div id="action-buttons">
                ${isOwner ? html`
                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : null}
            </div>` : null}
        </div>
    </div>
</section>`

export async function showDetails(ctx) {
    const id = ctx.params.id
    const car = await getCarById(id)

    const user = getUserData()
    const hasUser = !!user
    const isOwner = hasUser && user._id == car._ownerId

    render(detailsTemplate(car, hasUser, isOwner, onDelete))

    async function onDelete() {
        const choice = confirm("are you sure?")
        if (choice) {
            await deleteCar(id)
        }
        page.redirect('/catalog')
    }
}
