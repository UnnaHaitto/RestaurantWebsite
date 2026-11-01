const image = document.getElementById('image');
const input = document.getElementById('input');

input.addEventListener('change', function (event) {
  image.src = URL.createObjectURL(input.files[0]);
});
