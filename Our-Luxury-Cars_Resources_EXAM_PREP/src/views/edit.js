import { updateCar, getCarById } from "../data/cars.js";
import { html, render, page } from '../lib.js';
import { createSubmitHandler } from "../util.js";

const editTemplate = (car, onEdit) => html`
<section id="edit">
    <div class="form form-auto">
        <h2>Edit Your Car</h2>
        <form class="edit-form" @submit=${onEdit}> 
            <input type="text" name="model" id="model" placeholder="Model" .value=${car.model}/>
            <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" .value=${car.imageUrl}/>
            <input type="text" name="price" id="price" placeholder="Price in Euro" .value=${car.price}/>
            <input type="number" name="weight" id="weight" placeholder="Weight in Kg" .value=${car.weight}/>
            <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" .value=${car.speed}/>
            <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50" .value=${car.about}></textarea> 
            <button type="submit">Edit</button>
        </form>
    </div>
</section>`


export async function showEdit(ctx) {
    const id = ctx.params.id
    const car = await getCarById(id)
    render(editTemplate(car, createSubmitHandler(onEdit)))

    async function onEdit({
        model,
        imageUrl,
        price,
        weight,
        speed,
        about
    }
        , form) {
        if (!model || !imageUrl || !price || !weight || !speed || !about) {
            return alert('All fields are required!')
        }

        await updateCar(id, { model, imageUrl, price, weight, speed, about })
        page.redirect('/catalog/' + id)
    }
}