import { html, page, render } from "../lib.js";


const searchTemp=()=>html`<section id="search">

<div class="form">
  <h4>Search</h4>
  <form class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>
<h4 id="result-heading">Results:</h4>
  <div class="search-result">
 <h2 class="no-avaliable">No result.</h2>
  <!--If there are matches display a div with information about every motorcycle-->
 <div class="motorcycle">
  <img src="./images/Honda Hornet.png" alt="example1" />
  <h3 class="model">Honda Hornet</h3>
    <a class="details-btn" href="">More Info</a>
</div>
  </div>
        </section>`


export function showSearchView(ctx){
    render(searchTemp());
    }