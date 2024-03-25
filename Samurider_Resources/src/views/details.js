import { deleteMotor, getMotorById } from "../data/motorcycles.js";
import { html, page, render } from "../lib.js";
import { getUserData } from "../util.js";

// // Action buttons template
// const actionButtonsTemplate = (isOwner, onDelete) => html`
//   <div id="action-buttons">
//     ${isOwner ? html`<a href="" id="edit-btn">Edit</a>` : ''}
//     ${isOwner ? html`<a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>` : ''}
//   </div>
// `;

// Details template including action buttons
const detailsTemplate = (data, hasUser, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${data.imageUrl} alt="example1" />
      <p id="details-title">${data.model}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="year">${data.year}</p>
          <p class="mileage">${data.mileage}</p>
          <p class="contact">Contact Number: ${data.contact}</p>
          <p id="motorcycle-description">${data.about}</p>
        </div>
        ${isOwner ? html`
                    <div id="action-buttons">
                        <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                        <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
                    </div>` : ''}
      </div>
    </div>
  </section>
`;

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const motor = await getMotorById(id);


    const user = getUserData();
    const hasUser = !!user;
    const isOwner = hasUser && user._id == motor._ownerId;
    render(detailsTemplate(motor, hasUser, isOwner,onDelete));

    async function onDelete(){
        const choice=confirm("Are you sure?");
        if(choice){
            await deleteMotor(id);
            page.redirect("/catalog");
        }
    }
}