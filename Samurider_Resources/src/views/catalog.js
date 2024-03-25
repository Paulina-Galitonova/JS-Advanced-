import { html, render } from "../lib.js";
import { getAllMotors } from "../data/motorcycles.js";


const catalogTempltate = (motorcycle) => html`
 <h2>Available Motorcycles</h2>
 <section id="dashboard">
 ${motorcycle.length ? motorcycle.map(motorTemplate) : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}
  </section>
`;

const motorTemplate=(motorcycle)=> html`
<<div class="motorcycle">
            <img src=${motorcycle.imageUrl} alt="example1" />
            <h3 class="model">${motorcycle.model}</h3>
            <p class="year">${motorcycle.year}</p>
            <p class="mileage">${motorcycle.mileage}</p>
            <p class="contact">Contact Number: ${motorcycle.contact}</p>
            <a class="details-btn" href="/catalog/${motorcycle._id}">More Info</a>
          </div>
`;

export async function showCatalog(ctx) {
  const motorcycle = await getAllMotors();
  render(catalogTempltate(motorcycle));
}