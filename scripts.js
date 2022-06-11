const flagButtons = document.querySelectorAll('[data-button="flag"]');
const resultsSection = document.querySelector('#results');

document.addEventListener('click', handleClick);

function handleClick({ target }) {
  if (target.dataset.button !== 'flag') return;

  flagButtons.forEach(button => {
    if (button !== target) button.classList.remove('active');
  });

  if (target.classList.contains('active')) {
    hiddenResults();
    target.classList.remove('active');
  } else {
    getUsersByCountry(target.value);
    target.classList.add('active');
  }
}

function getUsersByCountry(country) {
  fetch(`https://randomuser.me/api/?results=10&nat=${country}`)
    .then(response => response.json())
    .then(json => showResults(json.results, country));
  // .then(results => showResults(results));
}

function showResults(users, country) {
  resultsSection.innerHTML = '';

  const resultsTitleContainer = document.createElement('div');

  resultsTitleContainer.innerHTML = `
    <div class="container d-flex gap-3 pb-5 px-0">
      <div>
        <img src="assets/countries/${country}.png" alt="">
      </div>
      <h2 class="m-0">
        Users from ${users[1].location.country}
      </h2>
    </div>
  `;

  const resultsTable = document.createElement('div');

  resultsTable.classList.add(
    'container',
    'table-results',
    'd-flex',
    'flex-column',
    'gap-3',
  );

  resultsTable.innerHTML = `<div class="mb-1">
    <hr>
    <div class="row m-0 text-gray-3 table-head">
      <div class="col-1 d-flex justify-content-center">
        <span class="fw-bold fz-14">
          #
        </span>
      </div>
      <div class="col-3 offset-1">
        <span class="fw-bold fz-14">
          Name
        </span>
      </div>
      <div class="col-1">
        <span class="fw-bold fz-14">
          Gender
        </span>
      </div>
      <div class="col-2">
        <span class="fw-bold fz-14">
          Birth Date
        </span>
      </div>
      <div class="col-4">
        <span class="fw-bold fz-14">
          E-mail
        </span>
      </div>
    </div>
    <hr>
    </div>
  `;

  const resultsContainer = document.createElement('div');

  resultsContainer.classList.add(
    'bg-light-1',
    'pb-5',
    'position-relative',
    'd-flex',
    'justify-content-center',
    'mt-5',
  );

  resultsContainer.style.height = '910px';

  resultsContainer.appendChild(resultsTable);

  users.forEach((user, index) => {
    index += 1;
    const date = new Date(user.dob.date);
    const userBirthDate = `${leadingZero(date.getMonth())}/${leadingZero(
      date.getDay(),
    )}/${date.getFullYear()}`;

    resultsTable.innerHTML += `
      <div class="row m-0 user">
        <div class="col-1 d-flex align-items-center justify-content-center">
          <span class="fz-16">
            ${index}
          </span>
        </div>
        <div class="col-1">
          <img src="${user.picture.medium}" class="img-fluid" alt="">
        </div>
        <div class="col-3 d-flex align-items-center">
          <span class="fz-16">
            ${user.name.first} ${user.name.last}
          </span>
        </div>
        <div class="col-1  d-flex align-items-center">
          <span class="fz-16">
            ${user.gender}
          </span>
        </div>
        <div class="col-2 d-flex align-items-center">
          <span class="fz-16">
            ${userBirthDate}
          </span>
        </div>
        <div class="col-4  d-flex align-items-center">
          <span class="fz-16">
            ${user.email}
          </span>
        </div>
      </div>
    `;
  });

  resultsSection.appendChild(resultsTitleContainer);
  resultsSection.appendChild(resultsContainer);
  window.scrollTo(0, 550);
}

function hiddenResults() {
  resultsSection.innerHTML = '';
}

function leadingZero(number) {
  if (Number(number) < 10) {
    return `0${number}`;
  } else {
    return number;
  }
}
