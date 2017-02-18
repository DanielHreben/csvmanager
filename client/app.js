const input = document.getElementById('input')
const button = document.getElementById('button')

button.onclick = () => {
  fetch('/api/users/upload', {
    method: 'POST',
    body: input.files[0]
  })
}

fetch('/api/users')
.then(response => response.json())
.then(data => {
  console.log(data.users)
})
